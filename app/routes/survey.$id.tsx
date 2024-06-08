import { Prisma, Question, Response } from "@prisma/client";
import { json, LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { prisma } from "../client";
import Navbar from "./navbar";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const survey = await prisma.survey.findUnique({
    where: {
      id: parseInt(params.id || ""),
    },
    include: {
      questions: {
        include: {
          responses: true,
        },
      },
    },
  });
  console.log(survey);
  return survey;
}

interface QuestionIncludingResponses extends Question {
  responses: Response[];
}

function Question({ question }: { question: QuestionIncludingResponses }) {
  return (
    <div>
      <div className="text-lg font-bold">{question.text}</div>
      {question.responses.map((response) => (
        <li key={response.id} className="list-disc ml-4">
          {response.text}
        </li>
      ))}
    </div>
  );
}

function SurveyList() {
  let survey = useLoaderData<typeof loader>();
  console.log(survey);

  const questionsToPrint = survey?.questions.map((question) => (
    <Question key={question.id} question={question} />
  ));
  console.log(questionsToPrint);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="w-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl">Survey: {survey?.id}</h1>

        <ul>{questionsToPrint}</ul>
      </div>
    </div>
  );
}

export default SurveyList;

/*<ul>
      {survey.map((survey) => (
        <li key={survey.id}>{survey.id}</li>
      ))}
    </ul> */
