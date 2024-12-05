import { useState } from "react";
import { TbBarbell } from "react-icons/tb";
import { CiClock2 } from "react-icons/ci";
import examplePic2 from "../../assets/workout/examplePic2.png";

function WorkoutPlanSchedule() {
  const [selectedDay, setSelectedDay] = useState(0);

  const exercises = [
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
  ];

  return (
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
                Exercises: {exercises[selectedDay].exercises.length}
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
            {exercises[selectedDay].exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex flex-col bg-[#D9D9D9] px-4 py-6 rounded-xl my-2"
              >
                <div className="grid grid-cols-[1fr_3fr_1.5fr_1.5fr_1.5fr_1.5fr] items-center">
                  <img src={examplePic2} alt="" />
                  <div className="flex flex-col ml-5">
                    <h2 className="text-[1.4rem] text-black ml-4">
                      {exercise.title}
                    </h2>
                    <p className="text-xl text-[#686D76] ml-4">
                      {exercise.body}
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
                    <p className="text-xl text-black">{exercise.intervals}</p>
                  </div>
                  <div className="flex flex-col items-center -mt-3">
                    <p className="text-2xl text-[#686D76]">Rest</p>
                    <p className="text-xl text-black">{exercise.rest}</p>
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
