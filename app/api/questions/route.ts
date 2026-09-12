import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import type { Question, QuestionCategory } from "@/types/question";

const categories: readonly QuestionCategory[] = [
  "hr",
  "technical",
  "code",
  "cultural-fit",
];

function isQuestionCategory(value: unknown): value is QuestionCategory {
  return typeof value === "string" && categories.includes(value as QuestionCategory);
}

function parseStringList(value: unknown, fieldName: string): string[] {
  if (typeof value === "string") {
    return value
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return value.map((item) => item.trim()).filter(Boolean);
  }

  throw new Error(`${fieldName} debe ser un arreglo de textos o una cadena separada por comas.`);
}

function normalizeQuestion(input: unknown, category: QuestionCategory): Omit<Question, "id"> {
  if (!input || typeof input !== "object") {
    throw new Error("Cada pregunta debe ser un objeto JSON.");
  }

  const question = input as Record<string, unknown>;
  if (typeof question.question !== "string" || !question.question.trim()) {
    throw new Error("El campo question es obligatorio.");
  }
  if (typeof question.answer !== "string" || !question.answer.trim()) {
    throw new Error("El campo answer es obligatorio.");
  }

  const normalized: Omit<Question, "id"> = {
    question: question.question.trim(),
    answer: question.answer.trim(),
    category,
    tags: parseStringList(question.tags, "tags"),
    keyPoints: parseStringList(question.keyPoints, "keyPoints"),
  };

  if (typeof question.codeSnippet === "string" && question.codeSnippet.trim()) {
    normalized.codeSnippet = question.codeSnippet.trim();
  }
  if (typeof question.codeLanguage === "string" && question.codeLanguage.trim()) {
    normalized.codeLanguage = question.codeLanguage.trim();
  }

  return normalized;
}

function nextId(questions: Question[], category: QuestionCategory): string {
  const prefix = `${category}-`;
  const highestId = questions.reduce((highest, question) => {
    if (!question.id.startsWith(prefix)) return highest;
    const number = Number(question.id.slice(prefix.length));
    return Number.isInteger(number) ? Math.max(highest, number) : highest;
  }, 0);

  return `${prefix}${highestId + 1}`;
}

function getQuestionFilePath(category: QuestionCategory): string {
  return path.join(process.cwd(), "app", category, "questions.json");
}

async function readQuestions(category: QuestionCategory): Promise<Question[]> {
  return JSON.parse(await fs.readFile(getQuestionFilePath(category), "utf8")) as Question[];
}

async function writeQuestions(category: QuestionCategory, questions: Question[]) {
  await fs.writeFile(
    getQuestionFilePath(category),
    `${JSON.stringify(questions, null, 2)}\n`,
    "utf8",
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const questionsByCategory = new Map<QuestionCategory, unknown[]>();

    const addQuestions = (category: unknown, questions: unknown[]) => {
      if (!isQuestionCategory(category)) {
        throw new Error("category debe ser hr, technical, code o cultural-fit.");
      }

      const existing = questionsByCategory.get(category) ?? [];
      questionsByCategory.set(category, [...existing, ...questions]);
    };

    if (Array.isArray(body)) {
      if (body.length === 0) {
        return NextResponse.json({ error: "Debes enviar al menos una pregunta." }, { status: 400 });
      }

      for (const question of body) {
        if (!question || typeof question !== "object") {
          throw new Error("Cada pregunta debe ser un objeto JSON.");
        }

        const questionRecord = question as Record<string, unknown>;
        addQuestions(questionRecord.category, [question]);
      }
    } else if (body && typeof body === "object") {
      const bodyRecord = body as Record<string, unknown>;
      const inputQuestions = Array.isArray(bodyRecord.questions)
        ? bodyRecord.questions
        : [bodyRecord];
      addQuestions(bodyRecord.category, inputQuestions);
    } else {
      throw new Error("El JSON debe ser una pregunta o un array de preguntas.");
    }

    if (questionsByCategory.size === 0) {
      return NextResponse.json({ error: "Debes enviar al menos una pregunta." }, { status: 400 });
    }

    const addedQuestions: Question[] = [];
    for (const [category, inputQuestions] of questionsByCategory) {
      const normalizedQuestions = inputQuestions.map((question) =>
        normalizeQuestion(question, category),
      );
      const existingQuestions = await readQuestions(category);
      let currentId = nextId(existingQuestions, category);
      const newQuestions = normalizedQuestions.map((question) => {
        const newQuestion = { ...question, id: currentId };
        const nextNumber = Number(currentId.slice(category.length + 1)) + 1;
        currentId = `${category}-${nextNumber}`;
        return newQuestion;
      });

      await writeQuestions(category, [...existingQuestions, ...newQuestions]);
      addedQuestions.push(...newQuestions);
    }

    return NextResponse.json({
      added: addedQuestions.length,
      categories: [...questionsByCategory.keys()],
      ids: addedQuestions.map((question) => question.id),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo guardar la pregunta.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const category = body.category;
    const id = body.id;

    if (!isQuestionCategory(category) || typeof id !== "string" || !id.trim()) {
      return NextResponse.json({ error: "category e id son obligatorios y válidos." }, { status: 400 });
    }

    const questions = await readQuestions(category);
    const questionIndex = questions.findIndex((question) => question.id === id);
    if (questionIndex === -1) {
      return NextResponse.json({ error: "No se encontró la pregunta." }, { status: 404 });
    }

    questions[questionIndex] = { id, ...normalizeQuestion(body, category) };
    await writeQuestions(category, questions);

    return NextResponse.json({ updated: id, category });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo actualizar la pregunta.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const category = body.category;
    const id = body.id;

    if (!isQuestionCategory(category) || typeof id !== "string" || !id.trim()) {
      return NextResponse.json({ error: "category e id son obligatorios y válidos." }, { status: 400 });
    }

    const questions = await readQuestions(category);
    const remainingQuestions = questions.filter((question) => question.id !== id);
    if (remainingQuestions.length === questions.length) {
      return NextResponse.json({ error: "No se encontró la pregunta." }, { status: 404 });
    }

    await writeQuestions(category, remainingQuestions);
    return NextResponse.json({ deleted: id, category });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo eliminar la pregunta.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}