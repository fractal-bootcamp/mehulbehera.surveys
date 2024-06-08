import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { Form } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "../client";
import Navbar from "./navbar";
import { Prisma } from "@prisma/client";
import SurveyList from "./surveylistpage";
import { useState } from "react";

export async function loader() {
  return null;
}

let sID = -1;

//CHECK IF THIS IS OK - THERE IS A DELAY
async function createSurvey() {
  const newSurvey = await prisma.survey.create({
    data: {},
  });

  let surveyID = newSurvey.id;
  sID = surveyID;
  console.log(newSurvey.id);

  return surveyID;
}

console.log("ran after");

let questionSet: string[] = [];
//let prismaQuestionSet = [];

/* Change page so when someone clicks create survey create a new prisma survey and add questions here */
export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();

  const addQuestionButton = data.get("addQ");
  const questionInBar = data.get("questionbar");
  const submitFormButton = data.get("submitF");

  // console.log("********Question Button *******");
  // console.log(addQuestionButton === null);
  // console.log("********Question Button *******");

  // console.log("********Submit Form*******");
  // console.log(submitFormButton === null);
  // console.log("********Submit Form*******");

  // console.log(questionInBar);

  //USER PRESSED SUBMIT FORM - TAKE USER TO SUCCESS PAGE
  if (addQuestionButton === null) {
  }

  //USER PRESSED ADD QUESTION
  if (submitFormButton === null) {
    console.log(sID);
    const question = data.get("questionbar")?.toString() || "";
    questionSet.push(question);
    const prismaQ = await prisma.question.create({
      data: {
        surveyId: sID,
        text: question,
      },
    });

    //prismaQuestionSet.push(prismaQ);
    //console.log(questionSet);
  }

  return null;
}

/*Add UseState to redo add questions on the page */
let questionID = 0;

async function deleteFromPrisma(surveyID: number, questionText: string) {
  const foundQuestion = await prisma.question.findFirst({
    where: {
      text: questionText,
      surveyId: surveyID,
    },
  });
  if (foundQuestion !== null) {
    const deleteQuestion = await prisma.question.delete(foundQuestion);
  }
}

export default function createsurveypage() {
  const data = useLoaderData<typeof loader>();
  const [questions, setQuestions] = useState([{ id: -1, text: "" }]);
  const [qBarText, setQBarText] = useState("");
  const surveyID = createSurvey();
  console.log(surveyID);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col h-screen">
        <Form className="m-auto flex flex-row" method="post" name="form">
          <input
            id="textBar"
            type="text"
            name="questionbar"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs "
            value={qBarText}
            onChange={(e) => setQBarText(e.target.value)}
          />
          <button
            className="btn"
            name="addQ"
            type="submit"
            onClick={() => {
              setQuestions([
                ...questions,
                { id: questionID++, text: qBarText },
              ]),
                setQBarText("");
            }}
          >
            Add Question
          </button>
          <button className="btn flex flex-row" name="submitF">
            Submit Form
          </button>
        </Form>
        <ul className="flex flex-col m-auto">
          {questions.map((question) => (
            <li key={question.id}>
              {question.text}
              {"  "}
              <button
                className="btn"
                onClick={() => {
                  setQuestions(questions.filter((q) => q.id !== question.id)),
                    deleteFromPrisma(question.text);
                  console.log(question.text);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
