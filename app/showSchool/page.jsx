"use client";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import "./ShowSchool.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "../components/Header";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch schools
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await axios.get("/api/getSchools");
        setSchools(res.data);
        setFilteredSchools(res.data);
      } catch (err) {
        console.error("Failed to fetch schools", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // Apply search + city filter
  useEffect(() => {
    let filtered = schools;

    if (search) {
      filtered = filtered.filter((school) =>
        school.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (cityFilter) {
      filtered = filtered.filter((school) => school.city === cityFilter);
    }

    setFilteredSchools(filtered);
  }, [search, cityFilter, schools]);

  // Delete school
  const handleDelete = async (id) => {
  if (!token) {
    toast.info("Please login to update");
    return;
  }

  if (!confirm("Are you sure you want to delete this school?")) return;

  setLoading(true);
  try {
    const res = await axios.delete(`/api/deleteSchool`, {
      params: { id }, 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      toast.success(res.data.message || "School deleted successfully!");
      setSchools((prev) => prev.filter((school) => school.id !== id));
      setFilteredSchools((prev) =>
        prev.filter((school) => school.id !== id)
      );
    } else {
      toast.error(res.data.error || "Failed to delete school");
    }
  } catch (err) {
    console.error(err);
    toast.error(
      err.response?.data?.error || "Something went wrong while deleting!"
    );
  } finally {
    setLoading(false);
  }
};

  // Edit school
  const handleEdit = (id) => {
    if (!token) {
      toast.info("Please login to update");
      return;
    }
    router.push(`/edit/${id}`);
  };

  if (loading) return <Loader />;

  const cities = [...new Set(schools.map((s) => s.city))];

  return (
    <div> <Header />
    <div className="schools-page">
     
      <h1 className="page-title">Schools Directory</h1>

      {/* Search & City Filter */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by school name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Schools Grid */}
      {filteredSchools.length === 0 ? (
        <div className="no-data">
          <h2>No Schools Found</h2>
          <p>Try changing the search term or city filter.</p>
        </div>
      ) : (
        <div
          className={`schools-grid ${
            filteredSchools.length === 1 ? "single-school" : ""
          }`}
        >
          {filteredSchools.map((school) => (
            <div key={school.id} className="school-card">
              <div className="card-image">
                <img src={school.image} alt={school.name} />
              </div>
              <div className="card-body">
                <h3 className="school-name">{school.name}</h3>
                <p className="school-address">{school.address}</p>
                <span className="school-city">{school.city}</span>
              </div>

              {/* Action buttons */}
              <div className="card-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEdit(school.id)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(school.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div></div>
    
  );
}
