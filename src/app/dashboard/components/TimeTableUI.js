'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faClock } from '@fortawesome/free-solid-svg-icons';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'SERVICE';
const StaffItemType = 'STAFF';

// Draggable Service component
const DraggableService = ({ service, index, staffAssigned, onAssignStaff }) => {
    const [, drag] = useDrag(() => ({
        type: ItemType,
        item: { service, index },
    }));

    return (
        <div
            ref={drag}
            className="border p-4 rounded-lg mt-2 shadow-lg bg-gray-100 hover:bg-gray-200 transition-transform transform cursor-move"
        >
            <div className="font-semibold text-gray-800">
                <strong>Service:</strong> {service.name}
            </div>
            <div className="text-gray-600">
                <FontAwesomeIcon icon={faClock} className="mr-1" />
                {service.start} - {service.end}
            </div>
            <div className="text-gray-600 mt-1">
                <strong>Customer:</strong> {service.customer}
            </div>
            <div className="text-gray-600">
                <strong>Phone:</strong> {service.phone}
            </div>
            <div className="text-gray-600 mt-1">
                <strong>Assigned Staff:</strong> {staffAssigned ? staffAssigned.name : "None"}
            </div>
            <button onClick={() => onAssignStaff(service, staffAssigned)} className="mt-2 text-sm text-blue-500">
                {staffAssigned ? "Change Staff" : "Assign Staff"}
            </button>
        </div>
    );
};

// Draggable Staff component
const DraggableStaff = ({ staff, onDropStaff }) => {
    const [, drag] = useDrag(() => ({
        type: StaffItemType,
        item: { staff },
    }));

    return (
        <div ref={drag} className="flex items-center cursor-pointer py-3 px-5 rounded-lg transition-all duration-300 ease-in-out">
            <img src={staff.avatar} alt={staff.name} className="w-12 h-12 rounded-full mr-4" />
            <span className="text-base font-semibold">{staff.name}</span>
        </div>
    );
};

// DropTarget component for assigning staff to a service
const DropTarget = ({ hour, services, onDrop, children, onDropStaff, staff }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemType,
        drop: (item) => onDrop(item.service, hour),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`border-b py-2 flex gap-10 px-4 items-center min-h-40 ${isOver ? 'bg-gray-200' : ''}`}
        >
            {children}
            {services.length > 0 && (
                <div className="flex flex-wrap gap-5 ml-4">
                    {services.map((service, index) => (
                        <DraggableService
                            key={`${hour}-${service.name}-${index}`}
                            index={index}
                            service={service}
                            staffAssigned={service.assignedStaff}
                            onAssignStaff={onDropStaff}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function TimeTableUI() {
    const today = new Date();
    const [startIndex, setStartIndex] = useState(0);
    const [dateData, setDateData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [appointments, setAppointments] = useState([]);

    const generateDateData = (startIndex) => {
        const dates = [];
        for (let i = startIndex; i < startIndex + 9; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push({
                id: i,
                day: date.toLocaleString('en-US', { weekday: 'short' }),
                date: date.getDate(),
                month: date.toLocaleString('en-US', { month: 'short' }),
                year: date.getFullYear(),
            });
        }
        return dates;
    };

    useEffect(() => {
        setDateData(generateDateData(startIndex));
    }, [startIndex]);

    useEffect(() => {
        const initialAppointments = [
            { hour: 0, services: [{ name: 'Manicure', customer: 'Sarah', start: '00:00', end: '01:00', phone: '123-456-7890' }] },
            { hour: 1, services: [] },
            { hour: 2, services: [{ name: 'Pedicure', customer: 'Emily', start: '02:00', end: '03:00', phone: '234-567-8901' }] },
            { hour: 3, services: [] },
            { hour: 4, services: [{ name: 'Gel Nails', customer: 'Lily', start: '04:00', end: '05:00', phone: '456-789-0123' }] },
            { hour: 5, services: [] },
            { hour: 6, services: [{ name: 'Acrylic Nails', customer: 'Jessica', start: '06:00', end: '07:00', phone: '567-890-1234' }] },
            { hour: 7, services: [] },
            { hour: 8, services: [{ name: 'Nail Art', customer: 'Mia', start: '08:00', end: '09:00', phone: '678-901-2345' }] },
            { hour: 9, services: [] },
            { hour: 10, services: [{ name: 'French Manicure', customer: 'Sophia', start: '10:00', end: '11:00', phone: '789-012-3456' }] },
            { hour: 11, services: [] },
            { hour: 12, services: [{ name: 'Nail Care', customer: 'Chloe', start: '12:00', end: '13:00', phone: '890-123-4567' }] },
            { hour: 13, services: [] },
            { hour: 14, services: [{ name: 'Pedicure', customer: 'Olivia', start: '14:00', end: '15:00', phone: '901-234-5678' }] },
            { hour: 15, services: [] },
            { hour: 16, services: [{ name: 'Acrylic Nails', customer: 'Ava', start: '16:00', end: '17:00', phone: '012-345-6789' }] },
            { hour: 17, services: [] },
            { hour: 18, services: [{ name: 'Manicure', customer: 'Ella', start: '18:00', end: '19:00', phone: '123-456-7890' }] },
            { hour: 19, services: [] },
            { hour: 20, services: [{ name: 'Nail Art', customer: 'Lily', start: '20:00', end: '21:00', phone: '234-567-8901' }] },
            { hour: 21, services: [] },
            { hour: 22, services: [{ name: 'Gel Nails', customer: 'Mia', start: '22:00', end: '23:00', phone: '345-678-9012' }] },
            { hour: 23, services: [] },
        ];

        setAppointments(initialAppointments);
    }, []);

    const [filteredStaff, setFilteredStaff] = useState([
        { id: 1, name: "Alice Johnson", avatar: "https://picsum.photos/50/50?random=1" },
        { id: 2, name: "Bob Smith", avatar: "https://picsum.photos/50/50?random=2" },
        { id: 3, name: "Cathy Brown", avatar: "https://picsum.photos/50/50?random=3" },
        { id: 4, name: "David Wilson", avatar: "https://picsum.photos/50/50?random=4" },
        { id: 5, name: "Eva White", avatar: "https://picsum.photos/50/50?random=5" },
    ]);

    useEffect(() => {
        setFilteredStaff(prev =>
            prev.filter(staff => staff.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm]);

    const handleStaffClick = (staff) => {
        setSelectedStaff(staff.id === selectedStaff ? null : staff.id);
    };

    const handleDrop = (service, targetHour) => {
        setAppointments(prevAppointments => {
            return prevAppointments.map(appt => {
                const newServices = appt.services.filter(
                    (existingService) =>
                        !(existingService.name === service.name && existingService.customer === service.customer)
                );

                if (appt.hour === targetHour) {
                    const updatedService = {
                        ...service,
                        start: `${targetHour.toString().padStart(2, '0')}:00`,
                        end: `${(targetHour + 1).toString().padStart(2, '0')}:00`,
                    };
                    newServices.push(updatedService);
                }

                return { ...appt, services: newServices };
            });
        });
    };

    const handleAssignStaff = (service, staff) => {
        setAppointments(prevAppointments => {
            return prevAppointments.map(appt => {
                const updatedServices = appt.services.map(srv => {
                    if (srv.name === service.name && srv.customer === service.customer) {
                        return { ...srv, assignedStaff: staff };
                    }
                    return srv;
                });
                return { ...appt, services: updatedServices };
            });
        });
    };

    return (
        <div className="p-4">
            <div>
                <h1 className="text-3xl font-bold">Schedule</h1>
            </div>
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                <div className="flex-1">
                    <div className="flex justify-between items-center mt-5">
                        <button onClick={() => setStartIndex(prev => prev - 9)} className="rounded flex items-center">
                            <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
                        </button>

                        <div className="flex flex-wrap gap-2 justify-center flex-1">
                            {dateData.map(item => (
                                <div
                                    key={item.id}
                                    className="cursor-pointer hover:scale-110 transform transition-transform duration-300 w-24 px-6 py-2 rounded h-auto bg-white flex flex-col items-center justify-center"
                                >
                                    <p className="text-xl text-center text-[#9E9D9D]">{item.day}</p>
                                    <p className="text-[#333333] text-center text-2xl">{item.date}</p>
                                    <p className="text-[#9E9D9D] text-center text-lg">{item.month}</p>
                                </div>
                            ))}
                        </div>

                        <button onClick={() => setStartIndex(prev => prev + 9)} className="rounded flex items-center">
                            <FontAwesomeIcon icon={faChevronRight} className="mr-2" />
                        </button>
                    </div>

                    <div className="mt-10">
                        {appointments.map(({ hour, services }) => (
                            <DropTarget
                                key={hour}
                                hour={hour}
                                services={services}
                                onDrop={handleDrop}
                                onDropStaff={handleAssignStaff}
                            >
                                <span className="text-lg text-gray-500">{hour.toString().padStart(2, '0')}:00</span>
                            </DropTarget>
                        ))}
                    </div>
                </div>

                {/* Staff Search */}
                <div className="w-full lg:w-80 mt-8 lg:mt-0">
                    <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="Search Staff..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                        {filteredStaff.map((staff) => (
                            <>
                                <div
                                    key={staff.id}
                                    onClick={() => handleStaffClick(staff)}
                                    className={`flex items-center cursor-pointer py-3 px-5 rounded-lg transition-all duration-300 ease-in-out
        ${staff.id === selectedStaff && "bg-blue-100 border-blue-500 text-blue-700"}
        `}
                                >
                                    <img
                                        src={staff.avatar}
                                        alt={staff.name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <span className="text-base font-semibold">{staff.name}</span>
                                </div>
                                <hr />
                            </>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
