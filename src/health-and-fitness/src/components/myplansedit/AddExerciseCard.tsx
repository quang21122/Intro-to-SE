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

interface DropdownWithCheckboxProps {
  items: string[];
  name: string;
  selected: string;
  setSelected: (value: string) => void;
}

interface AddExerciseCardProps {
  setIsAdding: (value: boolean) => void;
}

const AddExerciseCard: React.FC<AddExerciseCardProps> = ({ setIsAdding }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedMuscle, setSelectedMuscle] = useState<string>("All");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("All");

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
        const exerciseRes = await fetch(
          "http://localhost:3000/api/exercise?page=1"
        );
        const exerciseData = await exerciseRes.json();

        // Map exercises with muscle names
        const exercisesWithMuscles = exerciseData.data.map(
          (exercise: Exercise) => {
            const muscle = muscles.find((m) => m.id === exercise.muscle);
            return {
              ...exercise,
              muscleName: muscle ? muscle.name : "Unknown",
            };
          }
        );

        setExercises(exercisesWithMuscles);
        console.log("Exercises with muscles:", exercisesWithMuscles);
      } catch (err) {
        console.error("Error fetching exercises:", err);
      }
    };

    if (muscles.length > 0) {
      fetchExercises();
    }
  }, [muscles]);
    
    
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
          <div></div>
          <p className="text-lg">
            {name} : {selected}
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
                key={item}
                className="flex items-center space-x-2 cursor-pointer px-4 py-2 hover:bg-gray-300"
              >
                <input
                  type="radio"
                  checked={selected === item}
                  onChange={() => {
                    setSelected(item);
                    setIsOpen(false);
                  }}
                  className="w-4 h-4 border-gray-500"
                />
                <span className="font-montserrat text-sm">{item}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  console.log("Exercises:", exercises);

  return (
    <div className="flex flex-col bg-[#B2B2B2] p-4 rounded-xl mt-6 z-0">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-bebas text-4xl text-black">Exercise Library</h1>
        <IoCloseCircleOutline
          className="text-4xl text-black cursor-pointer"
          onClick={() => setIsAdding(false)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DropdownWithCheckbox
          items={muscles.map((m) => m.name)}
          name="Muscle"
          selected={selectedMuscle}
          setSelected={setSelectedMuscle}
        />
        <DropdownWithCheckbox
          items={equipment.map((e) => e.name)}
          name="Equipment"
          selected={selectedEquipment}
          setSelected={setSelectedEquipment}
        />
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
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="grid grid-cols-[2fr_7fr_1fr] items-center bg-[#D9D9D9] rounded-xl p-4 cursor-pointer my-2"
          >
            <img
              src={exercise.image}
              alt=""
              className="w-14 h-14 rounded-full"
            />
            <div className="flex flex-col">
              <h2 className="text-lg text-black">{exercise.name}</h2>
              <p className="text-lg text-[#686D76]">{exercise.muscleName}</p>
            </div>
            <CiCirclePlus className="text-4xl text-black" onClick={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddExerciseCard;
