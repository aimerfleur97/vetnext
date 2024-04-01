import React from "react";
import { Icon } from "@iconify/react";

const Step1 = ({activeCategory ,categoryHandler}) => {
  return (
    <>
    <label
          className="block uppercase mt-5 font-sans text-2xl m-auto tracking-wide text-black font-bold mb-2 flex justify-center"
          for="grid-state"
        >
         Who is the appointment for?
        </label>
      <div className="flex flex-wrap cursor-pointer mt-5 -m-4 text-center justify-center">
        <div className="p-4 w-40 hover:text-blue" onClick={()=>categoryHandler("Dog")}>
          <div className={`border-2 ${activeCategory == "Dog" ? "border-blue" : "border-gray-200"} hover:border-blue px-4 py-6 rounded-lg flex flex-col items-center`}>
            <Icon icon="fa6-solid:dog" className="text-light_black hover:text-blue" style={{ fontSize: "40px" }} />
            <p className="leading-relaxed font-sans mt-4 text-light_black">Dog</p>
          </div>
        </div>
        <div className="p-4 w-40 hover:text-blue cursor-pointer text-center justify-center" onClick={()=>categoryHandler("Cat")}>
          <div className={`border-2 ${activeCategory == "Cat" ? "border-blue" : "border-gray-200"} hover:border-blue px-4 py-6 rounded-lg flex flex-col items-center`}>
            <Icon icon="fa-solid:cat" className="text-light_black hover:text-blue" style={{ fontSize: "40px" }} />
            <p className="leading-relaxed font-sans mt-4 text-light_black">Cat</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
