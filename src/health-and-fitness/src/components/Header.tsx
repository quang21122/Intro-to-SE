import Navbar from "./Navbar";
import rectangle from "../assets/rectangle.png";
import human from "../assets/human.png";
import fitness from "../assets/fitness.png";

export default function FitnessHeader() {
  return (
    <div className="relative h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <img
        src={rectangle}
        alt="Rectangle"
        className="absolute -bottom-1 right-[8.5rem] w-[9%] -rotate-[3deg] object-cover"
      />
      <img
        src={human}
        alt="Human"
        className="absolute bottom-10 right-0 h-[75%] object-fill"
      />
      <img
        src={fitness}
        alt="Fitness"
        className="absolute bottom-24 left-6 h-[70%]"
      />
    </div>
  );
}
