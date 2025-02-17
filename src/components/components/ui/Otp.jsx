// import React, { useState, useRef } from "react";
// import {
//   getAuth,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
// } from "firebase/auth";
// import { app } from "../Firebase"; // Make sure Firebase is initialized properly
// import { Button } from "../components/ui/button";

// const Otp = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const [error, setError] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const recaptchaVerifierRef = useRef(null);
//   const inputRefs = useRef([]);

//   const auth = getAuth(app);
//   auth.languageCode = "en"; // Set language to English

//   /** ✅ Setup reCAPTCHA v2 (Invisible) */
//   const setupRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//         size: 'invisible',
//         callback: (response) => {
//           console.log("reCAPTCHA resolved:", response);
//           handleSendOtp();
//         },
//         'expired-callback': () => {
//           console.warn("reCAPTCHA expired, resetting...");
//           window.recaptchaVerifier.render().then(widgetId => {
//             grecaptcha.reset(widgetId);
//           });
//         }
//       });
//     }
//   };
  

//   /** ✅ Send OTP */
//   const handleSendOtp = () => {
//     setupRecaptcha();
  
//     let formattedPhoneNumber = phoneNumber.trim(); 
  
//     if (!/^\d{10}$/.test(formattedPhoneNumber)) {
//       setError("Invalid phone number! Enter a 10-digit number.");
//       return;
//     }
  
//     const phoneNumberWithCountryCode = `+91${formattedPhoneNumber}`;
//     console.log("Formatted phone number:", phoneNumberWithCountryCode);
  
//     const appVerifier = window.recaptchaVerifier;
  
//     if (!appVerifier) {
//       setError("reCAPTCHA verification failed. Please try again.");
//       return;
//     }
  
//     signInWithPhoneNumber(auth, phoneNumberWithCountryCode, appVerifier)
//       .then((confirmationResult) => {
//         setConfirmationResult(confirmationResult);
//         setError("");
//         console.log("OTP sent successfully.");
//       })
//       .catch((error) => {
//         console.error("Error sending OTP:", error);
//         setError(error.message);
//       });
//   };
  

//   /** ✅ Verify OTP */
//   const handleVerifyOtp = () => {
//     const otpCode = otp.join("");
//     if (otpCode.length !== 6) {
//       setError("Enter a valid 6-digit OTP.");
//       return;
//     }

//     if (confirmationResult) {
//       confirmationResult
//         .confirm(otpCode)
//         .then((result) => {
//           console.log("User signed in successfully:", result.user);
//           setError("");
//         })
//         .catch((error) => {
//           console.error("Error verifying OTP:", error);
//           setError("Incorrect OTP. Please try again.");
//         });
//     } else {
//       setError("Please request OTP first.");
//     }
//   };

//   /** ✅ Handle OTP Input Change */
//   const handleOtpChange = (index, value) => {
//     if (!/^\d?$/.test(value)) return; // Only allow digits

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Move focus to the next input
//     if (value && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   return (
//     <div className="otp-container">
//       <h1>OTP Authentication</h1>

//       {/* Invisible reCAPTCHA */}
//       <div id="recaptcha-container"></div>

//       {/* Phone Number Input */}
//       <input
//         type="text"
//         placeholder="Enter 10-digit Phone Number"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//       />
//       <Button onClick={handleSendOtp}>Send OTP</Button>

//       {/* OTP Inputs */}
//       <div className="otp-input-group">
//         {otp.map((_, index) => (
//           <input
//             key={index}
//             ref={(el) => (inputRefs.current[index] = el)}
//             type="text"
//             maxLength="1"
//             value={otp[index]}
//             onChange={(e) => handleOtpChange(index, e.target.value)}
//             className="otp-input"
//           />
//         ))}
//       </div>

//       <Button onClick={handleVerifyOtp}>Verify OTP</Button>
//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// };

// export default Otp;
