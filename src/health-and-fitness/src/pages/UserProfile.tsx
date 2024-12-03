import { useState } from "react";
import Navbar from "../components/Navbar";
import avatar from "../assets/avatar_default.png";
import pen from "../assets/pen.png";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Thien",
    email: "thienHaf@gmail.com",
    height: "",
    weight: "",
    gender: "Select gender",
    goalHeight: "",
    goalWeight: "",
    goalBody: "Select goal body",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    setIsEditing(false);
    // Add logic to save changes (e.g., send data to backend)
    console.log("Saved profile:", profile);
  };

  return (
    <div className="flex min-h-screen relative w-full">
      <div className="absolute w-full">
        <Navbar isHomepage={false} />
      </div>
      {/* Left Sidebar */}
      <div className="w-64 bg-[#A91E3B] p-6 text-white">
        <div className="mb-8 mt-20">
          <div className="flex items-center space-x-3 mb-6">
            <div>
              <img
                src={avatar}
                alt="Avatar"
                className="w-14 h-14 rounded-full"
              />
            </div>
            <div className="text-lg">{profile.name}</div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              {isEditing ? (
                <input
                  type="text"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white p-2 rounded"
                />
              ) : (
                <div className="text-sm">{profile.email}</div>
              )}
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
      <div className="flex-1 bg-[#212121]">
        <div className="p-8 mt-20 mx-20">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl text-white">Profile Information</h1>
            {isEditing ? (
              <button
                onClick={saveChanges}
                className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={toggleEditMode}
                className="px-4 py-1 bg-[#A91E3B] text-white rounded hover:bg-[#c73857]"
              >
                Edit
              </button>
            )}
          </div>

          {/* Status Section */}
          <div className="mb-8">
            <h2 className="text-white mb-4">Status</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Height
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="height"
                    value={profile.height}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700 text-white p-2 rounded pr-10 ${
                      isEditing ? "" : "disabled"
                    }`}
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <img
                      src={pen}
                      alt="Edit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-80"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Weight
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="weight"
                    value={profile.weight}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700 text-white p-2 rounded pr-10 ${
                      isEditing ? "" : "disabled"
                    }`}
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <img
                      src={pen}
                      alt="Edit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-80"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-2">Gender</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleInputChange}
                className={`w-full bg-gray-700 text-white p-2 rounded ${
                  isEditing ? "" : "disabled"
                }`}
                disabled={!isEditing}
              >
                <option>Select gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          {/* Goal Section */}
          <div>
            <h2 className="text-white mb-4">Goal</h2>

            <div className="grid grid-cols-2 gap-6 mb-4">
              {/* Goal Height */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Goal Height
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="goalHeight"
                    value={profile.goalHeight}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700 text-white p-2 rounded pr-10 ${
                      isEditing ? "" : "disabled"
                    }`}
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <img
                      src={pen}
                      alt="Edit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-80"
                    />
                  )}
                </div>
              </div>

              {/* Goal Weight */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Goal Weight
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="goalWeight"
                    value={profile.goalWeight}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-700 text-white p-2 rounded pr-10 ${
                      isEditing ? "" : "disabled"
                    }`}
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <img
                      src={pen}
                      alt="Edit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-80"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Goal Body */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Goal Body
              </label>
              <div className="">
                <select
                  name="goalBody"
                  value={profile.goalBody}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-700 text-white p-2 rounded pr-10 ${
                    isEditing ? "" : "disabled"
                  }`}
                  disabled={!isEditing}
                >
                  <option>Select goal body</option>
                  <option>Lean</option>
                  <option>Muscular</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
