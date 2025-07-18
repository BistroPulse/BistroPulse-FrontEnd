"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';

interface Customer {
  id:  number;
  name: string;
  phone: string;
  email: string;
  restaurant?: string;
  location: string;
  created?: string;
  avatar: string;
  category?: string;
  status?: string;
  orders?: { id: number; details: string; date: string; status: string }[];
}

// Props for EditCustomer
type EditCustomerProps = {
  customer: Customer;
  onSave: (updatedCustomer: Customer) => void;
  onClose: () => void;
};

const EditCustomer: React.FC<EditCustomerProps> = ({ customer, onSave, onClose }) => {
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    if (customer) setEditedCustomer(customer);
  }, [customer]);

  if (!editedCustomer) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">Loading customer...</div>
      </div>
    );
  }

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditedCustomer({ ...editedCustomer, [e.target.name]: e.target.value });
  };

  const handleEditFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditedCustomer({ ...editedCustomer, avatar: URL.createObjectURL(file) });
    }
  };

  const handleRemoveEditPicture = () => {
    setEditedCustomer({ ...editedCustomer, avatar: "/images/profile.jpg" });
  };

  const handleSaveEdit = () => {
    if (editedCustomer) {
      onSave(editedCustomer);
    }
  };

  return (
    <div className="flex-col flex items-center justify-center z-50 w-[80%]">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">Edit Customer</h2>
        <div className="flex flex-col items-center mb-6">
          <Image
            src={editedCustomer.avatar || "/images/profile.jpg"}
            alt="Avatar"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-gray-200 dark:border-gray-600"
          />
          <div className="flex gap-2">
            <label className="px-6 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 cursor-pointer">
              <Input
                type="file"
                accept="image/*"
                onChange={handleEditFileUpload}
                className="hidden"
                aria-label="Upload profile picture"
              />
              Upload
            </label>
            <Button
              onClick={handleRemoveEditPicture}
              className="px-3 py-1 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 text-sm dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
              aria-label="Remove profile picture"
            >
              Remove
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <Input
              type="text"
              name="name"
              value={editedCustomer.name}
              onChange={handleEditInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter name"
              aria-label="Customer name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <Input
              type="email"
              name="email"
              value={editedCustomer.email}
              onChange={handleEditInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter email"
              aria-label="Customer email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
            <Input
              type="tel"
              name="phone"
              value={editedCustomer.phone}
              onChange={handleEditInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter phone"
              aria-label="Customer phone"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
            <Input
              type="text"
              name="location"
              value={editedCustomer.location}
              onChange={handleEditInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              placeholder="Enter location"
              aria-label="Customer location"
            />
          </div>
          <Button
            onClick={handleSaveEdit}
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md dark:text-black hover:bg-blue-700"
            aria-label="Save changes"
          >
            Save
          </Button>
          <Button
            onClick={onClose}
            className="w-full mt-2 text-gray-600 hover:text-gray-800  dark:hover:text-gray-200 dark:text-black"
            aria-label="Cancel"
          >
            Cancel
          </Button>
        </div>
    </div>
  );
};

// ---------- Static Preview Component ----------
// I've added a wrapper div with a background color to better visualize the component in both themes.
const EditCustomerTest = () => {
  const dummyCustomer: Customer = {
    id: 1,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+123456789",
    location: "New York, USA",
    avatar: "/images/profile.jpg", // default
  };

  const handleSave = (updatedCustomer: Customer) => {
    console.log("Saved customer:", updatedCustomer);
    alert("Customer saved! Check console for data.");
  };

  const handleClose = () => {
    console.log("Modal closed");
    alert("Edit modal closed.");
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg">
      <EditCustomer customer={dummyCustomer} onSave={handleSave} onClose={handleClose} />
    </div>
  );
};

export default EditCustomerTest;