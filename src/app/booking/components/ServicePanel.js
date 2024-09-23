import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import service1 from "../../../../public/service1.jpg";
import enhance from "../../../../public/enhance.png";
import taking from "../../../../public/taking.png";
import waxingmain from "../../../../public/waxingmain.png";
import ServiceCategoryPanel from "./ServiceCategoryPanel";

const ServicePanel = ({
  panel1,
  panel2,
  panel3,
  panel4,
  data,
  selectedService,
  setSelectedService,
}) => {
  const [isOpen, setIsOpen] = useState({
    panel1: false,
    panel2: false,
    panel3: false,
    panel4: false,
  });

  useEffect(() => {
    setIsOpen({
      panel1: false,
      panel2: false,
      panel3: false,
      panel4: false,
    });
  }, []);

  const togglePanel = (panel) => {
    setIsOpen((prev) => ({ ...prev, [panel]: !prev[panel] }));
  };

  return (
    <div className={"w-2/3 px-32 mt-10"}>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText
          className={"w-full"}
          placeholder="What service are you looking for?"
        />
      </IconField>
      <div className={"my-2"}>
        <ServiceCategoryPanel
          panelRef={panel1}
          imageSrc={service1}
          headerTitle="Natural Nails"
          services={data.services}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          isOpen={isOpen.panel1}
          togglePanel={() => togglePanel("panel1")}
        />
      </div>
      <div className={"my-2"}>
        <ServiceCategoryPanel
          panelRef={panel2}
          imageSrc={enhance}
          headerTitle="Nail Extension / Enhancement"
          services={data.enhance}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          isOpen={isOpen.panel2}
          togglePanel={() => togglePanel("panel2")}
        />
      </div>
      <div className={"my-2"}>
        <ServiceCategoryPanel
          panelRef={panel3}
          imageSrc={taking}
          headerTitle="Gel/Dip/Acrylic Taking Off"
          services={data.takingOff}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          isOpen={isOpen.panel3}
          togglePanel={() => togglePanel("panel3")}
        />
      </div>
      <div className={"my-2"}>
        <ServiceCategoryPanel
          panelRef={panel4}
          imageSrc={waxingmain}
          headerTitle="Waxing"
          services={data.waxing}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          isOpen={isOpen.panel4}
          togglePanel={() => togglePanel("panel4")}
        />
      </div>
    </div>
  );
};

export default ServicePanel;
