import { useGetUserByEmailQuery } from "../../../redux/features/auth/authApi";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/features/hooks";
import { Link } from "react-router-dom";
import { UserCircle2 } from "lucide-react";

const Profile = () => {
  const user = useAppSelector(selectCurrentUser);
  const skip = !user?.email;
  const { data, isLoading, isError } = useGetUserByEmailQuery(user?.email, {
    skip,
  });

  const users = data?.data || []

  if (isLoading) {
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center mt-20 text-red-500">
        Failed to load profile information.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-3xl border border-gray-100">
      {/* Top Section */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="bg-gray-100 rounded-full w-28 h-28 flex items-center justify-center shadow-lg">
          <UserCircle2 className="text-gray-400 w-24 h-24" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">{users.name}</h2>
        <p className="text-sm text-gray-500 italic">{users.email}</p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-[15px]">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="font-semibold text-gray-600">Phone Number</p>
          <p>{users.phone || "Not provided"}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="font-semibold text-gray-600">Address</p>
          <p>{users.address || "Not provided"}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="font-semibold text-gray-600">Role</p>
          <p className="capitalize">{users.role}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="font-semibold text-gray-600">Joined At</p>
          <p>{new Date(users.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Button */}
      <div className="text-center mt-10">
        <Link
          to="/dashboard/updateProfile"
          className="inline-block bg-gradient-to-r from-[#A20023] to-[#C4003B] hover:brightness-110 text-white px-8 py-2 rounded-full transition-all shadow-lg"
        >
          Update Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;
