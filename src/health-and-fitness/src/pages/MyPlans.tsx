import examplePic from "../assets/workout/example_pic.png";
import { TfiCup } from "react-icons/tfi";
import { HiChartBar } from "react-icons/hi";
import { GiBiceps } from "react-icons/gi";
import WorkoutPlanSchedule from "../components/workout/WorkoutPlanSchedule";
import { LuFileCheck } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";
import { useState } from "react";

interface Plan {
  image: string;
  id: string;
  title: string;
  target: string;
  difficulty: string;
  goal: string;
  description: string;
}

function MyPlans() {
  const plans = [
    {
      image: examplePic,
      id: "1",
      title: "5 DAYS MUSCLE MASS SPLIT",
      target: "Abs",
      difficulty: "Intermediate",
      goal: "Maintain",
      description:
        "The 5 Day Muscle Mass Split routine by JefitTeam is a 7 day workout plan. It is a intermediate level plan to achieve bulking fitness goals.",
    },
    {
      image: examplePic,
      id: "2",
      title: "5 DAYS MUSCLE MASS SPLIT",
      target: "Abs",
      difficulty: "Intermediate",
      goal: "Maintain",
      description:
        "The 5 Day Muscle Mass Split routine by JefitTeam is a 7 day workout plan. It is a intermediate level plan to achieve bulking fitness goals.",
    },
    {
      image: examplePic,
      id: "3",
      title: "5 DAYS MUSCLE MASS SPLIT",
      target: "Abs",
      difficulty: "Intermediate",
      goal: "Maintain",
      description:
        "The 5 Day Muscle Mass Split routine by JefitTeam is a 7 day workout plan. It is a intermediate level plan to achieve bulking fitness goals.",
    },
    {
      image: examplePic,
      id: "4",
      title: "5 DAYS MUSCLE MASS SPLIT",
      target: "Abs",
      difficulty: "Intermediate",
      goal: "Maintain",
      description:
        "The 5 Day Muscle Mass Split routine by JefitTeam is a 7 day workout plan. It is a intermediate level plan to achieve bulking fitness goals.",
    },
    {
      image: examplePic,
      id: "5",
      title: "5 DAYS MUSCLE MASS SPLIT",
      target: "Abs",
      difficulty: "Intermediate",
      goal: "Maintain",
      description:
        "The 5 Day Muscle Mass Split routine by JefitTeam is a 7 day workout plan. It is a intermediate level plan to achieve bulking fitness goals.",
    },
  ];

  const [activePlanId, setActivePlanId] = useState(plans[0].id);
  const [viewingPlan, setViewingPlan] = useState(plans[0].id);

  const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    return (
      <div className="w-full bg-[#B2B2B2] rounded-xl p-3 mb-8 flex flex-col">
        <div
          className="group flex items-center justify-center bg-cover bg-center bg-no-repeat rounded-xl h-[16rem] w-full relative"
          style={{ backgroundImage: `url(${plan.image})` }}
        >
          <div className="absolute top-2 right-2 flex space-x-2">
            <button className="bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 py-1 px-2 rounded-xl">
              <LuFileCheck className="text-white text-2xl" />
            </button>
            <button className="bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 py-1 px-2 rounded-xl">
              <IoTrashOutline className="text-white text-2xl" />
            </button>
          </div>
        </div>
        <div className="flex flex-col ml-2 mt-6">
          <div className="flex flex-row justify-between">
            <h2 className="font-bebas uppercase text-black text-3xl">
              {plan.title}
            </h2>
            {activePlanId === plan.id && (
              <p className="bg-[#C73659] font-bebas px-2 py-1 text-xl text-[#B2B2B2] rounded-xl">
                Applied
              </p>
            )}
          </div>
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

          {isExpanded && (
            <div className="flex flex-col transition-all duration-300 ease-in-out">
              <h2 className="text-3xl font-bebas text-black mt-6">
                Plan description
              </h2>
              <p className="text-black text-xl mt-2 font-montserrat">
                {plan.description}
              </p>
            </div>
          )}

          <div className="flex justify-center items-center">
            {" "}
            <button
              onClick={toggleExpand}
              className="text-4xl -mb-8 font-bold bg-white border-2 w-10 h-8 pb-2 border-black text-black hover:text-[#A91D3A] transition-colors flex justify-center items-center"
            >
              {isExpanded ? "-" : "+"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CompactPlanCard: React.FC<{
    plan: Plan;
    onApply: (id: string) => void;
  }> = ({ plan, onApply }) => (
    <div
      className="w-full bg-[#686D76] rounded-xl p-3 cursor-pointer mb-8 flex flex-col"
      onClick={() => setViewingPlan(plan.id)}
    >
      <div
        className="group flex items-center justify-center bg-cover bg-center bg-no-repeat rounded-xl h-[16rem] w-full relative"
        style={{ backgroundImage: `url(${plan.image})` }}
      >
        <div className="absolute top-2 right-2 flex space-x-2">
          <button className="bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 py-1 px-2 rounded-xl">
            <LuFileCheck
              className="text-white text-2xl"
              onClick={() => onApply(plan.id)}
            />
          </button>
          <button className="bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 py-1 px-2 rounded-xl">
            <IoTrashOutline className="text-white text-2xl" />
          </button>
        </div>
      </div>
      <h2 className="font-bebas uppercase text-black text-2xl mt-2">
        {plan.title}
      </h2>
      {viewingPlan === plan.id && (
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
      )}
    </div>
  );
  
  // Using title as ID
  const sortedPlans = [...plans].sort((a, b) => {
    if (a.title === activePlanId) return -1;
    if (b.title === activePlanId) return 1;
    return 0;
  });

  return (
    <div className="grid grid-cols-[3fr_7fr] mx-8 pt-10">
      <div className="flex flex-col mx-3">
        <h1 className="font-bebas uppercase text-4xl text-[#F05454]">
          My plans
        </h1>
        <div className="mt-14 flex flex-col">
          {sortedPlans.map((plan) =>
            plan.id === activePlanId ? (
              <PlanCard key={plan.id} plan={plan} />
            ) : (
              <CompactPlanCard
                key={plan.id}
                plan={plan}
                onApply={setActivePlanId}
              />
            )
          )}
        </div>
      </div>

      <div className="flex flex-col mt-6 mx-2">
        <div className="flex justify-end">
          <button className="font-montserrat text-white text-2xl bg-[#A91D3A] rounded-xl px-5 py-2 w-[14%]">
            Edit
          </button>
        </div>
        <WorkoutPlanSchedule />
      </div>
    </div>
  );
}

export default MyPlans;
