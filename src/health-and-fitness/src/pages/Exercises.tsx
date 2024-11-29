import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import abs from "../assets/exercises/abs.png";
import bodyweights from "../assets/exercises/body-weights.png";
import barbell from "../assets/exercises/barbell.png";

interface Exercise {
  id: number;
  name: string;
  muscles: string[];
  equipment: string;
  description: string;
  imageUrl: string;
}

const exercises: Exercise[] = [
  {
    id: 1,
    name: "Barbell Bench Press",
    muscles: ["Chest", "Triceps"],
    equipment: "Barbell",
    description:
      "The Barbell Chest Press, also known as the Barbell Bench Press, is a fundamental exercise...",
    imageUrl: barbell,
  },
  {
    id: 2,
    name: "Pull-ups",
    muscles: ["Back", "Biceps"],
    equipment: "Body Weight",
    description:
      "Pull-ups are a challenging upper body exercise that primarily target the back and biceps...",
    imageUrl: barbell,
  },
  {
    id: 3,
    name: "Squats",
    muscles: ["Legs", "Glutes"],
    equipment: "Barbell",
    description:
      "Squats are a compound exercise that work multiple muscle groups in the lower body...",
    imageUrl: barbell,
  },
  {
    id: 4,
    name: "Deadlifts",
    muscles: ["Back", "Legs"],
    equipment: "Barbell",
    description:
      "Deadlifts are a powerful compound exercise that targets multiple muscle groups...",
    imageUrl: barbell,
  },
  {
    id: 5,
    name: "Military Press",
    muscles: ["Shoulders", "Triceps"],
    equipment: "Barbell",
    description:
      "The Military Press is a compound exercise that targets the shoulders and triceps...",
    imageUrl: barbell,
  },
  {
    id: 6,
    name: "Bicep Curls",
    muscles: ["Arms"],
    equipment: "Dumbbell",
    description:
      "Bicep Curls are an isolation exercise that target the biceps...",
    imageUrl: barbell,
  },
  {
    id: 7,
    name: "Planks",
    muscles: ["Core"],
    equipment: "Body Weight",
    description:
      "Planks are a body weight exercise that target the core muscles...",
    imageUrl: barbell,
  },
  {
    id: 8,
    name: "Russian Twists",
    muscles: ["Core"],
    equipment: "Body Weight",
    description:
      "Russian Twists are a core exercise that target the obliques...",
    imageUrl: barbell,
  },

  // Add more exercises as needed to have at least 8
];

const muscles = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];
const equipment = [
  "Barbell",
  "Dumbbell",
  "Machine",
  "Body Weight",
  "Kettlebell",
  "Resistance Bands",
];

export default function ExerciseFilter() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="py-6 flex flex-col mx-48">
      <div className="flex justify-center items-center flex-col font-bebas text-white">
        {/* Search input */}
        <div className="flex items-center justify-center flex-row relative">
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded-lg border-2 border-gray-300 bg-white text-black text-2xl w-[71rem]"
          />
          <FaSearch
            className="absolute inset-y-3 items-center right-4 text-3xl text-black "
            onClick={() => {}}
          />
        </div>
        {/* Filter by Muscle */}
        <section className="my-8 w-full">
          <h2 className="text-[#FF4D4D] text-3xl font-bold mb-4">
            FILTER BY MUSCLE
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {muscles.map((muscle, i) => (
              <div key={`muscle-${i}`} className="text-center">
                <div className="bg-gray-700 rounded-lg p-2 mb-2">
                  <img
                    src={abs}
                    alt={`${muscle} exercise`}
                    className="w-full h-24 object-cover"
                  />
                </div>
                <span className="text-sm">{muscle}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Filter by Equipment */}
        <section className="mb-8 w-full">
          <h2 className="text-[#FF4D4D] text-3xl font-bold mb-4">
            FILTER BY EQUIPMENT
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {equipment.map((item, i) => (
              <div key={`equipment-${i}`} className="text-center">
                <div className="bg-gray-700 rounded-lg p-2 mb-2">
                  <img
                    src={bodyweights}
                    alt={`${item} exercise`}
                    className="w-full h-24 object-cover"
                  />
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Exercises List */}
        <section className="w-full">
          <h2 className="text-[#FF4D4D] text-3xl font-bold mb-4">EXERCISES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-gray-800 rounded-lg p-4 flex gap-4 hover:bg-gray-700 transition-colors"
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={exercise.imageUrl}
                    alt={exercise.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{exercise.name}</h3>
                  <div className="text-[#FF4D4D] text-sm mb-2">
                    {exercise.muscles.join(" / ")}
                  </div>
                  <p className="text-gray-400 text-sm">
                    {exercise.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: 10 }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded ${
                  currentPage === i + 1
                    ? "bg-[#FF4D4D] text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
