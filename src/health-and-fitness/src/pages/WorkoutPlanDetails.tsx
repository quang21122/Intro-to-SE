import examplePic from "../assets/workout/example_pic.png";
import { TfiCup } from "react-icons/tfi";
import { HiChartBar } from "react-icons/hi";
import { GiMuscularTorso } from "react-icons/gi";
import { TbBarbell } from "react-icons/tb";
import { CiClock2 } from "react-icons/ci";
import exaplePic2 from "../assets/workout/examplePic2.png";
import { useState } from "react";

export default function WorkoutPlanDetails() {
  const [selectedDay, setSelectedDay] = useState(0);

  const plan = {
    image: examplePic,
    title: "5 DAYS MUSCLE MASS SPLIT",
    target: "Abs",
    difficulty: "Intermediate",
    goal: "Maintain",
    description:
      "The 5 Day Muscle Mass Split routine by JefitTeam is a 7 day workout plan. It is a intermediate level plan to achieve bulking fitness goals.",
  };

  const exercises = [
    {
      days: "Mon",
      title: 'Leg day',
      setTime: '12:00',
      numOfExercises: 4,
      exercises: [
        {
          title: "Barbell Squat",
          body: 'Upper Legs',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
        {
          title: "Leg Press",
          body: 'Upper Legs',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
        {
          title: "Leg Curl",
          body: 'Upper Legs',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
        {
          title: "Leg Extension",
          body: 'Upper Legs',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
      ],
    },

    {
      days: "Tue",
      title: 'Chest day',
      setTime: '12:00',
      numOfExercises: 4,
      exercises: [
        {
          title: "Barbell Bench Press",
          body: 'Chest',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
        {
          title: "Incline Dumbbell Press",
          body: 'Chest',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
        {
          title: "Chest Fly",
          body: 'Chest',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
        {
          title: "Push Up",
          body: 'Chest',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
      ],
    },

    {
      days: "Wed",
      title: 'Back day',
      setTime: '12:00',
      numOfExercises: 4,
      exercises: [
        {
          title: "Deadlift",
          body: 'Back',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
        {
          title: "Pull Up",
          body: 'Back',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
        {
          title: "Seated Row",
          body: 'Back',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
        {
          title: "Lat Pulldown",
          body: 'Back',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
      ],
    },

    {
      days: "Thu",
      title: 'Shoulder day',
      setTime: '12:00',
      numOfExercises: 4,
      exercises: [
        {
          title: "Military Press",
          body: 'Shoulder',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
        {
          title: "Lateral Raise",
          body: 'Shoulder',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
        {
          title: "Front Raise",
          body: 'Shoulder',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
        {
          title: "Reverse Fly",
          body: 'Shoulder',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
      ],
    },

    {
      days: "Fri",
      title: 'Arm day',
      setTime: '12:00',
      numOfExercises: 4,
      exercises: [
        {
          title: "Bicep Curl",
          body: 'Arm',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
        {
          title: "Tricep Extension",
          body: 'Arm',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
        {
          title: "Hammer Curl",
          body: 'Arm',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
        {
          title: "Tricep Dip",
          body: 'Arm',
          sets: 4,
          reps: '1, 2, 1, 2',
          intervals: '00:00',
          rest: '01:00'
        },
      ],
    },

    {
      days: "Sat",
      title: 'Rest day',
      setTime: '12:00',
      numOfExercises: 0,
      exercises: [

      ]
    },

    {
      days: "Sun",
      title: 'Rest day',
      setTime: '12:00',
      numOfExercises: 0,
      exercises: []
    }
  ];

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

      <div className="flex flex-col mt-6 mx-2">
        <div className="flex justify-end">
          <button className="font-montserrat text-white text-2xl bg-[#A91D3A] rounded-xl px-5 py-2 w-[14%]">
            Add Plan
          </button>
        </div>
        <div className="flex flex-col mt-6 font-montserrat">
          <div className="grid grid-cols-7">
            {exercises.map((exercises, index) => (
              <div
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`font-montserrat text-xl px-4 py-2 rounded-t-xl mx-0.5 flex justify-center items-center hover:cursor-pointer hover:bg-red-500 ${
                  selectedDay === index
                    ? "bg-[#C73659] text-white"
                    : "bg-[#686D76] text-white"
                }`}
              >
                <h2 className="text-2xl">{exercises.days}</h2>
              </div>
            ))}
          </div>

          <div className="bg-[#B2B2B2] p-6 mx-0.5">
            <div className="flex flex-col mt-2">
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
              <div className="flex flex-col mt-4 mx-4">
                {exercises[selectedDay].exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-[#D9D9D9] px-4 py-6 rounded-xl my-2"
                  >
                    <div className="grid grid-cols-[1fr_3fr_1.5fr_1.5fr_1.5fr_1.5fr] items-center">
                      <img src={exaplePic2} alt="" />
                      <div className="flex flex-col ml-5">
                        <h2 className="text-[1.4rem] text-black ml-4">
                          {exercise.title}
                        </h2>
                        <p className="text-xl text-[#686D76] ml-4">
                          {exercise.body}
                        </p>
                      </div>
                      <div className="flex flex-col items-center -mt-3">
                        <p className="text-2xl text-[#686D76]">
                          Sets
                        </p>
                        <p className="text-xl text-black">{exercise.sets}</p>
                      </div>
                      <div className="flex flex-col items-center -mt-3">
                        <p className="text-2xl text-[#686D76]">
                          Reps
                        </p>
                        <p className="text-xl text-black">{exercise.reps}</p>
                      </div>
                      <div className="flex flex-col items-center -mt-3">
                        <p className="text-2xl text-[#686D76]">
                          Intervals
                        </p>
                        <p className="text-xl text-black">{exercise.intervals}</p>
                      </div>
                      <div className="flex flex-col items-center -mt-3">
                        <p className="text-2xl text-[#686D76]">
                          Rest
                        </p>
                        <p className="text-xl text-black">{exercise.rest}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
