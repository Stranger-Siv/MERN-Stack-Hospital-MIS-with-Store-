import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";

const Home = () => {
  return (
    <div className="flex flex-col items-center ml-10"> {/* Added margin-left */}
      <Hero
        title="Welcome to MediTrack Medical Institute | Your Trusted Healthcare Provider"
        imageUrl="/hero.png"
      />
      <div>
        <Biography imageUrl="/about.png" />
        <Departments />
        <MessageForm />
      </div>
    </div>
  );
};

export default Home;
