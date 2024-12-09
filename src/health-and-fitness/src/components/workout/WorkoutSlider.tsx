import Slider, { CustomArrowProps } from "react-slick";
import { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import examplePic from "../../assets/workout/example_pic.png";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useEffect, useState } from "react";

interface Exercise {
  id: string;
  
};

interface PlanDetail {

};

interface Plans {
  name: string;
  image: string;
  muscle: string;
  level: string;
  goal: string;
  equipment: string;
  days: number;
  description: string;
};

function WorkoutSlider() {
  const [sliderPlans, setSliderPlans] = useState<Plans[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

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
    const fetchSliderPlans = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/plan?all=true");
        const data = await response.json();

        if (Array.isArray(data)) {
          // Extract only needed fields, excluding planDetail
          const filteredPlans = data.map(({ planDetail, ...rest }) => rest);
          setSliderPlans(filteredPlans);
        } else {
          console.error("Received non-array data:", data);
          setSliderPlans([]);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        setSliderPlans([]);
      }
    };

    fetchSliderPlans();
  }, []);

  return (
    <div className="-mx-6">
      <h1 className="font-bebas uppercase mx-6 my-8 text-[#F05454] font-bold text-5xl">
        For you
      </h1>
      <Slider {...settings}>
        {sliderPlans.map((plan: Plans, index) => (
          <div key={index} className="px-4">
            <div
              className="relative rounded-xl overflow-hidden bg-cover bg-center h-[18rem] sm:h-[14rem] md:h-[12rem] lg:h-[14rem]"
              style={{ backgroundImage: `url(${plan.image})` }}
            >
              <div className="z-10 px-6 py-4 h-full flex flex-col bg-black/50 transition translate-y-32 rounded-2xl hover:translate-y-12 hover:cursor-pointer font-bebas">
                <h2 className="text-white text-2xl">{plan.name}</h2>
                <div className="mt-auto">
                  <p className="text-white/80 text-lg">{plan.level}</p>
                  <p className="text-white/80 text-lg">{plan.muscle}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
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
