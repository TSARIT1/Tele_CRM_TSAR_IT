// import React from "react";
// import "./Careers.css";

// const Careers = () => {
//   return (
//     <div className="page-container">
//       <h1>Careers at TeleCRM</h1>
//       <p>Join our growing team and build impactful CRM solutions.</p>

//       <div className="job-card">
//         <h3>Frontend Developer (React)</h3>
//         <p>Experience: 0–2 years</p>
//         <p>Location: Remote / Nagpur</p>
//         <button>Apply Now</button>
//       </div>

//       <div className="job-card">
//         <h3>Backend Developer (Spring Boot)</h3>
//         <p>Experience: 1–3 years</p>
//         <p>Location: Remote</p>
//         <button>Apply Now</button>
//       </div>
//     </div>
//   );
// };

// export default Careers;




import React from "react";
import Navbar from "../components/Navbar";
import "./Careers.css";

const Careers = () => {
  return (
    <div className="tc-page">
      <Navbar />

      <main className="career-page">
        <section className="career-hero">
          <h1>Careers at TeleCRM</h1>
          <p>
            Join our mission to build modern telecalling tools that help teams
            close more deals and delight customers.
          </p>
        </section>

        <section className="career-grid">
          <div className="career-card">
            <h3>Frontend Developer (React)</h3>
            <p>Experience: 0–2 years</p>
            <p>Location: Remote / Nagpur</p>
            <div className="career-tags">
              <span className="career-tag">React</span>
              <span className="career-tag">Tailwind</span>
              <span className="career-tag">UI/UX</span>
            </div>
            <button className="career-apply-btn">Apply Now</button>
          </div>

          <div className="career-card">
            <h3>Backend Developer (Spring Boot)</h3>
            <p>Experience: 1–3 years</p>
            <p>Location: Remote</p>
            <div className="career-tags">
              <span className="career-tag">Java</span>
              <span className="career-tag">Spring Boot</span>
              <span className="career-tag">MySQL</span>
            </div>
            <button className="career-apply-btn">Apply Now</button>
          </div>

          <div className="career-card">
            <h3>Telecalling Executive</h3>
            <p>Experience: Fresher / Experienced</p>
            <p>Location: Nagpur</p>
            <div className="career-tags">
              <span className="career-tag">Sales</span>
              <span className="career-tag">CRM</span>
              <span className="career-tag">Customer Support</span>
            </div>
            <button className="career-apply-btn">Apply Now</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Careers;