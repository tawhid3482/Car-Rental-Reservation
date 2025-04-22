import BusinessInfo from "./Business/BusinessInfo";
import Cars from "./Cars/Cars";
import FAQSection from "./FAQ/FAQ";
import Features from "./Features/Features";
import Hero from "./Hero/Hero";
import News from "./News/News";
import Pickup from "./Pickup/Pickup";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <Cars />
      <Features />
      <Pickup />
      <News />
      <BusinessInfo />
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;
