import React from "react";
import { Panel } from "primereact/panel";
import Image from "next/image";

const ServiceCategoryPanel = ({
  panelRef,
  imageSrc,
  headerTitle,
  services,
  selectedService,
  setSelectedService,
}) => {
  return (
    <Panel
      headerTemplate={
        <div
          onClick={() => panelRef.current.toggle()}
          className={
            "rounded-t-lg cursor-pointer h-fit flex gap-4 pl-4 py-2 bg-white border items-center justify-center"
          }
        >
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={headerTitle}
              width={48}
              height={50}
              className={"h-full w-full object-cover"}
            />
          </div>
          <div className={"flex-grow"}>
            <p className={"text-[#C9B081] font-semibold"}>{headerTitle}</p>
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
      ref={panelRef}
      toggleable
    >
      <div className={"flex flex-col"}>
        {services.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedService(item.id)}
            className={`${
              item.id === selectedService ? "bg-gray-100" : ""
            } flex gap-3 items-center cursor-pointer rounded-xl py-2 px-2`}
          >
            <div className={"w-12 h-12 rounded-full overflow-hidden"}>
              <Image
                className={"h-full w-full object-cover"}
                src={item.image}
                alt={item.title}
                width={48}
                height={50}
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
  );
};

export default ServiceCategoryPanel;
