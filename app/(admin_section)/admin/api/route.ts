import {db} from "../../../config/firebase.js"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
   where,
   setDoc,
} from 'firebase/firestore';

const usersCollectionRef = collection(db, 'QuizAppUsers');
const quizRecordsCollectionRef=collection(db,"QuizAppQuizRecords");
const quizesCollectionRef=collection(db,"QuizAppQuizes");


export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "QuizAppQuizRecords"));

    const quizes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
 
    return Response.json(quizes);
  } catch (error) {
    console.error("Error fetching quizes:", error);

    return Response.json(
      { error: "Failed to fetch quizes" },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const docRef = await addDoc(collection(db, "QuizAppQuizRecords"), {
        quizid: body.quizid,
        quizname: body.quizname,
        creatorId: body.creatorId,
        creatorName: body.creatorName,
        createdDate: body.createdDate,
        durationMin: body.durationMin,
        attempts:body.attempts,
        results:body.results

    });
  const quizes=body.quizes;

   for(let i=0;i<quizes.length;i++)
   {
    await addDoc(quizesCollectionRef,{

    questionId:quizes[i].questionId,
  questionName:quizes[i].questionName,
  quizid:quizes[i].quizid,
  quizname:quizes[i].quizname,
  optionA:quizes[i].optionA,
  optionB:quizes[i].optionB,
  optionC:quizes[i].optionC,
  optionD:quizes[i].optionD,
  answer:quizes[i].answer
})}

    return Response.json(
      {
        message: "QUIZ created successfully",
        id: docRef.id,
        status: 201
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Error,Failed to create QUIZ",status: 500 },
      { status: 500 }
    );
  }
}


export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const quizDocId = body.id;

    if (!quizDocId) {
      return Response.json(
        { error: "Quiz document ID is required" },
        { status: 400 }
      );
    }

    const quizRef = doc(
      db,
      "QuizAppQuizRecords",
      quizDocId
    );

    await setDoc(quizRef, {
      quizid: body.quizid,
      quizname: body.quizname,
      creatorId: body.creatorId,
      creatorName: body.creatorName,
      createdDate: body.createdDate,
      durationMin: body.durationMin,
      attempts: body.attempts,
      results: body.results,
    });

    return Response.json(
      { message: "QUIZ replaced successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("PUT ERROR:", error);

    return Response.json(
      {
        error: "Failed to replace QUIZ",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}


/*
export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const quizId = body.id;

    if (!quizId) {
      return Response.json(
        { error: "Quiz document ID is required" },
        { status: 400 }
      );
    }

    await deleteDoc(doc(db, "QuizAppQuizRecords", quizId));

    return Response.json({
      message: "QUIZ deleted successfully",
      id: quizId,
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    return Response.json(
      {
        error: "Failed to delete QUIZ",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
  */

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const quizId = body.id;

    if (!quizId) {
      return Response.json(
        { error: "Quiz document ID is required" },
        { status: 400 }
      );
    }

    // Delete the quiz
    await deleteDoc(doc(db, "QuizAppQuizRecords", quizId));

    // Query the remaining quizzes
    const querySnapshot = await getDocs(
      collection(db, "QuizAppQuizRecords")
    );

    const quizes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Return remaining quizzes
    return Response.json({
      message: "QUIZ deleted successfully",
      deletedId: quizId,
      quizes: quizes,
      status:201
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return Response.json(
      {
        message: "Error,Failed to delete QUIZ",
        details:error instanceof Error ? error.message : String(error),
        status:500
      },
    
      { status: 500 }
    );
  }
}