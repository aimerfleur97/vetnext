import React from "react";
import HeroImage from "../../../public/Images/mainImage.jpg";
import Image from "next/image";
import Link from "next/link";

const HomFirstSec = () => {
  return (
    <>
      <div className="min-h-screen w-full overflow-hidden relative">
        <div
          className="absolute inset-0 bg-cover bg-center top-0"
          style={{ zIndex: "-1", position: 'fixed' }}
        >
          <Image
            src={HeroImage}
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            loading="lazy" // Add lazy loading here
            className="max-w-[2550px] m-auto"
          />
          <div className="absolute inset-0 backdrop-filter backdrop-blur-lg bg-light_black opacity-90"></div>
        </div>
        <div className="min-h-screen w-full max-w-7xl mx-auto flex items-center px-4 relative z-10">
          <div className="w-full">
            <div className="flex max-w-4xl m-auto">
              <div className="h-full flex items-center mb-8">
                <div className="text-center ltablet:text-left lg:text-left font-sans space-y-4">
                  <h1 className="font-medium text-4xl ptablet:text-5xl lg:text-5xl text-white">
                    We help you find the Veterinary you need
                  </h1>
                  <p className="text-lg text-grayNew">
                    Bringing vets and pet owners together for personalized, in-person care – because your pets deserve the best.
                  </p>
                  <div className="w-full flex items-center justify-center gap-2 ">
                    <Link href={'/stepper'}>
                      <button
                        className="btn btn-blue bg-blue px-5 py-2 text-white rounded 'min-w-[130px]'"
                      >
                        Get Started
                      </button>
                    </Link>
                    <Link href={'/doctors'}>
                      <button
                        className="btn btn-secondary 'min-w-[130px]' ml-2 text-grayNew border border-gray-500 px-5 py-2 rounded"
                      >
                        Book an online vet now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomFirstSec;
