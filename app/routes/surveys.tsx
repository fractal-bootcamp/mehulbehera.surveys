import { Prisma } from "@prisma/client";
import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { prisma } from "../client";
import Navbar from "./navbar";

export async function loader() {
  const surveys = await prisma.survey.findMany({
    include: {
      questions: {
        include: {
          responses: true,
        },
      },
    },
  });
  console.log(surveys);
  return surveys;
}

function SurveyList() {
  let surveysToPrint = useLoaderData<typeof loader>();
  console.log(surveysToPrint);

  const questionsToPrint = surveysToPrint.map((survey) => survey.questions);
  console.log(questionsToPrint);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <ul>
        {surveysToPrint.map((survey) => (
          <li key={survey.id}>
            {survey.id.toString() +
              survey.questions.map((question) => question.text)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SurveyList;

/*<ul>
      {surveysToPrint.map((survey) => (
        <li key={survey.id}>{survey.id}</li>
      ))}
    </ul> */
