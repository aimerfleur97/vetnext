import DoctorList from "@/components/doctorslist.js";
import Navbar from "@/components/navbar";
import React from "react";

const Doctors = () => {
  return (
    <>
      <Navbar />
      <section className="bg-white min-h-screen">
        <DoctorList />
      </section>
    </>
  );
};

export default Doctors;
