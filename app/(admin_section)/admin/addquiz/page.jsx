
"use client"

import { notFound, useRouter } from "next/navigation.js";
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingLoader from "../../../components/LoadingLoader.jsx"

function AddQuiz(){
const [quizTitle,setQuizTitle]=useState("")
 
const [quizId,setQuizId]=useState("")
const [quizDuration,setQuizDuration]=useState(0)
const [quizes,setQuizes]=useState([])
const [newQuizTitle,setNewQuizTitle]=useState("")
const [newQuizOptionA,setNewQuizOptionA]=useState("")
const [newQuizOptionB,setNewQuizOptionB]=useState("")
const [newQuizOptionC,setNewQuizOptionC]=useState("")
const [newQuizOptionD,setNewQuizOptionD]=useState("")
const [newQuizAnswer,setnewQuizAnswer]=useState("")
const [addQuestion,setAddQuestion]=useState(false)
const [creator,setCreator]=useState()
const [showAddLoader,setShowAddLoader]=useState(false)
const backend_URL="/admin/api"
const router=useRouter()
 useEffect(()=>{
const quiz1ID="QUIZ"+Date.now().toString();
setQuizId(quiz1ID)

 const current_creator=JSON.parse(localStorage.getItem("currentUser"))
 setCreator(current_creator)
  
 },[])

function addQuiz(){
 const questionId=`${quizId}${quizes.length}`;
const newquestionaire={
  questionId:questionId,
  questionName:newQuizTitle,
  quizid:quizId,
  quizname:quizTitle,
  optionA:newQuizOptionA,
  optionB:newQuizOptionB,
  optionC:newQuizOptionC,
  optionD:newQuizOptionD,
  answer:newQuizAnswer
}

  const updatedQuizes = [...quizes, newquestionaire];

  setQuizes(updatedQuizes);
setNewQuizTitle("")
  setNewQuizOptionA("")
  setNewQuizOptionB("")
  setNewQuizOptionC("")
  setNewQuizOptionD("")
  setnewQuizAnswer("")
  setAddQuestion(false)
}



function cancelQuestion()
{
  setNewQuizTitle("")
  setNewQuizOptionA("")
  setNewQuizOptionB("")
  setNewQuizOptionC("")
  setNewQuizOptionD("")
  setnewQuizAnswer("")
  setAddQuestion(false)
}
function removeQuestion(index){
 const filteredQuizes=quizes.filter((_,i)=>index !== i)
 setQuizes(filteredQuizes)
}

async function createQuiz() {

 const now = new Date();

      const dateTimeString = new Intl.DateTimeFormat("en-KE", {
        timeZone: "Africa/Nairobi",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);

  setShowAddLoader(true)
  const response = await fetch(backend_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quizid:quizId,
      quizname:quizTitle,
      creatorId: creator.userId,
      creatorName:creator.name,
      createdDate: dateTimeString,
      durationMin: Number(quizDuration),
      attempts:0,
      results:[],
      quizes:quizes
    }),
  });

  const data = await response.json();
 if(data.message==="QUIZ created successfully" && data.status===201){
  setShowAddLoader(false)
 toast.success('QUIZ created Successfully');
   setTimeout(()=>{
   router.push("/admin")
   },3000)
}
else{
setShowAddLoader(false)
toast.error('Error ,Quiz not created Try again');  
}}


return(
<div className="w-full min-h-screen max-w-full overflow-x-hidden">
  <ToastContainer />
<div>
    <h1 className="bg-stone-800 text-white text-center p-2 font-extrabold">ADD QUIZ</h1>
</div>
{showAddLoader ? <div className="flex items-center justify-center"> <LoadingLoader title="Creating Quiz" /></div> :null}
<div className="bg-blue-700 p-2 flex flex-col gap-[20px] w-full min-w-0">
    <input type="text" placeholder="QUIZID" value={`QUIZID:${quizId}`} className="bg-white text-black p-2 w-full rounded-xl " disabled={true}/>
    <input type="text" placeholder="Enter quiz title"  onChange={(e) => setQuizTitle(e.target.value)} className="bg-white text-black p-2 w-full rounded-xl"/>
     <input type="number" placeholder="Enter quiz duration in minutes"  onChange={(e) => setQuizDuration(e.target.value)} className="bg-white text-black p-2 w-full rounded-xl"/>

</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-[20px] p-2 w-full min-w-0">
<div className="border-3 border-red-700 rounded-2xl p-2 w-full min-w-0">

{addQuestion ? null : <div className="flex justify-end">
    <button className="bg-green-900 text-white p-2 rounded-xl text-xl font-bold max-w-full" onClick={()=>setAddQuestion(true)}>Add Question</button>
</div>}

{addQuestion ? (
  <div className="w-full min-w-0">

    <div className="w-full min-w-0">
      <label>Enter Question title</label>
      <input
        type="text"
        placeholder="Enter quiz title"
        value={newQuizTitle}
         onChange={(e)=>setNewQuizTitle(e.target.value)}
        className="bg-white text-black p-2 w-full rounded-xl"
      />
    </div>

    <div className="w-full min-w-0">
      <label>Enter Option A</label>
      <input
        type="text"
        placeholder="Enter option A"
        value={newQuizOptionA}
        onChange={(e)=>setNewQuizOptionA(e.target.value)}
        className="bg-white text-black p-2 w-full rounded-xl"
      />
    </div>

    <div className="w-full min-w-0">
      <label>Enter Option B</label>
      <input
        type="text"
        placeholder="Enter option B"
        value={newQuizOptionB}
         onChange={(e)=>setNewQuizOptionB(e.target.value)}
        className="bg-white text-black p-2 w-full rounded-xl"
      />
    </div>

    <div className="w-full min-w-0">
      <label>Enter Option C</label>
      <input
        type="text"
        placeholder="Enter option C"
        value={newQuizOptionC}
         onChange={(e)=>setNewQuizOptionC(e.target.value)}
        className="bg-white text-black p-2 w-full rounded-xl"
      />
    </div>

    <div className="w-full min-w-0">
      <label>Enter Option D</label>
      <input
        type="text"
        placeholder="Enter option D"
        value={newQuizOptionD}
         onChange={(e)=>setNewQuizOptionD(e.target.value)}
        className="bg-white text-black p-2 w-full rounded-xl"
      />
    </div>

    <div className="flex flex-col justify-between rounded bg-white mt-[10px] p-2 w-full min-w-0">
      <label className="bg-black text-white p-2">
        Select Answer
      </label>

      <select className="text-black p-2 rounded-xl w-full min-w-0" value={newQuizAnswer} onChange={(e)=>setnewQuizAnswer(e.target.value)}>
       <option value="">Select Answer</option>
        <option value="optionA">Option A</option>
        <option value="optionB">Option B</option>
        <option value="optionC">Option C</option>
        <option value="optionD">Option D</option>
      </select>
    </div>

    <div className="flex flex-wrap justify-between items-center gap-2 mt-[20px] p-2">
      <button className="bg-green-600 text-white p-2 font-bold rounded-2xl max-w-full" onClick={()=>addQuiz()}>Add Question</button>
      <button className="bg-red-500 text-white font-bold rounded-2xl p-2 max-w-full" onClick={()=>cancelQuestion()}>Cancel</button>
    </div>

  </div>
) : null}

</div>




<div className="border-3 border-red-700 rounded-2xl p-2 w-full min-w-0">
    <h2>Added Quizes</h2>
{quizes.length===0 && quizTitle !== null ? <h1 className="bg-red-600 text-white p-2 rounded-xl font-bold break-words">NO QUESTIONS KINDLY ADD QUESTIONS</h1> : 


quizes.map((subquiz,index)=>{
   
            return <div key={index} className="bg-white text-black mt-[10px] p-2 rounded w-full min-w-0 break-words">
                   <h3 className='font-bold break-words'>{`${index+1}:${subquiz.questionName}`}</h3>
                   <p className={`p-2 ${subquiz.answer==="optionA"?"bg-green-600 text-white":"text-black p-2"} break-words`}>{`A:${subquiz.optionA}`}</p>
                    <p className={`p-2 ${subquiz.answer==="optionB"?"bg-green-600 text-white":"text-black p-2"} break-words`}>{`B:${subquiz.optionB}`}</p>
                    <p className={`p-2 ${subquiz.answer==="optionC"?"bg-green-600 text-white":"text-black p-2"} break-words`}>{`C:${subquiz.optionC}`}</p>
                    <p className={`p-2 ${subquiz.answer==="optionD"?"bg-green-600 text-white":"text-black p-2"} break-words`}>{`D:${subquiz.optionD}`}</p>  
                    <div>
                     <div className="flex justify-between items-center mt-[20px] p-2">
     
      <button className="bg-red-500 text-white font-bold rounded-2xl p-2" onClick={()=>removeQuestion(index)}>Cancel</button>
    </div>

                    </div>
            
            </div>
})


}

<div className="flex flex-wrap justify-between items-center gap-2 mt-[20px] p-2">
      <button className="bg-green-600 text-white p-2 font-bold rounded-2xl max-w-full" onClick={()=> createQuiz()}>Create QUIZ</button>
      <button className="bg-red-500 text-white font-bold rounded-2xl p-2 max-w-full" >Cancel</button>
    </div>
</div>

</div>

</div>




)}
export default AddQuiz;
