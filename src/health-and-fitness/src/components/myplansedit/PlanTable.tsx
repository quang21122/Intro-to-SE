import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import ExerciseCard from "./ExerciseCard";
import { CiCirclePlus, CiClock2 } from "react-icons/ci";
import { TbBarbell } from "react-icons/tb";
import { TiTick } from "react-icons/ti";

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

interface PlanTableProps {
  plan: Plan;
  isAdding: boolean;
  setIsAdding: (value: boolean) => void;
}

const PlanTable: React.FC<PlanTableProps> = ({
  plan,
  isAdding,
  setIsAdding,
}) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const orderedDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Sort exercises based on day order
  const sortedPlanDetails = [...plan.myPlanDetails].sort((a, b) => {
    const dayA = orderedDays.indexOf(a.day);
    const dayB = orderedDays.indexOf(b.day);
    return dayA - dayB;
  });

  const [planDetails, setPlanDetails] = useState(sortedPlanDetails);
  const [isTick, setIsTick] = useState(
    planDetails[selectedDay].startTime?.flag ?? false
  );

  useEffect(() => {
    setIsTick(planDetails[selectedDay].startTime?.flag ?? false);
  }, [selectedDay, planDetails]);

  const handleDayValueChange = (field: keyof PlanDetail, value: string) => {
    const newPlanDetails = [...planDetails];
    if (field === "name") {
      newPlanDetails[selectedDay].name = value;
    }
    setPlanDetails(newPlanDetails);
  };

  const handleValueChange = (
    dayIndex: number,
    exerciseIndex: number,
    field: keyof ExerciseWithName,
    value: string
  ) => {
    const newPlanDetails = [...planDetails];
    newPlanDetails[dayIndex].exercises[exerciseIndex] = {
      ...newPlanDetails[dayIndex].exercises[exerciseIndex],
      [field]: value,
    };
    setPlanDetails(newPlanDetails);
  };

  const formatMinutes = (minutes: number) => {
    return minutes < 10 ? `0${minutes}` : minutes;
  };

  const formatHours = (seconds: number) => {
    return seconds < 10 ? `0${seconds}` : seconds;
  };

  const [localTime, setLocalTime] = useState({
    minutes: formatHours(planDetails[selectedDay].startTime?.hour || 0),
    seconds: formatMinutes(planDetails[selectedDay].startTime?.minute || 0),
  });

  const handleLocalMinutesChange = (value: string) => {
    setLocalTime((prev) => ({ ...prev, minutes: value }));
  };

  const handleLocalHoursChange = (value: string) => {
    setLocalTime((prev) => ({ ...prev, seconds: value }));
  };

  const handleMinutesBlur = () => {
    const minutes = Math.min(
      59,
      Math.max(0, parseInt(localTime.minutes.toString()) || 0)
    );
    handleLocalMinutesChange(minutes.toString());
  };

  const handleHoursBlur = () => {
    const hours = Math.min(
      24,
      Math.max(0, parseInt(localTime.seconds.toString()) || 0)
    );
    handleLocalHoursChange(hours.toString());
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const newPlanDetails = [...planDetails];
    const currentDayExercises = [...newPlanDetails[selectedDay].exercises];

    const [movedExercise] = currentDayExercises.splice(source.index, 1);
    currentDayExercises.splice(destination.index, 0, movedExercise);

    newPlanDetails[selectedDay] = {
      ...newPlanDetails[selectedDay],
      exercises: currentDayExercises,
    };

    setPlanDetails(newPlanDetails);
  };

  return (
    <div
      className={`flex flex-col font-montserrat ${isAdding ? "mt-16" : "mt-8"}`}
    >
      <div className="grid grid-cols-7">
        {planDetails.map((planDetail, index) => (
          <div
            key={index}
            onClick={() => setSelectedDay(index)}
            className={`font-montserrat text-xl px-4 py-2 rounded-t-xl mx-0.5 flex justify-center items-center cursor-pointer transition-colors hover:bg-red-500 ${
              selectedDay === index
                ? "bg-[#C73659] text-white"
                : "bg-[#686D76] text-white"
            }`}
          >
            <h2 className="text-2xl">{planDetail.day}</h2>
          </div>
        ))}
      </div>

      <div className="bg-[#B2B2B2] p-6 mx-0.5">
        <div className="flex flex-col mt-2">
          <div className="flex flex-row justify-between">
            <input
              type="text"
              value={planDetails[selectedDay].name}
              onChange={(e) => handleDayValueChange("name", e.target.value)}
              className="w-[40%] text-[4rem] text-black ml-2 font-bebas border-b border-gray-400 bg-[#CDCDCD] rounded-xl px-2 mb-4"
            />
            <div className="mt-12">
              <button
                className="flex flex-row items-center bg-black rounded-xl px-4 py-2 ml-32 mr-2 
                            transform transition-all duration-200 ease-in-out 
                              hover:scale-105 hover:bg-[#A91D3A] active:scale-95"
                onClick={() => {
                  setIsAdding(true);
                }}
              >
                <p className="text-white text-3xl">Add</p>
                <CiCirclePlus className="text-4xl text-white ml-3" />
              </button>
            </div>
          </div>
          <div className="flex flex-row justify-between font-montserrat ml-14 w-[80%]">
            <div className="flex flex-row items-center">
              <TbBarbell className="text-[#A91D3A] text-5xl mr-2" />
              <p className="text-[#686D76] text-2xl">
                Exercises: {planDetails[selectedDay].exercises.length}
              </p>
            </div>
            <div className="flex flex-row items-center mx-20">
              <CiClock2 className="text-[#A91D3A] text-5xl mr-2" />
              <p className="text-[#686D76] text-2xl mr-2">Set time:</p>
              <div className="flex items-center text-[#686D76]">
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={isTick ? localTime.seconds : ""}
                  onChange={(e) => handleLocalHoursChange(e.target.value)}
                  onBlur={handleHoursBlur}
                  disabled={!isTick}
                  className={`w-12 py-1 text-xl text-center bg-[#CDCDCD] rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                    !isTick
                      ? "opacity-50 cursor-not-allowed text-gray-500"
                      : "text-black"
                  }`}
                />
                <span className="mx-1 text-xl">:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={isTick ? localTime.minutes : ""}
                  onChange={(e) => handleLocalMinutesChange(e.target.value)}
                  onBlur={handleMinutesBlur}
                  disabled={!isTick}
                  className={`w-12 py-1 text-xl text-center bg-[#CDCDCD] rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                    !isTick
                      ? "opacity-50 cursor-not-allowed text-gray-500"
                      : "text-black"
                  }`}
                />

                <button
                  className={`mx-4 border-2 rounded-xl border-black hover:bg-white ${
                    isTick ? "" : "p-[0.938rem]"
                  }`}
                  onClick={() => setIsTick(!isTick)}
                >
                  {isTick && <TiTick className="text-3xl text-black" />}
                </button>
              </div>
            </div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={`day-${selectedDay}`}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {planDetails[selectedDay].exercises.map((exercise, index) => (
                    <ExerciseCard
                      key={`${selectedDay}-${exercise.id}-${index}`}
                      exercise={exercise}
                      index={index}
                      dayId={planDetails[selectedDay].day}
                      onValueChange={(field, value) =>
                        handleValueChange(
                          selectedDay,
                          index,
                          field as keyof ExerciseWithName,
                          value
                        )
                      }
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default PlanTable;
