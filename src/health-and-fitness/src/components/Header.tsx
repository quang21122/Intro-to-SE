import Navbar from "./Navbar";
import rectangle from "../assets/rectangle.png";

export default function FitnessHeader() {
  return (
    <div className="relative h-screen bg-black text-white overflow-hidden">
      <Navbar />
      <img
        src={rectangle}
        alt="Rectangle"
        className="absolute -bottom-1 right-[9.2rem] w-[9%] -rotate-[3deg] object-cover"
      />
    </div>
  );
}
