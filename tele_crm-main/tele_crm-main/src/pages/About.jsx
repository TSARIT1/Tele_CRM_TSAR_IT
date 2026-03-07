// import React from "react";
// import "./Pages.css";

// const About = () => {
//   return (
//     <div className="page-container">
//       <h1>About TeleCRM</h1>
//       <p>
//         TeleCRM is a smart customer relationship management system designed to help
//         telecalling teams manage leads, track customer interactions, and improve conversions.
//       </p>

//       <h3>Our Mission</h3>
//       <p>
//         To simplify telecalling workflows and empower sales teams with powerful tools.
//       </p>

//       <h3>Why TeleCRM?</h3>
//       <ul>
//         <li>Easy customer management</li>
//         <li>Call logging & follow-ups</li>
//         <li>Real-time insights</li>
//         <li>Secure & scalable</li>
//       </ul>
//     </div>
//   );
// };

// export default About;

import React from "react";
import Navbar from "../components/Navbar";
import "./About.css";

const About = () => {
  return (
    <div className="tc-page">
      <Navbar />

      <main className="about-page">
        <section className="about-hero">
          <h1>About TeleCRM</h1>
          <p>
            TeleCRM is a modern telecalling CRM platform built to help teams manage
            leads, track calls, and convert more customers.
          </p>
        </section>

        <section className="about-grid">
          <div className="about-card">
            <h3>Our Mission</h3>
            <p>
              Empower telecalling teams with smart tools that improve productivity
              and conversions.
            </p>
          </div>

          <div className="about-card">
            <h3>What We Offer</h3>
            <ul>
              <li>Call tracking & logs</li>
              <li>Follow-up automation</li>
              <li>Real-time dashboards</li>
              <li>Secure customer data</li>
            </ul>
          </div>

          <div className="about-card">
            <h3>Why Choose TeleCRM</h3>
            <p>
              Built specifically for telecalling workflows with speed, simplicity,
              and scalability in mind.
            </p>
          </div>
        </section>

        <section className="about-stats">
          <div className="about-stat">
            <h4>10k+</h4>
            <span>Calls Managed</span>
          </div>
          <div className="about-stat">
            <h4>500+</h4>
            <span>Teams Using TeleCRM</span>
          </div>
          <div className="about-stat">
            <h4>99.9%</h4>
            <span>Uptime</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;