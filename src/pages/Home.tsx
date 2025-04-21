import Cars from "./Cars/Cars";
import FAQSection from "./FAQ/FAQ";
import Features from "./Features/Features";
import Hero from "./Hero/Hero";
import News from "./News/News";

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <Cars />
      <Features />
      <News />
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;
