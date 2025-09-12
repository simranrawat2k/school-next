"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./Login.css";
import { toast } from "react-toastify";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false); 

const sendOtp = async () => {
  if (!email) return toast.error("Enter your email");
  setLoading(true);
  try {
    const res = await axios.post("/api/auth/sendOtp", { email });
    if (res.data.success) {
      setStep(2);
      toast.success("OTP sent to your email!");
    } else {
      toast.error(res.data.error);
    }
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.error || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

const verifyOtp = async () => {
  if (!otp) return toast.error("Enter OTP");
  setLoading(true);
  try {
    const res = await axios.post("/api/auth/verifyOtp", { email, otp });
    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful 🎉");
      router.push("/");
    } else {
      toast.error(res.data.error);
    }
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.error || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login with Email</h2>

        {step === 1 && (
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendOtp} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <label>Enter 6-digit OTP</label>
            <input
              type="text"
              maxLength="6"
              className="otp-input"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button onClick={verifyOtp} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <p className="resend">
              Didn’t get the code? <span onClick={sendOtp}>Resend</span>
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
