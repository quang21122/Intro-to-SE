import Navbar from "./Navbar";
import rectangle from "../assets/rectangle.png";
import human from "../assets/human.png";
import fitness from "../assets/fitness.png";
import title from "../assets/title.png";
import customize from "../assets/customize.png";
import energy from "../assets/energy.png";
import intensity from "../assets/intensity.png";

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
        className="absolute bottom-28 left-6 h-[70%]"
      />
      <div className="absolute top-40 left-32 space-y-8">
        <img src={title} alt="Title" className="w-full" />
        <div className="max-w-[40rem] text-lg">
          <p>
            HAF - The Health And Fitness platform where every limit is meant to
            be conquered!
          </p>
          <p>
            the key to breaking through personal boundaries, unlocking your
            potential.
          </p>
        </div>
        <div className="pt-6 uppercase bebas-font tracking-[0.2rem] text-xl">
          <p>What you get</p>
          <div className="flex mt-4">
            <div className="flex justify-center items-center max-w-52 space-x-4">
              <img src={customize} alt="" />
              <p>Customised fitness plan</p>
            </div>
            <div className="flex justify-center items-center max-w-52 space-x-4">
              <img src={energy} alt="" />
              <p>Keep your feet and strong</p>
            </div>
            <div className="flex justify-center items-center max-w-52 space-x-4">
              <img src={intensity} alt="" />
              <p>High intensity training</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
