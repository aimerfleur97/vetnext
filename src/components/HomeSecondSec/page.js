"use client"
import { Icon } from "@iconify/react";
import React from "react";

const HomeSecondSec = () => {
  return (
    <>
      <div className="w-full mx-auto  px-10 bg-grayNew py-14" style={{zIndex: 2}} id="explore">
        <div className="w-full max-w-xxl mb-14">
          <h4 className="font-sans font-semibold text-xs tracking-widest uppercase mb-3 text-blue">
            On-Demand Healthcare
          </h4>
          <h2 className="font-sans text-4xl font-medium mb-4 text-black">
            Forget about the hassle
          </h2>
          <p className="text-lg text-black">
          Welcome to our platform for on-demand pet healthcare. We prioritize convenience and excellence in caring for your furry friends. Join us for hassle-free, quality care.
          </p>
        </div>

        <div
          className="grid md:grid-cols-3 ltablet:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-12"
          x-intersect="activeStep = ''"
        >
          <div className="p-5 border border-light_black rounded-md">
            <div className="font-sans">
              <i className="iconify w-7 h-7 mb-2 text-blue"><Icon icon="ri:time-line" style={{ fontSize: "36px" }} /></i>
              <h4 className="font-bold text-lg mb-2 text-light_black">
                Save time & effort
              </h4>
              <p className="text-sm text-light_black">
              Connect with local vets effortlessly, saving you time while prioritizing the well-being of your pets. Seamless in-person care, just a click away.
              </p>
            </div>
          </div>
          <div className="p-5 border border-light_black rounded-md">
            <div className="font-sans ">
              <i className="iconify w-7 h-7 mb-2 text-secondary"><Icon icon="mingcute:plus-fill" style={{ fontSize: "36px" }} /></i>
              <h4 className="font-bold text-lg mb-2 text-light_black">
                Curated professionals
              </h4>
              <p className="text-sm text-light_black">
              Access our network of curated professionals, committed to delivering excellence in pet care and ensuring your furry friends receive the highest standards of expertise and attention.
              </p>
            </div>
          </div>
          <div className="p-5 border border-light_black rounded-md">
            <div className="font-sans">
              <i className="iconify w-7 h-7 mb-2 text-secondary"><Icon icon="material-symbols:cardiology" style={{ fontSize: "36px" }} /></i>
              <h4 className="font-bold text-lg mb-2 text-light_black">
                Connected services
              </h4>
              <p className="text-sm text-light_black">
              Discover a new level of convenience with our connected services, designed to integrate and simplify all aspects of your pet care journey for a hassle-free and comprehensive experience.
              </p>
            </div>
          </div>
          <div className="p-5 border border-light_black rounded-md">
            <div className="font-sans">
              <i className="iconify w-7 h-7 mb-2 text-blue"><Icon icon="lucide:video"  style={{ fontSize: "36px" }} /></i>
              <h4 className="font-bold text-lg mb-2 text-light_black">
                Video consultations
              </h4>
              <p className="text-sm text-light_black">
              Embrace the future of pet care with our video consultations, connecting you directly with skilled professionals for tailored advice and support, all from the convenience of your home.
              </p>
            </div>
          </div>
          <div className="p-5 border border-light_black rounded-md">
            <div className="font-sans">
              <i className="iconify w-7 h-7 mb-2 text-secondary"><Icon icon="material-symbols:call-outline" style={{ fontSize: "36px" }} /></i>
              <h4 className="font-bold text-lg mb-2 text-light_black">
                Audio consultations
              </h4>
              <p className="text-sm text-light_black">
              Listen to expert advice with ease through our audio consultations, providing a convenient and accessible way to ensure personalized care for your furry companion anytime, anywhere.
              </p>
            </div>
          </div>
          <div className="p-5 border border-light_black rounded-md">
            <div className="font-sans">
              <i className="iconify w-7 h-7 mb-2 text-blue"><Icon icon="ph:calendar"  style={{ fontSize: "36px" }} /></i>
              <h4 className="font-bold text-lg mb-2 text-light_black">
                Appointements
              </h4>
              <p className="text-sm text-light_black">
              Streamline your pet&apos;s healthcare journey with our user-friendly appointment booking system. From check-ups to treatments, manage it all with your fingertips through our intuitive platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeSecondSec;
