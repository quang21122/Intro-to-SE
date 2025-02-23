import { useEffect, useState } from "react";
import { TbBarbell } from "react-icons/tb";

interface Exercise {
  id: string;
  interval: string;
  reps: string;
  restTime: string;
  sets: number;
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
  startTime: {
    hour: number;
    minute: number;
    flag: boolean;
  };
}

interface WorkoutPlanScheduleProps {
  planDetails: PlanDetail[];
}

function WorkoutPlanSchedule({ planDetails }: WorkoutPlanScheduleProps) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [exercisesWithNames, setExercisesWithNames] = useState<
    ExerciseWithName[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dayOrder = {
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
    SUN: 7,
  };

  const sortedPlanDetails = [...planDetails].sort((a, b) => {
    const dayA = dayOrder[a.day.toUpperCase() as keyof typeof dayOrder] || 8;
    const dayB = dayOrder[b.day.toUpperCase() as keyof typeof dayOrder] || 8;
    return dayA - dayB;
  });

  useEffect(() => {
    const fetchExerciseNames = async () => {
      if (!sortedPlanDetails?.[selectedDay]?.exercises?.length) {
        setExercisesWithNames([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const updatedExercises = await Promise.all(
          sortedPlanDetails[selectedDay].exercises.map(async (exercise) => {
            try {
              const response = await fetch(
                `intro-to-se-server.vercel.app/api/exercise?id=${exercise.id}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              const data = await response.json();

              if (!data?.data?.data?.name) {
                throw new Error("Invalid exercise data received");
              }

              const muscleResponse = await fetch(
                `intro-to-se-server.vercel.app/api/muscle?id=${data.data.data.muscle}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if (!muscleResponse.ok) {
                throw new Error(`HTTP error! status: ${muscleResponse.status}`);
              }

              const muscleData = await muscleResponse.json();

              return {
                ...exercise,
                name: data.data.data.name,
                muscleName: muscleData.user.name,
                image: data.data.data.image,
              };
            } catch (error) {
              console.error(`Error fetching exercise ${exercise.id}:`, error);
              return {
                ...exercise,
                name: "Unknown Exercise",
              };
            }
          })
        );

        if (updatedExercises.length === 0) {
          setError("No exercises found");
        }

        setExercisesWithNames(updatedExercises);
      } catch (error) {
        console.error("Error fetching exercise details:", error);
        setError("Failed to fetch exercise details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExerciseNames();
  }, [selectedDay, planDetails]);

  if (!planDetails || planDetails.length === 0) {
    return <div>No schedule available</div>;
  }

  if (isLoading)
    return (
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
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col mt-6 font-montserrat">
      <div className="grid grid-cols-7">
        {sortedPlanDetails.map((detail, index) => (
          <div
            key={index}
            onClick={() => setSelectedDay(index)}
            className={`font-montserrat text-xl px-4 py-2 rounded-t-xl mx-0.5 flex justify-center items-center hover:cursor-pointer hover:bg-red-500 ${
              selectedDay === index
                ? "bg-[#C73659] text-white"
                : "bg-[#686D76] text-white"
            }`}
          >
            <h2 className="text-2xl">{detail.day}</h2>
          </div>
        ))}
      </div>

      <div className="bg-[#B2B2B2] p-6 mx-0.5">
        <div className="flex flex-col mt-2">
          <h2 className="text-[4rem] text-black ml-4 font-bebas">
            {sortedPlanDetails[selectedDay].name}
          </h2>
          <div className="flex flex-row font-montserrat ml-14">
            <div className="flex flex-row items-center">
              <TbBarbell className="text-[#A91D3A] text-5xl mr-2" />
              <p className="text-[#686D76] text-2xl">
                Exercises: {sortedPlanDetails[selectedDay].exercises.length}
              </p>
            </div>
          </div>
          <div className="flex flex-col mt-4 mx-4">
            {exercisesWithNames.map((exercise) => (
              <div
                key={exercise.id}
                className="flex flex-col bg-[#D9D9D9] px-4 py-6 rounded-xl my-2"
              >
                <div className="grid grid-cols-[1fr_3fr_1.5fr_1.5fr_1.5fr_1.5fr] items-center">
                  <img
                    src={exercise.image}
                    alt=""
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="flex flex-col ml-5">
                    <h2 className="text-[1.2rem] text-black ml-4">
                      {exercise.name}
                    </h2>
                    <p className="text-1rem text-[#686D76] ml-4">
                      {exercise.muscleName}
                    </p>
                  </div>
                  <div className="flex flex-col items-center -mt-3">
                    <p className="text-2xl text-[#686D76]">Sets</p>
                    <p className="text-xl text-black">{exercise.sets}</p>
                  </div>
                  <div className="flex flex-col items-center -mt-3">
                    <p className="text-2xl text-[#686D76]">Reps</p>
                    <p className="text-xl text-black">{exercise.reps}</p>
                  </div>
                  <div className="flex flex-col items-center -mt-3">
                    <p className="text-2xl text-[#686D76]">Intervals</p>
                    <p className="text-xl text-black">{exercise.interval}</p>
                  </div>
                  <div className="flex flex-col items-center -mt-3">
                    <p className="text-2xl text-[#686D76]">Rest</p>
                    <p className="text-xl text-black">{exercise.restTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutPlanSchedule;
