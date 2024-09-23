import React from "react";
import StaffBlock from "@/components/StaffBlock";

const StaffSelector = ({ staffData, selectedStaff, setSelectedStaff }) => (
  <div className={"w-11/12 px-32 mt-10"}>
    <div className={"grid grid-cols-3 gap-y-12 gap-x-2"}> 
      {staffData.map((item) => (
        <StaffBlock
          key={item.id}
          image={item.image}
          title={item.name}
          id={item.id}
          star={item.stars}
          selectedStaff={selectedStaff}
          setSelectedStaff={setSelectedStaff}
          subtitle={item.subtitle}
        />
      ))}
    </div>
  </div>
);

export default StaffSelector;
