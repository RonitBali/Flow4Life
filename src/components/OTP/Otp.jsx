import React, { useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "../../Firebase";
import { Button } from "../components/ui/button";

const Otp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const auth = getAuth(app);
  auth.languageCode = "en";

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            handleSendOtp();
          },
          "expired-callback": () => {
            window.recaptchaVerifier.render().then((widgetId) => {
              grecaptcha.reset(widgetId);
            });
          },
        },
        auth
      );
    }
  };

  const handleSendOtp = () => {
    setupRecaptcha();
    let formattedPhoneNumber = phoneNumber.trim();
    if (!/^\d{10}$/.test(formattedPhoneNumber)) {
      setError("Invalid phone number! Enter a 10-digit number.");
      return;
    }

    const phoneNumberWithCountryCode = `+91${formattedPhoneNumber}`;
    console.log("Formatted phone number:", phoneNumberWithCountryCode);

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumberWithCountryCode, appVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
        setError("");
        console.log("OTP sent successfully.");
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        setError(error.message);
      });
  };

  const handleVerifyOtp = () => {
    const otpCode = otp.join("");
    if (confirmationResult) {
      confirmationResult
        .confirm(otpCode)
        .then((result) => {
          const user = result.user;
          console.log("User signed in successfully:", user);
          setError("");
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      setError("Please request OTP first.");
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <div className="otp-container">
      <h1>OTP Authentication</h1>
      <div id="recaptcha-container"></div>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button onClick={handleSendOtp}>Send OTP</Button>

      <div className="otp-input-group">
        {
        otp.map((_, index) => (
          <React.Fragment key={index}>
            <input
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={otp[index]}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="otp-input"
            />
            {index < otp.length - 1 && <span className="otp-separator">-</span>}
          </React.Fragment>
        ))}
      </div>

      <Button onClick={handleVerifyOtp}>Verify OTP</Button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Otp;
