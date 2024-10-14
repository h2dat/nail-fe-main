'use client'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CardBooking from '../components/CardBooking';

export default function TimeTable() {
  const today = new Date();
  const [startIndex, setStartIndex] = useState(0);
  const [dateData, setDateData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const generateDateData = (startIndex) => {
    const dates = [];
    for (let i = startIndex; i < startIndex + 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        id: i,
        day: date.toLocaleString("en-US", { weekday: "short" }),
        date: date.getDate(),
        month: date.toLocaleString("en-US", { month: "short" }),
        year: date.getFullYear(),
      });
    }
    return dates;
  };

  useEffect(() => {
    setDateData(generateDateData(startIndex));
  }, [startIndex]);

  const initialAppointments = [
    {
      hour: 9,
      services: [
        { name: 'Manicure', customer: 'Sarah', start: "10:00", end: "11:00", phone: '123-456-7890' },
        { name: 'Nail Trim', customer: 'Tom', start: "09:30", end: "10:00", phone: '987-654-3210' }
      ]
    },
    { hour: 10, services: [] },
    {
      hour: 11,
      services: [
        { name: 'Pedicure', customer: 'Emily', start: "11:00", end: "12:00", phone: '234-567-8901' },
        { name: 'Foot Massage', customer: 'Lisa', start: "11:15", end: "12:00", phone: '345-678-9012' }
      ]
    },
    { hour: 12, services: [] },
    {
      hour: 13,
      services: [
        { name: 'Gel Nails', customer: 'Lily', start: "13:00", end: "14:00", phone: '456-789-0123' }
      ]
    },
    { hour: 14, services: [] },
    {
      hour: 15,
      services: [
        { name: 'Acrylic Nails', customer: 'Jessica', start: "15:00", end: "16:00", phone: '567-890-1234' }
      ]
    },
    { hour: 16, services: [] },
    {
      hour: 17,
      services: [
        { name: 'Nail Art', customer: 'Mia', start: "17:00", end: "18:00", phone: '678-901-2345' },
        { name: 'Manicure', customer: 'Alex', start: "17:30", end: "18:30", phone: '789-012-3456' }
      ]
    },
    { hour: 18, services: [] },
  ];

  const [appointments, setAppointments] = useState(initialAppointments);
  const [filteredStaff, setFilteredStaff] = useState([
    { id: 1, name: 'Alice Johnson', avatar: 'https://picsum.photos/50/50?random=1' },
    { id: 2, name: 'Bob Smith', avatar: 'https://picsum.photos/50/50?random=2' },
    { id: 3, name: 'Cathy Brown', avatar: 'https://picsum.photos/50/50?random=3' },
    { id: 4, name: 'David Wilson', avatar: 'https://picsum.photos/50/50?random=4' },
    { id: 5, name: 'Eva White', avatar: 'https://picsum.photos/50/50?random=5' },
  ]);

  // Search functionality
  useEffect(() => {
    setFilteredStaff((prev) => 
      prev.filter(staff => staff.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const handleNext = () => {
    setIsTransitioning(true);
    setStartIndex((prevIndex) => prevIndex + 10);
    setTimeout(() => setIsTransitioning(false), 300); // Reset transition after 300ms
  };

  const handlePrevious = () => {
    setIsTransitioning(true);
    setStartIndex((prevIndex) => prevIndex - 10);
    setTimeout(() => setIsTransitioning(false), 300); // Reset transition after 300ms
  };

  const displayedDates = dateData.slice(0, 10);

  const handleStaffClick = (staff) => {
    setSelectedStaff(staff.id === selectedStaff ? null : staff.id); // Toggle selection
  };

  return (
    <div className="p-4">
      <div>
        <h1 className='text-3xl font-bold'>Schedule</h1>
      </div>

      <div className='flex flex-col lg:flex-row lg:space-x-8'>
        <div className='flex-1'>
          <div className="flex justify-between items-center mt-5">
            <button onClick={handlePrevious} className="rounded flex items-center">
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
            </button>

            <div className={`flex flex-wrap gap-2 justify-center flex-1 transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              {displayedDates.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer hover:scale-110 transform transition-transform duration-300 w-24 px-6 py-2 rounded h-auto bg-white flex flex-col items-center justify-center"
                >
                  <p className="text-xl text-center text-[#9E9D9D]">{item.day}</p>
                  <p className="text-[#333333] text-center text-2xl">{item.date}</p>
                  <p className="text-xl text-center text-[#9E9D9D]">{item.month} {item.year}</p>
                </div>
              ))}
            </div>

            <button onClick={handleNext} className="rounded flex items-center">
              <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
            </button>
          </div>

          {/* Timeline from 9 AM to 6 PM */}
          <div className='mt-8'>
            <div className='flex flex-col'>
              {appointments.map(({ hour, services }) => (
                <div key={hour} className='border-b py-2 flex gap-10 px-4 items-center'>
                  <span className='text-lg text-gray-500'>{hour}:00</span>
                  {services.length > 0 && (
                    <div className='flex flex-wrap gap-5 ml-4 cursor-pointer'>
                      {services.map((service, index) => (
                        <CardBooking key={index} index={index} service={service} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='w-full lg:w-1/4 mt-4 lg:mt-0'>
          <h2 className='text-2xl font-bold mb-4'>List of Staff</h2>
          <input
            type='text'
            placeholder='Search Staff...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='border rounded p-2 mb-4 w-full'
          />
          <table className='min-w-full border'>
            <tbody>
              {filteredStaff.map(staff => (
                <tr key={staff.id} onClick={() => handleStaffClick(staff)} className={`cursor-pointer ${selectedStaff === staff.id ? 'bg-blue-200' : ''}`}>
                  <td className='border p-2 flex items-center'>
                    <img src={staff.avatar} alt={staff.name} className='rounded-full w-10 h-10 mr-2' />
                    {staff.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
