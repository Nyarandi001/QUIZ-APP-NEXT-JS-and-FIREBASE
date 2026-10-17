
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../config/firebase.js";
import { div } from "motion/react-client";
const backend_URL="https://quiz-app-next-js-and-firebase.vercel.app/admin/api"
async function QuizDetails({ params }) {
  const { quizid } = await params;

  const response = await fetch(backend_URL, {
    cache: "no-store",
  });

  const quizes = await response.json();

  const quiz = quizes.find((q) => q.quizid === quizid);

  const FetchQuizesByQuizId = async (quizId) => {
    try {
      const q = query(
        collection(db, "QuizAppQuizes"),
        where("quizid", "==", quizId)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No Quizes found");
        return null;
      }

      const quizzes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return quizzes;
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      return null;
    }
  };

  const subquizes = await FetchQuizesByQuizId(quizid);

  
  return (
    <div className="w-full max-w-full min-w-0 overflow-x-hidden">
      <div className="bg-blue-700 w-full text-center text-xl sm:text-2xl font-extrabold p-2 break-words">
        <h1>Quiz Details</h1>
      </div>

      <div className="w-full min-w-0 flex flex-col rounded border border-slate-200 bg-white p-3 sm:p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl">
        {/* QUIZ NAME */}
        <div className="flex flex-col  gap-1 min-w-0 sm:flex-row">
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 break-words">
           Title:
          </h3>
           <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 break-words">
            {quiz.quizname}
          </h3>
        </div>

        {/* QUIZ ID */}
        <div className="flex flex-col  gap-1 min-w-0 sm:flex-row">
          <p className="text-slate-500">Quiz ID:</p>
          <p className="font-semibold text-slate-700 break-all">
            {quiz.quizid}
          </p>
        </div>
      </div>

      {/* CREATOR */}
      <div className="flex flex-col items-center sm:flex-row mt-5 p-2 gap-5 w-full min-w-0 text-white">
       
            {/* CREATOR NAME */}
            <div className="flex flex-col items-center gap-1 min-w-0 sm:flex-row">
              <p className="text-sm ">Created by:</p>
              <p className="font-semibold break-words">
                {quiz.creatorName}
              </p>
            </div>

            {/* DURATION */}
            <div className="flex flex-col items-center gap-1 min-w-0 sm:flex-row">
              <p className="text-sm ">Duration:</p>
              <p className="font-semibold ">
                {quiz.durationMin} minutes
              </p>
            </div>

            {/* CREATED DATE */}
            <div className="flex flex-col items-center gap-1 min-w-0 sm:flex-row">
              <p className="text-sm ">Created:</p>
              <p className="font-semibold  break-words">
                {quiz.createdDate}
              </p>
            </div>

            {/* ATTEMPTS */}
            <div className="flex flex-col items-center gap-1 min-w-0 sm:flex-row">
              <p className="text-sm">Attempts:</p>
              <p className="font-semibold">
                {quiz.attempts}
              </p>
            </div>
          </div>

          {/* QUIZ QUESTIONS */}
          <div className="flex flex-col  gap-0 min-w-0 mt-4 ">
            <h1 className="bg-white text-green-900 text-center font-extrabold break-words m-auto p-2">
              {`${subquizes.length} QUIZES`}
            </h1>

            <div className="w-full min-w-0">
              {subquizes.map((subquiz, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white text-black mt-2 p-2 rounded w-full min-w-0"
                  >
                    <h3 className="font-bold break-words">
                      {`${index + 1}:${subquiz.questionName}`}
                    </h3>

                    <p
                      className={`p-2 break-words ${
                        subquiz.answer === "optionA"
                          ? "bg-green-600 text-white"
                          : "text-black"
                      }`}
                    >
                      {`A:${subquiz.optionA}`}
                    </p>

                    <p
                      className={`p-2 break-words ${
                        subquiz.answer === "optionB"
                          ? "bg-green-600 text-white"
                          : "text-black"
                      }`}
                    >
                      {`B:${subquiz.optionB}`}
                    </p>

                    <p
                      className={`p-2 break-words ${
                        subquiz.answer === "optionC"
                          ? "bg-green-600 text-white"
                          : "text-black"
                      }`}
                    >
                      {`C:${subquiz.optionC}`}
                    </p>

                    <p
                      className={`p-2 break-words ${
                        subquiz.answer === "optionD"
                          ? "bg-green-600 text-white"
                          : "text-black"
                      }`}
                    >
                      {`D:${subquiz.optionD}`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        

        {/* RESULTS */}
        <div className="bg-zinc-900 flex flex-col items-center p-2 w-full lg:w-1/2 min-w-0 border-red-500">
          <div>
            <h1 className="bg-white text-green-600 p-2 font-extrabold text-center">
              RESULTS
            </h1>
          </div>

          <div className="w-full min-w-0 text-white break-words">
            {quiz.results.length === 0 ? (
              <h1 className="bg-red-600 text-white p-2 rounded-2xl font-serif text-center">
                QUIZ NOT ATTEMPTED
              </h1>
            ) : (
              <ol className="list-decimal list-inside w-full break-words">
                {quiz.results.map((result, index) => {
                  return (
                    <li key={index} className="p-1 break-words">
                      {`${result.name}-${result.score}`}
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </div>
      </div>
    
  );
}

export default QuizDetails;
