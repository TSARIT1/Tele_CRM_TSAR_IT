// import React from "react";
// import "./Pages.css";

// const Contact = () => {
//   return (
//     <div className="page-container">
//       <h1>Contact Us</h1>
//       <p>Have questions? We'd love to hear from you.</p>

//       <div className="contact-box">
//         <p><strong>Email:</strong> support@telecrm.com</p>
//         <p><strong>Phone:</strong> +91 98765 43210</p>
//         <p><strong>Address:</strong> Nagpur, Maharashtra, India</p>
//       </div>

//       <form className="contact-form">
//         <input type="text" placeholder="Your Name" />
//         <input type="email" placeholder="Your Email" />
//         <textarea placeholder="Your Message" rows="4"></textarea>
//         <button>Send Message</button>
//       </form>
//     </div>
//   );
// };

// export default Contact;


import React, { useState } from "react";
import Navbar from "../components/Navbar";
// import "./pages.css";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks! We’ll contact you soon 😊");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="tc-page">
      <Navbar />

      <main className="contact-page">
        <section className="contact-hero">
          <h1>Contact TeleCRM</h1>
          <p>
            Have a question or want a demo? Our team is happy to help you.
          </p>
        </section>

        <section className="contact-grid-modern">
          <div className="contact-info-card">
            <div className="contact-info-item">
              <div className="contact-info-icon">📧</div>
              <div>
                <strong>Email</strong>
                <div>support@telecrm.com</div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">📞</div>
              <div>
                <strong>Phone</strong>
                <div>+91 98765 43210</div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">📍</div>
              <div>
                <strong>Location</strong>
                <div>Nagpur, Maharashtra</div>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <form className="contact-form-modern" onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <textarea
                className="full"
                name="message"
                placeholder="Your Message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
              />
              <button className="contact-submit-btn" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;