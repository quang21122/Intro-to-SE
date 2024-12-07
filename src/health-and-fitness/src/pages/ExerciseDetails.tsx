import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import leftArrow from "../assets/exercises/left-arrow.png";
import rightArrow from "../assets/exercises/right-arrow.png";

interface ExerciseDetails {
  name: string;
  image: string;
  video: string;
  instruction: string;
  muscle: string;
  muscleName: string;
  muscleImage: string;
  equipment: string;
  equipmentName: string;
  equipmentImage: string;
  difficulty: string;
  type: string;
}

export default function ExerciseDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { exercise } = location.state || {};
  const [exerciseDetails, setExerciseDetails] =
    useState<ExerciseDetails | null>(exercise || null);
  const [alternativeMuscleExercises, setAlternativeMuscleExercises] = useState<
    ExerciseDetails[]
  >([]);
  const [currentPage, setCurrentPage] = useState(0); // Track current exercise index

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!exercise) {
      console.error("No exercise data found in location.state");
      navigate("/exercises"); // Redirect to a fallback page
    } else {
      setExerciseDetails(exercise);
      setCurrentPage(0); // Reset the current exercise index
    }
  }, [exercise, navigate]);

  useEffect(() => {
    const fetchAlternativeExercises = async () => {
      try {
        // Fetch alternative exercises based on the muscle group
        const response = await fetch(
          `http://localhost:3000/api/exercise?muscles=${exerciseDetails?.muscle}`
        );
        const res = await response.json();

        // Filter out the current exercise from the list
        const exercises = res.data.filter(
          (exercise: ExerciseDetails) => exercise.name !== exerciseDetails?.name
        );

        // Fetch additional details (muscleName, equipmentName, equipmentImage) for each exercise
        const updatedExercises = await Promise.all(
          exercises.map(async (exercise: ExerciseDetails) => {
            // Fetch muscle data for the exercise
            const muscleRes = await fetch(
              `http://localhost:3000/api/muscle?id=${exercise.muscle}`
            );
            const muscleData = await muscleRes.json();

            // Fetch equipment data for the exercise
            const equipmentRes = await fetch(
              `http://localhost:3000/api/equipment?id=${exercise.equipment}`
            );
            const equipmentData = await equipmentRes.json();

            // Return the updated exercise object with additional data
            return {
              ...exercise,
              muscleName: muscleData.user ? muscleData.user.name : "Unknown",
              muscleImage: muscleData.user ? muscleData.user.image : "Unknown",
              equipmentName: equipmentData.user
                ? equipmentData.user.name
                : "Unknown",
              equipmentImage: equipmentData.user
                ? equipmentData.user.image
                : "Unknown",
            };
          })
        );

        setAlternativeMuscleExercises(updatedExercises);
        console.log("Alternative exercises: ", updatedExercises);
      } catch (error) {
        console.error("Failed to fetch alternative exercises", error);
      }
    };

    if (exerciseDetails) {
      fetchAlternativeExercises();
    }
  }, [exerciseDetails]);

  const handleBack = () => {
    navigate("/exercises");
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1); // Move back by 1 exercise
    }
  };

  const handleNext = () => {
    if (currentPage < alternativeMuscleExercises.length - 2) {
      setCurrentPage(currentPage + 1); // Move forward by 1 exercise
    }
  };

  const handleAlternativeExerciseClick = (exercise: ExerciseDetails) => {
    console.log("Alternative exercise clicked: ", exercise);
    const formattedName = exercise.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/exercises/${formattedName}`, {
      state: { exercise },
    });

    // Update the current exercise details in the component state
    setExerciseDetails(exercise);
  };

  if (!exerciseDetails) {
    return (
      <div className="min-h-screen text-white mx-24 py-2">
        <Navbar isHomepage={false} />
        <div className="text-center mt-10">Loading...</div>
      </div>
    );
  }

  const {
    name,
    video,
    instruction,
    muscleName,
    muscleImage,
    equipmentName,
    equipmentImage,
    difficulty,
    type,
  } = exerciseDetails;

  // Get the current two exercises for the page
  const exercisesToDisplay = [
    alternativeMuscleExercises[currentPage],
    alternativeMuscleExercises[currentPage + 1],
  ];

  return (
    <div className="min-h-screen text-white mx-24 py-2">
      <Navbar isHomepage={false} />
      {/* Header */}
      <div
        className="mt-10 flex items-center gap-2 mb-6 -ml-3"
        onClick={handleBack}
      >
        <button className="text-[#FF4D4D] cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mt-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span className="text-[#FF4D4D] text-3xl font-bold cursor-pointer">
          EXERCISE
        </span>
      </div>
      <div className="grid grid-cols-[4fr_6fr] gap-14">
        {/* Main Exercise Image */}
        <div className="mb-6 flex flex-col">
          {video ? (
            <img src={video} alt={name} className="w-full h-96 rounded-lg" />
          ) : (
            <div className="text-center">Video not available</div>
          )}
          {/* Alternative Exercises */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-[#F05454]">
                Alternative {muscleName} Exercises
              </h2>
              <div className="flex gap-2 select-none">
                <div
                  className={`w-6 h-6 p-1 rounded-full flex items-center justify-center cursor-pointer ${
                    currentPage == 0 ? "bg-gray-400" : "bg-[#F05454]"
                  }`}
                  onClick={handlePrev}
                  style={{
                    cursor: currentPage == 0 ? "not-allowed" : "pointer",
                  }}
                >
                  <img src={leftArrow} alt="Left arrow" />
                </div>
                <div
                  className={`w-6 h-6 p-1 rounded-full flex items-center justify-center cursor-pointer ${
                    currentPage === alternativeMuscleExercises.length - 2
                      ? "bg-gray-400"
                      : "bg-[#F05454]"
                  }`}
                  onClick={handleNext}
                  style={{
                    cursor:
                      currentPage === alternativeMuscleExercises.length - 2
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <img src={rightArrow} alt="Right arrow" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {exercisesToDisplay.map((exercise, index) => (
                <div
                  key={index}
                  className="relative rounded-lg cursor-pointer"
                  onClick={() => handleAlternativeExerciseClick(exercise)}
                >
                  <img
                    src={exercise?.image}
                    alt={exercise?.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center text-sm py-1 rounded-b-lg">
                    {exercise?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Exercise Title and Categories */}
        <div className="mb-6 flex-col">
          <h1 className="text-2xl font-bold text-[#FF4D4D] mb-4">{name}</h1>
          <div className="grid grid-cols-2 mr-auto max-w-80">
            <div className="flex flex-col gap-2">
              <div className="w-28 h-28 bg-gray-700 rounded-lg overflow-hidden relative">
                <img
                  src={muscleImage}
                  alt="Muscle category"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center text-xs py-1">
                  {muscleName}
                </span>
              </div>
              <div className="rounded-lg mt-4 mb-8">
                <h2 className="text-white text-md font-medium mb-1">
                  Difficulty
                </h2>
                <p className="text-gray-400">{difficulty}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-28 h-28 bg-gray-700 rounded-lg overflow-hidden relative">
                <img
                  src={equipmentImage}
                  alt="Equipment"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center text-xs py-1">
                  {equipmentName}
                </span>
              </div>
              <div className="rounded-lg mt-4 mb-8">
                <h2 className="text-white text-md font-medium mb-1">Type</h2>
                <p className="text-gray-400">{type}</p>
              </div>
            </div>
          </div>

          <h2 className="text-white text-lg font-semibold mb-4">
            Instructions
          </h2>
          <p className="text-gray-400 text-sm">{instruction}</p>
        </div>
      </div>
    </div>
  );
}
