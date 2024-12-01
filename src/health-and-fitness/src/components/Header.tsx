import Navbar from "./Navbar";
import rectangle from "../assets/header/rectangle.png";
import human from "../assets/header/human.png";
import fitness from "../assets/header/fitness.png";
import customize from "../assets/header/customize.png";
import energy from "../assets/header/energy.png";
import intensity from "../assets/header/intensity.png";

export default function Header() {
  return (
    <div className="relative h-screen bg-black text-white overflow-hidden">
      <Navbar isHomepage={true} />
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
      <div className="flex flex-col justify-center -mt-14 ml-32 h-screen space-y-8">
        <h1 className="font-semibold bebas-font uppercase text-[5rem] max-w-[40rem] text-[#D64141] text-shadow-custom">
          Conquer your doubts stay fearless
        </h1>
        <div className="max-w-[40rem] text-lg">
          <p>
            HAF - The Health And Fitness platform where every limit is meant to
            be conquered!
          </p>
          <p>
            The key to breaking through personal boundaries, unlocking your
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
            <div className="flex justify-center items-center max-w-52 space-x-4 mx-4">
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
