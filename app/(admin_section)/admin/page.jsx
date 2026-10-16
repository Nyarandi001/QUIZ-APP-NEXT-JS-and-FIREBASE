
"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminPage() {
  const [all_quizes, setAllQuizes] = useState([])
  const [quizes, setQuizes] = useState([])
  const [name, setName] = useState()
  const [id, setId] = useState()

  useEffect(() => {
    async function FetchData() {
      try {
        const response = await fetch("http://localhost:3000/admin/api", {
          cache: "no-store",
        });

        const all_fetched_quizes = await response.json();

        setAllQuizes(all_fetched_quizes)

       

        const current_creator = JSON.parse(
          localStorage.getItem("currentUser")
        )

        if (current_creator) {
          setName(current_creator.name)
          setId(current_creator.userId)
        }

         const current_admin_quizes=all_fetched_quizes.filter(quiz=>quiz.creatorId===current_creator.userId)
        setQuizes(current_admin_quizes)
      } catch (error) {
        console.error(error)
        toast.error("Failed to load quizzes")
      }
    }

    FetchData()
  }, [])

  async function deleteQuiz(quizid) {
    try {
      const response = await fetch("http://localhost:3000/admin/api", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: quizid,
        }),
      });

      const data = await response.json();

      if (
        data.message === "QUIZ deleted successfully" &&
        data.status === 201
      ) {
        toast.success('QUIZ deleted Successfully');

        setAllQuizes(data.quizes)
        setQuizes(data.quizes)
      } else {
        toast.error('Error, QUIZ not deleted');
      }
    } catch (error) {
      console.error(error)
      toast.error('Error, QUIZ not deleted');
    }
  }

  function handleSearch(e) {
    const searchValue = e.target.value.toLowerCase();

    if (searchValue === "") {
      setQuizes(all_quizes)
    } else {
      const filtered_quizes = all_quizes.filter((quiz) =>
        (quiz.quizname || "").toLowerCase().includes(searchValue)
      )

      setQuizes(filtered_quizes)
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-800">
      <ToastContainer />

      {/* HEADER */}
      <header className="bg-slate-600 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium text-indigo-200 sm:text-sm">
                ADMIN DASHBOARD
              </p>

              <h1 className="mt-1 break-words text-2xl font-extrabold tracking-tight sm:text-3xl">
                Welcome, {name} 👋
              </h1>

              <p className="mt-2 text-sm text-indigo-200 sm:text-base">
                Manage your quizzes from your admin dashboard.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">

        {/* STATS */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-8 lg:grid-cols-3 lg:gap-5">

          {/* TOTAL QUIZZES */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Quizzes
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  {quizes.length}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Quizzes available
                </p>
              </div>
            </div>
          </div>

          {/* CREATE QUIZ */}
          <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-6">
            <Link
              href="/admin/addquiz"
              className="w-full rounded-xl bg-green-600 px-5 py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-green-800 hover:shadow-lg sm:w-auto sm:text-base"
            >
              + Add New Quiz
            </Link>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mb-6 w-full sm:mb-8">
          <div className="flex w-full min-w-0 items-center rounded-xl border border-slate-300 bg-white px-3 shadow-sm transition focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
            <Image
              src="/search.png"
              width={22}
              height={22}
              alt="Search"
              className="mr-2 shrink-0 opacity-50"
            />

            <input
              type="text"
              placeholder="Search quizzes..."
              className="w-full min-w-0 bg-transparent px-2 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* QUIZ LIST */}
        {quizes.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-12 text-center shadow-sm sm:py-20">
            <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
              No quizzes found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 sm:text-base">
              You haven't created any quizzes yet, or no quizzes match your search.
              Create a quiz and it will appear here.
            </p>

            <Link
              href="/admin/addquiz"
              className="mt-6 inline-block w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 hover:shadow-lg sm:w-auto sm:text-base"
            >
              Create Your First Quiz
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:gap-5">
            {quizes.map((quiz, index) => (
              <div
                key={quiz.id || index}
                className="group w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-200 hover:border-indigo-300 hover:shadow-xl sm:p-5 lg:p-6"
              >
                {/* QUIZ NAME AND BUTTONS */}
                <div className="flex min-w-0 flex-col gap-4 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="break-words font-mono text-lg font-bold text-slate-900 sm:text-xl">
                      {`${index + 1}: ${quiz.quizname}`}
                    </h3>
                  </div>

                  <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:shrink-0 sm:gap-3">
                    <Link
                      href={`/admin/quiz/${quiz.quizid}`}
                      className="rounded-xl bg-indigo-600 px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-indigo-700 sm:px-4 sm:py-3"
                    >
                      View
                    </Link>

                    <button
                      className="rounded-xl bg-red-600 px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-red-700 sm:px-4 sm:py-3"
                      onClick={() => deleteQuiz(quiz.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* QUIZ DETAILS */}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

                  {/* QUIZ ID */}
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 sm:text-sm">
                      Quiz ID
                    </p>
                    <p className="break-all font-semibold text-slate-700">
                      {quiz.quizid}
                    </p>
                  </div>

                  {/* CREATOR */}
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 sm:text-sm">
                      Created by
                    </p>
                    <p className="break-words font-semibold text-slate-700">
                      {quiz.creatorName}
                    </p>
                  </div>

                  {/* DURATION */}
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 sm:text-sm">
                      Duration
                    </p>
                    <p className="break-words font-semibold text-slate-700">
                      {quiz.durationMin} minutes
                    </p>
                  </div>

                  {/* CREATED DATE */}
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 sm:text-sm">
                      Created
                    </p>
                    <p className="break-words font-semibold text-slate-700">
                      {quiz.createdDate}
                    </p>
                  </div>

                  {/* ATTEMPTS */}
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 sm:text-sm">
                      Attempts
                    </p>
                    <p className="font-semibold text-slate-700">
                      {quiz.attempts}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminPage;
