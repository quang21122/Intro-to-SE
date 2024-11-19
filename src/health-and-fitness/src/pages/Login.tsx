import { useState } from "react";
import loginBg from "../assets/auth-ui/login-bg.jpg";
import dumbell from "../assets/auth-ui/dumbell.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleForgetPassword = () => {
    setShowForgetPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgetPassword(false);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateEmail(email)) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      setEmailError("Invalid email address");
    }
  };

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "100% 100%",
        }}
      ></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-screen">
        <div className="bg-[#E7E7E7] p-8 rounded-3xl shadow-xl w-[30rem]">
          {!showForgetPassword ? (
            <>
              <div className="flex justify-center items-center space-x-4">
                <h1 className="text-3xl font-semibold tracking-widest text-center uppercase font-raleway">
                  Login
                </h1>
                <img src={dumbell} alt="Dumbell" className="h-10" />
              </div>
              <form className="mt-6" onSubmit={handleLogin}>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-[#605D5D] font-raleway font-medium tracking-wider"
                  >
                    Email Address
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mt-1 border-2 border-black rounded-2xl focus:outline-none focus:border-red-400"
                    autoComplete="off"
                    autoCorrect="off"
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-2">{emailError}</p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-[#605D5D] font-raleway font-medium tracking-wider"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full p-2 mt-1 border-2 border-black rounded-2xl focus:outline-none focus:border-red-400"
                    autoComplete="off"
                    autoCorrect="off"
                  />
                </div>
                <p
                  className="underline font-raleway font-medium tracking-wider text-black cursor-pointer"
                  onClick={handleForgetPassword}
                >
                  Forget password
                </p>
                <button
                  type="submit"
                  className="w-full py-2 mt-10 bg-black rounded-md text-white text-xl font-bold hover:bg-[#605D5D]"
                >
                  Login
                </button>
                <div className="mt-10 flex justify-center items-center font-raleway font-medium">
                  <p className="tracking-widest">New to HAF?</p>
                  <Link to="/signup" className="tracking-widest underline mx-2">
                    Sign up
                  </Link>
                  <p className="tracking-widest">now</p>
                </div>
              </form>
            </>
          ) : (
            // Forget Password Form
            <>
              <div className="flex justify-center items-center space-x-4 max-w-40 mx-auto">
                <h1 className="text-3xl font-semibold tracking-widest text-center uppercase font-raleway break-words">
                  Forget Password
                </h1>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="resetEmail"
                  className="block text-[#605D5D] font-raleway font-medium tracking-wider"
                >
                  Enter your email to verify
                </label>
                <input
                  type="text"
                  id="resetEmail"
                  name="resetEmail"
                  className="w-full p-2 mt-4 border-2 border-black rounded-2xl focus:outline-none focus:border-red-400"
                  autoComplete="off"
                  autoCorrect="off"
                />
                <button
                  type="submit"
                  className="w-full py-2 mt-6 bg-black rounded-lg text-white text-xl font-bold hover:bg-[#605D5D]"
                >
                  Verify
                </button>
                <button
                  onClick={handleBackToLogin}
                  className="w-full py-2 mt-4 bg-gray-300 rounded-lg text-black text-xl font-bold hover:bg-gray-400"
                >
                  Back to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
