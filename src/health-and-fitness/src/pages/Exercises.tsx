import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import abs from "../assets/exercises/abs.png";
import bodyweights from "../assets/exercises/body-weights.png";

// Define interfaces for muscle and exercise
interface Muscle {
  id: string;
  name: string;
  image: string; // Optional, if muscles have images
}

interface Equipment {
  id: string;
  name: string;
  image: string;
}

interface Exercise {
  id: string;
  name: string;
  muscle: string; // Muscle ID (to fetch muscle details)
  muscles: string[]; // Added muscles property to store muscle names
  equipment: string;
  description: string;
  image: string;
  video: string;
  instruction: string;
  difficulty: string;
  createdAt: string;
}

// const equipment = [
//   "Barbell",
//   "Dumbbell",
//   "Machine",
//   "Body Weight",
//   "Kettlebell",
//   "Resistance Bands",
// ];

export default function ExerciseFilter() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMuscleFilter, setShowMuscleFilter] = useState(false);
  const [showEquipmentFilter, setShowEquipmentFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMuscles = async () => {
      try {
        const muscleRes = await fetch(
          "http://localhost:3000/api/muscle?all=true"
        );
        const muscleData = await muscleRes.json(); // Fetches the response
        if (muscleData.status === 200) {
          setMuscles(muscleData.muscles); // Set only the muscles array to state
          console.log("Fetched Muscles:", muscleData.muscles); // Logs the muscles array
        } else {
          console.error("Error: Unexpected status code", muscleData.status);
        }
      } catch (err) {
        console.error("Error fetching muscles:", err);
      }
    };

    fetchMuscles();
  }, []);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const equipmentRes = await fetch(
          "http://localhost:3000/api/equipment?all=true"
        );
        const equipmentData = await equipmentRes.json();
        console.log("Equipment Data:", equipmentData);
        setEquipment(equipmentData);
      } catch (err) {
        console.error("Error fetching equipment:", err);
      }
    };

    fetchEquipment();
  }, []);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch exercises
        const exerciseRes = await fetch(
          `http://localhost:3000/api/exercise?page=${currentPage}`
        );
        if (!exerciseRes.ok) {
          throw new Error(
            `Failed to fetch exercises: ${exerciseRes.statusText}`
          );
        }

        const contentType = exerciseRes.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Expected JSON, but received something else.");
        }

        let exerciseData = await exerciseRes.json(); // Use `let` here instead of `const`

        if (!Array.isArray(exerciseData)) {
          if (exerciseData.data && Array.isArray(exerciseData.data)) {
            exerciseData = exerciseData.data; // Reassign to the correct array
          } else {
            throw new Error(
              "Expected an array, but the response format is different."
            );
          }
        }

        // For each exercise, fetch the corresponding muscle data
        const updatedExercises = await Promise.all(
          exerciseData.map(async (exercise: Exercise) => {
            const muscleRes = await fetch(
              `http://localhost:3000/api/muscle?id=${exercise.muscle}`
            );
            if (!muscleRes.ok) {
              throw new Error(
                `Failed to fetch muscle for exercise: ${exercise.id}`
              );
            }

            const muscleData = await muscleRes.json();
            console.log("Fetched Muscle Data:", muscleData);

            // Update the exercise with the muscle information
            return {
              ...exercise,
              muscles: muscleData.user ? [muscleData.user.name] : [],
            };
          })
        );

        console.log("Updated Exercises:", updatedExercises); // Final updated exercises
        setExercises(updatedExercises);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "An error occurred while fetching exercises");
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [currentPage]);

  const handleExerciseClick = (exercise: Exercise) => {
    navigate(`/exercises/${exercise.id}`);
  };

  return (
    <div className="py-2 flex flex-col mx-24 bg-[#232221]">
      <Navbar isHomepage={false} />
      <div className="mt-10 flex justify-center items-center flex-col font-bebas text-white">
        {/* Search input */}
        <div className="flex items-center justify-center flex-row relative w-full">
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded-lg border-2 border-gray-300 bg-white text-black text-2xl w-full"
          />
          <FaSearch
            className="absolute inset-y-3 items-center right-4 text-3xl text-black"
            onClick={() => {}}
          />
        </div>

        {/* Toggle Buttons for Filters */}
        <div className="flex gap-4 my-6">
          <button
            onClick={() => setShowMuscleFilter((prev) => !prev)}
            className="bg-[#FF4D4D] text-white px-4 py-2 rounded-md"
          >
            {showMuscleFilter ? "Hide Muscle Filter" : "Show Muscle Filter"}
          </button>
          <button
            onClick={() => setShowEquipmentFilter((prev) => !prev)}
            className="bg-[#FF4D4D] text-white px-4 py-2 rounded-md"
          >
            {showEquipmentFilter
              ? "Hide Equipment Filter"
              : "Show Equipment Filter"}
          </button>
        </div>

        {/* Filter by Muscle */}
        {showMuscleFilter && (
          <section className="my-8 w-full">
            <h2 className="text-[#FF4D4D] text-3xl font-bold mb-4">
              FILTER BY MUSCLE
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {muscles.map((muscle) => (
                <div key={muscle.id} className="text-center">
                  <div className="bg-gray-700 rounded-lg p-2 mb-2">
                    <img
                      src={muscle.image || abs}
                      alt={`${muscle.name} exercise`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                  <span className="text-sm">{muscle.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Filter by Equipment */}
        {showEquipmentFilter && (
          <section className="mb-8 w-full">
            <h2 className="text-[#FF4D4D] text-3xl font-bold mb-4">
              FILTER BY EQUIPMENT
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {equipment.map((equip) => (
                <div key={equip.id} className="text-center">
                  <div className="bg-gray-700 rounded-lg p-2 mb-2">
                    <img
                      src={equip.image || bodyweights}
                      alt={`${equip.name} exercise`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                  <span className="text-sm">{equip.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Exercises List */}
        <section className="w-full">
          <h2 className="text-[#FF4D4D] text-3xl font-bold mb-4">EXERCISES</h2>

          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="bg-gray-800 rounded-lg p-4 flex gap-4 hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => handleExerciseClick(exercise)}
                >
                  <div className="w-28 h-full flex-shrink-0">
                    <img
                      src={exercise.image}
                      alt={exercise.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{exercise.name}</h3>
                    <div className="text-[#FF4D4D] text-sm mb-2">
                      {exercise.muscles.join(" / ")}
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {exercise.instruction}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center gap-2 my-8">
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
