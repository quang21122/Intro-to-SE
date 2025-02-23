import { TfiCup } from "react-icons/tfi";
import { HiChartBar } from "react-icons/hi";
import { GiBiceps } from "react-icons/gi";
import WorkoutPlanSchedule from "../components/workout/WorkoutPlanSchedule";
import { LuFileCheck } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";

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
  startTime: {
    hour: number;
    minute: number;
    flag: boolean;
  };
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
  myPlanDetails: PlanDetail[];
}

function MyPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [viewingPlan, setViewingPlan] = useState<Plan | null>(null);
  const [isAppyling, setIsAppyling] = useState<string | null>(null);
  const navigate = useNavigate();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    const fetchMyPlans = async () => {
      try {
        if (!user) {
          throw new Error("User is not authenticated");
        }

        const response = await fetch(
          `intro-to-se-server.vercel.app/api/myPlan?uid=${user.uid}`
        );

        if (!response.ok) {
          console.error(`Error fetching plans: ${response.status}`);
          setError(`Error fetching plans: ${response.status}`);
          return;
        }

        const userResponse = await fetch(
          `intro-to-se-server.vercel.app/api/user?userId=${user.uid}`
        );

        const userData = await userResponse.json();
        setIsAppyling(userData.user.appliedPlan);

        const data = await response.json();
        const plans = data.data.plans;
        // Fetch plan details for each plan
        interface PlanDetailResponse {
          data: {
            myPlan: {
              myPlanDetails: PlanDetail[];
            };
          };
        }

        const plansWithDetails: Plan[] = await Promise.all(
          plans.map(async (plan: Plan) => {
            const detailsResponse: Response = await fetch(
              `intro-to-se-server.vercel.app/api/myPlan?uid=${user.uid}&id=${plan.id}`
            );

            if (!detailsResponse.ok) {
              console.error(
                `Error fetching plan details: ${detailsResponse.status}`
              );
              return plan;
            }

            const detailsData: PlanDetailResponse =
              await detailsResponse.json();
            return {
              ...plan,
              myPlanDetails: detailsData.data.myPlan.myPlanDetails,
            };
          })
        );

        setPlans(plansWithDetails);

        if (plansWithDetails.length > 0) {
          setActivePlan(plansWithDetails[0]);
          setViewingPlan(plansWithDetails[0]);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        setError("Error fetching plans");
      } finally {
        setIsLoading(false);
      }
    };

    if (!user || loading) {
      return;
    }

    fetchMyPlans();
  }, [user, loading]);

  const PlanCard: React.FC<{
    plan: Plan;
    onApply: (id: string) => void;
  }> = ({ plan, onApply }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    const handleRemoveMyPlan = async (id: string) => {
      try {
        const response = await fetch(
          `intro-to-se-server.vercel.app/api/myPlan?uid=${user?.uid}&id=${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to remove plan: ${response.status}`);
        }

        const data = await response.json();
        if (data.status === 200) {
          const updatedPlans = plans.filter((plan) => plan.id !== id);
          setPlans(updatedPlans);
          setActivePlan(updatedPlans[0] || null);
          setViewingPlan(updatedPlans[0] || null);
        }
      } catch (error) {
        console.error("Error removing plan:", error);
      }
    };

    return (
      <div className="w-full bg-[#B2B2B2] rounded-xl p-3 mb-8 flex flex-col">
        <div
          className="group flex items-center justify-center bg-cover bg-center bg-no-repeat rounded-xl h-[16rem] w-full relative"
          style={{ backgroundImage: `url(${plan.image})` }}
        >
          <div className="absolute top-2 right-2 flex space-x-2">
            <button className="bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 py-1 px-2 rounded-xl" 
  aria-label="apply" 
  data-apply="true">
              <LuFileCheck
                className="text-white text-2xl"
                onClick={() => onApply(plan.id)}
                aria-label="apply"
              />
            </button>
            <button className="bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300 py-1 px-2 rounded-xl">
              <IoTrashOutline
                className="text-white text-2xl"
                onClick={async () => {
                  await handleRemoveMyPlan(plan.id);
                  window.location.reload();
                }}
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col ml-2 mt-6">
          <div className="flex flex-row justify-between">
            <h2 className="font-bebas uppercase text-black text-2xl">
              {plan.name}
            </h2>
            {isAppyling && isAppyling === plan.id && (
              <p className="bg-[#C73659] font-bebas px-2 py-1 text-lg text-[#B2B2B2] rounded-xl">
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
              <p className="text-black">{plan.level}</p>
            </div>
            <div className="text-2xl flex flex-row items-center">
              <GiBiceps className="mr-4 text-[#A91D3A]" />
              <p className="text-black">{plan.muscle}</p>
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
      onClick={() => setViewingPlan(plan)}
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
      <div className="flex flex-row justify-between mt-6">
        <h2 className="font-bebas uppercase text-black text-2xl">
          {plan.name}
        </h2>
        {isAppyling && isAppyling === plan.id && (
          <p className="bg-[#C73659] font-bebas px-2 py-1 text-lg text-[#B2B2B2] rounded-xl">
            Applied
          </p>
        )}
      </div>
      {viewingPlan && viewingPlan.id === plan.id && (
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
      )}
    </div>
  );

  // Using title as ID
  const sortedPlans = [...plans].sort((a, b) => {
    if (activePlan) {
      if (a.id === activePlan.id) return -1;
      if (b.id === activePlan.id) return 1;
    }
    return 0;
  });

  const handleApply = (id: string) => {
    const selectedPlan = plans.find((plan) => plan.id === id) || null;
    setIsAppyling(selectedPlan?.id || null);
    setActivePlan(selectedPlan);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col mx-24 py-2 min-h-screen">
      <div className="">
        <Navbar isHomepage={false} />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-gray-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-xl text-gray-700">Loading...</p>
          </div>
        </div>
      )}

      {!isLoading &&
        (sortedPlans.length === 0 ? (
          <div className="flex flex-col items-center mt-12 h-screen">
            <p className="text-2xl text-gray-600 font-montserrat mb-4">
              No plans added yet
            </p>
            <button
              className="bg-[#F05454] text-white px-6 py-2 rounded-xl hover:bg-opacity-80 transition-colors duration-300 font-montserrat"
              onClick={() => navigate("/workout-plans")}
            >
              Choose plan to add
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-[3fr_7fr] pt-10">
            <div className="flex flex-col mr-3">
              <h1 className="font-bebas uppercase text-4xl text-[#F05454]">
                My plans
              </h1>
              <div className="mt-14 flex flex-col">
                {sortedPlans.map((plan) =>
                  viewingPlan && plan.id === viewingPlan.id ? (
                    <PlanCard key={plan.id} plan={plan} onApply={handleApply} />
                  ) : (
                    <CompactPlanCard
                      key={plan.id}
                      plan={plan}
                      onApply={handleApply}
                    />
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col mt-6">
              <div className="flex justify-end space-x-4">
                <button
                  className="font-montserrat text-white text-2xl bg-[#A91D3A] rounded-xl px-5 py-2 hover:bg-opacity-80 transition-colors duration-300"
                  onClick={() => navigate("/workout-plans")}
                >
                  Add plan
                </button>
                <button
                  className="font-montserrat text-white text-2xl bg-[#A91D3A] rounded-xl px-5 py-2 w-[14%] hover:bg-opacity-80 transition-colors duration-300"
                  onClick={() =>
                    viewingPlan && navigate(`/my-plans-edit/${viewingPlan.id}`)
                  }
                >
                  Edit
                </button>
              </div>
              {activePlan && viewingPlan && (
                <WorkoutPlanSchedule planDetails={viewingPlan.myPlanDetails} />
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default MyPlans;
