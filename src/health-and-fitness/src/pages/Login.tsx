export default function Login() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
        <div className="bg-white p-8 rounded-lg shadow-xl w-96">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <form className="mt-6">
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-800 font-bold">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-2 mt-1 border-b border-gray-300 focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-800 font-bold"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full p-2 mt-1 border-b border-gray-300 focus:outline-none focus:border-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
