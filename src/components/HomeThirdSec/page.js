"use client"
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

const HomeThirdSec = () => {
  return (
    <>
      <div className="flex flex-row flex-wrap p-3 h-auto bg-white py-14">
        <div className="mx-auto w-2/3 ">
          <div
            className="rounded-lg shadow-lg bg-gray-600 w-full flex flex-row flex-wrap p-3 antialiased h-auto"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundBlendMode: "multiply",
            }}
          >
            <div className="md:text-2xl text-lg w-full font-sans font-bold md:p-12 p-5">
                <p>Find the vet that’s <br/>right for you and your <br/> pet</p>
                <button className="mt-5 bg-secondary py-2 px-6 rounded-full w-auto text-center text-black text-xs md:text-lg font-normal"><Link href={'/stepper'} className="flex flex-nowrap items-center "><Icon icon="lucide:video" className="mr-3 font-normal" style={{ fontSize: "26px" }}/>Book an online vet now</Link></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeThirdSec;
