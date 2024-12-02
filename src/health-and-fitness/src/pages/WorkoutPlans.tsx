import WorkoutSlider from "../components/workout/WorkoutSlider";
import WorkoutPlanList from "../components/workout/WorkoutPlanList";
import { MdNavigateNext } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";

export default function WorkoutPlans() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const days = ["1 day", "2 days", "3 days", "4 days", "5 days", "6 days", "7 days"];
  const muscles = ["Abs", "Arms", "Back", "Chest", "Legs", "Shoulders"];
  const goals = ["Gain", "Cut", "Maintain"];
  const levels = ["Beginner", "Intermediate", "Advanced"];

  return (
    <div className="py-6 flex flex-col mx-48">
      <div className="flex justify-center items-center flex-row font-bebas">
        {/* Search input */}
        <div className="flex items-center justify-center flex-row">
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded-lg border-2 border-gray-300 bg-white text-black text-2xl w-[71rem]"
          />
          <FaSearch className="text-3xl text-black -mx-12" onClick={() => {}} />
        </div>

        {/* Filter */}
        <button
          className="py-[0.7rem] px-4 rounded-lg bg-white text-black text-2xl ml-28 flex items-center flex-row"
          onClick={() => setIsFilterOpen(true)}
        >
          Filter
          <FaFilter className="text-2xl ml-4 text-black" />
        </button>

        {isFilterOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsFilterOpen(false)}
            />

            <div className="fixed top-28 right-0 h-full bg-[#F0EEED] p-6 z-50 w-[20rem] shadow-lg rounded-l-2xl text-black">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-5xl font-bold hover:text-gray-700"
                >
                  <MdNavigateNext />
                </button>
                <h2 className="font-bebas text-4xl uppercase">Filter</h2>
              </div>

              <div className="space-y-4">
                {/* Day filter */}
                <DropdownWithCheckbox items={days} name="Days" />

                {/* Muscle filter */}
                <DropdownWithCheckbox items={muscles} name="Muscles" />

                {/* Goal filter */}
                <DropdownWithCheckbox items={goals} name="Goals" />

                {/* Level filter */}
                <DropdownWithCheckbox items={levels} name="Levels" />

                <div className="flex flex-row-reverse items-center">
                  <button className="bg-[#F05454] text-black text-xl px-6 py-2 my-4 rounded-xl hover:text-white">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="max-w-6xl mx-auto relative">
        <WorkoutSlider />
      </div>

      <div className="flex flex-col mt-16">
        <p className="uppercase font-bebas text-[#F05454] text-5xl mb-12">
          Workout Plans
        </p>
        <WorkoutPlanList />
      </div>
    </div>
  );
}

interface DropdownWithCheckboxProps {
  items: string[];
  name: string;
}

const DropdownWithCheckbox: React.FC<DropdownWithCheckboxProps> = ({ items, name }) => {
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
    <div className="relative font-montserrat">
      <h3 className="text-2xl mb-3">{name}</h3>
      <div
        className="border border-gray-300 rounded-xl px-4 py-2 cursor-pointer flex flex-row-reverse items-center"
        onClick={toggleDropdown}
      >
        <span className="transform transition-transform">
          {isOpen ? "▲" : "▼"}
        </span>
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full z-20 bg-[#E3E3E3] border border-gray-300 rounded-xl shadow-md">
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

