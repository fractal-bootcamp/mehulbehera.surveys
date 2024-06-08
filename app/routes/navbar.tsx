import { prisma } from "../client";

let id = 0;

async function createSurveyInDatabase() {
  console.log("ran before");
  const newSurvey = await prisma.survey.create({
    data: {},
  });

  id = newSurvey.id;
  console.log("ran after");
  console.log(id);
  console.log(newSurvey);
}

function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start"></div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/surveylistpage">Survey List</a>
          </li>
          <li>
            <a href="/createsurveypage">Create Survey</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}

export default Navbar;
