import { useState } from "react";
import BusinessInfo from "../Business/BusinessInfo";

const About = () => {
  const tabs = [
    {
      name: "Luxury",
      description:
        "We offer a meticulously curated collection of the most sought-after luxury vehicles on the market. Whether you prefer the sporty allure of a high-performance sports car, the sophistication of a sleek and luxurious sedan, or the versatility of a premium SUV, we have the perfect car to match your discerning taste.",
    },
    {
      name: "Comfort",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur labore dicta illum. Voluptates explicabo, nesciunt ipsa blanditiis quas perspiciatis deleniti porro vel, nisi corrupti animi? Consequatur repellendus voluptas quod autem.",
    },
    {
      name: "Prestige",
      description:
        "Consectetur adipisicing elit. Consequuntur labore dicta illum. Voluptates explicabo, nesciunt ipsa blanditiis quas perspiciatis deleniti porro vel, nisi corrupti animi? Consequatur repellendus voluptas quod autem.",
    },
  ];

  const [selected, setSelected] = useState<string>("Luxury");

  const currentTab = tabs.find((tab) => tab.name === selected);

  return (
    <div>
      <div className="bg-[#d58ca9] hover:bg-[#96b8ad] h-60 flex justify-center items-center">
        <p className="text-2xl md:text-4xl font-bold text-black">About Us</p>
      </div>
      <br />
      <BusinessInfo />

      <div className="">
        <section className="flex flex-col md:flex-row items-center justify-between bg-gray-100 py-12 px-6 border my-2 rounded-lg">
          {/* Left Image */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="https://img.freepik.com/free-photo/looking-vehicle-interior-female-customer-modern-stylish-bearded-businessman-automobile-saloon_146671-16013.jpg"
              alt="Client in car"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0b1f61] mb-6">
              Only Quality For Clients
            </h2>

            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setSelected(tab.name)}
                  className={`px-5 py-2 rounded-md text-sm font-semibold transition-all cursor-pointer ${
                    selected === tab.name
                      ? "bg-[#00C805] text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-300"
                  }`}
                >
                  {tab.name.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed text-base">
              {currentTab?.description}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
