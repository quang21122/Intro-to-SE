import Navbar from "../components/Navbar";
import avatar from "../assets/avatar_default.png";

export default function Profile() {
  return (
    <div className="flex min-h-screen relative w-full">
      <div className="absolute w-full">
        <Navbar isHomepage={false} />
      </div>
      {/* Left Sidebar */}
      <div className=" w-64 bg-[#A91E3B] p-6 text-white">
        <div className="mb-8 mt-20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="">
              <img
                src={avatar}
                alt="Avatar"
                className="w-14 h-14 rounded-full"
              />
            </div>
            <div className="text-lg">Thien</div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <div className="text-sm">thienHaf@gmail.com</div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm">Password</label>
                <button className="text-xs underline">Change</button>
              </div>
              <div className="text-sm">••••••••••••••</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" flex-1 bg-[#212121]">
        {/* Profile Content */}
        <div className="p-8 mt-20 mx-20">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl text-white">Profile Information</h1>
            <button className="px-4 py-1 bg-[#A91E3B] text-white rounded hover:bg-[#c73857]">
              Edit
            </button>
          </div>

          {/* Status Section */}
          <div className="mb-8">
            <h2 className="text-white mb-4">Status</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Height
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 text-white p-2 rounded"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Weight
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 text-white p-2 rounded"
                  disabled
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-2">Gender</label>
              <select
                className="w-full bg-gray-700 text-white p-2 rounded"
                disabled
              >
                <option>Select gender</option>
              </select>
            </div>
          </div>

          {/* Goal Section */}
          <div>
            <h2 className="text-white mb-4">Goal</h2>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Goal Height
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 text-white p-2 rounded"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Goal Weight
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 text-white p-2 rounded"
                  disabled
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Goal Body
              </label>
              <select
                className="w-full bg-gray-700 text-white p-2 rounded"
                disabled
              >
                <option>Select goal body</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
