import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd"; // Using more stable fork
import examplePic from "../assets/workout/example_pic.png";
import examplePic2 from "../assets/workout/examplePic2.png";
import { TfiCup } from "react-icons/tfi";
import { HiChartBar } from "react-icons/hi";
import { TbBarbell } from "react-icons/tb";
import { CiClock2 } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { CiCirclePlus } from "react-icons/ci";
import { GrFormPrevious } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
// import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

type ExerciseField = "sets" | "reps" | "intervals" | "rest";
type DayField = "title";
type Difficulty = "Beginner" | "Intermediate" | "Advanced";
type Goal = "Maintain" | "Bulk" | "Cut" | "Strength";

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
  setTime: {
    minutes: number;
    seconds: number;
  };
  numOfExercises: number;
  exercises: Exercise[];
}

const MyPlansEdit: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [exercises, setExercises] = useState<DayWorkout[]>([
    {
      days: "Mon",
      title: "Chest & Triceps",
      setTime: {
        minutes: 50,
        seconds: 0,
      },
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
      setTime: {
        minutes: 50,
        seconds: 0,
      },
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
      setTime: {
        minutes: 50,
        seconds: 0,
      },
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
      setTime: {
        minutes: 50,
        seconds: 0,
      },
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
      setTime: {
        minutes: 50,
        seconds: 0,
      },
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
      setTime: {
        minutes: 30,
        seconds: 0,
      },
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
      setTime: {
        minutes: 0,
        seconds: 0,
      },
      numOfExercises: 0,
      exercises: [], // Empty array for rest day
    },
  ]);
  const [isAdding, setIsAdding] = useState(false);

  const plan = {
    image: examplePic,
    title: "5 DAYS MUSCLE MASS SPLIT",
    target: "Abs",
    difficulty: "Intermediate",
    goal: "Maintain",
    description:
      "The 5 Day Muscle Mass Split routine by JefitTeam is a 7 day workout plan. It is a intermediate level plan to achieve bulking fitness goals.",
  };

  const [planDetails, setPlanDetails] = useState({
    title: plan.title,
    difficulty: plan.difficulty as Difficulty,
    goal: plan.goal as Goal,
    description: plan.description,
  });

  const difficultyOptions: Difficulty[] = [
    "Beginner",
    "Intermediate",
    "Advanced",
  ];
  const goalOptions: Goal[] = ["Maintain", "Bulk", "Cut", "Strength"];

  const PlanCard = () => {
    const [activeDifficulty, setActiveDifficulty] = useState(
      planDetails.difficulty
    );
    const [activeGoal, setActiveGoal] = useState(planDetails.goal);

    const handleDifficultyChange = (difficulty: Difficulty) => {
      setActiveDifficulty(difficulty);
      setPlanDetails((prev) => ({ ...prev, difficulty }));
    };

    const handleGoalChange = (goal: Goal) => {
      setActiveGoal(goal);
      setPlanDetails((prev) => ({ ...prev, goal }));
    };

    const handleTitleChange = (value: string) => {
      setPlanDetails((prev) => ({ ...prev, title: value }));
    };

    const handleDescriptionChange = (value: string) => {
      setPlanDetails((prev) => ({ ...prev, description: value }));
    };

    return (
      <div className="flex flex-col mt-4 mx-4">
        <div className="w-full bg-[#B2B2B2] rounded-xl p-3 mt-14 flex flex-col">
          <img src={plan.image} alt="" />
          <div className="flex flex-col ml-2 mt-6">
            <div className="flex flex-row items-center justify-between">
              <input
                type="text"
                value={planDetails.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-[75%] font-bebas uppercase text-black text-3xl py-1 px-2 rounded-xl bg-[#D9D9D9] border border-gray-400 focus:outline-none"
                autoFocus
              />
              <p className="bg-[#C73659] font-bebas px-2 py-1 text-2xl text-[#B2B2B2] rounded-xl">
                Applied
              </p>
            </div>

            <div className="flex flex-col font-montserrat mt-3">
              <div className="flex flex-col">
                <div className="text-2xl flex flex-row items-center">
                  <TfiCup className="mr-4 text-[#A91D3A]" />
                  <p className="text-black">Goal</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {goalOptions.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => handleGoalChange(goal)}
                      className={`text-black text-[1.1rem] my-2 py-2 rounded-xl ${
                        activeGoal === goal
                          ? "bg-[#C73659] text-white"
                          : "bg-[#D9D9D9]"
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col mt-4">
                <div className="text-2xl flex flex-row items-center">
                  <HiChartBar className="mr-4 text-[#A91D3A]" />
                  <p className="text-black">Level</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {difficultyOptions.map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => handleDifficultyChange(difficulty)}
                      className={`text-black text-[1.1rem] my-2 py-2 rounded-xl ${
                        activeDifficulty === difficulty
                          ? "bg-[#C73659] text-white"
                          : "bg-[#D9D9D9]"
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <h2 className="text-3xl font-bebas text-black mt-6">
                Plan description
              </h2>
              <textarea
                value={planDetails.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                className="text-black text-xl mt-2 font-montserrat bg-[#D9D9D9] rounded-xl p-2 focus:outline-none"
                rows={6}
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const navigate = useNavigate();

  const handleFinishEdit = () => {
    navigate("/my-plans"); // Adjust path based on your routing setup
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Create a new copy of the exercises array
    const newExercises = [...exercises];

    // Get the exercises for the selected day
    const dayExercises = [...newExercises[selectedDay].exercises];

    // Reorder the exercises
    const [reorderedItem] = dayExercises.splice(sourceIndex, 1);
    dayExercises.splice(destinationIndex, 0, reorderedItem);

    // Update the exercises for the selected day
    newExercises[selectedDay] = {
      ...newExercises[selectedDay],
      exercises: dayExercises,
    };

    // Update state with the new order
    setExercises(newExercises);
  };

  const ExerciseCard: React.FC<{
    exercise: Exercise;
    index: number;
    onValueChange: (field: ExerciseField, value: string) => void;
  }> = ({ exercise, index, onValueChange }) => {
    const [localValues, setLocalValues] = useState({
      sets: exercise.sets.toString(),
      reps: exercise.reps,
      intervals: exercise.intervals,
      rest: exercise.rest,
    });

    const handleLocalChange = (field: ExerciseField, value: string) => {
      setLocalValues((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

    const handleBlur = (field: ExerciseField) => {
      onValueChange(field, localValues[field]);
    };

    return (
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
            <div className="grid grid-cols-[1fr_3fr_1fr_1.5fr_1.5fr_1.5fr_0.5fr] items-center">
              <img src={examplePic2} alt="" />
              <div className="flex flex-col ml-5">
                <h2 className="text-[1.4rem] text-black ml-4">
                  {exercise.title}
                </h2>
                <p className="text-xl text-[#686D76] ml-4">{exercise.body}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl text-[#686D76]">Sets</p>
                <input
                  type="number"
                  value={localValues.sets}
                  onChange={(e) => handleLocalChange("sets", e.target.value)}
                  onBlur={() => handleBlur("sets")}
                  className="w-16 py-1 text-xl text-black text-center bg-[#CDCDCD] rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl text-[#686D76]">Reps</p>
                <input
                  type="text"
                  value={localValues.reps}
                  onChange={(e) => handleLocalChange("reps", e.target.value)}
                  onBlur={() => handleBlur("reps")}
                  className="w-32 py-1 text-xl text-black text-center bg-[#CDCDCD] rounded-xl"
                />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl text-[#686D76]">Intervals</p>
                <input
                  type="text"
                  value={localValues.intervals}
                  onChange={(e) =>
                    handleLocalChange("intervals", e.target.value)
                  }
                  onBlur={() => handleBlur("intervals")}
                  className="w-16 py-1 text-xl text-black text-center bg-[#CDCDCD] rounded-xl"
                />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl text-[#686D76]">Rest time</p>
                <input
                  type="text"
                  value={localValues.rest}
                  onChange={(e) => handleLocalChange("rest", e.target.value)}
                  onBlur={() => handleBlur("rest")}
                  className="w-16 py-1 text-xl text-black text-center bg-[#CDCDCD] rounded-xl"
                />
              </div>
              <IoTrashOutline className="text-3xl ml-3 text-black cursor-pointer" />
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  const PlanTable = () => {
    const handleDayValueChange = (field: DayField, value: string) => {
      const newExercises = [...exercises];
      newExercises[selectedDay][field] = value;
      setExercises(newExercises);
    };

    const handleValueChange = (
      dayIndex: number,
      exerciseIndex: number,
      field: ExerciseField,
      value: string
    ) => {
      const newExercises = [...exercises];
      newExercises[dayIndex].exercises[exerciseIndex] = {
        ...newExercises[dayIndex].exercises[exerciseIndex],
        [field]: value,
      };
      setExercises(newExercises);
    };

    const formatMinutes = (minutes: number) => {
      return minutes < 10 ? `0${minutes}` : minutes;
    };

    const formatSeconds = (seconds: number) => {
      return seconds < 10 ? `0${seconds}` : seconds;
    };
    // Add time handlers
    const [localTime, setLocalTime] = useState({
      minutes: formatMinutes(exercises[selectedDay].setTime.minutes),
      seconds: formatSeconds(exercises[selectedDay].setTime.seconds),
    });

    // Update handlers
    const handleLocalMinutesChange = (value: string) => {
      setLocalTime((prev) => ({ ...prev, minutes: value }));
    };

    const handleLocalSecondsChange = (value: string) => {
      setLocalTime((prev) => ({ ...prev, seconds: value }));
    };

    // Add blur handlers
    const handleMinutesBlur = () => {
      const minutes = Math.min(
        59,
        Math.max(0, parseInt(localTime.minutes.toString()) || 0)
      );
      handleLocalMinutesChange(minutes.toString());
    };

    const handleSecondsBlur = () => {
      const seconds = Math.min(
        59,
        Math.max(0, parseInt(localTime.seconds.toString()) || 0)
      );
      handleLocalSecondsChange(seconds.toString());
    };

    const [isTick, setIsTick] = useState(true);

    return (
      <div
        className={`flex flex-col mx-2 font-montserrat ${
          isAdding ? "mt-16" : "mt-8"
        }`}
      >
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
          <div className="flex flex-col mt-2">
            <input
              type="text"
              value={exercises[selectedDay].title}
              onChange={(e) => handleDayValueChange("title", e.target.value)}
              className="w-[40%] text-[4rem] text-black ml-2 font-bebas border-b border-gray-400 bg-[#CDCDCD] rounded-xl px-2 mb-4"
            />
            <div className="flex flex-row justify-between font-montserrat ml-14">
              <div className="flex flex-row items-center">
                <TbBarbell className="text-[#A91D3A] text-5xl mr-2" />
                <p className="text-[#686D76] text-2xl">
                  Exercises: {exercises[selectedDay].exercises.length}
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
                  <span className="mx-1 text-xl">:</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={isTick ? localTime.seconds : ""}
                    onChange={(e) => handleLocalSecondsChange(e.target.value)}
                    onBlur={handleSecondsBlur}
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
              <div className="-mt-12">
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

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId={`day-${selectedDay}`}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {exercises[selectedDay].exercises.map((exercise, index) => (
                      <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        index={index}
                        onValueChange={(field, value) =>
                          handleValueChange(selectedDay, index, field, value)
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

  const MuscleGroup = [
    "Chest",
    "Back",
    "Legs",
    "Shoulders",
    "Arms",
    "Core",
    "Full Body",
  ];

  const EquipmentGroup = [
    "Barbell",
    "Dumbbell",
    "Kettlebell",
    "Machine",
    "Cable",
    "Bodyweight",
  ];

  const ExerciseGroup = [
    {
      image: examplePic2,
      title: "Bench Press",
      body: "Chest",
    },
    {
      image: examplePic2,
      title: "Deadlift",
      body: "Back",
    },
    {
      image: examplePic2,
      title: "Squats",
      body: "Legs",
    },
    {
      image: examplePic2,
      title: "Military Press",
      body: "Shoulders",
    },
    {
      image: examplePic2,
      title: "Bicep Curls",
      body: "Arms",
    },
  ];

  interface DropdownWithCheckboxProps {
    items: string[];
    name: string;
  }

  const DropdownWithCheckbox: React.FC<DropdownWithCheckboxProps> = ({
    items,
    name,
  }) => {
    const [isSelectedItem, setIsSelectedItem] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (item: string) => {
      if (isSelectedItem.includes(item)) {
        setIsSelectedItem(isSelectedItem.filter((i) => i !== item));
      } else {
        setIsSelectedItem([...isSelectedItem, item]);
      }
    };

    return (
      <div className="relative font-montserrat mt-6 text-black">
        <div
          className="rounded-xl bg-[#84878D] px-4 py-2 cursor-pointer flex flex-row justify-between items-center"
          onClick={toggleDropdown}
        >
          <div></div>
          <p className="text-xl">{name}</p>
          <span className="transform transition-transform">
            {isOpen ? "▲" : "▼"}
          </span>
        </div>

        {isOpen && (
          <div className="absolute mt-2 w-full z-20 bg-gray-200 text-black border border-gray-300 rounded-xl shadow-md">
            {items.map((item) => (
              <label
                key={item}
                className="flex items-center space-x-2 cursor-pointer px-4 py-2"
              >
                <input
                  type="checkbox"
                  checked={isSelectedItem.includes(item)}
                  onChange={() => handleSelect(item)}
                  className="w-4 h-4 rounded border-gray-500"
                />
                <span className="font-montserrat">{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  const AddExerciseCard = () => {
    return (
      <div className="flex flex-col bg-[#B2B2B2] p-4 rounded-xl mt-6 mx-2">
        <div className="flex flex-row items-center justify-between">
          <h1 className="font-bebas text-4xl text-black">Exercise Library</h1>
          <IoCloseCircleOutline
            className="text-4xl text-black cursor-pointer"
            onClick={() => setIsAdding(false)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <DropdownWithCheckbox items={MuscleGroup} name="Muscle" />
          <DropdownWithCheckbox items={EquipmentGroup} name="Equipment" />
        </div>

        <div className="flex flex-row items-center mt-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#CDCDCD] p-4 rounded-xl text-black text-xl"
          />
          <FaSearch className="text-3xl text-black -mx-12" onClick={() => {}} />
        </div>

        <div className="flex flex-col mt-6">
          <h1 className="font-montserrat text-3xl text-black">Exercises</h1>
          {ExerciseGroup.map((exercise) => (
            <div
              key={exercise.title}
              className="grid grid-cols-[2fr_7fr_1fr] items-center bg-[#D9D9D9] rounded-xl p-4 cursor-pointer my-2"
            >
              <img src={exercise.image} alt="" className="w-14 h-14" />
              <div className="flex flex-col">
                <h2 className="text-2xl text-black">{exercise.title}</h2>
                <p className="text-xl text-[#686D76]">{exercise.body}</p>
              </div>
              <CiCirclePlus
                className="text-4xl text-black"
                onClick={() => {}}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${
        isAdding ? "grid grid-cols-[7fr_3fr]" : "grid grid-cols-[3fr_7fr]"
      } mx-8 pt-10`}
    >
      <div className="flex flex-col">
        <div className="flex flex-row">
          <GrFormPrevious className="text-5xl text-[#F05454] cursor-pointer" />
          <h1 className="font-bebas uppercase text-5xl text-[#F05454] ml-4">
            My Plans
          </h1>
        </div>

        {/* {isAdding ? <PlanTable /> : <PlanCard />} */}
        {!isAdding && <PlanCard />}
      </div>

      <div className="flex flex-col mt-10 mx-2">
        <div className="flex justify-end">
          <button
            onClick={handleFinishEdit}
            className={`px-5 py-2 ${
              isAdding ? "w-[18%]" : "w-[16%]"
            } text-2xl font-montserrat bg-[#A91D3A] text-white rounded-xl mx-2`}
          >
            Finish edit
          </button>
        </div>

        <div className="relative">
          {/* PlanTable with slide transition */}
          <div
            className={`transition-transform duration-300 transform ${
              isAdding ? "translate-x-[-52%] -mt-7 w-[110%]" : "translate-x-0"
            }`}
          >
            <PlanTable />
          </div>

          {/* AddExerciseCard with slide-in */}
          <div
            className={`absolute top-0 right-0 transition-all duration-300 ease-in-out transform mt-3 ${
              isAdding
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            {isAdding && <AddExerciseCard />}
          </div>
        </div>
      </div>
    </div>
  );
};

// MyPlansEdit.propTypes = {
//   id: PropTypes.string,
// };

export default MyPlansEdit;
