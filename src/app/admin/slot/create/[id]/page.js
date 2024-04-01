"use client"

import React, { useState } from 'react'
import Dashboard from '@/app/admin/dashboard/page'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createSlots } from '../../../../../services/adminServices'
import { useParams } from 'next/navigation';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import BackButton from '@/components/backButton/page';

const Create = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [duration, setDuration] = useState()
  const [Rate, setRate] = useState()
  const [Currency, setCurrency] = useState("")
  const [error, setError] = useState('')
  const [isloading, setIsLoading] = useState(false)


  const onChange = (dates) => {
    const [start, end] = dates;
    start?.setUTCHours(0, 0, 0, 0); 
    end?.setUTCHours(0, 0, 0, 0);
    setStartDate(start);
    setEndDate(end);
  };

  const formatedTime = (time) => {
    const date = new Date(time);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`

    return formattedTime
  }

  const { id } = useParams()
  const schema = yup.object().shape({
    doctorId: yup.string().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    startAt: yup.string().required(),
    endAt: yup.string().required(),
    duration: yup.number().required(),
    rate: yup.number().required(),
    currency: yup.string().required()
  });
  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const payload = {
        "doctorId": id,
        "startDate": startDate,
        "endDate": endDate,
        "startAt": formatedTime(startTime),
        "endAt": formatedTime(endTime),
        "duration": duration,
        "rate": Rate,
        "currency": Currency,
        "appointmentType": "offline"
      }
      await schema.validate(payload, { abortEarly: false });
      const response = await createSlots(payload)
      toast.success(response?.data?.message)
      setStartDate(new Date())
      setEndDate(new Date())
      setStartTime(null)
      setEndTime(null)
      setDuration("")
      setRate("")
      setCurrency("")
      setError('')
    } catch (err) {
      setError(err.errors)
      toast.error(err?.response?.data?.message || err?.message || "Error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dashboard>
      <BackButton />
      <div className='text-black'>
        <h1 className="text-4xl text-black mb-5">Create Slots</h1>
        <div className='flex gap-2 bg-gray-50 p-5 rounded'>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            minDate={new Date()}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            showDisabledMonthNavigation
          />
          <div className='flex flex-col gap-4 ml-2'>
            <div className='flex items-center'>
              <label class="block w-[110px] text-gray-700 font-bold  mb-1 md:mb-0 " for="inline-full-name">Start Time : </label>
              <DatePicker
                selected={startTime}
                onChange={(date) => [setStartTime(date), setError('')]}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className='border ml-3 w-[150px] pl-2 rounded'
              />
            </div>
            <div className='flex items-center'>
              <label class="block w-[100px] text-gray-700 font-bold  mb-1 md:mb-0 " for="inline-full-name">
                End Time :
              </label>
              <DatePicker
                selected={endTime}
                onChange={(date) => [setEndTime(date), setError('')]}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className='border ml-3 w-[150px] pl-2 rounded'
              />
            </div>
            <div className='flex items-center'>
              <label class="block w-[100px] text-gray-700 font-bold  mb-1 md:mb-0 " for="inline-full-name">Duration : </label>
              <input value={duration} onChange={(e) => [setDuration(e.target.value), setError('')]} className='w-[150px] pl-2 border rounded mr-2' step='15' min="15" type='number' /> mins
            </div>

            <div className='flex items-center'>
              <label class="block w-[100px] text-gray-700 font-bold  mb-1 md:mb-0 " for="inline-full-name">Rate :</label>
              <input value={Rate} onChange={(e) => [setRate(e.target.value), setError('')]} className='w-[150px] pl-2 border rounded' type='number' />
            </div>
            <div className='flex items-center'>
              <label class="block w-[100px] text-gray-700 font-bold  mb-1 md:mb-0 " for="inline-full-name">Currency : </label>
              <input value={Currency} onChange={(e) => [setCurrency(e.target.value), setError('')]} className='w-[150px] pl-2 border rounded' type='text' />
            </div>
            {/* <div className='flex items-center'>
              <label class="block w-[160px] text-gray-700 font-bold  mb-1 md:mb-0 " for="inline-full-name">Appointment Type:</label>
              <select className='p-0.5 rounded w-[150px] bg-white border' name="appointment" id="appointment" value={appointmentType} onChange={(e) => [setAppointmentType(e.target.value), setError('')]}>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select></div> */}
            <button onClick={handleSubmit} className="py-2 w-[200px] text-white px-4 bg-gray-700 rounded">
              Add Slots
            </button>
            {error && <p class="text-red-500 text-md italic">
              Please enter valid values
            </p>}
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default Create