"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import axios from "axios";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
   const [authChecked, setAuthChecked] = useState(false);

   // Protect route
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Logged in to access this page.");
      router.push("/login");
    } else {
      setAuthChecked(true); 
    }
  }, [router]);

  const onSubmit = async (data) => {
    setLoading(true);

    let base64Image = "";
    if (data.image && data.image[0]) {
      const file = data.image[0];
      const reader = new FileReader();
      base64Image = await new Promise((resolve, reject) => {
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
      });
    }

    const payload = {
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      contact: data.contact,
      email_id: data.email_id,
      image: base64Image,
    };

    try {
      const res = await axios.post("/api/addSchool", payload);

      toast.success("School added successfully!");
      reset();
      router.push("/");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error || "Something went wrong!");
      } else {
        toast.error("Network error!");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!authChecked) return <Loader />;

  return (
    <>
      {loading && <Loader />}

      <div className="form-container">
        <div className="form-card">
          <h2>Add a School</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <label>School Name</label>
            <input
              {...register("name", { required: "School name is required" })}
              placeholder="Enter school name"
            />
            {errors.name && <p className="error">{errors.name.message}</p>}

            {/* Address */}
            <label>Address</label>
            <input
              {...register("address", { required: "Address is required" })}
              placeholder="Enter address"
            />
            {errors.address && (
              <p className="error">{errors.address.message}</p>
            )}

            {/* City */}
            <label>City</label>
            <input
              {...register("city", { required: "City is required" })}
              placeholder="Enter city"
            />
            {errors.city && <p className="error">{errors.city.message}</p>}

            {/* State */}
            <label>State</label>
            <input
              {...register("state", { required: "State is required" })}
              placeholder="Enter state"
            />
            {errors.state && <p className="error">{errors.state.message}</p>}

            {/* Contact */}
            <label>Contact</label>
            <input
              {...register("contact", {
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Contact must be a 10-digit number",
                },
              })}
              placeholder="Enter contact number"
              type="tel"
            />
            {errors.contact && (
              <p className="error">{errors.contact.message}</p>
            )}

            {/* Email */}
            <label>Email</label>
            <input
              {...register("email_id", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // basic email format
                  message: "Invalid email format (use example@email.com)",
                },
              })}
              placeholder="Enter email"
              type="email"
            />
            {errors.email_id && (
              <p className="error">{errors.email_id.message}</p>
            )}

            {/* Image */}
            <label>Upload Image</label>
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && <p className="error">{errors.image.message}</p>}

            {/* Submit */}
            <button type="submit">Add School</button>
          </form>
        </div>
      </div>
    </>
  );
}
