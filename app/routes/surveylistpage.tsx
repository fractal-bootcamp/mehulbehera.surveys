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

      <ul className="h-screen flex flex-col items-center justify-center">
        {surveysToPrint.map((survey) => (
          <li key={survey.id}>
            <a href={`/survey/${survey.id}`} className="btn ">
              Survey {survey.id}
            </a>
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
