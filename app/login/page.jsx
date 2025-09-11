"use client";
import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [step, setStep] = useState(1);

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login with Email OTP</h2>

        {/* Step 1: Email input */}
        {step === 1 && (
          <div>
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
            <button onClick={() => setStep(2)}>Send OTP</button>
          </div>
        )}

        {/* Step 2: OTP input */}
        {step === 2 && (
          <div>
            <label>Enter 6-digit OTP</label>
            <input
              type="text"
              maxLength="6"
              className="otp-input"
              placeholder="123456"
            />
            <button>Verify OTP</button>
            <p className="resend">
              Didn’t get the code? <span>Resend</span>
            </p>
            <p className="change-email" onClick={() => setStep(1)}>
              Change email
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
