import { TfiCup } from "react-icons/tfi";
import { HiChartBar } from "react-icons/hi";
import { GiBiceps } from "react-icons/gi";
import WorkoutPlanSchedule from "../components/workout/WorkoutPlanSchedule";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Exercise {
  id: string;
  interval: string;
  reps: string;
  restTime: string;
  sets: number;
}

interface PlanDetail {
  day: string;
  exercises: Exercise[];
  name: string;
}

interface Plan {
  id: string;
  name: string;
  image: string;
  muscle: string;
  level: string;
  goal: string;
  equipment: string;
  days: number;
  description: string;
  createdAt: string;
  planDetails: PlanDetail[];
}

interface PlanResponse {
  data: {
    plan: Plan;
    status: number;
  };
}

export default function WorkoutPlanDetails() {
  const { id } = useParams<{ id: string }>();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!id) {
        setError("Plan ID is required");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:3000/api/plan?id=${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 400) {
          throw new Error("Invalid plan ID provided");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: PlanResponse = await response.json();

        if (!result.data || !result.data.plan) {
          throw new Error("Invalid response format");
        }

        setPlan(result.data.plan);
      } catch (error) {
        console.error("Error fetching plan details:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch plan details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanDetails();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!plan) return <div>No plan found</div>;

  return (
    <div className="flex flex-col mx-24">
      <Navbar isHomepage={false} />
      <div className="grid grid-cols-[3fr_7fr] pt-10">
        <div className="flex flex-col mx-3">
          <h1 className="font-bebas uppercase text-4xl text-[#F05454]">
            Plan details
          </h1>
          <div className="w-full bg-[#B2B2B2] rounded-xl p-3 mt-14 flex flex-col">
            <img src={plan.image} alt="" className="rounded-xl" />
            <div className="flex flex-col ml-2 mt-6">
              <h2 className="font-bebas uppercase text-black text-3xl">
                {plan.name}
              </h2>
              <div className="grid grid-cols-2 font-montserrat mt-3">
                <div className="text-2xl flex flex-row items-center my-2">
                  <TfiCup className="mr-4 text-[#A91D3A]" />
                  <p className="text-black">{plan.goal}</p>
                </div>
                <div className="text-2xl flex flex-row items-center">
                  <HiChartBar className="mr-4 text-[#A91D3A]" />
                  <p className="text-black">{plan.level}</p>
                </div>
                <div className="text-2xl flex flex-row items-center">
                  <GiBiceps className="mr-4 text-[#A91D3A]" />
                  <p className="text-black">{plan.muscle}</p>
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
          <WorkoutPlanSchedule planDetails={plan.planDetails} />
        </div>
      </div>
    </div>
  );
}
