import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

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

interface PaginatedResponse {
  data: Plan[];
  page: number;
}

interface WorkoutPlanListProps {
  searchResults?: Plan[];
  isSearching?: boolean;
}

function WorkoutPlanList({ searchResults, isSearching }: WorkoutPlanListProps) {
  console.log("searchResults", searchResults);
  console.log("isSearching", isSearching);
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>(searchResults || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 12;

  useEffect(() => {
    if (!isSearching) {
      console.log("Fetching plans...");
      const fetchPage = async (pageNum: number): Promise<Plan[]> => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/plan?page=${pageNum}&limit=6`,
            {
              headers: { "Content-Type": "application/json" },
              // Add timeout
              signal: AbortSignal.timeout(5000),
            }
          );

          // Handle 404 specifically
          if (response.status === 404) {
            console.log(`No more pages available after page ${pageNum}`);
            return [];
          }

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: PaginatedResponse = await response.json();
          return data.data || [];
        } catch (error) {
          console.error(`Error fetching page ${pageNum}:`, error);
          throw error;
        }
      };

      const fetchAllPlans = async () => {
        setIsLoading(true);
        setError(null);

        try {
          let allPlans: Plan[] = [];
          let currentPage = 1;
          let hasMoreData = true;
          let retryCount = 3;

          while (hasMoreData && retryCount > 0) {
            try {
              const pageData = await fetchPage(currentPage);

              if (pageData.length === 0) {
                hasMoreData = false;
              } else {
                allPlans = [...allPlans, ...pageData];
                currentPage++;
              }
            } catch (error) {
              retryCount--;
              if (retryCount === 0) throw error;
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }
          }

          setPlans(allPlans);
        } catch (error) {
          console.error("Error fetching plans:", error);
          setError(
            error instanceof Error ? error.message : "Failed to fetch plans"
          );
        } finally {
          setIsLoading(false);
        }
      };

      fetchAllPlans();
    }
  }, [currentPage, isSearching]);

  useEffect(() => {
    if (isSearching) {
      setPlans(searchResults || []);
    }
  }, [searchResults, isSearching]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlans = plans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(plans.length / itemsPerPage);

  console.log("plans", plans);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-4 gap-8">
        {currentPlans.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col bg-[#B2B2B2] rounded-xl w-full hover:cursor-pointer"
            onClick={() => navigate(`/workout-plans/${plan.id}`)}
          >
            <img
              src={plan.image}
              alt="workout"
              className="flex items-center mx-auto rounded-t-xl w-[94%] h-[75%] mt-2"
            />
            <h1 className="font-bebas text-black text-2xl pt-4 pl-4">
              {plan.name}
            </h1>
            <div className="grid grid-cols-2 font-montserrat text-[1rem] py-2">
              <div className="flex flex-col pl-4">
                <p className="text-black">{plan.days} days</p>
                <p className="text-black">{plan.muscle}</p>
              </div>
              <div className="flex flex-col pl-4">
                <p className="text-black">{plan.goal}</p>
                <p className="text-black">{plan.level}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-[#D9D9D9] text-black rounded disabled:opacity-50"
        >
          <GrFormPrevious />
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1
                ? "bg-[#F05454] text-white"
                : "bg-[#D9D9D9] text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-[#D9D9D9] text-black rounded disabled:opacity-50"
        >
          <GrFormNext />
        </button>
      </div>
    </div>
  );
}

export default WorkoutPlanList;
