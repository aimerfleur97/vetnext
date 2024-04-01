"use client";
import React, { useState } from "react";

const Step2 = ({selectedValue, handleDropdownChange}) => {
  
  return (
    <>
      <div className="px-3 mb-6 md:mb-0">
        <label
          className="block uppercase mt-5 font-sans text-2xl m-auto tracking-wide text-light_black font-bold mb-2 flex justify-center"
          for="grid-state"
        >
          Where are you located?
        </label>
        <div className="relative w-full mt-10">
          <select
            className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
            value={selectedValue} // Set the value of the select to the state value
            onChange={handleDropdownChange} // Call the function on change
          >
            <option>Beaconsfield</option>
            <option>Baie-D&apos;Urfé</option>
            <option>Côte-Saint-Luc</option>
            <option>Dollard-des-Ormeaux</option>
            <option>Dorval</option>
            <option>Dorval Island[a]</option>
            <option>Hampstead</option>
            <option>Kirkland</option>
            <option>Montreal</option>
            <option>Montréal-Est</option>
            <option>Montréal-Ouest</option>
            <option>Mount Royal</option>
            <option>Pointe-Claire</option>
            <option>Sainte-Anne-de-Bellevue</option>
            <option>Senneville</option>
            <option>Westmount</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2;
