
import { useEffect, useState } from "react";

const API = "https://hospitalmanagementsystem00000.onrender.com/api/patients";

function Patients() {
  const emptyForm = {
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    medicalProblem: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [patients, setPatients] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadPatients() {
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error("Could not load patients");
      const data = await response.json();
      setPatients(data);
      setMessage("");
    } catch {
      setMessage("Cannot connect to backend. Start Spring Boot on port 8080.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPatients();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          age: Number(form.age),
          gender: form.gender,
          phone: form.phone.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const savedPatient = await response.json();
      setPatients((previous) => [...previous, savedPatient]);
      setForm({ ...emptyForm });
      setMessage("Patient registered and saved successfully!");
    } catch {
      setMessage("Registration failed. Check that the backend and MySQL are running.");
    }
  }

  return (
    <div className="page">
      <h1>Patient Registration</h1>
      <p className="page-description">
        Register a new patient in the hospital system.
      </p>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter patient name"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Age</label>
              <input
                name="age"
                type="number"
                min="0"
                max="150"
                value={form.age}
                onChange={handleChange}
                placeholder="Enter age"
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="form-group">
            <label>Email (not saved yet)</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Medical Problem (not saved yet)</label>
            <textarea
              name="medicalProblem"
              value={form.medicalProblem}
              onChange={handleChange}
              placeholder="Enter medical problem"
              rows="4"
            />
          </div>

          <button className="primary-btn" type="submit">
            Register Patient
          </button>
        </form>

        {message && <p role="status">{message}</p>}
      </div>

      <h2>Registered Patients</h2>

      {loading ? (
        <p>Loading patients...</p>
      ) : patients.length === 0 ? (
        <p>No patients registered yet.</p>
      ) : (
        <div className="form-card">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: 8 }}>ID</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Name</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Age</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Gender</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Phone</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td style={{ padding: 8 }}>{patient.id}</td>
                    <td style={{ padding: 8 }}>{patient.name}</td>
                    <td style={{ padding: 8 }}>{patient.age}</td>
                    <td style={{ padding: 8 }}>{patient.gender}</td>
                    <td style={{ padding: 8 }}>{patient.phone}</td>
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

export default Patients;