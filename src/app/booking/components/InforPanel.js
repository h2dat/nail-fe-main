import React from "react";
import { data, dateData } from "../dataHelpers";

const InforPanel = ({ selectedTime, selectedService, selectedDate }) => {
  const findServiceById = (id) => {
    const categories = ["services", "enhance", "takingOff", "waxing"];
    for (const category of categories) {
      const found = data[category].find((item) => item.id === id);
      if (found) return found;
    }
    return null;
  };

  const findDateById = (id) => {
    return dateData.find((item) => item.id === id) || null;
  };

  return (
    <div className="w-2/3 px-32 py-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-[#D8B192] text-4xl font-bold mb-6 text-center">
        Booking Information
      </h2>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-[#D8B192] text-3xl font-semibold">
            Service:
          </span>
          <span className="pl-4 text-3xl font-bold text-[#333333]">
            {(() => {
              const tmp1 = findServiceById(selectedService);
              return tmp1 ? tmp1.title : "Choose your service";
            })()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#D8B192] text-3xl font-semibold">Bill:</span>
          <span className="pl-4 text-3xl font-bold text-[#333333]">
            {(() => {
              const tmp1 = findServiceById(selectedService);
              return tmp1 ? `$${tmp1.price}` : "N/A";
            })()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#D8B192] text-3xl font-semibold">Time:</span>
          <div className="flex flex-col pl-4">
            <span className="text-3xl font-bold text-[#333333]">
              {selectedTime}
            </span>
            <span className="text-3xl font-bold text-[#333333]">
              {(() => {
                const tmp1 = findDateById(selectedDate);
                return tmp1 ? `${tmp1.day}, ${tmp1.date} ${tmp1.month}` : "N/A";
              })()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InforPanel;
