"use client"
import React, { useEffect, useState } from 'react'
import DashboardLayout from "../../dashboard/page";
import { getAppointments } from "../../../../services/adminServices"
import { useParams } from 'next/navigation';
import { Icon } from '@iconify/react';
import BackButton from '@/components/backButton/page';
import Loading from '@/helper/Loading';


const Appointments = () => {
  const [appointments, seAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()

  const getAppointmentsDetails = async () => {
    try {
      const response = await getAppointments(id)
      seAppointments(response.data.data)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    getAppointmentsDetails()
  }, [])


  return (
    <DashboardLayout >
      <BackButton />
      <h1 className="text-4xl text-black">Appointments</h1>
      <div className='text-black w-full mt-5'>
        {isLoading ? <Loading /> : <><table className='table-fixed w-full'>
          <thead className="dark:bg-gray-800 text-white rounded">
            <tr>
              <th className='w-1/4 border px-4 py-2'>Patient Name</th>
              <th className='w-1/4 border px-4 py-2'>Email</th>
              <th className='w-1/4 border px-4 py-2'>Timing</th>
              <th className='w-1/4 border px-4 py-2'>Appointment Type</th>
            </tr>
          </thead>
          <tbody>
            <>
              {appointments && appointments.map((data, index) => {
                return <tr key={index}>
                  <td className='border px-4 py-2 text-center'>{data.patientName.name}</td>
                  <td className='border px-4 py-2 text-center' >{data.patientName.email}</td>
                  <td className='border px-4 py-2 text-center'>{data.slotId.start}-{data.slotId.end}</td>
                  <td className='border px-4 py-2 text-center'>{data.slotId.appointmentType}</td>
                </tr>
              })}</>
          </tbody>
        </table>
          {appointments && appointments.length == 0 && !isLoading && <div>Looks like there is no appointments available at the moment.</div>}
        </>}
      </div>
    </DashboardLayout>
  )
}

export default Appointments