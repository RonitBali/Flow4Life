import React, { use, useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import { useForm } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import { getDatabase, ref, push, serverTimestamp } from "firebase/database";
import { data } from 'react-router-dom';

const BloodDonationForm = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState({ lng: 77.209, lat: 28.6139 }); 
    const [address,setAddress] = useState(null);


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lng: position.coords.longitude,
                        lat: position.coords.latitude,
                    });
                },
                (error) => {
                    console.error("Geolocation error:", error);
                }
            );
        }
    }, []); // Empty dependency array to run only once on mount
    
   
  useEffect(() => {
    async function fetchLocation(lat, lng) {
      if (!lat || !lng) return;

      try {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${"b3b3bbc277c2455fb37537202146f48e"}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch location data");

        const data = await res.json();
        console.log("Fetched location data:", data);

        if (data.results.length > 0) {
          const result = data.results[0].components;
          setAddress({
            state: result.state,
            city: result.city || result.town || result.village,
            zipcode: result.postcode,
            country : result.country
          });
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }

    if (location.lat && location.lng) {
      fetchLocation(location.lat, location.lng);
    }
  }, []);

  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);
  

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
      fullName: user.displayName,
      email: user.email,
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
    <div className="flex justify-center items-center bg-gray-100 p-4 min-h-screen">
      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-lg w-full transition transform hover:scale-105 duration-300 ease-in-out overflow-y-auto max-h-[80vh] custom-scrollbar">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Blood Donation Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div className="flex flex-col">
            <Label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">
              Full Name
            </Label>
            <p>{user?.displayName}</p>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <Label className="block text-gray-700 font-medium mb-1">
              Email
            </Label>
            <p>{user?.email}</p>
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
            <Label htmlFor="bloodGroup" className="block text-gray-700 font-medium mb-1">
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
            <Label htmlFor="weight" className="block text-gray-700 font-medium mb-1">
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
            <Label htmlFor="dold" className="block text-gray-700 font-medium mb-1">
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
          
          <div className="flex flex-col">
            <Label className="block text-gray-700 font-medium mb-1">
              City : {address?.city}
            </Label>

            <Label className="block text-gray-700 font-medium mb-1">
              State : {address?.state}
            </Label>
            <Label className="block text-gray-700 font-medium mb-1">
              Pincode : {address?.zipcode}
            </Label>
            <Label className="block text-gray-700 font-medium mb-1">
              Country : {address?.country}
            </Label>
           
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
              className="bg-red-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-red-600 shadow-lg disabled:opacity-50 transition duration-200 ease-in-out transform hover:scale-105"
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



// //<div>
//           {/* State */}
//           <div className="flex flex-col">
//             <Label htmlFor="state" className="block text-gray-700 font-medium mb-1">
//               State
//             </Label>
//             <input
//               type="text"
//               id="state"
//               placeholder="Enter your current state"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 transition outline-none"
//               {...register("state", {
//                 required: "State is required",
//                 pattern: {
//                   value: /^[A-Za-z\s]+$/,
//                   message: "State must contain only letters",
//                 },
//               })}
//             />
//             {errors.state && (
//               <p className="text-sm text-red-500 mt-1">
//                 {errors.state.message}
//               </p>
//             )}
//           </div>

//           {/* City */}
//           <div className="flex flex-col">
//             <Label htmlFor="city" className="block text-gray-700 font-medium mb-1">
//               City
//             </Label>
//             <input
//               type="text"
//               id="city"
//               placeholder="Enter your current city"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 transition outline-none"
//               {...register("city", {
//                 required: "City is required",
//                 pattern: {
//                   value: /^[A-Za-z\s]+$/,
//                   message: "City must contain only letters",
//                 },
//               })}
//             />
//             {errors.city && (
//               <p className="text-sm text-red-500 mt-1">
//                 {errors.city.message}
//               </p>
//             )}
//           </div>

//           {/* ZipCode */}
//           <div className="flex flex-col">
//             <Label htmlFor="zipcode" className="block text-gray-700 font-medium mb-1">
//               Zipcode
//             </Label>
//             <input
//               type="number"
//               id="zipcode"
//               placeholder='Enter your zipcode'
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 transition outline-none"
//               {...register('zipcode', { required: 'Zipcode is required' })}
//             />
//             {errors.zipcode && (
//               <p className="text-sm text-red-500 mt-1">
//                 {errors.zipcode.message}
//               </p>
//             )}
//           </div>

//           {/* Address */}
//           <div className="flex flex-col">
//             <Label htmlFor="address" className="block text-gray-700 font-medium mb-1">
//               Address (Optional)
//             </Label>
//             <input
//               type="text"
//               id="address"
//               placeholder='Enter your full address'
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 transition outline-none"
//               {...register('address')}
//             />
//           </div>
//           </div>