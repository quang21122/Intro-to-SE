import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import avatar from "../assets/avatar_default.png";
import pen from "../assets/pen.png";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [ischangePassword, setIsChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const { user, loading, changePassword } = useAuth();
  const { myProfile, updateProfile } = useProfile();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    height: "",
    weight: "",
    gender: "",
    goalHeight: "",
    goalWeight: "",
    goalBody: "",
  });

  useEffect(() => {
    if (!loading && user && myProfile) {
      setProfile({
        name: user.displayName || "",
        email: user.email || "",
        height: myProfile.height || "",
        weight: myProfile.weight || "",
        gender: myProfile.gender || "",
        goalHeight: myProfile.goalHeight || "",
        goalWeight: myProfile.goalWeight || "",
        goalBody: myProfile.goalBody || "",
      });
    }
  }, [user, myProfile, loading]);

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
    if (!user) {
      alert("User not authenticated");
      return;
    }

    // use the updateProfile function from the ProfileContext
    const updatedProfile = {
      height: profile.height,
      weight: profile.weight,
      gender: profile.gender,
      goalHeight: profile.goalHeight,
      goalWeight: profile.goalWeight,
      goalBody: profile.goalBody,
    };

    updateProfile(user.uid, updatedProfile)
      .then((res) => {
        if ("error" in res) {
          alert("Failed to update profile. Please try again.");
          return;
        }
        alert(res.message);
      })
      .catch((error) => {
        console.error("Update profile failed", error);
        alert("Failed to update profile. Please try again.");
      });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the new password and verify password match
    if (newPassword !== verifyPassword) {
      alert("New password and verify password do not match");
      return;
    }

    if (!user) {
      alert("User not authenticated");
      return;
    }

    // Call the changePassword function from the AuthContext
    try {
      const res = await changePassword(currentPassword, newPassword);
      if ("error" in res) {
        alert("Failed to change password. Please try again.");
        setCurrentPassword("");
        setNewPassword("");
        setVerifyPassword("");
        return;
      }
      alert("Password changed successfully");
      // Reset form fields
      setCurrentPassword("");
      setNewPassword("");
      setVerifyPassword("");
      setIsChangePassword(false);
    } catch (error) {
      console.error("Change password failed", error);
      alert("Failed to change password. Please try again.");
    }
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

              <div className="text-sm">{profile.email}</div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm">Password</label>
                <button
                  className="text-xs underline"
                  onClick={() => setIsChangePassword(!ischangePassword)}
                >
                  Change
                </button>
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

      {/* Change Password Modal */}
      {ischangePassword && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#E7E7E7] p-8 rounded-3xl shadow-xl w-[30rem]">
            <h2 className="text-2xl mb-4 font-raleway tracking-widest font-bold text-center">
              Change Password
            </h2>
            <div className="mt-2">
              <label
                htmlFor="currentPassword"
                className="block text-[#605D5D] font-raleway font-medium tracking-wider"
              >
                Current password
              </label>
              <input
                type="text"
                id="currentPassword"
                name="currentPassword"
                className="w-full p-2 my-2 border-2 border-black rounded-xl focus:outline-none focus:border-red-400 bg-white text-black"
                autoComplete="off"
                autoCorrect="off"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <label
                htmlFor="newPassword"
                className="block text-[#605D5D] font-raleway font-medium tracking-wider"
              >
                New password
              </label>
              <input
                type="text"
                id="newPassword"
                name="newPassword"
                className="w-full p-2 my-2 border-2 border-black rounded-xl focus:outline-none focus:border-red-400 bg-white text-black"
                autoComplete="off"
                autoCorrect="off"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <label
                htmlFor="verifyPassword"
                className="block text-[#605D5D] font-raleway font-medium tracking-wider"
              >
                Verify password
              </label>
              <input
                type="text"
                id="verifyPassword"
                name="verifyPassword"
                className="w-full p-2 mt-2 border-2 border-black rounded-xl focus:outline-none focus:border-red-400 bg-white text-black"
                autoComplete="off"
                autoCorrect="off"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
              />
              <button
                type="submit"
                onClick={handleChangePassword}
                className="w-full py-2 mt-6 bg-black rounded-lg text-white text-xl font-bold hover:bg-[#605D5D]"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsChangePassword(false)}
                className="w-full py-2 mt-4 bg-gray-300 rounded-lg text-black text-xl font-bold hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
