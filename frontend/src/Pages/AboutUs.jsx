import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center ml-10">
      <Hero
        title={"Learn More About Us | MediTrack Medical Institute"}
        imageUrl={"/about.png"}
      />
      <div className="w-full mt-8">
        <Biography imageUrl={"/whoweare.png"} />
      </div>
    </div>
  );
};

export default AboutUs;
