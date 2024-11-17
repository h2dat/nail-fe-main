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

export default function ManageServices() {
    const [services, setServices] = useState([
        { id: 1, name: 'Web Development', price: '500', description: 'Full-stack web development', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'App Design', price: '300', description: 'Mobile app UI/UX design', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'SEO Optimization', price: '200', description: 'SEO services to boost rankings', image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Consulting', price: '150', description: 'Business strategy and consultation', image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Graphic Design', price: '250', description: 'Designing graphics for various media', image: 'https://via.placeholder.com/150' }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingService, setEditingService] = useState(null); 
    const [newService, setNewService] = useState({ name: '', price: '', description: '', image: '' });
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null); 
    const toast = React.useRef(null);

    const handleEdit = (serviceId) => {
        const serviceToEdit = services.find(s => s.id === serviceId);
        setEditingService(serviceToEdit);
        setNewService({ ...serviceToEdit });
        setImagePreview(serviceToEdit.image); 
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setServices(services.filter((s) => s.id !== id));
    };

    const handleAddNewService = () => {
        setEditingService(null);
        setNewService({ name: '', price: '', description: '', image: '' });
        setImagePreview(null); 
        setShowModal(true);
    };

    const validateAddForm = () => {
        let formErrors = {};
        if (!newService.name) formErrors.name = "Service Name is required";
        if (!newService.price) formErrors.price = "Price is required";
        if (!newService.description) formErrors.description = "Description is required";
        if (!newService.image) formErrors.image = "Service Image is required";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const validateEditForm = () => {
        let formErrors = {};
        if (!newService.name) formErrors.name = "Service Name is required";
        if (!newService.price) formErrors.price = "Price is required";
        if (!newService.description) formErrors.description = "Description is required";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSave = () => {
        if (editingService) {
            if (!validateEditForm()) return;
            setServices(services.map(s => s.id === editingService.id ? { ...editingService, ...newService } : s));
        } else {
            if (!validateAddForm()) return;
            setServices([...services, { ...newService, id: services.length + 1 }]);
        }

        setShowModal(false); 
        setNewService({ name: '', price: '', description: '', image: '' });
        setImagePreview(null); 
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Service saved successfully', life: 3000 });
    };

    const imageTemplate = (rowData) => {
        return (
            <img src={rowData.image} alt={rowData.name} className="rounded w-12 h-12 object-cover" />
        );
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewService(prev => ({ ...prev, image: reader.result }));
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-4">
            <Toast ref={toast} />

            <div>
                <h1 className='text-3xl font-bold'>Service Manager</h1>
            </div>

            <div className='mt-7'>
                <button
                    className="bg-[#152C70] text-white px-4 py-2 text-sm box-border rounded-md shadow-sm hover:bg-[#0f214f]"
                    onClick={handleAddNewService}
                >
                    Add new service
                </button>
            </div>

            <div className="mt-6">
                <DataTable value={services} responsiveLayout="scroll">

                    <Column field="id" header="#" style={{ width: '60px' }} />
                    <Column body={imageTemplate} header="Image" style={{ width: '80px' }} />
                    <Column field="name" header="Service Name" />
                    <Column field="price" header="Price" />
                    <Column field="description" header="Description" />
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
                header={editingService ? 'Edit Service' : 'Add New Service'}
                onHide={() => setShowModal(false)}
            >
                <div className="p-fluid space-y-4">
                    <div className="field">
                        <label htmlFor="name" className="font-semibold">Service Name</label>
                        <InputText
                            id="name"
                            value={newService.name}
                            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                            className={errors.name ? 'p-invalid' : 'w-full p-inputtext-sm'}
                        />
                        {errors.name && <small className="p-error text-sm">{errors.name}</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="price" className="font-semibold">Price</label>
                        <InputText
                            id="price"
                            value={newService.price}
                            onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                            className={errors.price ? 'p-invalid' : 'w-full p-inputtext-sm'}
                        />
                        {errors.price && <small className="p-error text-sm">{errors.price}</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="description" className="font-semibold">Description</label>
                        <InputText
                            id="description"
                            value={newService.description}
                            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                            className={errors.description ? 'p-invalid' : 'w-full p-inputtext-sm'}
                        />
                        {errors.description && <small className="p-error text-sm">{errors.description}</small>}
                    </div>

                    <div className="field">
                        <label htmlFor="image" className="font-semibold">Image</label>
                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-inputtext-sm"
                        />
                        {imagePreview && (
                            <img src={imagePreview} alt="Image Preview" className="mt-2 w-24 h-24 object-cover rounded-full mx-auto" />
                        )}
                        {errors.image && <small className="p-error text-sm">{errors.image}</small>}
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
