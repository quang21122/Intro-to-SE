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
  image: string; // Optional, if muscleName has images
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
  muscleName: string; // Muscle name (to display)
  equipment: string;
  equipmentName: string;
  description: string;
  image: string;
  video: string;
  instruction: string;
  difficulty: string;
  createdAt: string;
}

export default function Exercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]); // To track selected muscles
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]); // To track selected equipment
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMuscleFilter, setShowMuscleFilter] = useState(false);
  const itemsPerPage = 10; // Items per page
  const [totalPages, setTotalPages] = useState(1); // Total pages based on filtered count
  const [currentFilteredPage, setCurrentFilteredPage] = useState(1);
  const [showEquipmentFilter, setShowEquipmentFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchMuscles = async () => {
      try {
        const muscleRes = await fetch(
          "http://localhost:3000/api/muscle?all=true"
        );
        const muscleData = await muscleRes.json();
        if (muscleData.status === 200) {
          setMuscles(muscleData.muscles);
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

        // Fetch exercises only if there are selected muscles
        const selectedMusclesParam = selectedMuscles.join(",");
        const selectedEquipmentParam = selectedEquipment.join(",");
        const queryParam = new URLSearchParams();

        if (debouncedSearchTerm) {
          queryParam.append("search", debouncedSearchTerm);
        }

        if (selectedMuscles.length) {
          queryParam.append("muscles", selectedMusclesParam);
        }

        if (selectedEquipmentParam.length) {
          queryParam.append("equipments", selectedEquipmentParam);
        }

        const exerciseRes = await fetch(
          debouncedSearchTerm
            ? `http://localhost:3000/api/exercise?search=${debouncedSearchTerm}` // Fetch exercises with search term
            : selectedMuscles.length || selectedEquipment.length
            ? `http://localhost:3000/api/exercise?${queryParam.toString()}` // Fetch exercises with selected muscles
            : `http://localhost:3000/api/exercise?page=${currentPage}`
        );

        if (!exerciseRes.ok) {
          setTotalPages(0);
          throw new Error(
            `Failed to fetch exercises: ${exerciseRes.statusText}`
          );
        }

        const exerciseData = await exerciseRes.json();
        const exercises = debouncedSearchTerm
          ? exerciseData.data.exercises
          : exerciseData.data || [];

        const filteredExerciseCount = exercises.length;
        const totalPages = Math.ceil(filteredExerciseCount / itemsPerPage);
        setTotalPages(totalPages);

        // Fetch corresponding muscle and equipment data for each exercise
        const updatedExercises = await Promise.all(
          exercises.map(async (exercise: Exercise) => {
            const muscleRes = await fetch(
              `http://localhost:3000/api/muscle?id=${exercise.muscle}`
            );
            const muscleData = await muscleRes.json();

            if (exercise.equipment === "0x1z1Tz8z06DaanQVvkX") {
              exercise.equipment = "0XlZ1Tz8zO6DaanQVvkX";
            }
            const equipmentRes = await fetch(
              `http://localhost:3000/api/equipment?id=${exercise.equipment}`
            );
            const equipmentData = await equipmentRes.json();

            return {
              ...exercise,
              muscleName: muscleData.user ? muscleData.user.name : "Unknown",
              muscleImage: muscleData.user ? muscleData.user.image : "",
              equipmentName: equipmentData.user
                ? equipmentData.user.name
                : "Unknown",
              equipmentImage: equipmentData.user
                ? equipmentData.user.image
                : "",
            };
          })
        );

        setExercises(updatedExercises);
      } catch (err) {
        if (err instanceof Error) {
          setError("No available exercises found");
        } else {
          setError("An unknown error occurred while fetching exercises");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [debouncedSearchTerm, selectedMuscles, selectedEquipment, currentPage]); // Re-fetch when selectedMuscles or currentPage changes

  useEffect(() => {
    setCurrentFilteredPage(1);
    setCurrentPage(1);
  }, [selectedMuscles, selectedEquipment, debouncedSearchTerm]); // Reset currentPage when selectedMuscles changes

  const handleExerciseClick = (exercise: Exercise) => {
    const formattedName = exercise.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/exercises/${formattedName}`, { state: { exercise } });
  };

  const toggleMuscleSelection = (muscleId: string) => {
    setSelectedMuscles((prevSelected) =>
      prevSelected.includes(muscleId)
        ? prevSelected.filter((id) => id !== muscleId)
        : [...prevSelected, muscleId]
    );
  };

  const toggleEquipmentSelection = (equipmentId: string) => {
    setSelectedEquipment((prevSelected) =>
      prevSelected.includes(equipmentId)
        ? prevSelected.filter((id) => id !== equipmentId)
        : [...prevSelected, equipmentId]
    );
  };

  return (
    <div className="py-2 flex flex-col mx-24 bg-[#232221] min-h-screen">
      <Navbar isHomepage={false} />
      <div className="mt-10 flex justify-center items-center flex-col font-bebas text-white">
        {/* Search input */}
        <div className="flex items-center justify-center flex-row relative w-full">
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded-lg border-2 border-gray-300 bg-white text-black text-2xl w-full"
            style={{ textTransform: "none" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch
            className="absolute inset-y-3 items-center right-4 text-3xl text-black cursor-pointer"
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
                  <div
                    className={`bg-gray-700 rounded-lg p-2 mb-2 cursor-pointer ${
                      selectedMuscles.includes(muscle.id) ? "bg-red-500" : ""
                    }`}
                    onClick={() => toggleMuscleSelection(muscle.id)}
                  >
                    <img
                      src={muscle.image || abs}
                      alt={`${muscle.name} exercise`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                  <span
                    className={`text-sm ${
                      selectedMuscles.includes(muscle.id)
                        ? "text-[#FF4D4D]"
                        : ""
                    }`}
                  >
                    {muscle.name}
                  </span>
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
                  <div
                    className={`bg-gray-700 rounded-lg p-2 mb-2 cursor-pointer ${
                      selectedEquipment.includes(equip.id) ? "bg-red-500" : ""
                    }`}
                    onClick={() => toggleEquipmentSelection(equip.id)}
                  >
                    <img
                      src={equip.image || bodyweights}
                      alt={`${equip.name} exercise`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                  <span
                    className={`text-sm ${
                      selectedEquipment.includes(equip.id)
                        ? "text-[#FF4D4D]"
                        : ""
                    }`}
                  >
                    {equip.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Exercises List */}
        <section className="w-full">
          <h2 className="text-[#FF4D4D] text-3xl font-bold mb-4">EXERCISES</h2>

          {isLoading ? (
            <div className="min-h-screen">
              <p>Loading...</p>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(selectedMuscles.length > 0 ||
                selectedEquipment.length > 0 ||
                searchTerm) &&
                exercises
                  .slice(
                    (currentFilteredPage - 1) * itemsPerPage,
                    currentFilteredPage * itemsPerPage
                  )
                  .map((exercise) => (
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
                          {exercise.muscleName}
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-3">
                          {exercise.instruction}
                        </p>
                      </div>
                    </div>
                  ))}
              {selectedMuscles.length === 0 &&
                selectedEquipment.length === 0 &&
                searchTerm === "" &&
                exercises.map((exercise) => (
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
                        {exercise.muscleName}
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-3">
                        {exercise.instruction}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Pagination when apply muscles filter, must to calc exactly number of page */}
          {/* You must to slice it to limit display exactly item per page */}
          {(selectedMuscles.length > 0 ||
            selectedEquipment.length > 0 ||
            searchTerm) && (
            <div className="flex justify-center gap-2 my-8">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentFilteredPage(i + 1)}
                  className={`px-4 py-2 rounded-lg text-white ${
                    i + 1 === currentFilteredPage
                      ? "bg-[#FF4D4D]"
                      : "bg-gray-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          {/* Pagination when not apply muscles filter */}

          {selectedMuscles.length === 0 &&
            selectedEquipment.length === 0 &&
            debouncedSearchTerm === "" && (
              <div className="flex justify-center gap-2 my-8">
                {Array.from({ length: 10 }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg text-white ${
                      i + 1 === currentPage ? "bg-[#FF4D4D]" : "bg-gray-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
        </section>
      </div>
    </div>
  );
}
