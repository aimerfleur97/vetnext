"use client"

import React, { useEffect, useState } from 'react'
import { getSlots, deleteSlots } from "../../../services/adminServices"
import Dashboard from '../dashboard/page'
import "react-datepicker/dist/react-datepicker.css";
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import Loading from '@/helper/Loading'
import Swal from 'sweetalert2';

const Slot = () => {
  const [dateSlots, setDateSlots] = useState([])
  const [isLoading, setIsLoading] = useState([])

  const getDoctorSlots = async () => {
    try {
      const doctorDetail = JSON.parse(localStorage.getItem("doctor"))

      setIsLoading(true)
      const response = await getSlots(doctorDetail._id)
      setDateSlots(response.data.data.slots)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getDoctorSlots()
  }, [])

  const handleSlotDelete = async (slotsId, mainId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this slot record!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const response = await deleteSlots(slotsId, mainId)
        getDoctorSlots()
        Swal.fire(
          'Deleted!',
          'Slot has been deleted.',
          'success'
        );
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data?.message || err.message,
      });
    }

  }

  const dateFormate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Month is zero-based, so add 1
    const year = date.getUTCFullYear();

    // Format the date components with leading zeros if necessary
    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    return formattedDate;
  }
  return (
    <Dashboard>
      <h1 className="text-4xl text-black mb-5">Manage Slots</h1>
      {!isLoading ? <>

        {dateSlots.length > 0 ? dateSlots.map((data) => {
          return (

            <div key={data.date} className='text-black w-full mb-5'>
              <h2>{dateFormate(data.date)}</h2>
              <table className='table-fixed w-full'>
                <thead className="dark:bg-gray-800 text-white rounded">
                  <tr>
                    <th className='w-1/3 border px-4 py-2'>Start Time</th>
                    <th className='w-1/3 border px-4 py-2'>End Time</th>
                    <th className='w-1/7 border px-4 py-2'>Status</th>
                    <th className='w-1/8 border px-4 py-2'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slot.map(slotItem => (
                    <tr key={slotItem._id}>
                      <td className='border px-4 py-2 text-center'>{slotItem.start}</td>
                      <td className='border px-4 py-2 text-center'>{slotItem.end}</td>
                      <td className={`border px-4 py-2 text-center `}>
                        <span class={`bg-blue-100 text-blue-800 text-sm font-medium me-2 px-3 py-1 rounded ${slotItem.booked ? "bg-red-200" : "bg-green-200"} text-blue-300`}>{slotItem.booked ? 'Booked' : 'Available'}</span>
                      </td>
                      <td className='border px-4 py-2 text-center'><span className="cursor-pointer" onClick={() => handleSlotDelete(slotItem._id, data._id)}>
                        <div className="flex align-items-center justify-center">
                          <Icon icon="material-symbols-light:delete" fontSize={28} className="mx-2" />
                        </div>
                      </span></td>


                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }) : <div className='text-black'>Sorry! No slots Available </div>}
      </> : <div className='sm:ml-64'> <Loading /> </div>}

    </Dashboard>
  )
}

export default Slot