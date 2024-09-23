import React, { useEffect, useState } from "react";

const TimeSelector = ({
  selectedDate,
  setSelectedDate,
  timeData,
  selectedTime,
  setSelectedTime,
}) => {
  const [dateData, setDateData] = useState([]);

  useEffect(() => {
    const today = new Date();
    const dates = [];

    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      dates.push({
        id: i,
        day: date.toLocaleString("en-US", { weekday: "short" }),
        date: date.getDate(),
        month: date.toLocaleString("en-US", { month: "short" }),
      });
    }

    setDateData(dates);
  }, []);

  return (
    <div className={"flex justify-center items-center h-full w-full px-32"}>
      <div className={"w-10/12"}>
        <div className={"flex gap-2 justify-center"}>
          {dateData.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDate(item.id)}
              className={`${
                item.id === selectedDate && "border-2 border-[#C9B081]"
              } cursor-pointer hover:scale-110 transform transition-transform duration-300 w-24 px-6 py-2 rounded h-auto bg-white flex flex-col items-center justify-center`}
            >
              <p className={"text-xl text-[#9E9D9D]"}>{item.day}</p>
              <p className={"text-[#333333] text-2xl"}>{item.date}</p>
              <p className={"text-xl text-[#9E9D9D]"}>{item.month}</p>
            </div>
          ))}
        </div>
        <div className={"flex justify-center mt-10"}>
          <div className={"grid grid-cols-6 gap-4 w-full"}>
            {timeData.map((item, index) => (
              <p
                key={index}
                onClick={() => setSelectedTime(item)}
                className={`${
                  item === selectedTime && "border-2 border-[#C9B081]"
                } cursor-pointer w-full bg-white rounded py-4 text-center text-xl`}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
