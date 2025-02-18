import React from 'react';
import { useForm } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import { getDatabase, ref, set } from "firebase/database";

const BloodDonationForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const writeUserData = (data) => {
        const db = getDatabase();
        const userId = Date.now(); // Unique ID based on timestamp
        set(ref(db, "users/" + userId), data)
            .then(() => {
                alert("Data successfully saved!");
            })
            .catch((error) => {
                console.error("Error saving data:", error);
                alert("Failed to save data.");
            });
    };
    const onSubmit = (data) => {
        console.log("Form Data:", data);
        writeUserData(data);
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Blood Donation Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Full Name */}
                <div className="flex flex-col">
                    <Label htmlFor="fullName" className="mb-1 text-sm font-medium">
                        Full Name
                    </Label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder='Enter your full name'
                        className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
                        {...register('fullName', { required: 'Name is required' })}
                    />
                    {errors.fullName && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>



                {/* Email */}
                <div className="flex flex-col">
                    <Label htmlFor="lastName" className="mb-1 text-sm font-medium">
                        Email
                    </Label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Enter your email'
                        className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>


                {/* Mobile no */}
                <div className="flex flex-col">
                    <Label htmlFor="mobile" className="mb-1 text-sm font-medium">
                        Mobile Number
                    </Label>
                    <input
                        type="text"
                        id="number"
                        placeholder="Enter your number"
                        className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
                        {...register("number", {
                            required: "Mobile number is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Enter a valid 10-digit mobile number",
                            },
                        })}
                    />

                    {errors.number && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.number.message}
                        </p>
                    )}
                </div>

                {/* Blood Group */}
                <div className="flex flex-col">
                    <Label htmlFor="bloodGroup" className="mb-1 text-sm font-medium">
                        Blood Group
                    </Label>
                    <select
                        id="bloodGroup"
                        className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
                        {...register('bloodGroup', { required: 'Blood Group is required' })}
                    >
                        <option value="">-- Select Blood Group --</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                    {errors.bloodGroup && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.bloodGroup.message}
                        </p>
                    )}
                </div>

                {/* Weight */}
                <div className="flex flex-col">
                    <Label htmlFor="" className="mb-1 text-sm font-medium">
                        Weight
                    </Label>
                    <input
                        type="number"
                        id="weight"
                        placeholder='Enter your Weight in Kgs'
                        className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
                        {...register('weight', { required: 'Weight is required' })}
                    />
                    {errors.weight && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.weight.message}
                        </p>
                    )}
                </div>

                {/* Date of Last Donation */}
                <div className="flex flex-col">
                    <Label htmlFor="" className="mb-1 text-sm font-medium">
                        Date of Last Donation
                    </Label>
                    <input
                        type="date"
                        id="dold"
                        placeholder='Enter your Last Donation Date'
                        className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
                        {...register('dold')}
                    />

                </div>

                {/* State */}
                <div className="flex flex-col">
                    <Label htmlFor="" className="mb-1 text-sm font-medium">
                        State
                    </Label>
                    <input
                        type="text"
                        id="state"
                        placeholder="Enter your current state"
                        className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
                        {...register("state", {
                            required: "State is required",
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "State must contain only letters",
                            },
                        })}
                    />
                    {errors.state && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.state.message}
                        </p>
                    )}
                </div>

                {/* City */}
                <div className="flex flex-col">
                    <Label htmlFor="" className="mb-1 text-sm font-medium">
                        City
                    </Label>
                    <input
                        type="text"
                        id="city"
                        placeholder="Enter your current state"
                        className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
                        {...register("city", {
                            required: "City is required",
                            pattern: {
                                value: /^[A-Za-z\s]+$/,
                                message: "City must contain only letters",
                            },
                        })}
                    />
                    {errors.city && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.city.message}
                        </p>
                    )}
                </div>

                {/* ZipCode */}
                <div className="flex flex-col">
                    <Label htmlFor="" className="mb-1 text-sm font-medium">
                        Zipcode
                    </Label>
                    <input
                        type="number"
                        id="zipcode"
                        placeholder='Enter your zipcode'
                        className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
                        {...register('zipcode', { required: 'zipcode is required' })}
                    />
                    {errors.zipcode && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.zipcode.message}
                        </p>
                    )}
                </div>

                {/* Address */}
                <div className="flex flex-col">
                    <Label htmlFor="" className="mb-1 text-sm font-medium">
                        Address (Optional)
                    </Label>
                    <input
                        type="text"
                        id="address"
                        placeholder='Enter your full address'
                        className="border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
                        {...register('address',)}
                    />
                </div>


                {/* Consent */}
                <div className="flex items-start mt-4">
                    <input
                        type="checkbox"
                        id="consent"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300"
                        aria-required="true"
                        {...register("consent", { required: "You must agree before submitting" })}
                    />
                    <label htmlFor="consent" className="ml-2 text-sm text-gray-700">
                        I agree to provide my blood for donation purposes and confirm that the information provided is accurate.
                    </label>
                </div>
                {errors.consent && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.consent.message}
                    </p>
                )}



                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BloodDonationForm;
