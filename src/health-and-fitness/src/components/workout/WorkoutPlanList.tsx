import examplePic from "../../assets/workout/example_pic.png";
import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

function WorkoutPlanList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlans = plans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(plans.length / itemsPerPage);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-4 gap-8">
        {currentPlans.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col bg-[#B2B2B2] rounded-xl w-[19rem]"
          >
            <img
              src={plan.image}
              alt="workout"
              className="flex items-center mx-auto rounded-t-xl w-[94%] h-[75%] mt-2"
            />
            <h1 className="font-bebas text-black text-2xl pt-4 pl-4">
              {plan.title}
            </h1>
            <div className="grid grid-cols-2 font-montserrat text-[1rem] py-2">
              <div className="flex flex-col pl-4">
                <p className="text-black">{plan.duration}</p>
                <p className="text-black">{plan.target}</p>
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
