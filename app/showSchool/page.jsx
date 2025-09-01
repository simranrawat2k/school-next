"use client";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";


export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  // Fetch schools from API
  useEffect(() => {
    fetch("/api/getSchools")
      .then((res) => res.json())
      .then((data) => {
        setSchools(data);
        setFilteredSchools(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Apply search and city filter
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

  if (loading) return <Loader />;

  // Unique cities for city filter
  const cities = [...new Set(schools.map((s) => s.city))];

  return (
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
