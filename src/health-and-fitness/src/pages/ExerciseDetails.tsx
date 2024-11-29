import barbell from "../assets/exercises/barbell.png";
import leftArrow from "../assets/exercises/left-arrow.png";
import rightArrow from "../assets/exercises/right-arrow.png";
import lateralRaise from "../assets/exercises/lateral-raise.png";
import abs from "../assets/exercises/abs.png";
import bodyWeight from "../assets/exercises/body-weights.png";

interface Instruction {
  title: string;
  content: string;
}

export default function ExerciseDetail() {
  const instructions: Instruction[] = [
    {
      title: "Hand Placement",
      content:
        "Grip the barbell with both hands slightly wider than shoulder-width apart. Your palms should face forward and your thumbs should be wrapped around the bar.",
    },
    {
      title: "Starting Position",
      content:
        "Unrack the barbell by straightening your arms and moving the barbell over your chest. Your arms should be perpendicular to the floor.",
    },
    {
      title: "Lowering the Barbell",
      content:
        "Lower and press Your barbell slowly and under control to your chest. Your elbows should bend at about a 45-degree angle to your body. Lower the bar until it lightly touches your chest or to just above it. Do not bounce the bar off your chest.",
    },
    {
      title: "Pressing the Barbell",
      content:
        "Exhale and press the barbell back up to the starting position by pushing up and slightly forward. Focus on engaging your chest muscles as you lift the weight. Keep your wrists straight and your elbows slightly tucked in to protect your shoulder joints.",
    },
  ];

  const alternativeExercises = [
    {
      name: "Dumbbell lateral raise",
      imageUrl: lateralRaise,
    },
    {
      name: "Dumbbell lateral raise",
      imageUrl: lateralRaise,
    },
  ];

  return (
    <div className="min-h-screen text-white mx-48 py-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <button className="text-[#FF4D4D]">
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
        <span className="text-[#FF4D4D] text-3xl font-bold">EXERCISE</span>
      </div>
      <div className="grid grid-cols-[4fr_6fr] gap-14">
        {/* Main Exercise Image */}
        <div className="mb-6 flex flex-col">
          <img
            src={barbell}
            alt="Barbell Bench Press demonstration"
            className="w-full rounded-lg object-cover h-[300px]"
          />
          {/* Alternative Exercises */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold text-[#F05454]">
                Alternative Abs Exercises
              </h2>
              <div className="flex gap-2">
                <div className="w-6 h-6 p-1 bg-[#F05454] rounded-full flex items-center justify-center">
                  <img src={leftArrow} alt="Left arrow" />
                </div>
                <div className="w-6 h-6 p-1 bg-[#F05454] rounded-full flex items-center justify-center">
                  <img src={rightArrow} alt="Right arrow" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {alternativeExercises.map((exercise, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <img
                    src={exercise.imageUrl}
                    alt={exercise.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <p className="text-center text-sm">{exercise.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Exercise Title and Categories */}
        <div className="mb-6 flex-col">
          <h1 className="text-2xl font-bold text-[#FF4D4D] mb-4">
            BARBELL BENCH PRESS
          </h1>
          <div className="grid grid-cols-2 mr-auto max-w-80">
            <div className="flex flex-col gap-2">
              <div className="w-28 h-28 bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={abs}
                  alt="Abs category"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm">Abs</span>
              <div className="rounded-lg mt-4 mb-8">
                <h2 className="text-gray-400 text-sm mb-1">Difficulty</h2>
                <p>Intermediate</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-28 h-28 bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={bodyWeight}
                  alt="Body Weight category"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm">Body Weight</span>
              <div className="rounded-lg mt-4 mb-8">
                <h2 className="text-gray-400 text-sm mb-1">Exercise Type</h2>
                <p>Strength</p>
              </div>
            </div>
          </div>
          {/* Instructions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Instruction</h2>
            <div className="space-y-4">
              {instructions.map((instruction, index) => (
                <div key={index}>
                  <h3 className="font-bold mb-2">{instruction.title}:</h3>
                  <p className="text-gray-300">{instruction.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
