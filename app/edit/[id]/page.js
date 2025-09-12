"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import axios from "axios";

export default function EditSchool() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // helper to convert File -> base64 (no prefix)
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  useEffect(() => {
    let mounted = true;
    async function fetchSchool() {
      try {
         const res = await axios.get("/api/getSchools");
         const data = res.data;
        const school = data.find((s) => s.id == id);
        if (!school) {
          toast.error("School not found");
          router.push("/");
          return;
        }
        if (!mounted) return;

        // DO NOT reset the file input with the image string.
        // reset only text fields:
        const { image, ...rest } = school;
        reset({
          name: rest.name ?? "",
          address: rest.address ?? "",
          city: rest.city ?? "",
          state: rest.state ?? "",
          contact: rest.contact ?? "",
          email_id: rest.email_id ?? "",
        });

        // keep preview as data-url (so user sees current image)
        setPreview(image ?? null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load school details");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchSchool();
    return () => {
      mounted = false;
      // revoke blob URL if created
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, reset]);

  const onSubmit = async (data) => {
  setLoading(true);
  try {
    let base64Image = "";

    const file = data.image?.[0];
    if (file instanceof File) {
      base64Image = await fileToBase64(file);
    } else if (preview && typeof preview === "string" && preview.startsWith("data:")) {
      base64Image = preview.split(",")[1];
    } else {
      base64Image = "";
    }

    const payload = {
      id,
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      contact: data.contact,
      email_id: data.email_id,
      image: base64Image,
    };

    const res = await axios.put("/api/editSchool", payload);

    toast.success("School updated successfully!");
    router.push("/showSchool");
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.error || "Something went wrong while updating");
  } finally {
    setLoading(false);
  }
};

  if (loading) return <Loader />;

  // keep a reference to register so we can call its onChange alongside our preview logic
  const imageRegister = register("image");

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Edit School</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <label>School Name</label>
          <input {...register("name", { required: "School name is required" })} />
          {errors.name && <p className="error">{errors.name.message}</p>}

          {/* Address */}
          <label>Address</label>
          <input {...register("address", { required: "Address is required" })} />
          {errors.address && <p className="error">{errors.address.message}</p>}

          {/* City */}
          <label>City</label>
          <input {...register("city", { required: "City is required" })} />
          {errors.city && <p className="error">{errors.city.message}</p>}

          {/* State */}
          <label>State</label>
          <input {...register("state", { required: "State is required" })} />
          {errors.state && <p className="error">{errors.state.message}</p>}

          {/* Contact */}
          <label>Contact</label>
          <input {...register("contact", {
            required: "Contact is required",
            pattern: { value: /^[0-9]{10}$/, message: "10-digit required" }
          })} type="tel" />
          {errors.contact && <p className="error">{errors.contact.message}</p>}

          {/* Email */}
          <label>Email</label>
          <input {...register("email_id", {
            required: "Email is required",
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" }
          })} type="email" />
          {errors.email_id && <p className="error">{errors.email_id.message}</p>}

          {/* Image */}
          <label>Upload Image</label>
          <input
            type="file"
            {...imageRegister}
            onChange={(e) => {
              // keep react-hook-form notified
              imageRegister.onChange && imageRegister.onChange(e);

              // show preview for the new file
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setPreview(url);
              }
            }}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ width: "120px", marginTop: "10px" }}
            />
          )}

          {/* Submit */}
          <button type="submit">Update School</button>
        </form>
      </div>
    </div>
  );
}
