import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NAV_ITEMS } from "@/config/navigation";

export default function Home() {
  const interviewCategories = NAV_ITEMS.filter((item) => item.href !== "/");

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 md:p-10 text-white shadow-lg">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-xs">
            <span>🚀 Interview Copilot</span>
            <span className="opacity-60">•</span>
            <span>Mobile-First</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Preparación rápida para entrevistas de software
          </h1>
          <p className="text-blue-100 text-sm md:text-base leading-relaxed">
            Accede a respuestas estructuradas, conceptos clave, metodologías y ejemplos
            diseñados para consultar ágilmente desde tu móvil o escritorio antes o durante tus entrevistas.
          </p>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Módulos de Entrevista
          </h2>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
            Selecciona una categoría para explorar preguntas y guías de respuesta.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {interviewCategories.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex flex-col justify-between p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="w-4 h-4 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 leading-normal">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Comenzar práctica</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
