/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useDeleteCarMutation,
  useGetAllCarsQuery,
} from "../../../redux/features/car/carApi";
import Swal from "sweetalert2";
import { TCar } from "../../../types/car";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ManageCars = () => {
  const { data, isLoading, isError } = useGetAllCarsQuery("");
  const [deleteCar] = useDeleteCarMutation();

  const cars = data?.data || [];

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteCar(id).unwrap();
        Swal.fire("Deleted!", "Your Cart has been deleted.", "success");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (isLoading) return <p className="p-4 text-gray-600">Loading cars...</p>;
  if (isError) return <p className="p-4 text-red-500">Error loading cars.</p>;

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-gray-800">
        🚗 Manage All Cars
      </h2>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-[640px] w-full bg-white text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Price/hr</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Color</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y divide-gray-100">
            {cars.map((car: TCar) => (
              <tr key={car._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">
                  <img
                    src={car.image?.[0]}
                    alt={car.name}
                    className="w-20 h-14 object-cover rounded-md border"
                  />
                </td>
                <td className="px-4 py-3 font-medium">{car.name}</td>
                <td className="px-4 py-3">${car.pricePerHour}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium 
                  ${
                    car.status === "available"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                  >
                    {car.status}
                  </span>
                </td>
                <td className="px-4 py-8 flex items-center gap-2 capitalize">
                  <span
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: car.color }}
                  ></span>
                  <span className="font-medium">{car.color}</span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <Link to={`update/${car._id}`}>
                    <button className="bg-[#b7e0d3] text-[#A20023]  hover:bg-blue-200 transition px-3 py-1 rounded text-sm">
                      ✏️ Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="bg-[#cac4c6]  text-[#A20023]  hover:bg-red-200 transition px-3 py-1 rounded text-sm"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;
