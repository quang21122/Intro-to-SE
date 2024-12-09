import logo from "../assets/header/logo.png";
// import edge from "../assets/header/edge.png";
import { useAuth } from "../hooks/useAuth";
import humanBg from "../assets/header/human-bg.png";
import banner from "../assets/header/banner.png";
import rectangle from "../assets/header/rectangle.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({ isHomepage }: { isHomepage: boolean }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    setIsLoggedIn(isAuthenticated === "true");
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    logout().then(() => {
      localStorage.removeItem("isAuthenticated");
      setIsLoggedIn(false);
    });
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
    <nav
      className={`w-full flex items-center pt-6 relative ${
        isHomepage ? "justify-around px-4" : "justify-between"
      } ${location.pathname === "/profile" ? "justify-around" : ""}`}
    >
      {/* Logo */}
      <div
        className="flex justify-center items-center cursor-pointer -ml-10"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Logo" className="h-10" />
        <p className="bebas-font text-4xl ml-2 tracking-widest text-white">
          HAF
        </p>
      </div>

      {/* Menu */}
      <nav className="hidden md:block">
        <ul className="flex gap-20 relative mx-28">
          <li className="relative group pr-6">
            <a
              onClick={handleWorkoutPlans}
              className={`tracking-[0.2rem] ${
                location.pathname === "/workout-plans"
                  ? "bg-gradient-to-b from-[#FEF3E2] to-[#FA4032] bg-clip-text text-transparent"
                  : "text-white group-hover:bg-gradient-to-b group-hover:from-[#FEF3E2] group-hover:to-[#FA4032] group-hover:bg-clip-text group-hover:text-transparent"
              }`}
            >
              WORKOUTS
            </a>
            <div className="absolute top-2 right-0 h-0 w-0 rotate-180 transform border-x-[10px] border-y-[10px] border-solid border-transparent border-b-white group-hover:border-b-[#fb6767] cursor-pointer"></div>
            <div
              className={`absolute w-full h-4 -bottom-3 right-0 ${
                isHomepage ? "bg-black" : "bg-[#232221]"
              }`}
            ></div>
            <div className="absolute rounded-xl mt-2 top-full -right-3 hidden group-hover:block bg-white text-black py-2 w-40 z-10">
              <ul>
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
              className={`cursor-pointer tracking-[0.2rem] ${
                location.pathname === "/exercises"
                  ? "bg-gradient-to-b from-[#FEF3E2] to-[#FA4032] bg-clip-text text-transparent"
                  : "text-white group-hover:bg-gradient-to-b group-hover:from-[#FEF3E2] group-hover:to-[#FA4032] group-hover:bg-clip-text group-hover:text-transparent"
              }`}
            >
              EXERCISES
            </a>
          </li>
          <li className="group">
            <a
              href="#"
              className={`tracking-[0.2rem] ${
                location.pathname === "/meal-plan"
                  ? "bg-gradient-to-b from-[#FEF3E2] to-[#FA4032] bg-clip-text text-transparent"
                  : "text-white group-hover:bg-gradient-to-b group-hover:from-[#FEF3E2] group-hover:to-[#FA4032] group-hover:bg-clip-text group-hover:text-transparent"
              }`}
            >
              MEAL PLAN
            </a>
          </li>
        </ul>
      </nav>

      {/* User Controls */}
      {isLoggedIn ? (
        <div
          className={`hidden md:flex gap-4 z-10 ${isHomepage ? "mr-20" : ""} ${
            location.pathname === "/profile" ? "" : ""
          }`}
        >
          <div className="relative group pr-6">
            <a
              href="#"
              className={`tracking-[0.2rem] text-white group-hover:bg-gradient-to-b group-hover:bg-clip-text group-hover:text-transparent ${
                isHomepage
                  ? "group-hover:from-[#e9e8e8] group-hover:to-[#eaeaea]"
                  : "group-hover:from-[#d7d7d7] group-hover:to-[#d9d8d8]"
              } ${
                location.pathname === "/profile"
                  ? "bg-gradient-to-b from-[#FEF3E2] to-[#FA4032] bg-clip-text text-transparent"
                  : ""
              }`}
            >
              MY HAF
            </a>
            <div className="absolute top-2 right-0 h-0 w-0 rotate-180 transform border-x-[10px] border-y-[10px] border-solid border-transparent border-b-white group-hover:border-b-[#b0b0b0] cursor-pointer"></div>
            <div
              className={`absolute w-full h-4 -bottom-3 right-0 ${
                isHomepage ? "bg-[#f24b4b]" : "bg-black bg-opacity-0"
              }`}
            ></div>
            <div className="absolute rounded-xl mt-2 top-full -right-3 hidden group-hover:block bg-white text-black py-2 w-32 z-10">
              <ul>
                <li className="px-4 py-1">
                  <a
                    onClick={() => navigate("/profile")}
                    className={`tracking-widest hover:underline cursor-pointer ${
                      location.pathname === "/profile" ? "text-red-600" : ""
                    }`}
                  >
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
            className={`px-6 py-2 font-medium rounded-lg ${
              isHomepage
                ? "text-black hover:text-red-600 hover:bg-black border-2 border-black"
                : "text-black hover:text-white hover:bg-red-600 bg-white"
            } `}
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            className={`px-6 py-2 font-medium rounded-lg ${
              isHomepage
                ? "bg-black text-white hover:bg-[#363636]"
                : "text-black hover:text-white hover:bg-red-600 bg-white"
            } `}
          >
            Sign up
          </button>
        </div>
      )}

      {/* Background Images */}
      {isHomepage && (
        <>
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
        </>
      )}
    </nav>
  );
}
