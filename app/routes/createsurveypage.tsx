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

export async function action({ request }: ActionFunctionArgs) {
  const question = await request.formData();
  questionSet.push(question.get("questionbar")?.toString() || "");
  console.log(questionSet);

  let text1 = question.get("questionbar").toString();

  await prisma.question.create({
    data: {
      text: text1,
    },
  });

  return null;
}

async function addSurvey() {
  console.log(questionSet);
  const prismaQuestions = await questionSet.map((question) =>
    prisma.question.create({
      data: {
        text: question,
      },
    })
  );

  prisma.survey.create({
    data: {
      questions: prismaQuestions,
    },
  });

  //reset questionSet
  questionSet = [];
}

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
          <button className="btn" type="submit">
            Add Question
          </button>
        </Form>
        <button className="btn flex flex-row" onClick={addSurvey}>
          Submit Form
        </button>
      </div>
    </div>
  );
}
