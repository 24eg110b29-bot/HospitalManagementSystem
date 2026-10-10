import { useEffect, useState } from "react";

const API = "http://localhost:8080/api/doctors";
const emptyForm = { name: "", specialization: "", phone: "" };

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadDoctors() {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error(`Could not load doctors (HTTP ${response.status}).`);
      }

      setDoctors(await response.json());
      setMessage("");
      setMessageType("");
    } catch {
      setMessage("Could not load doctors. Check that Spring Boot is running on port 8080.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDoctors();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setMessageType("");
    setSaving(true);

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          specialization: form.specialization.trim(),
          phone: form.phone.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Registration failed (HTTP ${response.status}).`);
      }

      const savedDoctor = await response.json();
      setDoctors((previous) => [...previous, savedDoctor]);
      setForm({ ...emptyForm });
      setMessage("Doctor registered successfully.");
      setMessageType("success");
    } catch {
      setMessage("Doctor registration failed. Check the backend connection and MySQL database.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page">
      <h1>Doctor Registration</h1>
      <p className="page-description">Register and view doctors.</p>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="doctor-name">Doctor Name</label>
            <input
              id="doctor-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter doctor name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="doctor-specialization">Specialization</label>
            <input
              id="doctor-specialization"
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              placeholder="e.g. Cardiologist"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="doctor-phone">Phone Number</label>
            <input
              id="doctor-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <button className="primary-btn" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Register Doctor"}
          </button>
        </form>

        {message && (
          <p role="status" aria-live="polite" data-message-type={messageType}>
            {message}
          </p>
        )}
      </div>

      <h2>Registered Doctors</h2>
      {loading ? (
        <p>Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p>No doctors registered yet.</p>
      ) : (
        <div className="form-card">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: 8 }}>ID</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Doctor Name</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Specialization</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td style={{ padding: 8 }}>{doctor.id}</td>
                    <td style={{ padding: 8 }}>{doctor.name}</td>
                    <td style={{ padding: 8 }}>{doctor.specialization}</td>
                    <td style={{ padding: 8 }}>{doctor.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Doctors;
