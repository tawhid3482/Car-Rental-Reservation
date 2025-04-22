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
      {/* Hero Section */}
      <div className="bg-[#d58ca9] hover:bg-[#96b8ad] h-40 md:h-60 flex justify-center items-center transition-all duration-300">
        <p className="text-xl sm:text-3xl md:text-4xl font-bold text-black">
          About Us
        </p>
      </div>

      <BusinessInfo />

      {/* About Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between bg-gray-100 py-10 px-4 sm:px-6 md:px-10 border my-4 rounded-lg gap-8">
        {/* Left Image */}
        <div className="w-full lg:w-1/2">
          <img
            src="https://img.freepik.com/free-photo/looking-vehicle-interior-female-customer-modern-stylish-bearded-businessman-automobile-saloon_146671-16013.jpg"
            alt="Client in car"
            className="rounded-xl shadow-lg w-full h-auto object-cover max-h-[400px] md:max-h-[500px]"
          />
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b1f61] mb-6 text-center lg:text-left">
            Only Quality For Clients
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setSelected(tab.name)}
                className={`px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out cursor-pointer ${
                  selected === tab.name
                    ? "bg-[#00C805] text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
              >
                {tab.name.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed text-base text-center lg:text-left">
            {currentTab?.description}
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
