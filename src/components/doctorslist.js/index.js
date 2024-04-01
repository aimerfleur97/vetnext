"use client";
import React, { useState } from "react";
import List from "./lists";
import Footer from "../footer/page";

const DoctorList = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <>
      <div className="w-full mx-auto py-10 bg-white">
        <div className="w-full max-w-xl mb-14 mx-auto text-center">
          <h4 className="font-sans font-semibold text-xs tracking-widest uppercase mb-3 text-blue">
            Healthcare Professionals
          </h4>
          <h2 className="font-sans text-4xl font-medium mb-4 text-black">
            Our great doctors
          </h2>
          <p className="text-lg text-light_black">
          Our dedicated vets are ready to care for your pets. Book now and keep those tails wagging!
          </p>
        </div>
        <List activeCategory={activeCategory} />
      </div>
      <Footer />
    </>
  );
};

export default DoctorList;
