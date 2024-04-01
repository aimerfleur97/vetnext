"use client"

import React, { useEffect, useState } from "react";
import DashboardLayout from "../dashboard/page";
import Link from "next/link";
import { doctorsData, deleteDoctor } from "../../../services/adminServices"
import { Icon } from "@iconify/react";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";

const Doctor = () => {
  const [doctors, setDoctors] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  const allDoctorsdata = async () => {
    try {
      setIsLoading(true)
      const response = await doctorsData();
      setDoctors(response.data.data)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }
  const handleDelete = async (doctorId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this doctor record!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const response = await deleteDoctor(doctorId)
        await allDoctorsdata()
        Swal.fire(
          'Deleted!',
          'Doctor has been deleted.',
          'success'
        );
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.response?.data?.message || err.message,
      });
    }
  }

  useEffect(() => {
    allDoctorsdata()
  }, [])

  return (
    <DashboardLayout>
      <h1 className="text-3xl text-black">Manage Doctors</h1>
      <div className="mb-4">
        <ul className="flex justify-end gap-x-3">
          <li>
            <Link href={'/admin/doctor/add'}>
              <button className="py-2 px-4 bg-gray-800 rounded">
                Add Doctor
              </button>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        {!isLoading ?
          <table class="table-fixed text-black w-full" >
            <thead className="dark:bg-gray-800 text-white rounded">
              <tr>
                <th class="w-1/4 border px-4 py-2">Name</th>
                <th class="w-1/3 border px-4 py-2">Email</th>
                <th class="w-1/5 border px-4 py-2">Address</th>
                <th class="w-1/5 border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody >
              {doctors && doctors.map((data, index) => {
                return (
                  <tr key={data._id}>
                    <td class="border px-4 py-2" style={{ overflow: 'hidden' }}>{data?.first_name} {data?.last_name}</td>
                    <td class="border px-4 py-2" style={{ overflow: 'hidden' }}>{data?.email}</td>
                    <td class="border px-4 py-2" style={{ overflow: 'hidden' }}>{data?.location}</td>
                    <td class="border px-4 py-2 " style={{ overflow: 'hidden' }}>
                      <div className="flex align-items-center justify-center">
                        <Link href={`/admin/doctor/update/${data?._id}`}>
                          <span><Icon icon="uil:edit" fontSize={25} /></span>
                        </Link>
                        <Link href={`/admin/appointments/${data?._id}`} className="ml-2">
                          <span >
                            <Icon icon="healthicons:i-schedule-school-date-time-outline" fontSize={28} />
                          </span>
                        </Link>
                        <Link href={`/admin/slot/${data?._id}`}>
                          <span>
                            <Icon icon="streamline:waiting-appointments-calendar" className="ml-2" fontSize={28} />
                          </span>
                        </Link>
                        <span className="cursor-pointer" onClick={() => handleDelete(data._id)}>
                          <Icon icon="material-symbols-light:delete" fontSize={28} className="ml-2" />
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table> : <div class="flex items-center justify-center h-screen">
            <div class="relative">
              <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue animate-spin">
              </div>
            </div>
          </div>
        }
      </div>

    </DashboardLayout>
  );
};

export default Doctor;
