"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { signUp } from "../../services/authServices"
import Navbar from "@/components/navbar";
import Swal from 'sweetalert2';
import Lottie from "react-lottie";
import * as animationData from '../assets/Lottie/Auth.json';

const Signup = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email address is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      signUp(values).then(async (response) => {
        localStorage.setItem("user", JSON.stringify(response.data.data))
        router.push('/')
        toast.success(response?.data?.message)
      })
        .catch((error) => {
          toast.error(error?.response?.data?.message || error.message)
        });
    },
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handleDoctorClick = async() =>{
    const result = await Swal.fire({
      title: 'Do you want to join as a Doctor?',
      text: 'Please contact admin to join as a doctor.',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Okay'
    });
  }

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
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
      <section className="bg-white">
        <div className="h-screen px-16 w-full mx-auto max-w-7xl">
          <div className="h-full">
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
              <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                <Lottie
                  options={defaultOptions}
                  height={400}
                  width={400}
                  isStopped={false}
                  isPaused={false}
                />
              </div>

              <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                <h2 className="mb-5 text-4xl m-auto flex justify-center text-black font-sans">
                  Sign Up
                </h2>
                <div className="flex mb-5 gap-3 items-center justify-center">
                  <div onClick={handleDoctorClick} class={`cursor-pointer  items-center p-4 rounded-md bg-grayNew`}>
                    <input type="radio" id="doctor" name="role" value="doctor" class="hidden" />
                    <label for="doctor" class={`cursor-pointer flex items-center mr-4 text-black`}>
                      <div class="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center mr-2">
                        <div class="w-3 h-3 bg-gray-400 rounded-full"></div>
                      </div>
                      I&apos;m Doctor
                    </label>
                  </div>
                  <div class={`cursor-pointer items-center p-4 rounded-md bg-primary`}>
                    <input type="radio" id="patient" name="role" value="patient" class="hidden" />
                    <label for="patient" class={`cursor-pointer flex items-center mr-4 text-white`}>
                      <div class="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center mr-2">
                        <div class="w-3 h-3 bg-gray-400 rounded-full"></div>
                      </div>
                      I&apos;m Patient
                    </label>
                  </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                      type="text"
                      className={`text-black peer block min-h-[auto] font-sans w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 border border-gray-600 ${formik.touched.name && formik.errors.name
                          ? "border-red-500"
                          : ""
                        }`}
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    <label
                      htmlFor="name"
                      className={`pointer-events-none font-sans absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-black transition-all duration-200 ease-out ${formik.values.name
                          ? "-translate-y-[1.15rem] scale-[0.8]"
                          : ""
                        } peer-data:[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-black dark:peer-focus:text-black ${formik.values.name ? "label-has-value" : ""
                        }`}
                    >
                      Name
                    </label>
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                      type="email"
                      className={`text-black peer block min-h-[auto] font-sans w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 border border-gray-600 ${formik.touched.email && formik.errors.email
                          ? "border-red-500"
                          : ""
                        }`}
                      id="email"
                      name="email"
                      placeholder="Email address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    <label
                      htmlFor="email"
                      className={`pointer-events-none font-sans absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-black transition-all duration-200 ease-out ${formik.values.email
                          ? "-translate-y-[1.15rem] scale-[0.8]"
                          : ""
                        } peer-data:[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-black dark:peer-focus:text-black ${formik.values.email ? "label-has-value" : ""
                        }`}
                    >
                      Email address
                    </label>
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>

                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                      type="password"
                      className={`peer block min-h-[auto] font-sans w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 border border-gray-600 ${formik.touched.password && formik.errors.password
                          ? "border-red-500"
                          : ""
                        }`}
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <label
                      htmlFor="password"
                      className={`pointer-events-none font-sans absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-black transition-all duration-200 ease-out ${formik.values.password
                          ? "-translate-y-[1.15rem] scale-[0.8]"
                          : ""
                        } peer-data:[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-black dark:peer-focus:text-black ${formik.values.password ? "label-has-value" : ""
                        }`}
                    >
                      Password
                    </label>
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  <div className="mb-6 flex items-center justify-between text-black">
                    <a href="#" className="font-sans">
                      Forgot password?
                    </a>
                  </div>

                  <div className="text-center lg:text-left">
                    <button
                      type="submit"
                      className="text-white font-sans inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase hover:bg-gray-900 border hover:border-gray-600"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      Signup
                    </button>

                    <p className="mb-0 mt-2 pt-1 text-sm font-semibold text-black font-sans">
                      Already have an account?
                      <Link
                        href={"/signin"}
                        className="font-sans transition duration-150 ease-in-out"
                      >
                        {" "}Sign in
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
