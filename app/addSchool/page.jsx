"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    let base64Image = "";

    if (data.image && data.image[0]) {
      const file = data.image[0];
      const reader = new FileReader();

      // FileReader works async → wrap in Promise
      base64Image = await new Promise((resolve, reject) => {
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]); // remove "data:image/..;base64,"
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
      image: base64Image, // send base64 string
    };

    const res = await fetch("/api/addSchool", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    setMessage(result.message || result.error);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Add School</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true })} placeholder="Name" />
        {errors.name && <p>Name is required</p>}

        <input
          {...register("address", { required: true })}
          placeholder="Address"
        />
        <input {...register("city", { required: true })} placeholder="City" />
        <input {...register("state", { required: true })} placeholder="State" />
        <input
          {...register("contact", { required: true })}
          placeholder="Contact"
        />
        <input
          {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })}
          placeholder="Email"
        />
        {errors.email_id && <p>Invalid email</p>}

        <input type="file" {...register("image", { required: false })} />

        <button type="submit">Add</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
