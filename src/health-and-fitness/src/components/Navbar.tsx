import logo from "../assets/header/logo.png";
// import edge from "../assets/header/edge.png";
import humanBg from "../assets/header/human-bg.png";
import banner from "../assets/header/banner.png";
import rectangle from "../assets/header/rectangle.png";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-around pt-6 px-4 relative">
      <a href="">
        <img src={logo} alt="Logo" className="h-8" />
      </a>
      <nav className="hidden md:block">
        <ul className="flex gap-20 relative mx-28">
          <li className="relative group  pr-6">
            <a
              href="#"
              className="tracking-[0.2rem] text-white group-hover:text-red-500"
            >
              WORKOUTS
            </a>
            <div className="absolute top-2 right-0 h-0 w-0 rotate-180 transform border-x-[10px] border-y-[10px] border-solid border-transparent border-b-white group-hover:border-b-[red] cursor-pointer"></div>
            <div className="bg-black absolute w-full h-4 -bottom-3 right-0"></div>
            {/* Dropdown menu */}
            <div className="absolute rounded-xl mt-2 top-full -right-3 hidden group-hover:block bg-white text-black py-2 w-40 z-10">
              <ul className="">
                <li className="px-4 py-2">
                  <a href="#" className="tracking-widest hover:underline">
                    Workout Plans
                  </a>
                </li>
                <li className="px-4 py-2">
                  <a href="#" className="tracking-widest hover:underline">
                    My plan
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <a
              href="#"
              className="text-white hover:text-red-500 focus:text-red-500 tracking-[0.2rem]"
            >
              EXERCISES
            </a>
          </li>
          <li className="">
            <a
              href="#"
              className="text-white hover:text-red-500 focus:text-red-500 tracking-[0.2rem]"
            >
              MEAL PLAN
            </a>
            {/* <img
              src={edge}
              alt="Edge"
              className="absolute -top-8 -right-36 w-2/3 h-40 object-fill z-10"
            /> */}
          </li>
        </ul>
      </nav>
      <div className="hidden md:flex gap-4 z-10">
        <button className="px-6 py-2 font-medium rounded-lg text-black hover:text-red-600 hover:bg-black border-2 border-black">
          Login
        </button>
        <button className="px-6 py-2 rounded-lg font-semibold bg-black text-white hover:bg-[#363636]">
          Sign up
        </button>
      </div>
      <img
        src={humanBg}
        alt="Human"
        className="absolute top-0 right-0 w-[30%] h-screen object-fill"
      />
      <img
        src={rectangle}
        alt="Rectangle"
        className="absolute -top-10 right-14 w-[9%] -rotate-[2deg] object-cover"
      />
      <img
        src={banner}
        alt="Banner"
        className="absolute top-0 -right-0 w-[8%] h-screen object-fill"
      />
    </nav>
  );
}
