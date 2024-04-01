'use client'

import React, { useState } from "react";
import Dashboard from "../../dashboard/page";
import { useFormik } from "formik";
import { doctorValidationSchema } from "../../helper/Validations";
import { doctorAdd } from "@/services/adminServices";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import BackButton from "@/components/backButton/page";

const Add = () => {
    const router = useRouter();
    const [isloading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            location: "",
            languages: "",
            specialist:"",
        },
        validationSchema: doctorValidationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setIsLoading(true)
                const response = await doctorAdd(values)
                toast.success(response.data.message)
                setSubmitting(false);
                router.push('/admin/doctor');

            } catch (error) {
                toast.error(error?.response?.data?.message || error.message)
                console.error(error);
                setSubmitting(false);
            } finally {
                setIsLoading(false)
            }
        },
    });
    return (
        <Dashboard>
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
            <BackButton />
            <h1 className="text-3xl text-black">Create New doctor profile</h1>
            <form onSubmit={formik.handleSubmit} class="w-full max-w-[700px] m-auto bg-gray-50 p-5 rounded mt-5">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            class="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                            for="grid-first-name"
                        >
                            First Name
                        </label>
                        <input
                            class="appearance-none block w-full bg-white text-black border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            placeholder="Enter your first name"
                            name="first_name"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.first_name && formik?.errors?.first_name && <p class="text-red-500 text-xs ">
                            {formik?.errors?.first_name}
                        </p>}
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label
                            class="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                            for="grid-last-name"
                        >
                            Last Name
                        </label>
                        <input
                            class="appearance-none block w-full bg-white text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-1"
                            id="grid-last-name"
                            type="text"
                            placeholder="Enter your last name"
                            name="last_name"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.last_name && formik?.errors?.last_name && <p class="text-red-500 text-xs ">
                            {formik?.errors?.last_name}
                        </p>}
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-1/2 px-3">
                        <label
                            class="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                            for="grid-email"
                        >
                            Email
                        </label>
                        <input
                            class="appearance-none block w-full bg-white text-black border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-email"
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik?.errors?.email && <p class="text-red-500 text-xs ">
                            {formik?.errors?.email}
                        </p>}
                    </div>
                    <div class="w-1/2 px-3">
                        <label
                            class="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                            for="grid-password"
                        >
                            Password
                        </label>
                        <input
                            class="appearance-none block w-full bg-white text-black border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik?.errors?.email && <p class="text-red-500 text-xs ">
                            {formik?.errors?.email}
                        </p>}
                    </div>

                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label
                            class="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                            for="grid-location"
                        >
                            Address
                        </label>
                        <input
                            class="appearance-none block w-full bg-white text-black border border-gray-200 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-location"
                            type="text"
                            placeholder="Enter your address"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.location && formik?.errors?.location && <p class="text-red-500 text-xs ">
                            {formik?.errors?.location}
                        </p>}
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            class="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                            for="grid-specialist"
                        >
                            Services
                        </label>
                        <input
                            class="appearance-none block w-full bg-white text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-1"
                            id="grid-specialist"
                            type="text"
                            placeholder="Enter your specialisation"
                            name="specialist"
                            value={formik.values.specialist}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.specialist && formik?.errors?.specialist && <p class="text-red-500 text-xs ">
                            {formik?.errors?.specialist}
                        </p>}
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            class="block uppercase tracking-wide text-black text-xs font-bold mb-2"
                            for="grid-languages"
                        >
                            Languages
                        </label>
                        <input
                            class="appearance-none block w-full bg-white text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-1"
                            id="grid-languages"
                            type="text"
                            placeholder="Enter your Languages"
                            name="languages"
                            value={formik.values.languages}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.languages && formik?.errors?.languages && <p class="text-red-500 text-xs ">
                            {formik?.errors?.languages}
                        </p>}
                    </div>
                </div>
                <div className="text-end">
                    <button type="submit" className="bg-gray-700 px-4 py-1 rounded mt-3">{isloading ? "Loading..." : "Add doctor"}</button>
                </div>
            </form>
        </Dashboard>
    );
};

export default Add;
