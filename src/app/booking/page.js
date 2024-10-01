"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import bookingbanner from "../../../public/bookingbanner.png";
import Navigation from "@/components/Navigation";
import BookingStep from "@/components/BookingStep";
import svg1 from "@/../public/svg/svg1.svg";
import svg2 from "@/../public/svg/svg2.svg";
import svg3 from "@/../public/svg/svg3.svg";
import { staffData, dateData, timeData, data } from "./dataHelpers";
import ServicePanel from "./components/ServicePanel";
import StaffSelector from "./components/StaffSelector";
import TimeSelector from "./components/TimeSelector";
import InforPanel from "./components/InforPanel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Page(props) {
  const [activeStep, setActiveStep] = useState("service");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const submit = () => {
    if (isEmpty(selectedService)) {
      toast.error("Select a Service");
      setActiveStep("service");
      return;
    }
    if (isEmpty(selectedStaff)) {
      toast.error("Select a Staff");
      setActiveStep("staff");
      return;
    }
    if (isEmpty(selectedDate) || isEmpty(selectedTime)) {
      toast.error("Select a time for appointment");
      setActiveStep("time");
      return;
    }

    if (activeStep !== "infor") {
      setActiveStep("infor");
      return;
    }
    setActiveStep("complete");
    toast.success("Your Booking is sent!");
  };

  const isEmpty = (tmp) => {
    if (tmp == null) return true;
    if (tmp.length === 0) return true;
    return false;
  };

  return (
    <>
      <ToastContainer />
      <Navigation />
      <div>
        <Image src={bookingbanner} alt={"banner"} />
      </div>
      <div className={"mt-10"}>
        <BookingStep activeStep={activeStep} setActiveStep={setActiveStep} />
      </div>

      <div className={"flex justify-center"}>
        <div className={"flex flex-col items-center w-full px-32 mt-12"}>
          {activeStep === "service" && (
            <div>
              <Image src={svg1} alt={"title"} />
            </div>
          )}
          {activeStep === "staff" && (
            <div>
              <Image src={svg2} alt={"title"} />
            </div>
          )}
          {activeStep === "service" && (
            <ServicePanel
              data={data}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
            />
          )}
          {activeStep === "staff" && (
            <StaffSelector
              staffData={staffData}
              selectedStaff={selectedStaff}
              setSelectedStaff={setSelectedStaff}
            />
          )}
          {activeStep === "time" && (
            <div className="flex justify-center w-full">
              <TimeSelector
                dateData={dateData}
                timeData={timeData}
                selectedDate={selectedDate}
                setSelectedTime={setSelectedTime}
                selectedTime={selectedTime}
                setSelectedDate={setSelectedDate}
              />
            </div>
          )}
          {activeStep === "infor" && (
            <InforPanel
              selectedTime={selectedTime}
              selectedDate={selectedDate}
              selectedService={selectedService}
              submit={submit}
            />
          )}
          {activeStep === "complete" && (
            <div className={"w-full flex flex-col justify-center items-center"}>
              <div>
                <Image src={svg3} alt={"title"} />
              </div>
              <div className={"text-2xl font-bold mt-12"}>
                Your appointment was sent successfully!
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={"h-24"}></div>
    </>
  );
}

export default Page;
