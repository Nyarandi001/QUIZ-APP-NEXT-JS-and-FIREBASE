
"use client";

import Link from "next/link";

function UserQuiz({
  index,
  quizname,
  quizid,
  creatorName,
  createdDate,
  durationMin,

  results = [],
  userId,
}) {
  function checkIfDone(results, userId) {
    for (let i = 0; i < results.length; i++) {
      if (results[i].userId === userId) {
        return true;
      }
    }
    return false;
  }

  function GetUserScore(results, userId) {
    for (let i = 0; i < results.length; i++) {
      if (results[i].userId === userId) {
        return results[i].score;
      }
    }
    return "";
  }

  return (
    <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">

        <div className="min-w-0 flex-1">
          <h3 className="break-words font-mono text-lg font-bold leading-relaxed text-slate-900 sm:text-xl md:text-2xl">
            {`${index + 1}: ${quizname}`}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {checkIfDone(results, userId) ? (
            <p className="rounded-xl bg-green-500 px-3 py-2 text-sm font-semibold text-white sm:text-base">
              Done
            </p>
          ) : (
            <p className="rounded-xl bg-red-500 px-3 py-2 text-sm font-semibold text-white sm:text-base">
              Not Done
            </p>
          )}

          {checkIfDone(results, userId) && (
            <p className="break-words rounded-xl bg-orange-500 px-3 py-2 text-sm font-semibold text-white sm:text-base">
              {`Score: ${GetUserScore(results, userId)}`}
            </p>
          )}
        </div>

       {checkIfDone(results, userId) ? null :(
       <div className="w-full sm:w-auto">
          <Link
            href={`/user/quiz/${quizid}`}
            className="flex min-h-11 w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 sm:w-auto sm:text-base"
          >
           Attempt Quiz 
          </Link>
        </div>)}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="min-w-0 rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500 sm:text-sm">
            Created by:
          </p>
          <p className="break-words text-sm font-semibold text-slate-700 sm:text-base">
            {creatorName}
          </p>
        </div>

       
        <div className="min-w-0 rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500 sm:text-sm">
            Created At:
          </p>
          <p className="break-words text-sm font-semibold text-slate-700 sm:text-base">
            {createdDate}
          </p>
        </div>


        <div className="min-w-0 rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500 sm:text-sm">
            Duration:
          </p>
          <p className="break-words text-sm font-semibold text-slate-700 sm:text-base">
            {durationMin} minutes
          </p>
        </div>

        
      </div>
    </div>
  );
}

export default UserQuiz;
