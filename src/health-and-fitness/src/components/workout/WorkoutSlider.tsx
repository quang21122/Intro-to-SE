import Slider, { CustomArrowProps } from "react-slick";
import { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import examplePic from "../../assets/workout/example_pic.png"
import { GrPrevious, GrNext } from "react-icons/gr";

function WorkoutSlider() {
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

  const plans = [
    {
      image: examplePic,
      title: "5 DAYS MUSCLE MASS SPLIT",
      duration: "5 days",
      target: "Abs",
      goal: "Maintain",
      level: "Intermediate",
    },
    {
      image: examplePic,
      title: "3 DAYS BEGINNER PLAN",
      duration: "3 days",
      target: "Arms",
      goal: "Cut",
      level: "Beginner",
    },
    {
      image: examplePic,
      title: "4 DAYS FAT LOSS PLAN",
      duration: "4 days",
      target: "Legs",
      goal: "Gain",
      level: "Advanced",
    },
    {
      image: examplePic,
      title: "5 DAYS MUSCLE MASS SPLIT",
      duration: "5 days",
      target: "Abs",
      goal: "Maintain",
      level: "Intermediate",
    },
    {
      image: examplePic,
      title: "3 DAYS BEGINNER PLAN",
      duration: "3 days",
      target: "Arms",
      goal: "Cut",
      level: "Beginner",
    },
    {
      image: examplePic,
      title: "4 DAYS FAT LOSS PLAN",
      duration: "4 days",
      target: "Legs",
      goal: "Gain",
      level: "Advanced",
    },
    {
      image: examplePic,
      title: "5 DAYS MUSCLE MASS SPLIT",
      duration: "5 days",
      target: "Abs",
      goal: "Maintain",
      level: "Intermediate",
    },
    {
      image: examplePic,
      title: "3 DAYS BEGINNER PLAN",
      duration: "3 days",
      target: "Arms",
      goal: "Cut",
      level: "Beginner",
    },
    {
      image: examplePic,
      title: "4 DAYS FAT LOSS PLAN",
      duration: "4 days",
      target: "Legs",
      goal: "Gain",
      level: "Advanced",
    },
  ];

  return (
    <div className="-mx-24">
      <h1 className="font-bebas uppercase mx-6 my-8 text-[#F05454] font-bold text-5xl">
        For you
      </h1>
      <Slider {...settings}>
        {plans.map((plan, index) => (
          <div key={index} className="px-4">
            <div
              className="relative rounded-xl overflow-hidden bg-cover bg-center h-[18rem] sm:h-[14rem] md:h-[12rem] lg:h-[14rem]"
              style={{ backgroundImage: `url(${plan.image})` }}
            >
              <div className="z-10 px-6 py-4 h-full flex flex-col bg-black/50 transition translate-y-32 rounded-2xl hover:translate-y-12 hover:cursor-pointer font-bebas">
                <h3 className="text-[#F05454] text-[2rem] text-center mt-4">
                  {plan.title}
                </h3>
                <div className="grid grid-cols-2 py-6 text-center font-montserrat">
                  <div className="text-white text-xl flex flex-col">
                    <p>{plan.duration}</p>
                    <p>{plan.target}</p>
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
