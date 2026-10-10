import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      <section className="hero">
        <div className="hero-content">

          <p className="small-title">WELCOME TO MEDICARE</p>

          <h1>
            Quality Healthcare
            <br />
            <span>Made Simple</span>
          </h1>

          <p>
            Manage patients, doctors and appointments
            easily with our modern Hospital Management System.
          </p>

          <Link to="/appointments">
            <button className="primary-btn">
              Book Appointment
            </button>
          </Link>

        </div>
      </section>

      <section className="services">

        <h2>Our Services</h2>

        <p className="section-text">
          Everything you need to manage hospital services efficiently.
        </p>

        <div className="service-container">

          <div className="service-card">
            <div className="service-icon">👨‍⚕️</div>
            <h3>Expert Doctors</h3>
            <p>
              Connect with experienced and qualified doctors.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">👥</div>
            <h3>Patient Management</h3>
            <p>
              Easily manage patient information and records.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">📅</div>
            <h3>Appointments</h3>
            <p>
              Book and manage appointments quickly and easily.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">🏥</div>
            <h3>Healthcare Services</h3>
            <p>
              Access important hospital services in one place.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;