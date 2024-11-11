import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-around pt-6 px-4">
      <img src={logo} alt="Logo" className="h-8" />
      <nav className="hidden md:block">
        <ul className="flex gap-20">
          <li className="relative group cursor-pointer pr-6">
            <a
              href="#"
              className="tracking-[0.2rem] text-white group-hover:text-red-500 focus:text-red-500"
            >
              WORKOUTS
            </a>
            <div className="absolute top-2 right-0 h-0 w-0 rotate-180 transform border-x-[10px] border-y-[10px] border-solid border-transparent border-b-white group-hover:border-b-[red] cursor-pointer"></div>
          </li>

          <li>
            <a
              href="#"
              className="text-white hover:text-red-500 focus:text-red-500 tracking-[0.2rem]"
            >
              EXERCISES
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:text-red-500 focus:text-red-500 tracking-[0.2rem]"
            >
              MEAL PLAN
            </a>
          </li>
        </ul>
      </nav>
      <div className="hidden md:flex gap-2">
        <button className="px-4 py-2 text-white hover:text-red-500">
          Login
        </button>
        <button className="px-4 py-2 bg-red-500 text-white hover:bg-red-600">
          Sign up
        </button>
      </div>
    </nav>
  );
}
