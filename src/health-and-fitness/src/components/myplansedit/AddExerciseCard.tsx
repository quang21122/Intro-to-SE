import { IoCloseCircleOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import React, { useState, useEffect } from "react";

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
  sets: number;
  reps: string;
  interval: string;
  restTime: string;
}

interface ExerciseDetail {
  id: string;
  name: string;
  muscle: string; // Muscle ID (to fetch muscle details)
  muscleName?: string; // Muscle name (for display)
  equipment: string;
  equipmentName: string;
  description: string;
  image: string;
  video: string;
  instruction: string;
  difficulty: string;
  createdAt: string;
}
interface DropdownItem {
  id: string;
  name: string;
}
interface DropdownWithCheckboxProps {
  items: DropdownItem[];
  name: string;
  selected: string;
  setSelected: (value: string) => void;
}

interface AddExerciseCardProps {
  setIsAdding: (value: boolean) => void;
  handleAddExercise: (exercise: Exercise, selectedDay: number) => void;
  selectedDay: number;
}

const AddExerciseCard: React.FC<AddExerciseCardProps> = ({
  setIsAdding,
  handleAddExercise,
  selectedDay,
}) => {
  const [exercises, setExercises] = useState<ExerciseDetail[]>([]);
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedMuscle, setSelectedMuscle] = useState<string>("All");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchMuscles = async () => {
      try {
        const muscleRes = await fetch(
          "https://intro-to-se-server.vercel.app/api/muscle?all=true"
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
          "https://intro-to-se-server.vercel.app/api/equipment?all=true"
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
        let url = "https://intro-to-se-server.vercel.app/api/exercise";

        if (debouncedSearchTerm) {
          url = `https://intro-to-se-server.vercel.app/api/exercise?search=${debouncedSearchTerm}`;
        } else {
          const queryParam = new URLSearchParams();
          if (selectedMuscle === "All" && selectedEquipment === "All") {
            url = "https://intro-to-se-server.vercel.app/api/exercise?page=1";
          } else {
            if (selectedMuscle !== "All") {
              queryParam.append("muscles", selectedMuscle);
            }
            if (selectedEquipment !== "All") {
              queryParam.append("equipments", selectedEquipment);
            }
          }
          url = `${url}?${queryParam.toString()}`;
        }

        const exerciseRes = await fetch(url);

        if (!exerciseRes.ok) {
          throw new Error(
            `Failed to fetch exercises: ${exerciseRes.statusText}`
          );
        }

        let exerciseData = await exerciseRes.json();
        if (debouncedSearchTerm) {
          exerciseData = exerciseData.data.exercises;
        } else {
          exerciseData = exerciseData.data;
        }

        if (!exerciseData || exerciseData.length === 0) {
          // If no exercises are found, clear the state
          setExercises([]);
          return;
        }

        // Map exercises with muscle names
        const exercisesWithMuscles = exerciseData.map(
          (exercise: ExerciseDetail) => {
            const muscle = muscles.find((m) => m.id === exercise.muscle);
            return {
              ...exercise,
              muscleName: muscle ? muscle.name : "Unknown",
            };
          }
        );

        setExercises(exercisesWithMuscles);
      } catch (err) {
        console.error("Error fetching exercises:", err);
        // Optionally clear the state in case of an error
        setExercises([]);
      }
    };

    if (muscles.length > 0) {
      fetchExercises();
    }
  }, [muscles, selectedMuscle, selectedEquipment, debouncedSearchTerm]);

  const DropdownWithCheckbox: React.FC<DropdownWithCheckboxProps> = ({
    items,
    name,
    selected,
    setSelected,
  }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [maxHeight, setMaxHeight] = useState("300px");

    useEffect(() => {
      if (isOpen) {
        const dropdownTop =
          document.getElementById("dropdown")?.getBoundingClientRect().top || 0;
        const windowHeight = window.innerHeight;
        const maxDropdownHeight = windowHeight - dropdownTop - 20;
        setMaxHeight(`${maxDropdownHeight}px`);
      }
    }, [isOpen]);

    return (
      <div className="relative font-montserrat mt-6 text-black">
        <div
          className="rounded-xl bg-[#84878D] px-4 py-2 cursor-pointer flex flex-row justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-lg">
            {name}: {items.find((item) => item.id === selected)?.name || "All"}
          </p>
          <span className="transform transition-transform">
            {isOpen ? "▲" : "▼"}
          </span>
        </div>

        {isOpen && (
          <div
            id="dropdown"
            className="absolute mt-2 w-full z-20 bg-gray-200 text-black border border-gray-300 rounded-xl shadow-md overflow-y-auto"
            style={{ maxHeight }}
          >
            <label
              key="all"
              className="flex items-center space-x-2 cursor-pointer px-4 py-2 hover:bg-gray-300"
            >
              <input
                type="radio"
                checked={selected === "All"}
                onChange={() => {
                  setSelected("All");
                  setIsOpen(false);
                }}
                className="w-4 h-4 border-gray-500"
              />
              <span className="font-montserrat">All</span>
            </label>
            {items.map((item) => (
              <label
                key={item.id}
                className="flex items-center space-x-2 cursor-pointer px-4 py-2 hover:bg-gray-300"
              >
                <input
                  type="radio"
                  checked={selected === item.id}
                  onChange={() => {
                    setSelected(item.id); // Set the ID here
                    setIsOpen(false);
                  }}
                  className="w-4 h-4 border-gray-500"
                />
                <span className="font-montserrat text-sm">{item.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-[#B2B2B2] p-4 rounded-xl mt-6 z-0">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-bebas text-4xl text-black">Exercise Library</h1>
        <IoCloseCircleOutline
          className="text-4xl text-black cursor-pointer hover:text-[#C73659] duration-300"
          onClick={() => setIsAdding(false)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DropdownWithCheckbox
          items={muscles.map((m) => ({ id: m.id, name: m.name }))}
          name="Muscle"
          selected={selectedMuscle}
          setSelected={setSelectedMuscle}
        />
        <DropdownWithCheckbox
          items={equipment.map((e) => ({ id: e.id, name: e.name }))}
          name="Equipment"
          selected={selectedEquipment}
          setSelected={setSelectedEquipment}
        />
      </div>

      <div className="flex flex-row items-center mt-6">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#CDCDCD] p-4 rounded-xl text-black text-xl"
        />
        <FaSearch className="text-3xl text-black -mx-12" onClick={() => {}} />
      </div>

      <div className="flex flex-col mt-6">
        {/* <h1 className="font-montserrat text-3xl text-black">Exercises</h1> */}
        <div className="h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {exercises.length > 0 ? (
            exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="grid grid-cols-[2fr_7fr_1fr] items-center bg-[#D9D9D9] rounded-xl p-4 my-2"
              >
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex flex-col">
                  <h2 className="text-lg text-black">{exercise.name}</h2>
                  <p className="text-lg text-[#686D76]">
                    {exercise.muscleName}
                  </p>
                </div>
                <CiCirclePlus
                  className="text-4xl text-black cursor-pointer hover:text-[#C73659]"
                  onClick={() => {
                    handleAddExercise(
                      {
                        id: exercise.id,
                        sets: 0,
                        reps: "0",
                        interval: "00:00",
                        restTime: "00:00",
                      },
                      selectedDay
                    );
                  }}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center bg-[#D9D9D9] rounded-xl p-6 my-2">
              <p className="text-xl text-[#686D76] font-montserrat">
                No exercises found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddExerciseCard;
