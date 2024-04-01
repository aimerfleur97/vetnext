"use client";
import React, { useState } from "react";
import { True } from "../../components/icons";
import Step1 from "./step1";
import Step2 from "./step2";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/navbar";

const Stepper = () => {
  const router = useRouter();
  const [steps, setSteps] = useState(1);
  const [activeCategory, setActiveCategory] = useState("");
  const [selectedValue, setSelectedValue] = useState("Beaconsfield"); // State to store the selected value

  // Function to handle dropdown value change
  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value); // Update the selected value in state
  };
  const categoryHandler = (data) => {
    setActiveCategory(data);
  };
  const stepsHandler = (data) => {
    if (!activeCategory) {
      toast.warn("Please Select one category");
    } else {
      setSteps(data);
    }
    if (data == 3) {
      router.push("/doctors");
    }
  };
  return (
    <>
      <Navbar />
      <section className="h-screen bg-white pt-20">
        <div className=" px-16 w-full mx-auto max-w-7xl flex items-center flex-col">
          <ol className="flex items-center justify-between w-96">
            <li
              className={`flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b ${steps == 2 ? "after:border-blue" : "after:border-gray-100"
                }  after:border-4 after:inline-block`}
            >
              <span
                className={`flex items-center justify-center w-10 h-10 ${activeCategory ? "bg-blue" : "bg-gray-900 border border-blue"
                  }  rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}
              >
                <True />
              </span>
            </li>
            <li className="flex items-center">
              <span className="flex items-center justdivify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0"></span>
            </li>
          </ol>
          {steps == 1 && (
            <Step1
              activeCategory={activeCategory}
              categoryHandler={categoryHandler}
            />
          )}
          {steps == 2 && (
            <Step2
              selectedValue={selectedValue}
              handleDropdownChange={handleDropdownChange}
            />
          )}
          <div className="mt-10">
            <button
              className="btn bg-gray-100 px-7 py-1 rounded"
              onClick={() => stepsHandler(1)}
            >
              Prev
            </button>
            <button
              className="btn bg-blue px-7 py-1 rounded ml-3"
              onClick={() => stepsHandler(steps == 1 ? 2 : steps == 2 ? 3 : 2)}
            >
              Next
            </button>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Stepper;
