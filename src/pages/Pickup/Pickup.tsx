import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FaCarSide, FaShuttleVan,  } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaUser, FaSuitcaseRolling, FaDoorOpen } from "react-icons/fa";
import { useGetAllCarsQuery } from "../../redux/features/car/carApi";
import { TCar } from "../../types/car";

type Inputs = {
  type: string;
  carName: string;
};

const vehicleTypes = [
  { type: "Car", icon: <FaCarSide size={30} /> },
  { type: "Van", icon: <FaShuttleVan size={30} /> },
  { type: "electric", icon: <FaCarSide size={30} /> },
  { type: "Super-Car", icon: <IoCarSport size={30} /> },
];

const Pickup = () => {
  const { data } = useGetAllCarsQuery("");
  const availableVehicles = data?.data || [];

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<Inputs>();
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [matchedVehicles, setMatchedVehicles] = useState<typeof availableVehicles>([]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // If the user selects a vehicle type, filter only vehicles with the selected type
    const matches = availableVehicles.filter((vehicle: TCar) => {
      const selectedTypeNormalized = data.type.toLowerCase();
      const vehicleTypeNormalized = vehicle.type.toLowerCase();
      const nameMatch = vehicle.name.toLowerCase().includes(data.carName.toLowerCase());
  
      // Only return vehicles that match both the selected type and optionally the car name
      return vehicleTypeNormalized === selectedTypeNormalized && 
             (data.carName === "" || nameMatch);
    });
  
    setMatchedVehicles(matches);
  };
  

  return (
    <div className="my-8 border p-4 md:p-6 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          {/* Vehicle Selection */}
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What is your vehicle type?
            </h2>
            <div className="flex justify-evenly items-center gap-4 my-6">
              {vehicleTypes.map(({ type, icon }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setSelectedVehicle(type);
                    setValue("type", type); // Updated to use 'type' field
                  }}
                  className={`w-40 flex flex-col items-center gap-1 p-4 rounded-lg text-white transition-colors ${
                    selectedVehicle === type ? "bg-[#3DEEB7]" : "bg-[#A20023]"
                  }`}
                >
                  <div>{icon}</div>
                  <span className="text-sm sm:text-base">{type}</span>
                </button>
              ))}
            </div>

            <div className="my-5">
              <label className="block text-gray-700">Vehicle Name</label>
              <input
                {...register("carName")}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter car name"
              />
            </div>
          </div>
        </div>

        <input type="hidden" {...register("type", { required: true })} />

        <button
          type="submit"
          className="bg-[#A20023] cursor-pointer text-white p-4 rounded-lg w-full"
        >
          Find a Vehicle
        </button>
      </form>

      {/* Show Matched Vehicles */}
      {matchedVehicles.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Available Vehicles:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {matchedVehicles.map((vehicle:TCar) => (
              <motion.div
                key={vehicle._id}
                className="w-full bg-[#f3eef0] rounded-2xl shadow-xl overflow-hidden p-2"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.img
                  src={vehicle.image[0]}
                  alt={vehicle.name}
                  className="w-full h-56 object-cover rounded-2xl border"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{vehicle.name}</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-lg">
                    <div className="flex items-center gap-1 text-[#28c76f]">
                      <FaUser />
                      <span className="text-[#00194A] font-semibold">
                        {vehicle.sit}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[#28c76f]">
                      <FaSuitcaseRolling />
                      <span className="text-[#00194A] font-semibold">
                        {vehicle.bag}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[#28c76f]">
                      <FaDoorOpen />
                      <span className="text-[#00194A] font-semibold">
                        {vehicle.door}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[#28c76f]">
                      <FaCarSide />
                      <span className="text-[#00194A] font-bold">
                        {vehicle.type}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-300"></div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Per hour rent</p>
                      <p className="text-2xl font-bold">
                        ${vehicle.pricePerHour}
                      </p>
                    </div>
                    <button className="bg-[#A20023] hover:bg-[#88001c] text-white px-4 py-2 rounded-xl transition duration-300">
                      Rent Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {matchedVehicles.length === 0 && selectedVehicle && (
        <p className="text-red-500 mt-4">No vehicles matched your search.</p>
      )}
    </div>
  );
};

export default Pickup;
