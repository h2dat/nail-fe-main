'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function ManageStaff() {
    const [staff, setStaff] = useState([
        { id: 1, name: 'John Doe', phone: '123-456-7890', startDate: '2021-05-15', avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: 2, name: 'Jane Smith', phone: '987-654-3210', startDate: '2022-01-10', avatar: 'https://i.pravatar.cc/150?img=2' },
        { id: 3, name: 'Mark Johnson', phone: '555-555-5555', startDate: '2020-11-22', avatar: 'https://i.pravatar.cc/150?img=3' },
        { id: 4, name: 'Sara Lee', phone: '222-333-4444', startDate: '2023-03-09', avatar: 'https://i.pravatar.cc/150?img=4' },
        { id: 5, name: 'David Clark', phone: '444-555-6666', startDate: '2021-07-01', avatar: 'https://i.pravatar.cc/150?img=5' }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null); 
    const [newStaff, setNewStaff] = useState({ name: '', phone: '', startDate: '', avatar: '' });
    const [errors, setErrors] = useState({});
    const [avatarPreview, setAvatarPreview] = useState(null); 
    const toast = React.useRef(null);

    const handleEdit = (staffId) => {
        const staffToEdit = staff.find(s => s.id === staffId);
        setEditingStaff(staffToEdit);
        setNewStaff({ ...staffToEdit }); 
        setAvatarPreview(staffToEdit.avatar); 
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setStaff(staff.filter((s) => s.id !== id));
    };

    const handleAddNewStaff = () => {
        setEditingStaff(null);
        setNewStaff({ name: '', phone: '', startDate: '', avatar: '' });
        setAvatarPreview(null); 
        setShowModal(true);
    };

   
    const validateAddForm = () => {
        let formErrors = {};
        if (!newStaff.name) formErrors.name = "Staff Name is required";
        if (!newStaff.phone) formErrors.phone = "Phone Number is required";
        if (!newStaff.startDate) formErrors.startDate = "Start Date is required";
        if (!newStaff.avatar) formErrors.avatar = "Avatar is required";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

  
    const validateEditForm = () => {
        let formErrors = {};
        if (!newStaff.name) formErrors.name = "Staff Name is required";
        if (!newStaff.phone) formErrors.phone = "Phone Number is required";
        if (!newStaff.startDate) formErrors.startDate = "Start Date is required";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSave = () => {
        if (editingStaff) {
           
            if (!validateEditForm()) return;
            setStaff(staff.map(s => s.id === editingStaff.id ? { ...editingStaff, ...newStaff } : s));
        } else {
            if (!validateAddForm()) return; 
            setStaff([...staff, { ...newStaff, id: staff.length + 1 }]);
        }

        setShowModal(false); 
        setNewStaff({ name: '', phone: '', startDate: '', avatar: '' }); 
        setAvatarPreview(null); 
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Staff saved successfully', life: 3000 });
    };

    const avatarTemplate = (rowData) => {
        return (
            <img src={rowData.avatar} alt={rowData.name} className="rounded-full w-12 h-12 object-cover" />
        );
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewStaff(prev => ({ ...prev, avatar: reader.result }));
                setAvatarPreview(reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-4">
            <Toast ref={toast} />

            <div>
                <h1 className='text-3xl font-bold'>Staff Manager</h1>
            </div>

            <div className='mt-7'>
                <button
                    className="bg-[#152C70] text-white px-4 py-2 text-sm box-border rounded-md shadow-sm hover:bg-[#0f214f]"
                    onClick={handleAddNewStaff}
                >
                    Add new staff
                </button>
            </div>

            <div className="mt-6">
                <DataTable value={staff} responsiveLayout="scroll">

                    <Column field="id" header="#" style={{ width: '60px' }} />
                    <Column body={avatarTemplate} header="Avatar" style={{ width: '80px' }} />
                    <Column field="name" header="Staff Name" />
                    <Column field="phone" header="Phone Number" />
                    <Column field="startDate" header="Start Date" />
                    <Column header="Actions" body={(rowData) => (
                        <div className="flex space-x-2">
                            <button onClick={() => handleEdit(rowData.id)} className="text-blue-600">
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button onClick={() => handleDelete(rowData.id)} className="text-red-600">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    )} />
                </DataTable>
            </div>

            <Dialog 
                visible={showModal} 
                style={{ width: '600px', borderRadius: '8px' }} 
                header={editingStaff ? 'Edit Staff' : 'Add New Staff'}
                onHide={() => setShowModal(false)}
            >
                <div className="p-fluid space-y-4">
                    <div className="field">
                        <label htmlFor="name" className="font-semibold">Staff Name</label>
                        <InputText
                            id="name"
                            value={newStaff.name}
                            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                            className={errors.name ? 'p-invalid' : 'w-full p-inputtext-sm'}
                        />
                        {errors.name && <small className="p-error text-sm">{errors.name}</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="phone" className="font-semibold">Phone Number</label>
                        <InputText
                            id="phone"
                            value={newStaff.phone}
                            onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                            className={errors.phone ? 'p-invalid' : 'w-full p-inputtext-sm'}
                        />
                        {errors.phone && <small className="p-error text-sm">{errors.phone}</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="startDate" className="font-semibold">Start Date</label>
                        <InputText
                            id="startDate"
                            value={newStaff.startDate}
                            onChange={(e) => setNewStaff({ ...newStaff, startDate: e.target.value })}
                            className={errors.startDate ? 'p-invalid' : 'w-full p-inputtext-sm'}
                        />
                        {errors.startDate && <small className="p-error text-sm">{errors.startDate}</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="avatar" className="font-semibold">Avatar</label>
                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="w-full p-inputtext-sm"
                        />
                        {avatarPreview && (
                            <img src={avatarPreview} alt="Avatar Preview" className="mt-2 w-24 h-24 object-cover rounded-full mx-auto" />
                        )}
                        {errors.avatar && <small className="p-error text-sm">{errors.avatar}</small>}
                    </div>

                    <div className="mt-4 flex gap-3 justify-between">
                        <Button label="Cancel" icon="pi pi-times" className="p-button-danger" onClick={() => setShowModal(false)} />
                        <Button label="Save" icon="pi pi-check" className="p-button-primary" onClick={handleSave} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
