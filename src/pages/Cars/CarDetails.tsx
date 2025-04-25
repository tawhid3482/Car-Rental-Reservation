/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FaCarSide,
  FaDoorOpen,
  FaSuitcaseRolling,
  FaUser,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetSingleCarQuery } from "../../redux/features/car/carApi";

const CarDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleCarQuery(id);
  const car = data?.data;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [formData, setFormData] = useState({
    pickUpDate: "",
    dropOffDate: "",
    pickUpTime: "",
    dropOffTime: "",
  });

  if (isLoading) return <p className="text-center mt-12 text-xl">Loading...</p>;
  if (isError || !car)
    return <p className="text-center mt-12 text-xl">Car not found!</p>;

  const handleChange = (e: any) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBooking = (e: any) => {
    e.preventDefault();
    console.log("Booking submitted:", { ...formData, car });
    alert("Booking Submitted!");
  };

  const isFormComplete =
    formData.pickUpDate &&
    formData.dropOffDate &&
    formData.pickUpTime &&
    formData.dropOffTime;

  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? car.image.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === car.image.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 space-y-10">
      {/* Car Image Slider */}
      <div className="flex justify-center gap-10 items-start">
        <div className="relative w-2/3">
          <div className="h-80 md:h-[400px] overflow-hidden rounded-xl shadow-md relative">
            <img
              key={currentImageIndex}
              src={car.image[currentImageIndex]}
              alt={`Car ${car.name}`}
              className="w-full h-full object-cover rounded-xl transition-transform duration-700 ease-in-out transform"
            />
            <div className="absolute bottom-3 right-3 flex gap-3">
              <button
                onClick={showPreviousImage}
                className="bg-[#A20023] text-white p-2 rounded-full hover:bg-black shadow"
              >
                &#8592;
              </button>
              <button
                onClick={showNextImage}
                className="bg-[#A20023] text-white p-2 rounded-full hover:bg-black shadow"
              >
                &#8594;
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center mt-4 gap-3">
            {car.image.map((img: string, idx: number) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-20 h-14 object-cover rounded-md cursor-pointer border-2 ${
                  currentImageIndex === idx
                    ? "border-[#833d47] scale-105"
                    : "border-transparent"
                } transition-transform duration-300`}
              />
            ))}
          </div>
        </div>

        {/* Car Info */}
        <div className="space-y-4 w-1/3">
          <h2 className="text-4xl font-bold text-[#00194A]">{car.name}</h2>

          <div className="flex flex-wrap gap-4 text-[#3DEEB7] text-xl">
            <div className="flex items-center gap-2">
              <FaUser />{" "}
              <span className="text-[#00194A] font-semibold">{car.sit}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaSuitcaseRolling />{" "}
              <span className="text-[#00194A] font-semibold">{car.bag}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaDoorOpen />{" "}
              <span className="text-[#00194A] font-semibold">{car.door}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCarSide />{" "}
              <span className="text-[#00194A] font-bold">{car.type}</span>
            </div>
          </div>

          <p className="text-gray-600">{car.description}</p>
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4 border border-gray-100">
            <h3 className="text-2xl font-bold text-[#00194A]">Car Overview</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-gray-700 font-medium">
                <span className="text-gray-500">Color: </span>
                <span
                  className={`inline-block w-4 h-4 rounded-full ml-2 border`}
                  style={{ backgroundColor: car.color }}
                  title={car.color}
                ></span>
              </div>

              <div className="text-gray-700 font-medium">
                <span className="text-gray-500">Electric: </span>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    car.isElectric
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {car.isElectric ? "Yes" : "No"}
                </span>
              </div>

              <div className="text-gray-700 font-medium">
                <span className="text-gray-500">Status: </span>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    car.status === "available"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {car.status}
                </span>
              </div>

              <div className="text-gray-700 font-medium col-span-2">
                <span className="text-gray-500">Features:</span>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
                  {car.features?.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="text-2xl font-bold text-[#833d47]">Price:
            ${car.pricePerHour} / per hour
          </p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="bg-[#f6f6f6] p-6 rounded-xl shadow space-y-6">
        <h3 className="text-2xl font-semibold text-[#00194A]">Book This Car</h3>
        <form
          onSubmit={handleBooking}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block mb-1 font-medium">Pick-Up Date</label>
            <input
              type="date"
              name="pickUpDate"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Drop-Off Date</label>
            <input
              type="date"
              name="dropOffDate"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Pick-Up Time</label>
            <input
              type="time"
              name="pickUpTime"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Drop-Off Time</label>
            <input
              type="time"
              name="dropOffTime"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition-all ${
                isFormComplete
                  ? "bg-[#833d47] hover:bg-[#6d303b]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormComplete}
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarDetails;
