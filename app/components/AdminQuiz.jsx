
"use client";

import Link from "next/link";

function AdminQuiz({index,quizname,quizid,creatorName,createdDate,durationMin,attempts}) {
  return (
    <div className="w-full min-w-0">
      <div className="group flex w-full min-w-0 flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-200 hover:border-indigo-300 hover:shadow-xl sm:gap-5 sm:p-5 md:p-6">

        {/* QUIZ NAME AND BUTTON */}
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="break-words text-lg font-bold leading-relaxed text-slate-900 sm:text-xl md:text-2xl">
              {`${index + 1}: ${quizname}`}
            </h3>
          </div>

          <div className="w-full shrink-0 sm:w-auto">
            <Link
              href={`/user/quiz/${quizid}`}
              className="flex min-h-11 w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 sm:w-auto sm:text-base"
            >
              Do Quiz
            </Link>
          </div>
        </div>

        {/* QUIZ DETAILS */}
        <div className="grid min-w-0 grid-cols-1 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">

          {/* QUIZ ID */}
          <div className="min-w-0 rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              Quiz ID
            </p>
            <p className="break-all text-sm font-semibold text-slate-700 sm:text-base">
              {quizid}
            </p>
          </div>

          {/* CREATOR */}
          <div className="min-w-0 rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              Created by
            </p>
            <p className="break-words text-sm font-semibold text-slate-700 sm:text-base">
              {creatorName}
            </p>
          </div>

          {/* DURATION */}
          <div className="min-w-0 rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              Duration
            </p>
            <p className="break-words text-sm font-semibold text-slate-700 sm:text-base">
              {durationMin} minutes
            </p>
          </div>

          {/* CREATED DATE */}
          <div className="min-w-0 rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              Created
            </p>
            <p className="break-words text-sm font-semibold text-slate-700 sm:text-base">
              {createdDate}
            </p>
          </div>

          {/* ATTEMPTS */}
          <div className="min-w-0 rounded-lg bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              Attempts
            </p>
            <p className="break-words text-sm font-semibold text-slate-700 sm:text-base">
              {attempts}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminQuiz;
