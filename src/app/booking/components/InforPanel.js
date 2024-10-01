import React from "react";
import { data } from "../dataHelpers";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const InforPanel = ({
  selectedTime,
  selectedService,
  selectedDate,
  submit,
}) => {
  console.log(selectedDate)
  const findServiceById = (id) => {
    const categories = ["natural", "enhance", "takingOff", "waxing"];
    for (const category of categories) {
      const found = data[category].find((item) => item.id === id);
      if (found) return found;
    }
    return null;
  };

  return (
    <div className="flex gap-10 justify-center mt-10">
      {/* Booking Information Card */}
      <div className="w-2/3 p-6 bg-white shadow-lg rounded-lg">
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
                return tmp1 ? `${tmp1.price}` : "N/A";
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
                  const tmp1 = selectedDate;
                  return tmp1
                    ? `${tmp1.day}, ${tmp1.date} ${tmp1.month}`
                    : "N/A";
                })()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Card */}
      <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-[#D8B192] text-4xl font-bold mb-6 text-center">
          Submit Selection
        </h2>
        <InputTextarea
          className="w-full mt-4 border border-[#D8B192] rounded-lg p-2"
          placeholder="Please select at least one service from the list"
          rows={4} // Adjust the number of rows as needed
        />
        <Button
          onClick={submit}
          className="bg-[#C9B081] border-[#C9B081] w-full mt-4 rounded-lg p-2 text-4xl font-bold"
          label="Submit"
        />
      </div>
    </div>
  );
};

export default InforPanel;
