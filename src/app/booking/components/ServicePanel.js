import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import service1 from "../../../../public/service1.jpg";
import enhance from "../../../../public/enhance.png";
import taking from "../../../../public/taking.png";
import waxingmain from "../../../../public/waxingmain.png";
import ServiceCategoryPanel from "./ServiceCategoryPanel";

const ServicePanel = ({ data, selectedService, setSelectedService }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const panel1 = useRef(null);
  const panel2 = useRef(null);
  const panel3 = useRef(null);
  const panel4 = useRef(null);

  // Function to filter services based on search query
  const filterServices = (query) => {
    const lowerCaseQuery = query.toLowerCase();

    const filtered = {
      natural: data.natural.filter((service) =>
        service.title.toLowerCase().includes(lowerCaseQuery)
      ),
      enhance: data.enhance.filter((service) =>
        service.title.toLowerCase().includes(lowerCaseQuery)
      ),
      takingOff: data.takingOff.filter((service) =>
        service.title.toLowerCase().includes(lowerCaseQuery)
      ),
      waxing: data.waxing.filter((service) =>
        service.title.toLowerCase().includes(lowerCaseQuery)
      ),
    };

    setFilteredData(filtered); // Update the filtered services
  };

  useEffect(() => {
    filterServices(searchQuery); // Filter services every time the query changes
  }, [searchQuery]);

  return (
    <div className={"w-2/3 px-32 mt-10"}>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          className={"w-full"}
          placeholder="What service are you looking for?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </IconField>
      <div className={"my-2"}>
        <ServiceCategoryPanel
          panelRef={panel1}
          imageSrc={service1}
          headerTitle="Natural Nails"
          services={filteredData.natural} 
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      </div>
      <div className={"my-2"}>
        <ServiceCategoryPanel
          panelRef={panel2}
          imageSrc={enhance}
          headerTitle="Nail Extension / Enhancement"
          services={filteredData.enhance} 
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      </div>
      <div className={"my-2"}>
        <ServiceCategoryPanel
          panelRef={panel3}
          imageSrc={taking}
          headerTitle="Gel/Dip/Acrylic Taking Off"
          services={filteredData.takingOff} // Use filtered services
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      </div>
      <div className={"my-2"}>
        <ServiceCategoryPanel
          panelRef={panel4}
          imageSrc={waxingmain}
          headerTitle="Waxing"
          services={filteredData.waxing} // Use filtered services
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      </div>
    </div>
  );
};

export default ServicePanel;
