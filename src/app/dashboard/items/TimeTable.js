import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CardBooking from '../components/CardBooking';

export default function TimeTable() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);

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

  const handleNextMonth = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentDate((prevDate) => {
        const nextMonth = new Date(prevDate);
        nextMonth.setMonth(prevDate.getMonth() + 1);
        setSelectedDay(1);
        return nextMonth;
      });
      setIsTransitioning(false);
    }, 300);
  };

  const handlePreviousMonth = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentDate((prevDate) => {
        const previousMonth = new Date(prevDate);
        previousMonth.setMonth(prevDate.getMonth() - 1);
        setSelectedDay(1);
        return previousMonth;
      });
      setIsTransitioning(false);
    }, 300);
  };

  const daysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return new Array(new Date(year, month + 1, 0).getDate()).fill(null).map((_, i) => i + 1);
  };

  useEffect(() => {
    const newDaysInMonth = daysInMonth();
    if (!newDaysInMonth.includes(selectedDay)) {
      setSelectedDay(1);
    }
  }, [currentDate]);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  // Fake staff data with avatars
  const staffData = [
    { id: 1, name: 'Alice Johnson', avatar: 'https://picsum.photos/50/50?random=1' },
    { id: 2, name: 'Bob Smith', avatar: 'https://picsum.photos/50/50?random=2' },
    { id: 3, name: 'Cathy Brown', avatar: 'https://picsum.photos/50/50?random=3' },
    { id: 4, name: 'David Wilson', avatar: 'https://picsum.photos/50/50?random=4' },
    { id: 5, name: 'Eva White', avatar: 'https://picsum.photos/50/50?random=5' },
  ];

  const [filteredStaff, setFilteredStaff] = useState(staffData);

  // Search functionality
  useEffect(() => {
    setFilteredStaff(
      staffData.filter(staff => staff.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

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
          <div className='flex justify-between items-center my-4'>
            <button
              onClick={handlePreviousMonth}
              className='bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center'
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h2 className='text-xl font-semibold'>
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={handleNextMonth}
              className='bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center'
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div className={`flex flex-wrap justify-center gap-2 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {daysInMonth().map((day) => (
              <div
                key={day}
                className={`w-10 h-10 flex items-center justify-center border rounded-full cursor-pointer transition-colors ${selectedDay === day ? 'bg-blue-300' : 'hover:bg-blue-100'}`}
                onClick={() => handleDayClick(day)}
              >
                {day}
              </div>
            ))}
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
