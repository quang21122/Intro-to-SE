import WorkoutSlider from "../components/workout/WorkoutSlider";
import WorkoutPlanList from "../components/workout/WorkoutPlanList";
import { MdNavigateNext } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

interface FilterState {
  Days: string;
  Muscles: string;
  Goals: string;
  Levels: string;
}

interface Plan {
  id: string;
  name: string;
  image: string;
  muscle: string;
  level: string;
  goal: string;
  equipment: string;
  days: number;
  description: string;
  createdAt: string;
}

export default function WorkoutPlans() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [muscles, setMuscles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterState, setFilterState] = useState<FilterState>({
    Days: "All",
    Muscles: "All",
    Goals: "All",
    Levels: "All",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Plan[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const days = [1, 2, 3, 4, 5, 6, 7].map((day) => `${day} days`);
  const goals = ["Maintaining", "Bulking", "Cutting", "Sport Specific"];
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const clearAllFilters = () => {
    setFilterState({
      Days: "All",
      Muscles: "All",
      Goals: "All",
      Levels: "All",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const searchWorkoutPlans = async () => {
      if (!debouncedSearchTerm) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      setSearchError(null);

      try {
        const response = await fetch(
          `http://localhost:3000/api/plan?search=${debouncedSearchTerm}`
        );

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const data = await response.json();
        setSearchResults(data.data.plans || []);
      } catch (err) {
        setSearchError(err instanceof Error ? err.message : "Search failed");
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    searchWorkoutPlans();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const fetchMuscleNames = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "http://localhost:3000/api/muscle?all=true",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        interface Muscle {
          name: string;
        }

        const muscleNames = data.muscles.map((muscle: Muscle) => muscle.name);
        setMuscles(muscleNames);
      } catch (error) {
        console.error("Error fetching muscles:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch muscles"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMuscleNames();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="py-6 flex flex-col mx-24">
      <Navbar isHomepage={false} />
      <div className="flex justify-center items-center flex-row font-bebas mt-10">
        {/* Search input */}
        <div className="flex items-center flex-row w-full relative">
          <input
            type="text"
            placeholder="Search workout plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-lg border-2 border-gray-300 bg-white text-black text-2xl w-full"
            style={{ textTransform: "none" }}
          />
          <FaSearch className="absolute right-4 text-3xl text-black" />
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
                <DropdownWithCheckbox
                  items={days}
                  name="Days"
                  filterState={filterState}
                  onSelect={(name, value) =>
                    setFilterState((prev) => ({ ...prev, [name]: value }))
                  }
                />
                <DropdownWithCheckbox
                  items={muscles}
                  name="Muscles"
                  filterState={filterState}
                  onSelect={(name, value) =>
                    setFilterState((prev) => ({ ...prev, [name]: value }))
                  }
                />
                <DropdownWithCheckbox
                  items={goals}
                  name="Goals"
                  filterState={filterState}
                  onSelect={(name, value) =>
                    setFilterState((prev) => ({ ...prev, [name]: value }))
                  }
                />
                <DropdownWithCheckbox
                  items={levels}
                  name="Levels"
                  filterState={filterState}
                  onSelect={(name, value) =>
                    setFilterState((prev) => ({ ...prev, [name]: value }))
                  }
                />

                <div className="flex flex-row gap-4 mt-6">
                  <button
                    onClick={clearAllFilters}
                    className="flex-1 bg-gray-400 text-white text-xl px-6 py-2 rounded-xl hover:bg-gray-500 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    className="flex-1 bg-[#F05454] text-black text-xl px-6 py-2 rounded-xl hover:text-white transition-colors"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="max-w-full mx-auto relative">
        <WorkoutSlider />
      </div>

      <div className="flex flex-col mt-16">
        <p className="uppercase font-bebas text-[#F05454] text-5xl mb-12">
          Workout Plans
        </p>
        <WorkoutPlanList
          searchResults={searchResults}
          isSearching={searchResults.length !== 0}
        />
      </div>
    </div>
  );
}

interface DropdownWithCheckboxProps {
  items: string[];
  name: keyof FilterState;
  filterState: FilterState;
  onSelect: (name: keyof FilterState, value: string) => void;
}

const DropdownWithCheckbox: React.FC<DropdownWithCheckboxProps> = ({
  items,
  name,
  filterState,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (item: string) => {
    onSelect(name, item);
    setIsOpen(false);
  };

  return (
    <div className="relative font-montserrat">
      <h3 className="text-2xl mb-3">{name}</h3>
      <div
        className="border border-gray-300 rounded-xl px-4 py-2 cursor-pointer flex justify-between items-center bg-[#E3E3E3]"
        onClick={toggleDropdown}
      >
        <span>{filterState[name]}</span>
        <span className="transform transition-transform duration-200">
          {isOpen ? "▲" : "▼"}
        </span>
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full z-20 bg-[#E3E3E3] border border-gray-300 rounded-xl shadow-md">
          <label
            key="all"
            className="flex items-center space-x-2 cursor-pointer px-4 py-2 hover:bg-gray-200"
          >
            <input
              type="radio"
              checked={filterState[name] === "All"}
              onChange={() => handleSelect("All")}
              className="w-4 h-4 border-gray-500"
            />
            <span className="font-montserrat">All</span>
          </label>
          {items.map((item) => (
            <label
              key={item}
              className="flex items-center space-x-2 cursor-pointer px-4 py-2 hover:bg-gray-200"
            >
              <input
                type="radio"
                checked={filterState[name] === item}
                onChange={() => handleSelect(item)}
                className="w-4 h-4 border-gray-500"
              />
              <span className="font-montserrat">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
