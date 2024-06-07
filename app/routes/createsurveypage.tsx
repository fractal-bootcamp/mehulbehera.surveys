import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { Form } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "../client";
import Navbar from "./navbar";
import { Prisma } from "@prisma/client";
import SurveyList from "./surveylistpage";

export async function loader() {
  return null;
}

let questionSet: string[] = [];
//let prismaQuestionSet = [];

/* Change page so when someone clicks create survey create a new prisma survey and add questions here */
export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();

  const addQuestionButton = data.get("addQ");
  const questionInBar = data.get("questionbar");
  const submitFormButton = data.get("submitF");

  console.log("********Question Button *******");
  console.log(addQuestionButton === null);
  console.log("********Question Button *******");

  console.log("********Submit Form*******");
  console.log(submitFormButton === null);
  console.log("********Submit Form*******");

  console.log(questionInBar);

  //USER PRESSED SUBMIT FORM
  if (addQuestionButton === null) {
    questionSet = [];
    await prisma.survey.create({
      data: {
        questions: prismaQuestionSet,
      },
    });
  }

  //USER PRESSED ADD QUESTION
  if (submitFormButton === null) {
    const question = data.get("questionbar").toString();
    questionSet.push(question);
    const prismaQ = await prisma.question.create({
      data: {
        text: question,
      },
    });
    //prismaQuestionSet.push(prismaQ);
    console.log(questionSet);
  }

  return null;
}

/*let text1 = data.get("questionbar").toString();

  await prisma.question.create({
    data: {
      text: text1,
    },
  }); */

async function addSurvey() {
  console.log(questionSet);
  const prismaQuestions = await questionSet.map((question) =>
    prisma.question.create({
      data: {
        text: question,
      },
    })
  );

  //reset questionSet
  questionSet = [];
}

/*Add UseState to redo add questions on the page */

export default function createsurveypage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-row h-screen">
        <Form className="m-auto flex flex-row" reloadDocument method="post">
          <input
            type="text"
            name="questionbar"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs "
          />
          <button className="btn" name="addQ" type="submit">
            Add Question
          </button>
          <button
            className="btn flex flex-row"
            name="submitF"
            onClick={addSurvey}
          >
            Submit Form
          </button>
        </Form>
      </div>
    </div>
  );
}
