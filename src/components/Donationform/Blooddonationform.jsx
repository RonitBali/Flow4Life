import React from 'react';
import { auth } from "@/firebase"; 
import { useForm } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import { getDatabase, ref, push, serverTimestamp } from "firebase/database";

const BloodDonationForm = () => {
    
   const { register, handleSubmit, formState: { errors } } = useForm();
     const [loading, setLoading] = useState(false);
 
     const onSubmit = async (data) => {
         setLoading(true);
 
         const userId = auth?.currentUser?.uid;
         if (!userId) {
             alert("You must be signed in to request blood.");
             setLoading(false);
             return;
         }
 
         const db = getDatabase();
         const requestRef = ref(db, "donation_requests");
 
         const requestData = {
             userId,
             fullName: data.fullName,
             email: data.email,
             number: data.number,
             bloodGroup: data.bloodGroup,
             weight: data.weight,
             dateoflastdonation: data.dold,
             state: data.state,
             city: data.city,
             zipcode: data.zipcode,
             address: data.address || "Not Provided",
             consent: data.consent,
             requestTime: serverTimestamp(),
         };
 
         try {
             await push(requestRef, requestData);
             alert("Blood request submitted successfully!");
         } catch (error) {
             console.error("Error submitting request:", error);
             alert("Failed to submit request.");
         } finally {
             setLoading(false);
         }
     };
 

    return (
        <div className="flex justify-center items-center bg-gray-100 p-4 min-h-screen ">
             <div className="bg-white shadow-xl rounded-2xl p-6 max-w-lg w-full 
                      transition transform hover:scale-105 duration-300 ease-in-out 
                      overflow-y-auto max-h-[80vh] custom-scrollbar">
            <h2  className="text-2xl font-semibold text-center text-gray-800 mb-6">Blood Donation Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Full Name */}
                <div className="flex flex-col">
                    <Label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">
                        Full Name
                    </Label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder='Enter your full name'
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 transition outline-none"
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
                    <Label className="block text-gray-700 font-medium mb-1">
                        Email
                    </Label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Enter your email'
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 transition outline-none"
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
                    <Label htmlFor="mobile" className="block text-gray-700 font-medium mb-1">
                        Mobile Number
                    </Label>
                    <input
                        type="text"
                        id="number"
                        placeholder="Enter your number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 transition outline-none"
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
                    <Label htmlFor="bloodGroup"className="block text-gray-700 font-medium mb-1">
                        Blood Group
                    </Label>
                    <select
                        id="bloodGroup"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 transition outline-none"
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
                    <Label htmlFor="" className="block text-gray-700 font-medium mb-1">
                        Weight
                    </Label>
                    <input
                        type="number"
                        id="weight"
                        placeholder='Enter your Weight in Kgs'
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 transition outline-none"
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
                    <Label htmlFor="" className="block text-gray-700 font-medium mb-1">
                        Date of Last Donation
                    </Label>
                    <input
                        type="date"
                        id="dold"
                        placeholder='Enter your Last Donation Date'
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 transition outline-none"
                        {...register('dold')}
                    />

                </div>

                {/* State */}
                <div className="flex flex-col">
                    <Label htmlFor="" className="block text-gray-700 font-medium mb-1">
                        State
                    </Label>
                    <input
                        type="text"
                        id="state"
                        placeholder="Enter your current state"
                         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 transition outline-none"
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
                    <Label htmlFor="" className="block text-gray-700 font-medium mb-1">
                        City
                    </Label>
                    <input
                        type="text"
                        id="city"
                        placeholder="Enter your current state"
                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 transition outline-none"
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
                    <Label htmlFor="" className="block text-gray-700 font-medium mb-1">
                        Zipcode
                    </Label>
                    <input
                        type="number"
                        id="zipcode"
                        placeholder='Enter your zipcode'
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 transition outline-none"
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
                    <Label htmlFor="" className="block text-gray-700 font-medium mb-1">
                        Address (Optional)
                    </Label>
                    <input
                        type="text"
                        id="address"
                        placeholder='Enter your full address'
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 transition outline-none"
                        {...register('address',)}
                    />
                </div>


                {/* Consent */}
                <div className="flex items-center gap-2">
                       <input
                           type="checkbox"
                           className="w-4 h-4 border border-gray-300 rounded-full"
                           {...register("consent", { required: "You must agree before submitting" })}
                       />
                       <label className="text-sm text-gray-700">
                           I agree to donate my blood and confirm that the provided information is accurate.
                       </label>
                   </div>
                   {errors.consent && <p className="text-red-500 text-sm">{errors.consent.message}</p>}

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-red-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-red-600  shadow-lg disabled:opacity-50  transition duration-200 ease-in-out transform hover:scale-105 "
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Donate Blood"}
                    </button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default BloodDonationForm;

