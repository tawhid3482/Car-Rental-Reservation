import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FaCarSide, FaShuttleVan, FaBusAlt } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";

type Inputs = {
  vehicle: string;
  pickUpLocation: string;
  dropOffLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  returnOffDate: string;
  returnOffTime: string;
};

const vehicleTypes = [
  { type: "Car", icon: <FaCarSide size={30} /> },
  { type: "Van", icon: <FaShuttleVan size={30} /> },
  { type: "Minibus", icon: <FaBusAlt size={30} /> },
  { type: "Super-Car", icon: <IoCarSport size={30} /> },
];

const Pickup = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="my-8 border p-4 md:p-6 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          {/* Vehicle Selection */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What is your vehicle type?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
              {vehicleTypes.map(({ type, icon }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setSelectedVehicle(type);
                    setValue("vehicle", type);
                  }}
                  className={`flex flex-col items-center gap-1 p-4 rounded-lg text-white transition-colors ${
                    selectedVehicle === type
                      ? "bg-[#3DEEB7]"
                      : "bg-[#A20023]"
                  }`}
                >
                  <div>{icon}</div>
                  <span className="text-sm sm:text-base">{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location & Date Time */}
          <div className="w-full lg:w-1/2">
            {/* Locations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700">Pick Up Location</label>
                <input
                  {...register("pickUpLocation", { required: true })}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter pickup location"
                />
                {errors.pickUpLocation && (
                  <span className="text-red-500 text-sm">This field is required</span>
                )}
              </div>
              <div>
                <label className="block text-gray-700">Drop Off Location</label>
                <input
                  {...register("dropOffLocation", { required: true })}
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter dropoff location"
                />
                {errors.dropOffLocation && (
                  <span className="text-red-500 text-sm">This field is required</span>
                )}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700">Pick Up Date & Time</label>
                <input
                  {...register("pickUpDate", { required: true })}
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <input
                  {...register("pickUpTime", { required: true })}
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Return Date & Time</label>
                <input
                  {...register("returnOffDate", { required: true })}
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <input
                  {...register("returnOffTime", { required: true })}
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                />
              </div>
            </div>
          </div>
        </div>

        <input type="hidden" {...register("vehicle", { required: true })} />
        {errors.vehicle && (
          <p className="text-red-500 text-sm mb-4">Please select a vehicle type</p>
        )}

        <button
          type="submit"
          className="bg-[#A20023] text-white p-4 rounded-lg w-full"
        >
          Find a Vehicle
        </button>
      </form>
    </div>
  );
};

export default Pickup;
