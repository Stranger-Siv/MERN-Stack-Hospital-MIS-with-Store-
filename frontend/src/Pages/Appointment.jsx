import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <div className="flex flex-col items-center ml-10">
      <Hero
        title={"Schedule Your Appointment | MediTrack Medical Institute"}
        imageUrl={"/signin.png"}
      />
      <div className="w-full mt-8">
        <AppointmentForm />
      </div>
    </div>
  );
};

export default Appointment;
