import { FaBookmark, FaRoad, FaTrophy, FaTruckPickup } from "react-icons/fa";
import car from "../../assets/images/super-car.png";
const Features = () => {
  return (
    <div className="p-2">
      <div className="text-center mb-3">
        <span className="text-[#3DEEB7] text-lg px-2 rounded-lg bg-[#93848a]">
          why choose us
        </span>
        <h2 className="text-2xl font-bold md:text-4xl">Our Features</h2>
        <p className="text-gray-600 mt-2">
          Discover a world of convenience, safety, and customization, paving the{" "}
          <br />
          way for unforgettable adventures and seamless mobility solutions.
        </p>
      </div>
      <div className="flex-1 lg:flex items-center justify-between gap-5 mx-5">
        <div className="flex-1 my-5 md:my-0 space-y-2">
          <div className="flex items-start justify-between gap-5">
            <div className="">
              <FaTrophy className="text-6xl text-[#3DEEB7]" />
            </div>
            <div className="">
              <p className="text-xl font-bold">First class services</p>
              <p className="text-gray-600">
                Where luxury meets exceptional care, creating unforgettable
                moments and exceeding your every expectation.
              </p>
            </div>
          </div>
          <div className="flex items-start justify-between gap-5">
            <div className="">
              <FaRoad className="text-6xl text-[#3DEEB7]" />
            </div>
            <div className="">
              <p className="text-xl font-bold">24/7 road assistance</p>
              <p className="text-gray-600">
                Reliable support when you need it most, keeping you on the move
                with confidence and peace of mind.
              </p>
            </div>
          </div>
        </div>

        <div className="">
          <img
            src={car}
            alt="Super Car"
            className="w-full -scale-x-100 drop-shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-5">
            <div className="">
              <FaBookmark className="text-6xl text-[#3DEEB7]" />
            </div>
            <div className="">
              <p className="text-xl font-bold">Quality at Minimum Expense</p>
              <p className="text-gray-600">
                Unlocking affordable brilliance with elevating quality while
                minimizing costs for maximum value.
              </p>
            </div>
          </div>
          <div className="flex items-start justify-between gap-5">
            <div className="">
              <FaTruckPickup className="text-6xl text-[#3DEEB7]" />
            </div>
            <div className="">
              <p className="text-xl font-bold">Free Pick-Up & Drop-Off</p>
              <p className="text-gray-600">
                Enjoy free pickup and drop-off services, adding an extra layer
                of ease to your car rental experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
