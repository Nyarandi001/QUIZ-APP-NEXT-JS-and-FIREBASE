
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
   where,
} from 'firebase/firestore';
import { db } from "../../../../config/firebase.js";
import { div } from 'motion/react-client';
import Quiz from '../../../../components/Quiz.jsx';



async function QuizDetails({params}){
 const {quizid}=await params
const response = await fetch("http://localhost:3000/admin/api", {
    cache: "no-store",
  });

  const quizes = await response.json();

  const quiz = quizes.find((q) => q.quizid === quizid);

   
 return(
    <div>
      <div className="bg-blue-700 w-full text-center text-2xl font-extrabold p-2">
  <h1>Quiz Details</h1>
      </div>
      <div className="w-full flex flex-col  rounded border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl">

                {/* QUIZ NAME */}
              
                  <div>
                <h3 className="text-2xl font-bold text-slate-900 font-serif">
                  {`Title:${quiz.quizname}`}
                </h3>
              </div>

              <div className="flex flex-col  mt-[20px] p-2  gap-[20px] w-full sm:flex-row bg-white">

                 <div className="flex flex-col gap-[10px] sm:flex-row sm:gap-[3px]">
                <p className="text-sm text-slate-500">
                 Created by:</p>
                 <p className="text-sm text-slate-500">
                 {`${quiz.creatorName}`}</p>
               </div>
                 
                {/* DURATION */}
                 <div className="flex flex-col gap-[10px] sm:flex-row sm:gap-[3px]">
                  <p className="text-sm text-slate-500">
                 Duration:</p>
                <p className="text-sm text-slate-500">
                 {`${quiz.durationMin} minutes`}</p>
               </div>


                {/* CREATED DATE */}
                 <div className="flex flex-col gap-[10px] sm:flex-row sm:gap-[3px] ">
                  <p className="text-sm text-slate-500">
                 Created:</p>
                <p className="text-sm text-slate-500">
                 {`${quiz.createdDate}`}</p>
               </div>
              
                </div> 

                </div>

<div>
<Quiz quiz={quiz} />
</div>
</div>
     
      
      
 )
}
export default QuizDetails