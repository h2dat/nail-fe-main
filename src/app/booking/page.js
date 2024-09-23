"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import bookingbanner from "../../../public/bookingbanner.png";
import Navigation from "@/components/Navigation";
import BookingStep from "@/components/BookingStep";
import svg1 from "@/../public/svg/svg1.svg";
import svg2 from "@/../public/svg/svg2.svg";
import svg3 from "@/../public/svg/svg3.svg";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { staffData, dateData, timeData, data } from "./dataHelpers";
import ServicePanel from "./components/ServicePanel";
import StaffSelector from "./components/StaffSelector";
import TimeSelector from "./components/TimeSelector";
import InforPanel from "./components/InforPanel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Page(props) {
  const [activeStep, setActiveStep] = useState("service");
  const panel1 = useRef(null);
  const panel2 = useRef(null);
  const panel3 = useRef(null);
  const panel4 = useRef(null);
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
              panel1={panel1}
              panel2={panel2}
              panel3={panel3}
              panel4={panel4}
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

          {activeStep === "infor" && (
            <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg mt-10">
              <p className="text-[#C9B081] text-lg font-semibold mb-4">
                Selection
              </p>
              <InputTextarea
                className="w-full mt-4 border border-[#D8B192] rounded-lg p-2"
                placeholder="Please select at least one service from the list"
                rows={4} // Adjust the number of rows as needed
              />
              <Button
                onClick={submit}
                className="bg-[#C9B081] border-[#C9B081] w-full mt-4 rounded-lg p-2"
                label="Submit"
              />
            </div>
          )}
        </div>
      </div>
      <div className={"h-24"}></div>
    </>
  );
}

export default Page;
