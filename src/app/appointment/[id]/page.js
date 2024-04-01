"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { getAppointmentSlots, bookAppointment } from "../../../services/userServices"
import Loading from "@/helper/Loading";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "@/components/navbar";
import Swal from "sweetalert2";
import { doctorDetail } from "@/services/adminServices";
import Footer from "@/components/footer/page";

const Appointment = () => {
  const router = useRouter();
  const [slotId, setSlotId] = useState(null);
  const [selectService, setSelectService] = useState("offline");
  const [date, setDate] = useState("")
  const [slots, setSlots] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({})
  const { id } = useParams()
  const [doctorDetails, setDoctorDetails] = useState("")
  const [durationInMinutes, setDurationInMinutes] = useState(30); // Default duration

  const handleBookAppointment = async () => {
    try {

      if (!id || !user || !slotId) {
        toast.error("Please Select require fields")
        return
      } else {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'You want to book an appoinment?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
          allowOutsideClick: false
        });

        if (result.isConfirmed) {
          const payload = {
            doctorId: id,
            patientName: user._id,
            slotId: slotId
          }
          setIsLoading(true)
          const response = await bookAppointment(payload)
          toast.success(response.data.message)
          getSlots()
        }
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }finally{
      setIsLoading(false)
    }
  };

  const handleUserBooking = async () => {

    const userdata = JSON.parse(localStorage.getItem('user'))
    if (!userdata.first_name || !userdata.last_name || !userdata.email || !userdata.age || !userdata.country || !userdata.phoneNumber || !userdata.address) {
      const result = await Swal.fire({
        title: 'Please update your Profile',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        allowOutsideClick: false
      });

      if (result.isConfirmed) {
        router.push('/profile')
      }
    } else {
      await handleBookAppointment()
    }

  }

  useEffect(() => {
    if (selectService && date) {
      getSlots()
    }
  }, [selectService, date])

  const getSlots = async () => {
    try {
      setIsLoading(true)
      const response = await getAppointmentSlots(id, selectService, date)
      setSlots(response.data.data.slots)
      setDurationInMinutes(response.data?.data?.duration);
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleUserAuth = async () => {

    const isAuthenticated = localStorage.getItem("user");
    if (!isAuthenticated) {
      const result = await Swal.fire({
        title: 'Please login',
        text: 'To book an appoinment please login or signUp.',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Okay',
        allowOutsideClick: false
      });

      if (result.isConfirmed) {
        router.push("/signin");
      }
    } else {
      setUser(JSON.parse(isAuthenticated))
    }
  }

  useEffect(() => {
    handleUserAuth()
    const formattedDate = formatDate(new Date());
    setDate(formattedDate)
    getDoctorDetail()
  }, [])
  const getDoctorDetail = async () => {
    const response = await doctorDetail(id);
    setDoctorDetails(response.data.data)
  }
  const currentTime = new Date();
  function increaseTimeByDuration(timeString, durationString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes;
    totalMinutes += durationString;
    const newHours = Math.floor(totalMinutes / 60) % 24; // Ensure new hours are within 24 hours
    const newMinutes = totalMinutes % 60;
    const formattedHours = String(newHours).padStart(2, '0');
    const formattedMinutes = String(newMinutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}
  return (
    <>
      {isLoading && <Loading />}
      <Navbar />
      <div className="bg-white">
        <div class="pt-12" >
          <div
            class="relative mx-auto  mb-20 max-w-screen-lg overflow-hidden rounded-t-xl py-32 text-center border border-gray-700"
            style={{
              backgroundColor: "#001A35"
            }}
          >
            <h1 class="mt-2 px-8 text-3xl font-bold text-white md:text-5xl">
              Book an appointment
            </h1>
            <p class="mt-6 text-lg text-white">
              Get an appointment with our experienced doctors
            </p>
          </div>
          <div class="mx-auto grid max-w-screen-lg px-6 pb-20">
            <div className="text-black mb-10">
              <p class="text-2xl mb-2 font-bold text-black">
                About Doctor
              </p>
              <p><span className="font-bold">Name: </span>{doctorDetails.first_name} {doctorDetails.last_name}</p>
              <p><span className="font-bold">Email: </span>{doctorDetails.email}</p>
              <p><span className="font-bold">Languages: </span>{doctorDetails.languages}</p>
              <p><span className="font-bold">Address: </span>{doctorDetails.location}</p>
            </div>
            <div class="">
              <p class="text-xl font-bold text-black">
                Select a service
              </p>
              <div class="mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3" >
                {/* <div class="relative" onClick={() => setSelectService("online")}>
                  <input
                    class="peer hidden"
                    id="radio_1"
                    type="radio"
                    name="radio"
                    checked={
                      selectService == "online" ? true : false
                    }
                  />
                  <span class="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-400"></span>
                  <label
                    class="flex h-full text-white cursor-pointer flex-col rounded-lg p-4 bg-primary peer-checked:bg-gray-900 peer-checked:text-white border border-gray-800 peer-checked:border-gray-600"
                    for="radio_1"

                  >
                    <span class="mt-2 font-medium">Online</span>
                    <span class="text-xs uppercase">Appointment</span>
                  </label>
                </div> */}
                <div class="relative" onClick={() => setSelectService("offline")}>
                  <input
                    class="peer hidden"
                    id="radio_2"
                    type="radio"
                    name="radio"
                    checked={
                      selectService == "offline" ? true : false
                    }
                  />
                  <span class="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-400"></span>

                  <label
                    class="flex text-white h-full cursor-pointer flex-col rounded-lg p-4 bg-primary peer-checked:bg-gray-900 peer-checked:text-white border border-gray-800 peer-checked:border-gray-600"
                    for="radio_2"

                  >
                    <span class="mt-2 font-medium">Appointment</span>
                    {/* <span class="text-xs uppercase"></span> */}
                  </label>
                </div>
              </div>
            </div>
            <div class="">
              <p class="mt-8 text-xl font-bold text-black">
                Select a date
              </p>
              <div class="relative mt-4 w-56">
                <input
                  onChange={(e) => setDate(e.target.value)}
                  autofocus="autofocus"
                  value={date}
                  type="date"
                  class="datepicker-input block w-full rounded-lg border border-gray-300 bg-gray-900 p-2.5 pl-10 text-white outline-none ring-opacity-30 placeholder:text-gray-800 focus:ring focus:ring-gray-300 sm:text-sm"
                  placeholder="Select date"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            {slots && slots.length > 0 ? (
              <div class="">
                <p class="mt-8 text-xl font-bold text-black">
                  Select a time
                </p>
                <div class="mt-4">
                  {slots && slots?.map((data, index) => {
                    const [hours, minutes] = data.start.split(':');
                    const startTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), hours, minutes);

                    if (new Date(date).getUTCDate() == new Date().getUTCDate() && new Date(date).getMonth() == new Date().getMonth()) {
                      if (startTime >= currentTime) {
                        return (
                          <button
                            className={`m-2 rounded-lg  px-4 py-2 font-medium text-gray-900 ${slotId === data._id ? "bg-gray-900 text-white" : "bg-primary text-white"}`}
                            onClick={() => setSlotId(data._id)}
                            key={data._id}
                          >
                            {data.start} - {data.end}
                          </button>
                        )
                      } else {
                        return null;
                      }
                    } else {
                      return (
                        <button
                          className={`m-2 rounded-lg  px-4 py-2 font-medium text-gray-900 ${slotId === data._id ? "bg-gray-900 text-white" : "bg-primary text-white"}`}
                          onClick={() => setSlotId(data._id)}
                          key={data._id}
                        >
                          {data.start} - {data.end}
                        </button>
                      )
                    }
                  })}

                  {slots.length > 0 && (
                    <>
                      <button
                        className="m-2 rounded-lg  px-4 py-2 font-medium bg-metal text-white"
                        disabled
                      >
                        {slots[slots.length - 1].end} - { increaseTimeByDuration(slots[slots.length - 1].end, durationInMinutes) } {/* End time of last slot */}
                      </button>
                      <button
                        className="m-2 rounded-lg  px-4 py-2 font-medium bg-metal text-white"
                        disabled
                      >
                        {increaseTimeByDuration(slots[slots.length - 1].end, (durationInMinutes + durationInMinutes))} - 
                        {increaseTimeByDuration(slots[slots.length - 1].end, (durationInMinutes + durationInMinutes + durationInMinutes))}
                      </button>
                    </>
                  )}
                </div>

                <button onClick={handleUserBooking} class="mt-8 w-56 rounded-full border border-gray-500 bg-gray-900  py-2 text-lg font-bold text-white transition hover:translate-y-1">
                  Book Now
                </button>
              </div>
            ) : (
              <div className="mt-4 text-black"></div>
            )}

          </div>
        </div>
      </div>
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
      <Footer />
    </>
  );
};

export default Appointment;
