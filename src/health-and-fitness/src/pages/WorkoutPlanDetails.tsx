import examplePic from "../assets/workout/example_pic.png";
import { TfiCup } from "react-icons/tfi";
import { HiChartBar } from "react-icons/hi";
import { GiBiceps } from "react-icons/gi";
import WorkoutPlanSchedule from "../components/workout/WorkoutPlanSchedule";
import Navbar from "../components/Navbar";

export default function WorkoutPlanDetails() {
  const plan = {
    image: examplePic,
    title: "5 DAYS MUSCLE MASS SPLIT",
    target: "Abs",
    difficulty: "Intermediate",
    goal: "Maintain",
    description:
      "The 5 Day Muscle Mass Split routine by JefitTeam is a 7 day workout plan. It is a intermediate level plan to achieve bulking fitness goals.",
  };

  return (
    <div className="flex flex-col mx-24">
      <Navbar isHomepage={false} />
      <div className="grid grid-cols-[3fr_7fr] pt-10">
        <div className="flex flex-col mx-3">
          <h1 className="font-bebas uppercase text-4xl text-[#F05454]">
            Plan details
          </h1>
          <div className="w-full bg-[#B2B2B2] rounded-xl p-3 mt-14 flex flex-col">
            <img src={plan.image} alt="" />
            <div className="flex flex-col ml-2 mt-6">
              <h2 className="font-bebas uppercase text-black text-3xl">
                {plan.title}
              </h2>
              <div className="grid grid-cols-2 font-montserrat mt-3">
                <div className="text-2xl flex flex-row items-center my-2">
                  <TfiCup className="mr-4 text-[#A91D3A]" />
                  <p className="text-black">{plan.goal}</p>
                </div>
                <div className="text-2xl flex flex-row items-center">
                  <HiChartBar className="mr-4 text-[#A91D3A]" />
                  <p className="text-black">{plan.difficulty}</p>
                </div>
                <div className="text-2xl flex flex-row items-center">
                  <GiBiceps className="mr-4 text-[#A91D3A]" />
                  <p className="text-black">{plan.target}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-3xl font-bebas text-black mt-6">
                  Plan description
                </h2>
                <p className="text-black text-xl mt-2 font-montserrat">
                  {plan.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <div className="flex justify-end">
            <button className="font-montserrat text-white text-xl bg-[#A91D3A] rounded-xl px-5 py-2 w-[14%]">
              Add Plan
            </button>
          </div>
          <WorkoutPlanSchedule />
        </div>
      </div>
    </div>
  );
}
