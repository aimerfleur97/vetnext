"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import DoctorList from "../../dummydoctorlist";
import Link from "next/link";
import { getDoctors } from "../../services/userServices"
import Loading from "@/helper/Loading";
import Doctor1 from "../../../public/illustrations/doctor-1.svg"
import Doctor2 from "../../../public/illustrations/doctor-2.svg"
import Doctor3 from "../../../public/illustrations/doctor-3.svg"
import Doctor4 from "../../../public/illustrations/doctor-4.svg"
import Doctor5 from "../../../public/illustrations/doctor-5.svg"

const Illustrations = [Doctor1, Doctor2, Doctor3, Doctor4, Doctor5];

const List = ({ activeCategory }) => {
  const [doctors, setDoctors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getDoctorsList = async () => {
    try {
      setIsLoading(true)
      const response = await getDoctors()
      setDoctors(response?.data?.data)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getDoctorsList()
  }, [])


  const Doctors =
    activeCategory == "all"
      ? DoctorList.doctors
      : DoctorList.doctors.filter((doctor) => doctor.toolbar == activeCategory);
  return (
    <>
      {isLoading && <Loading />}
      <div
        className="gap-4 px-12 py-8"
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {doctors && doctors.map((data, index) => {
          const DoctorIllustration = Illustrations[index % Illustrations.length];
          return (
            <div
              key={data.id}
              x-show="activeCategory === 'all' || activeCategory === 'cardiology'"
              className="border border-gray-800 bg-grayNew p-5 rounded-lg"
              style={{ width: "330px" }}
            >
              <Link href={`/appointment/${data._id}`} className="h-full">
                <div>
                  <div className="relative w-full h-48 rounded-lg bg-grayNew">
                    <Image
                      className="absolute bottom-0 inset-x-0 mx-auto w-full max-w-[170px] ptablet:max-w-[150px]"
                      src={DoctorIllustration}
                      alt="Doctor"
                      width={100}
                      height={100}
                    />
                  </div>
                  {/* <div className="font-sans mt-3">
                  <h4 className="font-semibold text-light_black">{data.first_name} {data.last_name}</h4>
                  <p className="text-sm text-light_black mt-3"><b>Designation:</b> {data.designation}</p>
                </div> */}
                  <div className="font-sans mt-3">
                    <h4 className="font-semibold text-light_black">{data.first_name} {data.last_name}</h4>
                    <p className="text-sm text-light_black mt-3"><b>Services:</b> {data?.specialist}</p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm ptablet:text-xs text-light_black">
                      <b>Address:</b> {data.location}
                    </p>
                  </div>
                  {data?.minRate && <div className="mt-2">
                    <p className="text-sm ptablet:text-xs text-light_black">
                      <b>Min Rate:</b>{data?.currency} {data?.minRate ? data?.minRate : "No slots"} 
                    </p>
                  </div>}
                  <div className="flex items-center justify-between font-sans mt-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/appointment/${data._id}`}>
                        <button
                          tooltip="Book appointment"
                          className="h-8 w-8 rounded-full text-light_black hover:bg-light_black hover:text-white flex items-center justify-center tw-accessiblity transition-colors duration-300"
                        >
                          <Icon icon="streamline:waiting-appointments-calendar" />
                        </button>
                      </Link>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <Icon icon="ic:round-star" color="black" />
                      <span className="font-semibold text-xs text-light_black">
                        4.5/5
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default List;
