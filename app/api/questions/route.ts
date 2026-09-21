import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { readQuestions, writeQuestions } from "@/lib/questions";
import type { Question, QuestionCategory } from "@/types/question";

const categories: readonly QuestionCategory[] = [
  "hr",
  "technical",
  "code",
  "cultural-fit",
  "ia",
];

function isQuestionCategory(value: unknown): value is QuestionCategory {
  return typeof value === "string" && categories.includes(value as QuestionCategory);
}

function parseStringList(value: unknown, fieldName: string): string[] {
  if (typeof value === "string") {
    return value
      .split(/[ ,\n]/)
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

function getCategoryPath(category: QuestionCategory): string {
  return category === "technical" ? "/technical" : `/${category}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const questionsByCategory = new Map<QuestionCategory, unknown[]>();

    const addQuestions = (category: unknown, questions: unknown[]) => {
      if (!isQuestionCategory(category)) {
        throw new Error("category debe ser hr, technical, code, cultural-fit o ia.");
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
      if (bodyRecord.replace === true) {
        if (!isQuestionCategory(bodyRecord.category)) {
          throw new Error("category debe ser hr, technical, code, cultural-fit o ia.");
        }

        const normalized = inputQuestions.map((question) => normalizeQuestion(question, bodyRecord.category as QuestionCategory));
        const replacedQuestions = normalized.map((question, index) => ({
          ...question,
          id: `${bodyRecord.category}-${index + 1}`,
        }));
        await writeQuestions(bodyRecord.category, replacedQuestions);
        revalidatePath(getCategoryPath(bodyRecord.category));
        return NextResponse.json({ count: replacedQuestions.length, category: bodyRecord.category });
      }

      addQuestions(bodyRecord.category, inputQuestions);
    } else {
      throw new Error("El JSON debe ser una pregunta o un array de preguntas.");
    }

    if (questionsByCategory.size === 0) {
      return NextResponse.json({ error: "Debes enviar al menos una pregunta." }, { status: 400 });
    }

    const addedQuestions: Question[] = [];
    for (const [category, inputQuestions] of questionsByCategory) {
      const existingQuestions = await readQuestions(category);
      const normalized = inputQuestions.map((question) => normalizeQuestion(question, category));
      const preparedQuestions = normalized.map((question) => ({
        ...question,
        id: nextId(existingQuestions, category),
      }));

      const mergedQuestions = [...existingQuestions, ...preparedQuestions];
      await writeQuestions(category, mergedQuestions);
      addedQuestions.push(...preparedQuestions);
      revalidatePath(getCategoryPath(category));
    }

    return NextResponse.json({
      added: addedQuestions.length,
      category: addedQuestions[0]?.category ?? "technical",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo guardar la pregunta." },
      { status: 400 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    if (!isQuestionCategory(body.category)) {
      throw new Error("category debe ser hr, technical, code, cultural-fit o ia.");
    }
    if (typeof body.id !== "string" || !body.id.trim()) {
      throw new Error("id es obligatorio para actualizar una pregunta.");
    }

    const existingQuestions = await readQuestions(body.category);
    const questionIndex = existingQuestions.findIndex((question) => question.id === body.id);
    if (questionIndex === -1) {
      return NextResponse.json({ error: "No se encontró la pregunta." }, { status: 404 });
    }

    const updatedQuestion = {
      ...normalizeQuestion(body, body.category),
      id: existingQuestions[questionIndex].id,
    };
    const updatedQuestions = [...existingQuestions];
    updatedQuestions[questionIndex] = updatedQuestion;
    await writeQuestions(body.category, updatedQuestions);
    revalidatePath(getCategoryPath(body.category));

    return NextResponse.json({ category: body.category, id: updatedQuestion.id });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo actualizar la pregunta." },
      { status: 400 },
    );
  }
}
