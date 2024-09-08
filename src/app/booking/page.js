"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import bookingbanner from "../../../public/bookingbanner.png";
import service1 from "../../../public/service1.jpg";
import taking from "../../../public/taking.png";
import waxingmain from "../../../public/waxingmain.png";
import enhance from "../../../public/enhance.png";
import Navigation from "@/components/Navigation";
import BookingStep from "@/components/BookingStep";
import svg1 from "@/../public/svg/svg1.svg";
import svg2 from "@/../public/svg/svg2.svg";
import svg3 from "@/../public/svg/svg3.svg";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Panel } from "primereact/panel";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import StaffBlock from "@/components/StaffBlock";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { staffData, dateData, timeData, data } from "./dataHelpers";
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

  const findServiceById = (id) => {
    const categories = ["services", "enhance", "takingOff", "waxing"];

    for (const category of categories) {
      const found = data[category].find((item) => item.id === id);
      if (found) return found;
    }

    return null; // Return null if no object with the given id is found
  };

  const findDateById = (id) => {
    return dateData.find((item) => item.id === id) || null;
  };
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
      <Navigation></Navigation>
      <div>
        <Image src={bookingbanner} alt={"banner"} />
      </div>
      <div className={"mt-10"}>
        <BookingStep
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        ></BookingStep>
      </div>

      <div>
        <div>
          <div className={"flex justify-center pt-8"}>
            {activeStep === "service" && (
              <div>
                <Image src={svg1}  alt={'title'}/>
              </div>
            )}
            {activeStep === "staff" && (
              <div>
                <Image src={svg2} alt={'title'} />
              </div>
            )}
          </div>
          <div className={"flex px-32 mt-12"}>
            {activeStep === "service" && (
              <div className={"w-2/3 px-32"}>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-search" />
                  <InputText
                    className={"w-full"}
                    placeholder="What service are you looking for?"
                  />
                </IconField>
                <div className={"my-2"}>
                  <Panel
                    headerTemplate={
                      <div
                        onClick={() => panel1.current.toggle()}
                        className={
                          "rounded-t-lg  cursor-pointer h-fit flex gap-4 pl-4 py-2 bg-white border items-center justify-center"
                        }
                      >
                        <div>
                          <Image src={service1} alt={"service 1"} />
                        </div>
                        <div className={"flex-grow"}>
                          <p className={"text-[#C9B081] font-semibold"}>
                            Natural Nails
                          </p>
                          <p>Mani/Pedi with Regular/Gel color</p>
                        </div>
                        <div className={"w-1/6"}>
                          <svg
                            width="28"
                            height="29"
                            viewBox="0 0 28 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22.75 9.81494L14 18.5649L5.25 9.81494"
                              stroke="black"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    }
                    ref={panel1}
                    header="Header"
                    toggleable
                  >
                    <div className={"flex flex-col"}>
                      {data.services.map((item) => (
                        <div
                          onClick={() => setSelectedService(item.id)}
                          className={`${
                            item.id === selectedService ? "bg-gray-100" : ""
                          } flex gap-3 items-center cursor-pointer  rounded-xl py-2 px-2`}
                        >
                          <div
                            className={"w-12 h-12 rounded-full overflow-hidden"}
                          >
                            <Image
                              className={"h-full w-full object-cover"}
                              src={item.image}
                              alt={"service 1 1"}
                            />
                          </div>
                          <div>
                            <p>{item.title}</p>
                            <p className={"text-[#C9B081]"}>{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Panel>
                </div>
                <div className={"my-2"}>
                  <Panel
                    headerTemplate={
                      <div
                        onClick={() => panel2.current.toggle()}
                        className={
                          "rounded-t-lg  cursor-pointer h-fit flex gap-4 pl-4 py-2 bg-white border items-center justify-center"
                        }
                      >
                        <div>
                          <Image src={enhance} alt={"service 1"} />
                        </div>
                        <div className={"flex-grow"}>
                          <p className={"text-[#C9B081] font-semibold"}>
                            Nail Extension / Enhancement
                          </p>
                          <p>Acrylic/Builder Gel/Dip/Gel-X with single color</p>
                        </div>
                        <div className={"w-1/6"}>
                          <svg
                            width="28"
                            height="29"
                            viewBox="0 0 28 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22.75 9.81494L14 18.5649L5.25 9.81494"
                              stroke="black"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    }
                    ref={panel2}
                    header="Header"
                    toggleable
                  >
                    <div className={"flex flex-col"}>
                      {data.enhance.map((item) => (
                        <div
                          onClick={() => setSelectedService(item.id)}
                          className={`${
                            item.id === selectedService ? "bg-gray-100" : ""
                          } flex gap-3 items-center cursor-pointer  rounded-xl py-2 px-2`}
                        >
                          <div
                            className={"w-12 h-12 rounded-full overflow-hidden"}
                          >
                            <Image
                              className={"h-full w-full object-cover"}
                              src={item.image}
                              alt={"service 1 1"}
                            />
                          </div>
                          <div>
                            <p>{item.title}</p>
                            <p className={"text-[#C9B081]"}>{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Panel>
                </div>
                <div className={"my-2"}>
                  <Panel
                    headerTemplate={
                      <div
                        onClick={() => panel3.current.toggle()}
                        className={
                          "rounded-t-lg  cursor-pointer h-fit flex gap-4 pl-4 py-2 bg-white border items-center justify-center"
                        }
                      >
                        <div
                          className={
                            "ml-3 w-12 h-12 rounded-full overflow-hidden"
                          }
                        >
                          <Image
                            className={"h-full w-full object-cover"}
                            src={taking}
                            alt={"service 1 1"}
                          />
                        </div>
                        <div className={"flex-grow"}>
                          <p className={"text-[#C9B081] font-semibold"}>
                            Gel/Dip/Acrylic taking off
                          </p>
                          <p>Add-on MUST book with other regular services.</p>
                        </div>
                        <div className={"w-1/6"}>
                          <svg
                            width="28"
                            height="29"
                            viewBox="0 0 28 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22.75 9.81494L14 18.5649L5.25 9.81494"
                              stroke="black"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    }
                    ref={panel3}
                    header="Header"
                    toggleable
                  >
                    <div className={"flex flex-col"}>
                      {data.takingOff.map((item) => (
                        <div
                          onClick={() => setSelectedService(item.id)}
                          className={`${
                            item.id === selectedService ? "bg-gray-100" : ""
                          } flex gap-3 items-center cursor-pointer  rounded-xl py-2 px-2`}
                        >
                          <div
                            className={"w-12 h-12 rounded-full overflow-hidden"}
                          >
                            <Image
                              className={"h-full w-full object-cover"}
                              src={item.image}
                              alt={"service 1 1"}
                            />
                          </div>
                          <div>
                            <p>{item.title}</p>
                            <p className={"text-[#C9B081]"}>{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Panel>
                </div>
                <div className={"my-2"}>
                  <Panel
                    headerTemplate={
                      <div
                        onClick={() => panel4.current.toggle()}
                        className={
                          "rounded-t-lg  cursor-pointer h-fit flex gap-4 pl-4 py-2 bg-white border items-center justify-center"
                        }
                      >
                        <div
                          className={
                            "ml-3 w-12 h-12 rounded-full overflow-hidden"
                          }
                        >
                          <Image
                            className={"h-full w-full object-cover"}
                            src={waxingmain}
                            alt={"service 1 1"}
                          />
                        </div>
                        <div className={"flex-grow"}>
                          <p className={"text-[#C9B081] font-semibold"}>
                            Waxing
                          </p>
                          <p>Precision shaping for perfectly groomed brows.</p>
                        </div>
                        <div className={"w-1/6"}>
                          <svg
                            width="28"
                            height="29"
                            viewBox="0 0 28 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22.75 9.81494L14 18.5649L5.25 9.81494"
                              stroke="black"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    }
                    ref={panel4}
                    header="Header"
                    toggleable
                  >
                    <div className={"flex flex-col"}>
                      {data.waxing.map((item) => (
                        <div
                          onClick={() => setSelectedService(item.id)}
                          className={`${
                            item.id === selectedService ? "bg-gray-100" : ""
                          } flex gap-3 items-center cursor-pointer  rounded-xl py-2 px-2`}
                        >
                          <div
                            className={"w-12 h-12 rounded-full overflow-hidden"}
                          >
                            <Image
                              className={"h-full w-full object-cover"}
                              src={item.image}
                              alt={"service 1 1"}
                            />
                          </div>
                          <div>
                            <p>{item.title}</p>
                            <p className={"text-[#C9B081]"}>{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Panel>
                </div>
              </div>
            )}
            {activeStep === "staff" && (
              <div className={"w-10/12 px-32"}>
                <div className={"grid grid-cols-3 gap-y-12"}>
                  {staffData.map((item) => (
                    <StaffBlock
                      image={item.image}
                      title={item.name}
                      id={item.id}
                      star={item.stars}
                      selectedStaff={selectedStaff}
                      setSelectedStaff={setSelectedStaff}
                      subtitle={item.subtitle}
                    ></StaffBlock>
                  ))}
                </div>
                <div></div>
              </div>
            )}
            {activeStep === "time" && (
              <div className={"w-11/12 px-32"}>
                <div className={"w-10/12"}>
                  <div className={"flex gap-2"}>
                    {dateData.map((item) => (
                      <div
                        onClick={() => setSelectedDate(item.id)}
                        className={`${
                          item.id === selectedDate &&
                          "border-2 border-[#C9B081]"
                        }  cursor-pointer hover:scale-110 transform transition-transform duration-300 w-24 px-6 py-2 rounded h-auto bg-white flex flex-col items-center justify-center`}
                      >
                        <p className={"text-xl text-[#9E9D9D]"}>{item.day}</p>
                        <p className={"text-[#333333] text-2xl"}>{item.date}</p>
                        <p className={"text-xl text-[#9E9D9D]"}>{item.month}</p>
                      </div>
                    ))}
                  </div>
                  <div className={"grid grid-cols-4 gap-4 w-full mt-12"}>
                    {timeData.map((item) => (
                      <p
                        onClick={() => setSelectedTime(item)}
                        className={`${
                          item === selectedTime && "border-2 border-[#C9B081]"
                        } cursor-pointer w-full bg-white rounded py-2 text-center`}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeStep === "infor" && (
              <div className={"w-2/3 px-32"}>
                <div className={" pl-32 w-full flex flex-col gap-3"}>
                  <div>
                    <span className={"text-[#D8B192] text-4xl font-bold"}>
                      Service:
                    </span>
                    <span className={"pl-4 text-4xl font-bold text[#D8B192]"}>
                      {(() => {
                        const tmp1 = findServiceById(selectedService);
                        if (tmp1 != null) {
                          return tmp1.title;
                        } else {
                          return "Chose your service"; // Optionally return a default value if no service is found
                        }
                      })()}
                    </span>
                  </div>
                  <div>
                    <span className={"text-[#D8B192] text-3xl font-bold"}>
                      Bill:
                    </span>
                    <span className={"pl-4 text-3xl font-bold text[#D8B192]"}>
                      {(() => {
                        const tmp1 = findServiceById(selectedService);
                        if (tmp1 != null) {
                          return tmp1.price;
                        } else {
                          return ""; // Optionally return a default value if no service is found
                        }
                      })()}
                    </span>
                  </div>
                  <div>
                    <span className={"text-[#D8B192] text-3xl font-bold"}>
                      Time:
                    </span>
                    <span className={"pl-4 text-3xl font-bold text[#D8B192]"}>
                      {selectedTime}
                    </span>
                    <span className={"pl-4 text-3xl font-bold text[#D8B192]"}>
                      {(() => {
                        const tmp1 = findDateById(selectedDate);
                        if (tmp1 != null) {
                          return (
                            tmp1.day + " " + tmp1.date + " " + tmp1.month + " "
                          );
                        } else {
                          return ""; // Optionally return a default value if no service is found
                        }
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {activeStep === "complete" && (
              <div
                className={"w-full flex flex-col justify-center items-center"}
              >
                <div>
                  <Image src={svg3} alt={'title'} />
                </div>
                <div className={"text-2xl font-bold mt-12"}>
                  Your appointment was sent successfully!
                </div>
              </div>
            )}

            {activeStep !== "complete" && (
              <div className={"w-1/3 -ml-24"}>
                <p className={"text-[#C9B081] text-lg font-semibold"}>
                  Selection
                </p>
                <InputTextarea
                  className={"w-full mt-4"}
                  placeholder={
                    "Please select at least one service from the list"
                  }
                ></InputTextarea>
                <Button
                  onClick={submit}
                  className={"bg-[#C9B081] border-[#C9B081] w-full mt-2"}
                  label="Submit"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={"h-24"}></div>
    </>
  );
}

export default Page;
