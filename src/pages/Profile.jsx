import axios from "axios";
import { useEffect, useState } from "react";

export const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/profile/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data);
        setUpdatedProfile(response.data.user);
      } catch (err) {
        setError("Failed to fetch your profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-600">Loading Profile...</div>
    );

  if (error)
    return <div className="text-center mt-10 text-red-600">{error}</div>;

  const fullName = `${profile?.user?.first_name || "Dummy"} ${profile?.user?.last_name}`;
  const email = profile?.user?.username || "dummy@email.com";
  const cartCount = profile?.account?.productInCart?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Section: Avatar & Info */}
        <div className="bg-blue-600 text-white p-8 md:w-1/3 flex flex-col justify-center items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-white text-blue-600 font-bold text-3xl flex items-center justify-center">
            {profile?.user?.first_name?.[0] ?? "D"}
          </div>
          <div className="text-xl font-semibold text-center">{fullName}</div>
          <div className="text-sm text-center opacity-80">{email}</div>
        </div>

        {/* Right Section: Editable Content */}
        <div className="flex-1 p-8 space-y-6">
          <h2 className="text-2xl font-bold">Account Details</h2>

          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            {editing ? (
              <input
                type="text"
                name="first_name"
                value={updatedProfile.first_name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-lg font-medium">{fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            {editing ? (
              <input
                type="email"
                name="email"
                value={updatedProfile.email || ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            ) : (
              <p className="text-gray-700">{email}</p>
            )}
          </div>

          {/* Cart Count */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Items in Cart</label>
            <p className="text-gray-700 font-semibold">{cartCount}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={handleEditClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow"
            >
              {editing ? "Confirm Changes" : "Edit Profile"}
            </button>
            {editing && (
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md shadow">
                Change Password
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
