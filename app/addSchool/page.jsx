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
    const formData = new FormData();

    // append normal fields
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email_id", data.email_id);

    // append the file (first file only)
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    const res = await fetch("/api/addSchool", {
      method: "POST",
      body: formData,
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
