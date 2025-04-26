/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/features/hooks";
import {
  useGetUserByEmailQuery,
  useUpdateUserMutation,
} from "../../../redux/features/auth/authApi";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading } = useGetUserByEmailQuery(user?.email);
  const [updateUser] = useUpdateUserMutation();

  const users = data?.data || {}; // ✅ user data object, not array

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // ✅ Set data into form once loaded
  useEffect(() => {
    if (users && users.email) {
      setFormData({
        name: users.name || "",
        email: users.email || "",
        phone: users.phone || "",
        address: users.address || "",
      });
    }
  }, [users]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payload before submit:", formData); // ⬅️ এইটা দাও
    try {
      const res = await updateUser({
        email: user?.email,
        payload: formData,
      }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile!");
      console.error("Update error:", error);
    }
  };
  
  if (isLoading) return <p className="text-center mt-10">Loading user data...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-white px-4 py-12">
      <div className="w-full max-w-2xl p-8 bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200">
        <h2 className="text-4xl font-bold text-center text-[#A20023] mb-8">Update Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "Full Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "text" },
            { label: "Address", name: "address", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="relative">
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                required={name === "name" || name === "email"}
                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A20023] bg-white text-gray-800 placeholder-transparent"
                placeholder={label}
              />
              <label
                htmlFor={name}
                className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#A20023]"
              >
                {label}
              </label>
            </div>
          ))}

          <button
            type="submit"
            className="w-full cursor-pointer py-3 bg-gradient-to-r from-[#A20023] to-[#C4003B] text-white font-semibold rounded-full shadow-lg hover:brightness-110 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
