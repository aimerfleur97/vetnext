"use client"
import React, { useEffect, useState } from 'react'
import { profileUpdate, getUserprofile } from "../../services/userServices"
import { profileValidationSchema } from "../../helper/validation.js"
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '@/helper/Loading';
import Navbar from '@/components/navbar';

const Profile = () => {

    const [isLoading, setIsLoading] = useState(false)
    const GetUserProfileDetails = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("user"))
            const response = await getUserprofile(userId._id)
            formik.setValues(response.data.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        setIsLoading(true)
        GetUserProfileDetails()
    }, [])


    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            age: "",
            country: "",
            phoneNumber: "",
            address: "",
            city: "",
            state: "",
            zip_code: "",
            pets: [
                {
                    name: "",
                    species: "",
                    breed: "",
                    age: "",
                    medicalHistory: ""
                }
            ]
        },
        validationSchema: profileValidationSchema,
        onSubmit: async (values) => {
            try {
                if(values.pets[0]){

                    setIsLoading(true)
                    const userId = JSON.parse(localStorage.getItem("user"))
                    const response = await profileUpdate(userId._id, values)
                    localStorage.setItem("user", JSON.stringify(response.data.data))
                    toast.success(response.data.message)
                }else{
                    toast.error("min 1 pet information is required")
                }
            } catch (error) {
                setIsLoading(false)
                toast.error(error?.response?.data?.message || error.message)
            } finally {
                setIsLoading(false)
            }
        }
    });

    const handleAddPet = () => {
        formik.setFieldValue('pets', [...formik.values.pets, { name: '', species: '', breed: '', age: '', medicalHistory: '' }])
    }
    const handleRemovePet = (indexToRemove) => {
        // Use formik's setFieldValue method to update the pets array by removing the pet at the specified index
        formik.setFieldValue(
            'pets',
            formik.values.pets.filter((pet, index) => index !== indexToRemove)
        );
    };

    return (
        <>
            <Navbar />
            {isLoading && <Loading />}
            <form className='bg-white p-8 md:p-16' onSubmit={formik.handleSubmit}>
                <div class="space-y-6 ">
                    <div class="border-b border-gray-900/10 pb-6">
                        <h2 class="text-2xl font-semibold leading-7 text-gray-900 text-center">Profile</h2>
                    </div>

                    <div class="border-b border-gray-900/10 pb-12">
                        <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div class="sm:col-span-3">
                                <label for="first_name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                <div class="mt-2">
                                    <input type="text" name="first_name" id="first_name" autocomplete="first_name" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.first_name}
                                    />
                                </div>
                                {formik.touched.first_name && formik.errors.first_name ? (
                                    <div className="text-red-500 text-sm">{formik.errors.first_name}</div>
                                ) : null}
                            </div>

                            <div class="sm:col-span-3">
                                <label for="last_name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                <div class="mt-2">
                                    <input type="text" name="last_name" id="last_name" autocomplete="last_name" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.last_name}
                                    />
                                </div>
                                {formik.touched.last_name && formik.errors.last_name ? (
                                    <div className="text-red-500 text-sm">{formik.errors.last_name}</div>
                                ) : null}
                            </div>

                            <div class="sm:col-span-5">
                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div class="mt-2 sm:max-w-2xl">
                                    <input id="email" name="email" type="email" autocomplete="email" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                </div>
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                                ) : null}
                            </div>

                            <div class="sm:col-span-2">
                                <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Country</label>
                                <div class="mt-2">
                                    <select id="country" name="country" autocomplete="country" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.country}
                                    >
                                        <option>Select any contry</option>
                                        <option>Canada</option>
                                    </select>
                                </div>
                                {formik.touched.country && formik.errors.country ? (
                                    <div className="text-red-500 text-sm">{formik.errors.country}</div>
                                ) : null}
                            </div>
                            <div class="sm:col-span-2">
                                <label for="phoneNumber" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                                <div class="mt-2">
                                    <input id="phoneNumber" name="phoneNumber" type="number" autocomplete="phoneNumber" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phoneNumber}
                                    />
                                </div>
                                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                    <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
                                ) : null}
                            </div>
                            <div class="sm:col-span-2">
                                <label for="age" class="block text-sm font-medium leading-6 text-gray-900">Age</label>
                                <div class="mt-2">
                                    <input id="age" name="age" type="text" autocomplete="age" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.age}
                                    />
                                </div>
                                {formik.touched.age && formik.errors.age ? (
                                    <div className="text-red-500 text-sm">{formik.errors.age}</div>
                                ) : null}
                            </div>

                            <div class="col-span-full">
                                <label for="address" class="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                                <div class="mt-2">
                                    <input type="text" name="address" id="address" autocomplete="address" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.address}
                                    />
                                </div>
                                {formik.touched.address && formik.errors.address ? (
                                    <div className="text-red-500 text-sm">{formik.errors.address}</div>
                                ) : null}
                            </div>

                            <div class="sm:col-span-2 sm:col-start-1">
                                <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
                                <div class="mt-2">
                                    <input type="text" name="city" id="city" autocomplete="city" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.city}
                                    />
                                </div>
                                {formik.touched.city && formik.errors.city ? (
                                    <div className="text-red-500 text-sm">{formik.errors.city}</div>
                                ) : null}
                            </div>

                            <div class="sm:col-span-2">
                                <label for="state" class="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
                                <div class="mt-2">
                                    <input type="text" name="state" id="state" autocomplete="state" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.state}
                                    />
                                </div>
                                {formik.touched.state && formik.errors.state ? (
                                    <div className="text-red-500 text-sm">{formik.errors.state}</div>
                                ) : null}
                            </div>

                            <div class="sm:col-span-2">
                                <label for="zip_code" class="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
                                <div class="mt-2">
                                    <input type="text" name="zip_code" id="zip_code" autocomplete="zip_code" class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.zip_code}
                                    />
                                </div>
                                {formik.touched.zip_code && formik.errors.zip_code ? (
                                    <div className="text-red-500 text-sm">{formik.errors.zip_code}</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div class="border-b border-gray-900/10 pb-12">
                        <h2 class="text-base font-semibold leading-7 text-gray-900">Pet Information</h2>
                        <p class="mt-1 text-sm leading-6 text-gray-600">Use a proper Information for pet.</p>
                        {formik.errors && formik.errors.pets &&  formik.errors.pets == "At least one pet information is required" &&  <div className="text-red-500 text-sm mt-5">{formik.errors.pets}</div>}
                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label htmlFor="pets" className="block text-sm font-medium leading-6 text-gray-900">Pet Information</label>
                                {formik.values.pets.map((pet, index) => (
                                    <div key={index} className="mt-10 pb-10 border-b grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                        <div class="sm:col-span-2">
                                            <label for="zip_code" class="block text-sm font-medium leading-6 text-gray-900">
                                                Pet Name
                                            </label>
                                            <div class="mt-2">
                                                <input type="text" name={`pets[${index}].name`} placeholder="Pet Name" className="col-span-2 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.pets[index].name || ''}
                                                />
                                                {formik.touched.pets && formik.touched.pets[index] && formik.errors.pets && formik.errors.pets[index] && formik.errors.pets[index].name && (
                                                    <div className="text-red-500 text-sm">{formik.errors.pets[index].name}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div class="sm:col-span-2">
                                            <label for={`pets[${index}].species`} class="block text-sm font-medium leading-6 text-gray-900">
                                                Species
                                            </label>
                                            <div class="mt-2">
                                                <input type="text" name={`pets[${index}].species`} placeholder="Species" className="col-span-2 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.pets[index].species || ''}
                                                />
                                                {formik.touched.pets && formik.touched.pets[index] && formik.errors.pets && formik.errors.pets[index] && formik.errors.pets[index].species && (
                                                    <div className="text-red-500 text-sm">{formik.errors.pets[index].species}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div class="sm:col-span-2">
                                            <label for={`pets[${index}].breed`} class="block text-sm font-medium leading-6 text-gray-900">
                                                Breed
                                            </label>
                                            <div class="mt-2">
                                                <input type="text" name={`pets[${index}].breed`} placeholder="Breed" className="col-span-2 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.pets[index].breed || ''}
                                                />
                                                {formik.touched.pets && formik.touched.pets[index] && formik.errors.pets && formik.errors.pets[index] && formik.errors.pets[index].breed && (
                                                    <div className="text-red-500 text-sm">{formik.errors.pets[index].breed}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div class="sm:col-span-2">
                                            <label for={`pets[${index}].age`} class="block text-sm font-medium leading-6 text-gray-900">
                                                Age
                                            </label>
                                            <div class="mt-2">
                                                <input type="number" name={`pets[${index}].age`} placeholder="Age" className="col-span-1 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.pets[index].age || ''}
                                                />
                                                {formik.touched.pets && formik.touched.pets[index] && formik.errors.pets && formik.errors.pets[index] && formik.errors.pets[index].age && (
                                                    <div className="text-red-500 text-sm">{formik.errors.pets[index].age}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div class="sm:col-span-2">
                                            <label for={`pets[${index}].medicalHistory`} class="block text-sm font-medium leading-6 text-gray-900">
                                                Medical History
                                            </label>
                                            <div class="mt-2">

                                                <input type="text" name={`pets[${index}].medicalHistory`} placeholder="Medical History" className="col-span-3 px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.pets[index].medicalHistory || ''}
                                                />
                                                {formik.touched.pets && formik.touched.pets[index] && formik.errors.pets && formik.errors.pets[index] && formik.errors.pets[index].medicalHistory && (
                                                    <div className="text-red-500 text-sm">{formik.errors.pets[index].medicalHistory}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="sm:col-span-1 flex items-end">
                                            <button
                                                type="button"
                                                className="text-red-500 text-sm underline"
                                                onClick={() => handleRemovePet(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md bg-blue" onClick={handleAddPet}>Add Pet</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex items-center justify-end gap-x-6 bg-white">
                    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                    <button type="submit" class="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                </div>
            </form>
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

    )
}

export default Profile