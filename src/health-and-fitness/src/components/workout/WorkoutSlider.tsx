import Slider, { CustomArrowProps } from "react-slick";
import { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

function WorkoutSlider() {
  const [sliderPlans, setSliderPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "!flex justify-center items-center space-x-6 my-6 w-full",
    customPaging: () => (
      <button className="w-4 h-4 rounded-full bg-[#D9D9D9] flex items-center justify-center hover:opacity-70 focus:outline-none hover:scale-110">
        <div className="w-4 h-4 rounded-full bg-transparent [.slick-active_&]:bg-[#F05454]" />
      </button>
    ),
    appendDots: (dots) => (
      <ul className="list-none m-0 p-0 [&>li]:mx-4">{dots}</ul>
    ),
    responsive: [
      {
        breakpoint: 1024, // For screens below 1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // For screens below 768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchPagePlans = async (page: number) => {
      const response = await fetch(
        `intro-to-se-server.vercel.app/api/plan?page=${page}&limit=6`,
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

      const result: PaginatedResponse = await response.json();
      return result.data || [];
    };

    const fetchSliderPlans = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [page1Plans, page2Plans] = await Promise.all([
          fetchPagePlans(1),
          fetchPagePlans(2),
        ]);

        setSliderPlans([...page1Plans, ...page2Plans]);
      } catch (error) {
        console.error("Error fetching slider plans: ", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch plans"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSliderPlans();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="-mx-6">
      <h1 className="font-bebas uppercase mx-6 my-8 text-[#F05454] font-bold text-5xl">
        For you
      </h1>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-gray-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-xl text-gray-700">Loading...</p>
          </div>
        </div>
      ) : (
        <Slider {...settings}>
          {sliderPlans.map((plan) => (
            <div
              key={plan.id}
              className="px-4 hover:cursor-pointer"
              onClick={() => navigate(`/workout-plans/${plan.id}`)}
            >
              <div
                className="relative rounded-xl overflow-hidden bg-cover bg-center h-[18rem]"
                style={{ backgroundImage: `url(${plan.image})` }}
              >
                <div className="z-10 px-6 py-4 h-full flex flex-col bg-black/50 transition translate-y-48 rounded-2xl hover:translate-y-20 hover:cursor-pointer font-bebas">
                  <h3 className="text-[#F05454] text-[2rem] text-center mt-4">
                    {plan.name}
                  </h3>
                  <div className="grid grid-cols-2 py-6 text-center font-montserrat">
                    <div className="text-white text-xl flex flex-col">
                      <p>{plan.days} days</p>
                      <p>{plan.muscle}</p>
                    </div>
                    <div className="text-white text-xl flex flex-col">
                      <p>{plan.goal}</p>
                      <p>{plan.level}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

function NextArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return (
    <div
      className="text-[#F05454] text-5xl font-bold flex flex-row items-center cursor-pointer absolute -right-[4%] top-1/2 transform -translate-y-1/2"
      onClick={onClick}
    >
      <GrNext />
    </div>
  );
}

function PrevArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return (
    <div
      className="text-[#F05454] text-5xl font-bold cursor-pointer absolute -left-[4%] top-1/2 transform -translate-y-1/2"
      onClick={onClick}
    >
      <GrPrevious className="red" />
    </div>
  );
}

export default WorkoutSlider;
