
import { useState } from "react";

function Appointments() {
  const [patientName, setPatientName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    setLoading(true);

    try {
      const response = await fetch(
        "https://hospitalmanagementsystem00000.onrender.com/api/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientName,
            doctorName: doctor,
            appointmentDate: date,
            appointmentTime: time,
            reason,
            status: "BOOKED",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setMessage("Appointment booked successfully!");
      setPatientName("");
      setDoctor("");
      setDate("");
      setTime("");
      setReason("");
    } catch (error) {
      console.error("Appointment booking error:", error);
      setMessage(
        "Booking failed. Check that the backend is running and the data fields match."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1>Book an Appointment</h1>

      <p className="page-description">
        Schedule an appointment with our doctors.
      </p>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient Name</label>
            <input
              type="text"
              placeholder="Enter patient name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Doctor</label>
            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              required
            >
              <option value="">Select Doctor</option>
              <option value="Dr. Rahul Sharma">
                Dr. Rahul Sharma - Cardiologist
              </option>
              <option value="Dr. Priya Reddy">
                Dr. Priya Reddy - Dermatologist
              </option>
              <option value="Dr. Arjun Kumar">
                Dr. Arjun Kumar - General Physician
              </option>
              <option value="Dr. Sneha Rao">
                Dr. Sneha Rao - Pediatrician
              </option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Appointment Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toLocaleDateString("en-CA")}
                required
              />
            </div>

            <div className="form-group">
              <label>Appointment Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Reason for Visit</label>
            <textarea
              rows="4"
              placeholder="Enter reason for appointment"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          {message && <p role="status">{message}</p>}

          <button
            className="primary-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Appointments;

