"use client"
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserQuiz from "../../components/UserQuiz";
import { useEffect, useState } from "react";
import LoadingLoader from "../../components/LoadingLoader";

function HomePage({searchParams}) {
  const [all_quizes,setAllQuizes]=useState()
  const [quizes,setQuizes]=useState([])
  const  [id,SetId]=useState("")
  const  [name,SetName]=useState("")
  const [showLoader,setShowLoader]=useState(true)

  useEffect(()=>{
FetchRecords()

  },[])


async function FetchRecords(){
  //const { id, name } = await searchParams;
  setShowLoader(true)
  try{
  const userDetails=JSON.parse(localStorage.getItem("currentUser"))
  const backend_URL="/admin/api"
      SetId(userDetails.userId)
      SetName(userDetails.name)
   const response = await fetch(backend_URL, {
    cache: "no-store",
  });

const all_fetched_quizes = await response.json();
 
  setAllQuizes(all_fetched_quizes)
  setQuizes(all_fetched_quizes)
  setShowLoader(false)

}
 catch (error) {
    setShowLoader(false)
    console.error("Error fetching records:", error);
    return null;
  }
}

 function handleSearch(e){
if(e.target.value===""){
setQuizes(all_quizes)
}
else{
const filtered_quizes=quizes.filter((quiz)=>quiz.name.toLowerCase().contains(e.target.value.toLowerCase()))
setQuizes(filtered_quizes)

}}

  return (
    <div className="min-h-screen bg-slate-100">
      <ToastContainer />
      {showLoader ? <div><LoadingLoader title="Fetching Records" /></div> :(null)}
     {showLoader ? (null):(
      <header className="bg-slate-600 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-6 py-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-medium text-indigo-200">
              USER DASHBOARD
              </p>

              <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
                Welcome, {name} 👋
              </h1>

            
            </div>

            

          </div>
        </div>
      </header>

     )}
      
     {showLoader ? (null):( <main className="mx-auto max-w-7xl px-6 py-8">

      
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

         
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Quizzes
                </p>

                <p className="mt-2 text-4xl font-extrabold text-slate-900">
                  {quizes.length}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Quizzes available
                </p>
              </div>

             

            </div>
          </div>


     

         

        </div>


        {/* ================= SEARCH ================= */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

         


          <div className="flex w-full  items-center rounded-xl border border-slate-300 bg-white px-3 shadow-sm transition focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">

            <Image
              src="/search.png"
              width={22}
              height={22}
              alt="Search"
              className="mr-2 opacity-50"
            />

            <input
              type="text"
              placeholder="Search quizzes..."
              className="w-full bg-transparent px-2 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              onChange={(e)=>handleSearch()}
            />

          </div>

        </div>


        {/* ================= QUIZ LIST ================= */}

        {quizes.length === 0 ? (

          /* NO QUIZZES */
          <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm">

            <h3 className="mt-5 text-xl font-bold bg-red-500 text-white p-2 rounded">
              No quizzes Available
            </h3>

            

          </div>

        ) : (

          /* QUIZZES */
          <div className="flex flex-col gap-[20px]">

            {quizes.map((quiz, index) => (

            <UserQuiz key={index} index={index} quizname={quiz.quizname} quizid={quiz.quizid} creatorName={quiz.creatorName} createdDate={quiz.createdDate} durationMin={quiz.durationMin} attempts={quiz.attempts} results={quiz.results} userId={id}/>
       
            ))}

          </div>

        )}

      </main>
     )}
    </div>
  )
}

export default HomePage;