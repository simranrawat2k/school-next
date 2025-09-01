"use client";
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("/api/getSchools")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px", padding: "20px" }}>
      {schools.map((school) => (
        <div key={school.id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px" }}>
          <img src={school.image} alt={school.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
          <h3>{school.name}</h3>
          <p>{school.address}</p>
          <p>{school.city}</p>
        </div>
      ))}
    </div>
  );
}
