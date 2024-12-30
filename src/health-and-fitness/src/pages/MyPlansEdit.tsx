import React, { useState, useEffect } from "react";
import { GrFormPrevious } from "react-icons/gr";
import PlanCard from "../components/myplansedit/PlanCard";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PlanTable from "../components/myplansedit/PlanTable";
import AddExerciseCard from "../components/myplansedit/AddExerciseCard";
import { useAuth } from "../hooks/useAuth";

interface Exercise {
  id: string;
  sets: number;
  reps: string;
  interval: string;
  restTime: string;
}

interface ExerciseWithName extends Exercise {
  name?: string;
  muscleName?: string;
  image?: string;
}

interface PlanDetail {
  day: string;
  exercises: ExerciseWithName[];
  name: string;
  startTime?: {
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

const MyPlansEdit: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlanDetailsLoading, setIsPlanDetailsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [selectedDay, setSelectedDay] = useState(0);

  const [planDetails, setPlanDetails] = useState([] as PlanDetail[]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchExerciseDetails = async (exerciseId: string) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/exercise?id=${exerciseId}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching exercise: ${response.status}`);
        }

        const data = await response.json();

        const muscleResponse = await fetch(
          `http://localhost:3000/api/muscle?id=${data.data.data.muscle}`
        );
        const muscleData = await muscleResponse.json();
        return {
          name: data.data.data.name,
          muscleName: muscleData.user.name,
          image: data.data.data.image,
        };
      } catch (error) {
        console.error(`Error fetching exercise details:`, error);
        return null;
      }
    };

    const fetchPlan = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `http://localhost:3000/api/myPlan?uid=${user.uid}`
          );

          if (!response.ok) {
            console.error(`Error fetching plan: ${response.status}`);
            return;
          }

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
                `http://localhost:3000/api/myPlan?uid=${user.uid}&id=${plan.id}`
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

          const plan = plansWithDetails.find((p: Plan) => p.id === id);
          if (plan) {
            const updatedPlan = {
              ...plan,
              myPlanDetails: await Promise.all(
                plan.myPlanDetails.map(async (detail: PlanDetail) => ({
                  ...detail,
                  exercises: await Promise.all(
                    detail.exercises.map(async (exercise: Exercise) => {
                      const exerciseDetails = await fetchExerciseDetails(
                        exercise.id
                      );
                      return {
                        ...exercise,
                        ...exerciseDetails,
                      };
                    })
                  ),
                }))
              ),
            };

            setPlan(updatedPlan);
          } else {
            console.error("Plan not found");
          }
        } catch (error) {
          console.error("Error fetching plan:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (!user || loading) {
      return;
    }
    (async () => fetchPlan())();
  }, [id, user, loading]);

  useEffect(() => {
    const orderedDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    if (plan && plan.myPlanDetails) {
      const sortedDetails = [...plan.myPlanDetails].sort((a, b) => {
        const dayA = orderedDays.indexOf(a.day);
        const dayB = orderedDays.indexOf(b.day);
        return dayA - dayB;
      });
      setPlanDetails(sortedDetails);
      setIsPlanDetailsLoading(false);
    }
  }, [plan]); // This will only run when `plan` changes

  const handleFinishEdit = async () => {
    if (!user || !plan) {
      return;
    }

    const response = await fetch(
      `http://localhost:3000/api/myPlan?uid=${user.uid}&id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plan),
      }
    );

    if (!response.ok) {
      console.error(`Error updating plan: ${response.status}`);
      return;
    }

    navigate("/my-plans"); // Adjust path based on your routing setup
  };

  const handleAddExercise = (exercise: Exercise, selectedDay: number) => {
    if (!plan) {
      return;
    }

    const updatedPlan = {
      ...plan,
      myPlanDetails: planDetails.map((detail) => {
        if (detail.day === plan.myPlanDetails[selectedDay].day) {
          return {
            ...detail,
            exercises: [...detail.exercises, exercise],
          };
        }
        return detail;
      }),
    };

    setPlan(updatedPlan);

    fetch(`http://localhost:3000/api/myPlan?uid=${user?.uid}&id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPlan),
    }).then((response) => {
      if (!response.ok) {
        console.error(`Error updating plan: ${response.status}`);
      }
      console.log("Exercise added successfully");
    });
  };

  if (isLoading || isPlanDetailsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-12 w-12 text-gray-500 mb-4"
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
          <p className="text-2xl font-bebas text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-24 h-full bg-[#232221] min-h-screen">
      <Navbar isHomepage={false} />
      <div className={`grid grid-cols-[3fr_7fr] pt-10`}>
        <div className="flex flex-col -ml-4">
          <div
            className="flex flex-row hover:cursor-pointer"
            onClick={() => navigate("/my-plans")}
          >
            <GrFormPrevious className="text-5xl text-[#F05454] cursor-pointer" />
            <h1 className="font-bebas uppercase text-5xl text-[#F05454] ml-2">
              My Plans
            </h1>
          </div>
          {!isAdding && <PlanCard id={id ?? ""} />}
        </div>

        <div className="flex flex-col mt-10 relative">
          <div className="flex justify-end">
            <button
              onClick={handleFinishEdit}
              className={`px-5 py-2 -mt-10 ${
                isAdding ? "w-[18%]" : "w-[16%]"
              } text-xl font-montserrat bg-[#A91D3A] text-white rounded-xl hover:opacity-80 duration-300`}
            >
              Finish edit
            </button>
          </div>

          <div className="relative">
            {/* PlanTable with slide transition */}
            <div
              className={`transition-transform duration-300 transform ${
                isAdding
                  ? "translate-x-[-52%] -mt-[3%] w-[100%] ml-[9%]"
                  : "translate-x-0"
              }`}
            >
              {planDetails.length > 0 && (
                <PlanTable
                  setPlan={setPlan}
                  isAdding={isAdding}
                  setIsAdding={setIsAdding}
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                  planDetails={planDetails}
                  setPlanDetails={setPlanDetails}
                />
              )}
            </div>

            {/* AddExerciseCard with slide-in */}
            <div
              className={`absolute top-0 right-0 transition-all duration-300 ease-in-out transform mt-3 w-[40%] ${
                isAdding
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
            >
              {isAdding && (
                <AddExerciseCard
                  setIsAdding={setIsAdding}
                  handleAddExercise={handleAddExercise}
                  selectedDay={selectedDay}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPlansEdit;
