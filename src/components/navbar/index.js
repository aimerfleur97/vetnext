"use client";
import React, { useEffect, useState } from "react";
import { Logo, Hamburger, Cancel } from "../icons";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  };
  return (
    <>
      <div className="w-full mx-auto flex items-center justify-between pl-5 pr-0 lg:pr-5 font-sans z-30 bg-primary sticky top-0">
        <div className="w-full lg:w-auto flex items-center gap-6">
          <Link href={"/"} className="flex items-center gap-3">
            <div
              className={`transition-all duration-300 ${
                open ? "text-secondary rotate-90" : "text-blue"
              }`}
            >
              <Logo className="'w-9 h-9'" />
            </div>
            <span className="font-sans text-lg tracking-widest uppercase text-white">
              Vetnext
            </span>
          </Link>
          <div className="flex items-center justify-center h-20 w-20 lg:hidden ml-auto">
            <div onClick={() => setOpen(!open)} className="cursor-pointer">
              {open ? <Cancel /> : <Hamburger />}
            </div>
          </div>
        </div>
        <div
          className={`flex-col items-center lg :justify-end gap-x-6  ${
            open
              ? "absolute z-30 top-[80px] left-0 w-full flex text-center px-6 pt-2 pb-6 border-t border-gray-800 bg-gray-900 shadow-lg shadow-gray-900/50"
              : "hidden lg:flex lg:flex-row"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center gap-x-6">
            <div
              className={`relative py-3 lg:py-5 after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:rounded-t-full after:transition-all after:duration-300 transition-colors duration-300 before:text-white ${
                open
                  ? " after:bg-primary after:w-full"
                  : " hover:text-gray-100 after:w-0"
              }`}
            >
              <Link href="/doctors">Doctors</Link>
            </div>
            {/* <div
              className={`relative py-3 lg:py-5 after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:rounded-t-full after:transition-all after:duration-300 transition-colors duration-300 ${
                open
                  ? " after:bg-primary after:w-full"
                  : " hover:text-gray-100 after:w-0"
              }`}
            >
              <a href="#product">Product</a>
            </div>
            <div
              className={`relative py-3 lg:py-5 after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:rounded-t-full after:transition-all after:duration-300 transition-colors duration-300 ${
                open
                  ? " after:bg-primary after:w-full"
                  : " hover:text-gray-100 after:w-0"
              }`}
            >
              <a href="#pricing">Pricing</a>
            </div> */}
            {user && <div
              className={`relative py-3 lg:py-5 after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:rounded-t-full after:transition-all after:duration-300 transition-colors duration-300 text-white ${
                open
                  ? " after:bg-primary after:w-full"
                  : " hover:text-gray-100 after:w-0"
              }`}
            >
              <Link href="/profile">Profile</Link>
            </div>}
            {!user && <div className="relative py-3 lg:py-5 hover:text-gray-100 transition-colors duration-300 text-white">
              <Link href={"/signin"}>Sign In</Link>
            </div>} 
          </div>
          {!user ? <div className="w-full md:w-auto btn text-white bg-blue px-4 py-1 rounded">
            <Link href={"/signup"}>Signup</Link>
          </div> : <div  className="w-full md:w-auto btn text-white bg-blue px-4 py-1 rounded">
            <button onClick={handleLogout}>Logout</button>
          </div>}
          
        </div>
      </div>
    </>
  );
};

export default Navbar;
