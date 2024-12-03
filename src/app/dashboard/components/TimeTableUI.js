'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faClock } from '@fortawesome/free-solid-svg-icons';
import { useDrag, useDrop } from 'react-dnd';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';

const ItemType = 'SERVICE';
const StaffItemType = 'STAFF';

// Draggable Service component
const DraggableService = ({ service, index, onClickEditService, staffAssigned, onAssignStaff }) => {

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,  
        item: { service, index },
    });

    return (
        <div
            ref={drag}
            onClick={() => onClickEditService(service)}
            className="border p-4 rounded-lg mt-2 shadow-lg bg-gray-100 hover:bg-gray-200 transition-transform transform cursor-move"
        >
            <div className="font-semibold text-gray-800">
                <strong>Service:</strong> {service.service}
            </div>
            <div className="text-gray-600">
                <FontAwesomeIcon icon={faClock} className="mr-1" />
                {service.start}
            </div>
            <div className="text-gray-600 mt-1">
                <strong>Customer:</strong> {service.customer}
            </div>
            <div className="text-gray-600 mt-1">
                <strong>Bill:</strong> {service.bill}
            </div>
            <div className="text-gray-600">
                <strong>Phone:</strong> {service.phone}
            </div>
        </div>
    );
};

// DropTarget component for assigning staff to a service
const DropTarget = ({ hour, services, onDrop, children, onDropStaff, staff, openServiceDialog }) => {
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
                            onClickEditService={openServiceDialog}
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
    const [serviceDialogVisible, setServiceDialogVisible] = useState(false);
    const [newService, setNewService] = useState({
        bill: '',
        service: '',
        customer: '',
        start: '',
        phone: '',
        staff: null,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingService, setEditingService] = useState(null);

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
            { hour: 0, services: [{ bill: '30$', service: 'Manicure', customer: 'Sarah', start: '00:00', phone: '123-456-7890' }] },
            { hour: 1, services: [] },
            { hour: 2, services: [{ bill: '30$', service: 'Pedicure', customer: 'Emily', start: '02:00', phone: '234-567-8901' }] },
            { hour: 3, services: [] },
            { hour: 4, services: [{ bill: '30$', service: 'Gel Nails', customer: 'Lily', start: '04:00', phone: '456-789-0123' }] },
            { hour: 5, services: [] },
            { hour: 6, services: [{ bill: '30$', service: 'Acrylic Nails', customer: 'Jessica', start: '06:00', phone: '567-890-1234' }] },
            { hour: 7, services: [] },
            { hour: 8, services: [{ bill: '30$', service: 'Nail Art', customer: 'Mia', start: '08:45', phone: '678-901-2345' }] },
            { hour: 9, services: [] },
            { hour: 10, services: [{ bill: '30$', service: 'French Manicure', customer: 'Sophia', start: '10:00', phone: '789-012-3456' }] },
            { hour: 11, services: [] },
            { hour: 12, services: [{ bill: '30$', service: 'Nail Care', customer: 'Chloe', start: '12:00', phone: '890-123-4567' }] },
            { hour: 13, services: [] },
            { hour: 14, services: [{ bill: '30$', service: 'Pedicure', customer: 'Olivia', start: '14:00', phone: '901-234-5678' }] },
            { hour: 15, services: [] },
            { hour: 16, services: [{ bill: '30$', service: 'Acrylic Nails', customer: 'Ava', start: '16:00', phone: '012-345-6789' }] },
            { hour: 17, services: [] },
            { hour: 18, services: [{ bill: '30$', service: 'Manicure', customer: 'Ella', start: '18:00', phone: '123-456-7890' }] },
            { hour: 19, services: [] },
            { hour: 20, services: [{ bill: '30$', service: 'Nail Art', customer: 'Lily', start: '20:00', phone: '234-567-8901' }] },
            { hour: 21, services: [] },
            { hour: 22, services: [{ bill: '30$', service: 'Gel Nails', customer: 'Mia', start: '22:00', phone: '345-678-9012' }] },
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

    const openServiceDialog = (serviceToEdit = null) => {
        if (serviceToEdit) {
            // Set editing flag first, then update service details
            setIsEditing(true);
            setEditingService(serviceToEdit);

            // Then update the new service details with the service being edited
            setNewService({
                bill: serviceToEdit.bill,
                service: serviceToEdit.service,
                customer: serviceToEdit.customer,
                start: serviceToEdit.start,
                phone: serviceToEdit.phone,
                staff: serviceToEdit.staff,
            });
        } else {
            // If no service to edit, clear the form and reset isEditing to false
            setIsEditing(false);
            setNewService({
                bill: '',
                service: '',
                customer: '',
                start: '',
                phone: '',
                staff: null,
            });
        }

        // Show the dialog at the end, regardless of editing or adding a new service
        setServiceDialogVisible(true);
    };


    const closeServiceDialog = () => {
        setServiceDialogVisible(false);
        setIsEditing(false);
        setEditingService(null); // Reset editing state
    };

    const handleServiceChange = (e) => {
        setNewService({ ...newService, [e.target.name]: e.target.value });
    };

    const handleStaffChange = (e) => {
        setNewService({ ...newService, staff: e.value });
    };

    const handleAddService = () => {
        const updatedAppointments = [...appointments];
        updatedAppointments[0].services.push(newService); // Add service to the first hour
        setAppointments(updatedAppointments);
        closeServiceDialog();
    };

    const handleEditService = () => {
        const updatedAppointments = [...appointments];
        updatedAppointments.forEach((appt) => {
            appt.services = appt.services.map((service) =>
                service === editingService ? { ...newService, start: service.start, end: service.end } : service
            );
        });
        setAppointments(updatedAppointments);
        closeServiceDialog();
    };
    return (
        <div className="p-4">
            <div className='flex justify-between'>
                <h1 className="text-3xl font-bold">Schedule</h1>
                <Button label="Add Service" icon="pi pi-plus" onClick={() => openServiceDialog(null)} className="p-button-primary mb-4" />
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

                    <div className="mt-10 overflow-y-auto scrollable-content" style={{ maxHeight: 'calc(100vh - 160px)' }}>
                        {appointments.map(({ hour, services }) => (
                            <DropTarget
                                key={hour}
                                hour={hour}
                                services={services}
                                onDrop={handleDrop}
                                openServiceDialog={openServiceDialog}
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

                {/* Add/Edit Service Modal */}
                <Dialog
                    visible={serviceDialogVisible}
                    style={{ width: '50vw' }}
                    onHide={closeServiceDialog}
                    header={isEditing ? 'Edit Service' : 'Add New Service'}
                >
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="bill" className="block text-sm font-medium text-gray-700">Bill</label>
                            <input
                                id="bill"
                                name="bill"
                                type="text"
                                value={newService.bill}
                                onChange={handleServiceChange}
                                placeholder="Enter Bill"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
                            <input
                                id="service"
                                name="service"
                                type="text"
                                value={newService.service}
                                onChange={handleServiceChange}
                                placeholder="Enter Service Name"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer</label>
                            <input
                                id="customer"
                                name="customer"
                                type="text"
                                value={newService.customer}
                                onChange={handleServiceChange}
                                placeholder="Enter Customer Name"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="start" className="block text-sm font-medium text-gray-700">Start Time</label>
                            <input
                                id="start"
                                name="start"
                                type="text"
                                value={newService.start}
                                onChange={handleServiceChange}
                                placeholder="Enter Start Time"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                value={newService.phone}
                                onChange={handleServiceChange}
                                placeholder="Enter Phone Number"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="staff" className="block text-sm font-medium text-gray-700">Staff</label>
                            <select
                                id="staff"
                                value={newService.staff}
                                onChange={handleStaffChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="" disabled>Select a Staff</option>
                                {filteredStaff.map((staffMember) => (
                                    <option key={staffMember.id} value={staffMember.id}>{staffMember.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-4 flex justify-end gap-4">
                            {/* Cancel Button */}
                            <Button
                                label="Cancel"
                                icon="pi pi-times"
                                onClick={closeServiceDialog}
                                className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                            {/* Add/Update Service Button */}
                            <Button
                                label={isEditing ? 'Update Service' : 'Add Service'}
                                icon="pi pi-check"
                                onClick={isEditing ? handleEditService : handleAddService}
                                className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </Dialog>

            </div>
        </div>
    );
}
