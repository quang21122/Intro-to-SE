import logo from "../assets/header/logo.png";
// import edge from "../assets/header/edge.png";
import { useAuth } from "../hooks/useAuth";
import humanBg from "../assets/header/human-bg.png";
import banner from "../assets/header/banner.png";
import rectangle from "../assets/header/rectangle.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("isAuthenticated");
    setIsLoggedIn(false);
  };

  const handleWorkoutPlans = () => {
    navigate("/workout-plans");
  };

  const handleMyPlans = () => {
    navigate("/my-plans");
  };

  const handleExercises = () => {
    navigate("/exercises");
  };

  return (
    <nav className="w-full flex items-center justify-around pt-6 px-4 relative">
      <a href="" className="flex justify-center items-center">
        <img src={logo} alt="Logo" className="h-10" />
        <p className="bebas-font text-4xl ml-2 tracking-widest">HAF</p>
      </a>
      <nav className="hidden md:block">
        <ul className="flex gap-20 relative mx-28">
          <li className="relative group  pr-6">
            <a
              href="#"
              className="tracking-[0.2rem] text-white group-hover:bg-gradient-to-b group-hover:from-[#FEF3E2] group-hover:to-[#FA4032] group-hover:bg-clip-text group-hover:text-transparent"
            >
              WORKOUTS
            </a>
            <div className="absolute top-2 right-0 h-0 w-0 rotate-180 transform border-x-[10px] border-y-[10px] border-solid border-transparent border-b-white group-hover:border-b-[#fb6767] cursor-pointer"></div>
            <div className="bg-black absolute w-full h-4 -bottom-3 right-0"></div>
            {/* Dropdown menu */}
            <div className="absolute rounded-xl mt-2 top-full -right-3 hidden group-hover:block bg-white text-black py-2 w-40 z-10">
              <ul className="">
                <li className="px-4 py-2">
                  <a
                    onClick={handleWorkoutPlans}
                    className="tracking-widest hover:underline cursor-pointer"
                  >
                    Workout Plans
                  </a>
                </li>
                <li className="px-4 py-2">
                  <a
                    onClick={handleMyPlans}
                    className="tracking-widest hover:underline cursor-pointer"
                  >
                    My plans
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li className="group">
            <a
              onClick={handleExercises}
              className="text-white group-hover:bg-gradient-to-b cursor-pointer group-hover:from-[#FEF3E2] group-hover:to-[#FA4032] group-hover:bg-clip-text group-hover:text-transparent tracking-[0.2rem]"
            >
              EXERCISES
            </a>
          </li>
          <li className="group">
            <a
              href="#"
              className="text-white group-hover:bg-gradient-to-b group-hover:from-[#FEF3E2] group-hover:to-[#FA4032] group-hover:bg-clip-text group-hover:text-transparent tracking-[0.2rem]"
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
      {isLoggedIn ? (
        <div className="hidden md:flex gap-4 z-10 mr-20">
          <div className="relative group  pr-6">
            <a
              href="#"
              className="tracking-[0.2rem] text-white group-hover:bg-gradient-to-b group-hover:from-[#515151] group-hover:to-[#1c1c1c] group-hover:bg-clip-text group-hover:text-transparent"
            >
              MY HAF
            </a>
            <div className="absolute top-2 right-0 h-0 w-0 rotate-180 transform border-x-[10px] border-y-[10px] border-solid border-transparent border-b-white group-hover:border-b-[#434242] cursor-pointer"></div>
            <div className="bg-[#f24b4b] absolute w-full h-4 -bottom-3 right-0"></div>
            {/* Dropdown menu */}
            <div className="absolute rounded-xl mt-2 top-full -right-3 hidden group-hover:block bg-white text-black py-2 w-32 z-10">
              <ul className="">
                <li className="px-4 py-1">
                  <a href="#" className="tracking-widest hover:underline">
                    Profile
                  </a>
                </li>
                <li className="px-4 py-1">
                  <a href="#" className="tracking-widest hover:underline">
                    Setting
                  </a>
                </li>
                <li className="px-4 py-1">
                  <a
                    href="#"
                    onClick={handleLogout}
                    className="tracking-widest hover:underline"
                  >
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex gap-4 z-10">
          <button
            onClick={handleLogin}
            className="px-6 py-2 font-medium rounded-lg text-black hover:text-red-600 hover:bg-black border-2 border-black"
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            className="px-6 py-2 rounded-lg font-semibold bg-black text-white hover:bg-[#363636]"
          >
            Sign up
          </button>
        </div>
      )}
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
