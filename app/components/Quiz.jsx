
"use client"

import { useEffect, useRef, useState } from "react"
import "./Quiz.css"
import LoadingLoader from "../components/LoadingLoader.jsx"
import { useRouter } from  "next/navigation.js";
import { toast } from "react-toastify"
import {collection, getDocs, query, where} from 'firebase/firestore';
import { db } from "../config/firebase.js"
function Quiz({quiz}){

   
    const [index,setIndex]=useState(0)
      const [questions,setQuestions]=useState([])
    const question=questions[index]

    const [Result,setResult]=useState(false)
    const [score,setScore]=useState(0)
    const [locked,setLocked]=useState(false)
    const [startQuiz ,setStartQuiz]=useState(false)
    const [showUpdateLoader,setShowUpdateLoader]=useState(false)
    const [remainingTime,setRemainingTime]=useState("00:00:00")
    const ref1=useRef(null)
    const ref2=useRef(null)
    const ref3=useRef(null)
    const ref4=useRef(null)
    const refs=[ref1,ref2,ref3,ref4]
    const timeRef=useRef(null)
     const router=useRouter();
 useEffect(()=>{
    console.log("QUIZ")
   console.log(quiz)
const subquizes=FetchQuizesByQuizId(quiz.quizid);
  

 },[])
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
    setQuestions(quizzes)
    return quizzes;

  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return null;
  }
}
   
    function checkAnswer(e,choice){
        if(locked){
            return 0;
        }
        if(question.answer===choice){
            e.target.classList.add("correct")
            setScore(s=>s + 1)
            setLocked(true)
        }
        else{
            e.target.classList.add("wrong")
            if(question.answer==="optionA"){
               ref1.current?.classList.add("correct");
            }
            else if(question.answer==="optionB"){
               ref2.current?.classList.add("correct");
            }
            else if(question.answer==="optionC"){
               ref3.current?.classList.add("correct");
            }
            else if(question.answer==="optionD"){
               ref4.current?.classList.add("correct");
            }
            setLocked(true)
        }
    }

   async function nextQuestion(){
        refs.forEach((ref) => {
  ref.current?.classList.remove("correct");
  ref.current?.classList.remove("wrong");
});  
        setLocked(false)
        if(index === questions.length-1){
         
            setResult(true)
            await UpdateScores()
        }
        else{
            setIndex(i=>i + 1)
        }
    }

    async function UpdateScores(){
        setShowUpdateLoader(true)
        const final_score=`${score} out of ${questions.length} (${((score/questions.length) * 100).toFixed(2)}%)`
        const userDetails=JSON.parse(localStorage.getItem("currentUser"))
        const userScore={userId:userDetails.userId,name:userDetails.name,score:final_score}
        const updated_quiz={...quiz,attempts: quiz.attempts + 1,results:[...quiz.results,userScore]}
        console.log("UPDATED QUIZ")
        console.log(updated_quiz)
        const response = await fetch("http://localhost:3000/admin/api", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updated_quiz),
        })

         setShowUpdateLoader(false)
       // toast.success("Score Updated Successfully")
        resetQuiz()
        router.push("/user")
    }

    const resetQuiz=function(){
        setScore(0)
        setIndex(0)
        setLocked(false)
        setResult(false)
        setStartQuiz(false)
        timeRef.current?.classList.remove("time-almostending");
        setRemainingTime("00:00:00");
    }

    const startQuestions=()=>{
        setStartQuiz(true)
        const duration = Date.now() + ((quiz.durationMin ) * 60000);

        const intervalId = setInterval(() => {
            const remainingTime2 = duration - Date.now();
            const totalSeconds = Math.floor(remainingTime2 / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            setRemainingTime(
                `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
                    2,
                    "0"
                )}:${String(seconds).padStart(2, "0")}`
            );

            const remainingFraction=Math.floor(duration-Date.now())/((questions.length) * 60000)

            if(remainingFraction < 0.30 && remainingFraction > 0){
               timeRef.current?.classList.add("time-almostending");
            }
            else if (remainingFraction <= 0) {
                clearInterval(intervalId);
                setRemainingTime("TIME UP")
                setLocked(true)

                setTimeout(() => {
                    UpdateScores()
                    setResult(true)
                },3000);
            }
        }, 1000);
    }

    return(
        <div className="w-full  min-w-0 rounded bg-slate-200 p-3 sm:p-5 md:p-6">
          
            {startQuiz ? <></> :(
                <div className="flex flex-col gap-[20px] sm:flex-row sm:items-center">
                    <button
                        className=" rounded-2xl border-none bg-green-700 p-2 hover:bg-green-800 sm:text-lg"
                        onClick={startQuestions}
                    >
                        Attemp Quiz
                    </button>
                    <p className="text-black  text-base sm:text-xl">
                        {`Time:${questions.length} minutes`}
                    </p>
                </div>
            )  }

            {(Result===false && startQuiz) ? (
                <>
                    <div className="w-full min-w-0">
                        <hr className="mt-2 h-[3px] border-0 bg-gray-500" />

                        <div className="question-panel">
                            <p
                                ref={timeRef}
                                className="time-alert my-3 bg-green-700 p-3 text-center font-mono text-base text-white sm:text-xl"
                            >
                                {`Time Remaining:${remainingTime}`}
                            </p>

                            <h2 className="mt-2 break-words text-xl font-extrabold text-black sm:text-2xl md:text-3xl">
                                {index+1 +":" }{question.questionName}
                            </h2>
                        </div>

                        <ul className="mt-4 list-none space-y-3 p-0">
                            <li
                                className="cursor-pointer rounded-2xl border-2 border-black p-1 text-base text-gray-700 transition hover:bg-gray-100 sm:p-2 sm:text-xl"
                                ref={ref1}
                                onClick={(e)=>checkAnswer(e,"optionA")}
                            >
                                {`A:${question.optionA}`}
                            </li>

                            <li
                                className="cursor-pointer rounded-2xl border-2 border-black p-1 text-base text-gray-700 transition hover:bg-gray-100 sm:p-2 sm:text-xl"
                                ref={ref2}
                                onClick={(e)=>checkAnswer(e,"optionB")}
                            >
                                {`B:${question.optionB}`}
                            </li>

                            <li
                                className="cursor-pointer rounded-2xl border-2 border-black p-1 text-base text-gray-700 transition hover:bg-gray-100 sm:p-2 sm:text-xl"
                                ref={ref3}
                                onClick={(e)=>checkAnswer(e,"optionC")}
                            >
                                {`C:${question.optionC}`}
                            </li>

                            <li
                                className="cursor-pointer rounded-2xl border-2 border-black p-1 text-base text-gray-700 transition hover:bg-gray-100 sm:p-2 sm:text-xl"
                                ref={ref4}
                                onClick={(e)=>checkAnswer(e,"optionD")}
                            >
                                {`D:${question.optionD}`}
                            </li>
                        </ul>

                        <div className="mt-5 flex flex-col items-center gap-3">
                            <button
                                className="mt-2 w-full border-none bg-blue-700 px-5 py-3 text-base text-white transition rounded hover:bg-blue-800 sm:w-auto sm:text-xl"
                                onClick={nextQuestion}
                            >
                                Next
                            </button>

                            <p className=" text-gray-700 text-base sm:text-xl">
                                question {index+1} of {questions.length}
                            </p>
                        </div>
                    </div>
                </>
            ) : <></>}

            {Result ? (
                <div className="flex flex-col items-center justify-center gap-5 p-3 text-xl sm:p-6 sm:text-2xl md:text-3xl">
                    {showUpdateLoader ? <LoadingLoader title="Updating Scores" /> : null}
                    {(score / questions.length) > 0.7 ? (
                        <p className="rounded-lg bg-green-700 p-3 text-center text-gray-00">
                           {` You scored ${score} out of ${questions.length} (${((score/questions.length) * 100).toFixed(2)}%)`}
                        </p>
                    ) : (
                        <p className="rounded-lg bg-red-700 p-1 text-center text-white text-base  break-words sm:p-3 sm:text-lg">
                        {` You scored ${score} out of ${questions.length} (${((score/questions.length) * 100).toFixed(2)}%)`}
                        </p>
                    )}

                    {(score / questions.length) > 0.7 ? (
                        <video
                            className="h-40 w-40 max-w-full rounded-lg object-cover sm:h-48 sm:w-48 md:h-52 md:w-52"
                            src={"/happy.mp4"}
                            autoPlay
                            controls
                        />
                    ) : (

                        <video
                            className="h-40 w-40 max-w-full rounded-lg object-cover sm:h-48 sm:w-48 md:h-52 md:w-52"
                            src={"/laughing.mp4"}
                            autoPlay
                            controls
                        />
                    )}

                   {/*<button
                        className="mt-4 w-full border-none bg-blue-700 px-5 py-3 text-base text-white transition hover:bg-blue-800 rounded-2xl sm:w-auto sm:text-xl"
                        onClick={resetQuiz}
                    >
                        RESET
                    </button> */}
                </div>
            ) : <></>}

        </div>
    )
}

export default Quiz

