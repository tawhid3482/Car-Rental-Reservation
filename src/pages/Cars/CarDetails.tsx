/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FaCarSide,
  FaDoorOpen,
  FaSuitcaseRolling,
  FaUser,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState } from "react";

const CarDetails = () => {
  const { id } = useParams();

  const cars = [
    {
      id: "1",
      type: "Car",
      name: "Ferrari",
      carImage: [
        "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg",
        "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
        "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg",
      ],
      price: "250",
      sit: 6,
      bag: 3,
      door: 4,
      love: 25,
      description:
        "Experience the thrill of driving a Ferrari. Fast, luxurious, and unforgettable. Perfect for special occasions or just because.",
      pickUpLocation: "Dhaka",
      dropOffLocation: "Chittagong",
    },
  ];

  const car = cars.find((c) => c.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [formData, setFormData] = useState({
    pickUpDate: "",
    dropOffDate: "",
    pickUpTime: "",
    dropOffTime: "",
  });

  if (!car) return <p className="text-center mt-12 text-xl">Car not found!</p>;

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
      prevIndex === 0 ? car.carImage.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === car.carImage.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 space-y-10">
      {/* Car Image Slider */}
      <div className="flex justify-center gap-10 items-start">
        {/* Car Image Slider */}
        {/* Car Image Slider with Bottom Right Buttons and Thumbnails */}
        <div className="relative w-2/3">
          {/* Main Image */}
          <div className="h-80 md:h-[400px] overflow-hidden rounded-xl shadow-md relative">
            <img
              key={currentImageIndex}
              src={car.carImage[currentImageIndex]}
              alt={`Car ${car.name}`}
              className="w-full h-full object-cover rounded-xl transition-transform duration-700 ease-in-out transform"
            />

            {/* Bottom Right Navigation Buttons */}
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
            {car.carImage.map((img, idx) => (
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
          <p className="text-2xl font-bold text-[#833d47]">
            ${car.price} / per hour
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
