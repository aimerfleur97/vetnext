"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signIn } from "../../services/authServices"
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { doctorLogin } from "@/services/userServices";
import Navbar from "@/components/navbar";
import Loading from "@/helper/Loading";
import * as animationData from '../assets/Lottie/Auth.json';
import Lottie from "react-lottie";

const Signin = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("Patient")
  const [setIsLoading, setSetIsLoading] = useState(false)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email address is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setSetIsLoading(true)
      try {
        if (values.email == "admin@vetnext.com" && values.password == "admin@1234") {
          router.push('/admin/doctor')
          return
        }
        if (userType == "Doctor") {
          await handleDoctorSignin(values)
        } else {
          await handleUserSignIn(values)
        }
        // Handle successful sign-in, e.g., redirect or show a success message
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
        console.error("Sign-in failed:", error);
        // Handle sign-in failure, e.g., show an error message
      } finally {
        setSetIsLoading(false)
      }
    },
  });


  const handleDoctorSignin = async (values) => {
    try {
      const response = await doctorLogin(values)
      localStorage.setItem("doctor", JSON.stringify(response.data.data))
      if (response) {
        router.push('/doctorpanel/profile')
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const handleUserSignIn = async (values) => {
    try {
      const response = await signIn(values)
      if (response) {
        localStorage.setItem("user", JSON.stringify(response.data.data.user))
        router.push('/profile')
        toast.success(response.data.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  return (
    <>
      <Navbar />
      {setIsLoading && <Loading />}
      <section className="bg-white">
        <div className="h-screen  px-16 w-full mx-auto max-w-7xl">
          <div className="h-full">
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
              <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                {/* <img
                  src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="w-full"
                  alt="Sample image"
                /> */}
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
                  Sign In
                </h2>
                <div className="flex mb-5 gap-3 items-center justify-center">
                  <div onClick={() => setUserType("Doctor")} class={`cursor-pointer  items-center p-4 rounded-md ${userType == "Doctor" ? "bg-primary" : "bg-grayNew"}`}>
                    <input type="radio" id="doctor" name="role" value="doctor" class="hidden" />
                    <label for="doctor" class={`cursor-pointer flex items-center mr-4 ${userType == "Doctor" ? "text-white" : "text-black"}`}>
                      <div class="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center mr-2">
                        <div class="w-3 h-3 bg-gray-400 rounded-full"></div>
                      </div>
                      I&apos;m Doctor
                    </label>
                  </div>
                  <div onClick={() => setUserType("Patient")} class={`cursor-pointer items-center p-4 rounded-md ${userType == "Patient" ? "bg-primary" : "bg-grayNew"}`}>
                    <input type="radio" id="patient" name="role" value="patient" class="hidden" />
                    <label for="patient" class={`cursor-pointer flex items-center mr-4 ${userType == "Patient" ? "text-white" : "text-black"}`}>
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
                      className="peer block min-h-[auto] font-sans w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-light_black dark:placeholder:text-light_black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 border border-gray-600"
                      id="exampleFormControlInput2"
                      placeholder="Email address"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    <label
                      htmlFor="exampleFormControlInput2"
                      className={`pointer-events-none font-sans absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-black transition-all duration-200 ease-out ${formik.values.email
                        ? "-translate-y-[1.15rem] scale-[0.8]"
                        : ""
                        } peer-data:[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-black dark:peer-focus:text-black ${formik.values.email ? "label-has-value" : ""
                        }`}
                    >
                      Email address
                    </label>
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500">{formik.errors.email}</div>
                    ) : null}
                  </div>

                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                      type="password"
                      name="password"
                      className="peer block min-h-[auto] font-sans w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-black placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 border border-gray-600"
                      id="exampleFormControlInput22"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <label
                      htmlFor="exampleFormControlInput22"
                      className={`pointer-events-none font-sans absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-black transition-all duration-200 ease-out ${formik.values.password
                        ? "-translate-y-[1.15rem] scale-[0.8]"
                        : ""
                        } peer-data:[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-black dark:peer-focus:text-black ${formik.values.password ? "label-has-value" : ""
                        }`}
                    >
                      Password
                    </label>
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-500">
                        {formik.errors.password}
                      </div>
                    ) : null}
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
                      Signin
                    </button>

                    <p className="mb-0 mt-2 pt-1 font-sans text-sm font-semibold text-black">
                      Don&apos;t have an account?
                      <Link
                        href="/signup"
                        className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                      >
                        {" "}Register
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
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
    </>
  );
};

export default Signin;
