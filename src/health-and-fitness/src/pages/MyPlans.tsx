import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd"; // Using more stable fork
import examplePic from "../assets/workout/example_pic.png";
import exaplePic2 from "../assets/workout/examplePic2.png";
import { TfiCup } from "react-icons/tfi";
import { HiChartBar } from "react-icons/hi";
import { GiMuscularTorso } from "react-icons/gi";
import { TbBarbell } from "react-icons/tb";
import { CiClock2 } from "react-icons/ci";

interface Exercise {
  id: string;
  title: string;
  body: string;
  sets: number;
  reps: string;
  intervals: string;
  rest: string;
}

interface DayWorkout {
  days: string;
  title: string;
  setTime: string;
  numOfExercises: number;
  exercises: Exercise[];
}

const MyPlans: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [exercises, setExercises] = useState<DayWorkout[]>([
    {
      days: "Mon",
      title: "Chest & Triceps",
      setTime: "45:00",
      numOfExercises: 6,
      exercises: [
        {
          id: "chest-1",
          title: "Bench Press",
          body: "Chest",
          sets: 4,
          reps: "8, 10, 12, 10",
          intervals: "00:00",
          rest: "01:30",
        },
        {
          id: "chest-2",
          title: "Incline Dumbbell Press",
          body: "Upper Chest",
          sets: 3,
          reps: "12, 10, 8",
          intervals: "00:00",
          rest: "01:30",
        },
        {
          id: "chest-3",
          title: "Dips",
          body: "Lower Chest",
          sets: 3,
          reps: "12, 12, 12",
          intervals: "00:00",
          rest: "01:00",
        },
        {
          id: "tri-1",
          title: "Triceps Pushdown",
          body: "Triceps",
          sets: 3,
          reps: "15, 12, 10",
          intervals: "00:00",
          rest: "01:00",
        },
      ],
    },
    {
      days: "Tue",
      title: "Back & Biceps",
      setTime: "50:00",
      numOfExercises: 6,
      exercises: [
        {
          id: "back-1",
          title: "Deadlift",
          body: "Back",
          sets: 4,
          reps: "8, 6, 6, 4",
          intervals: "00:00",
          rest: "02:00",
        },
        {
          id: "back-2",
          title: "Pull-ups",
          body: "Upper Back",
          sets: 3,
          reps: "10, 8, 8",
          intervals: "00:00",
          rest: "01:30",
        },
        {
          id: "back-3",
          title: "Barbell Row",
          body: "Middle Back",
          sets: 3,
          reps: "12, 10, 8",
          intervals: "00:00",
          rest: "01:30",
        },
        {
          id: "bi-1",
          title: "Barbell Curl",
          body: "Biceps",
          sets: 3,
          reps: "12, 10, 8",
          intervals: "00:00",
          rest: "01:00",
        },
      ],
    },
    {
      days: "Wed",
      title: "Legs & Core",
      setTime: "55:00",
      numOfExercises: 5,
      exercises: [
        {
          id: "legs-1",
          title: "Squats",
          body: "Quadriceps",
          sets: 4,
          reps: "10, 8, 8, 6",
          intervals: "00:00",
          rest: "02:00",
        },
        {
          id: "legs-2",
          title: "Romanian Deadlift",
          body: "Hamstrings",
          sets: 3,
          reps: "12, 10, 8",
          intervals: "00:00",
          rest: "01:30",
        },
        {
          id: "legs-3",
          title: "Calf Raises",
          body: "Calves",
          sets: 4,
          reps: "15, 15, 15, 15",
          intervals: "00:00",
          rest: "01:00",
        },
        {
          id: "core-1",
          title: "Planks",
          body: "Core",
          sets: 3,
          reps: "01:00",
          intervals: "00:00",
          rest: "01:00",
        },
      ],
    },
    {
      days: "Thu",
      title: "Shoulders & Arms",
      setTime: "45:00",
      numOfExercises: 6,
      exercises: [
        {
          id: "shoulder-1",
          title: "Military Press",
          body: "Shoulders",
          sets: 4,
          reps: "10, 8, 8, 6",
          intervals: "00:00",
          rest: "01:30",
        },
        {
          id: "shoulder-2",
          title: "Lateral Raises",
          body: "Side Deltoids",
          sets: 3,
          reps: "12, 12, 12",
          intervals: "00:00",
          rest: "01:00",
        },
        {
          id: "arm-1",
          title: "Hammer Curls",
          body: "Biceps",
          sets: 3,
          reps: "12, 10, 8",
          intervals: "00:00",
          rest: "01:00",
        },
        {
          id: "arm-2",
          title: "Skull Crushers",
          body: "Triceps",
          sets: 3,
          reps: "12, 10, 8",
          intervals: "00:00",
          rest: "01:00",
        },
      ],
    },
    {
      days: "Fri",
      title: "Full Body",
      setTime: "60:00",
      numOfExercises: 5,
      exercises: [
        {
          id: "full-1",
          title: "Clean and Press",
          body: "Full Body",
          sets: 4,
          reps: "8, 6, 6, 4",
          intervals: "00:00",
          rest: "02:00",
        },
        {
          id: "full-2",
          title: "Pull-ups",
          body: "Back",
          sets: 3,
          reps: "10, 8, 6",
          intervals: "00:00",
          rest: "01:30",
        },
        {
          id: "full-3",
          title: "Push-ups",
          body: "Chest",
          sets: 3,
          reps: "15, 12, 10",
          intervals: "00:00",
          rest: "01:00",
        },
        {
          id: "full-4",
          title: "Bodyweight Squats",
          body: "Legs",
          sets: 3,
          reps: "20, 15, 15",
          intervals: "00:00",
          rest: "01:30",
        },
      ],
    },

    {
      days: "Sat",
      title: "Active Recovery",
      setTime: "30:00",
      numOfExercises: 4,
      exercises: [
        {
          id: "recovery-1",
          title: "Light Jogging",
          body: "Cardio",
          sets: 1,
          reps: "15 minutes",
          intervals: "00:00",
          rest: "00:00",
        },
        {
          id: "recovery-2",
          title: "Dynamic Stretching",
          body: "Full Body",
          sets: 2,
          reps: "10 each side",
          intervals: "00:00",
          rest: "00:30",
        },
        {
          id: "recovery-3",
          title: "Foam Rolling",
          body: "Full Body",
          sets: 1,
          reps: "5 minutes",
          intervals: "00:00",
          rest: "00:00",
        },
        {
          id: "recovery-4",
          title: "Yoga Flow",
          body: "Full Body",
          sets: 1,
          reps: "10 minutes",
          intervals: "00:00",
          rest: "00:00",
        },
      ],
    },
    {
      days: "Sun",
      title: "Rest Day",
      setTime: "00:00",
      numOfExercises: 0,
      exercises: [], // Empty array for rest day
    },
  ]);

  const plan = {
    image: examplePic,
    title: "5 DAYS MUSCLE MASS SPLIT",
    target: "Abs",
    difficulty: "Intermediate",
    goal: "Maintain",
    description:
      "The 5 Day Muscle Mass Split routine by JefitTeam is a 7 day workout plan. It is a intermediate level plan to achieve bulking fitness goals.",
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If dropped outside droppable area or same position
    if (
      !destination ||
      (source.index === destination.index &&
        source.droppableId === destination.droppableId)
    ) {
      return;
    }

    const newExercises = [...exercises];
    const dayExercises = [...newExercises[selectedDay].exercises];
    const [movedExercise] = dayExercises.splice(source.index, 1);
    dayExercises.splice(destination.index, 0, movedExercise);

    newExercises[selectedDay] = {
      ...newExercises[selectedDay],
      exercises: dayExercises,
    };

    setExercises(newExercises);
  };

  const ExerciseCard: React.FC<{ exercise: Exercise; index: number }> = ({
    exercise,
    index,
  }) => (
    <Draggable draggableId={exercise.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex flex-col bg-[#D9D9D9] px-4 py-6 mt-6 mx-2 rounded-xl transition-colors ${
            snapshot.isDragging ? "bg-opacity-70 shadow-lg" : ""
          }`}
        >
          <div className="grid grid-cols-[1fr_3fr_1.5fr_1.5fr_1.5fr_1.5fr] items-center">
            <img
              src={exaplePic2}
              alt=""
            />
            <div className="flex flex-col ml-5">
              <h2 className="text-[1.4rem] text-black ml-4">
                {exercise.title}
              </h2>
              <p className="text-xl text-[#686D76] ml-4">{exercise.body}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl text-[#686D76]">Sets</p>
              <p className="text-xl text-black">{exercise.sets}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl text-[#686D76]">Reps</p>
              <p className="text-xl text-black">{exercise.reps}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl text-[#686D76]">Intervals</p>
              <p className="text-xl text-black">{exercise.intervals}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl text-[#686D76]">Rest</p>
              <p className="text-xl text-black">{exercise.rest}</p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );

  return (
    <div className="grid grid-cols-[3fr_7fr] mx-8 pt-10">
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
                <GiMuscularTorso className="mr-4 text-[#A91D3A]" />
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

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col mt-6 mx-2">
          <div className="flex justify-end">
            <button className="font-montserrat text-white text-2xl bg-[#A91D3A] rounded-xl px-5 py-2 w-[14%]">
              Add Plan
            </button>
          </div>
          <div className="flex flex-col mt-6 mx-2 font-montserrat">
            <div className="grid grid-cols-7">
              {exercises.map((exercise, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={`font-montserrat text-xl px-4 py-2 rounded-t-xl mx-0.5 flex justify-center items-center cursor-pointer transition-colors hover:bg-red-500 ${
                    selectedDay === index
                      ? "bg-[#C73659] text-white"
                      : "bg-[#686D76] text-white"
                  }`}
                >
                  <h2 className="text-2xl">{exercise.days}</h2>
                </div>
              ))}
            </div>

            <div className="bg-[#B2B2B2] p-6 mx-0.5">
              <h2 className="text-[4rem] text-black ml-4 font-bebas">
                {exercises[selectedDay].title}
              </h2>
              <div className="flex flex-row font-montserrat ml-14">
                <div className="flex flex-row items-center">
                  <TbBarbell className="text-[#A91D3A] text-5xl mr-2" />
                  <p className="text-[#686D76] text-2xl">
                    Exercises: {exercises[selectedDay].numOfExercises}
                  </p>
                </div>
                <div className="flex flex-row items-center mx-24">
                  <CiClock2 className="text-[#A91D3A] text-5xl mr-2" />
                  <p className="text-[#686D76] text-2xl">
                    Set time: {exercises[selectedDay].setTime}
                  </p>
                </div>
              </div>

              <Droppable droppableId={`day-${selectedDay}`}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col space-y-4"
                  >
                    {exercises[selectedDay].exercises.map((exercise, index) => (
                      <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default MyPlans;
