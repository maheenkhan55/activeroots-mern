import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ minHeight: '80vh', padding: '2rem 0' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <span className="material-icons" style={{ fontSize: '2.5rem', color: '#2563eb' }}>contact_phone</span>
            Contact Us
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#666' }}>
            Have questions? We'd love to hear from you!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Contact Form */}
          <div className="card">
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="material-icons" style={{ color: '#2563eb' }}>chat</span>
              Send Message
            </h3>
            
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <span className="material-icons" style={{ fontSize: '3rem', marginBottom: '1rem', color: '#22c55e' }}>check_circle</span>
                <h4>Message Sent!</h4>
                <p>We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <span className="material-icons">send</span>
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <div className="card">
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-icons" style={{ color: '#2563eb' }}>location_on</span>
                Get in Touch
              </h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="material-icons" style={{ color: '#2563eb' }}>phone</span>
                  Phone
                </h4>
                <p>(555) 123-4567</p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>Call us anytime</p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="material-icons" style={{ color: '#2563eb' }}>email</span>
                  Email
                </h4>
                <p>info@activeroots.com</p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>We reply within 24 hours</p>
              </div>

              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="material-icons" style={{ color: '#2563eb' }}>location_on</span>
                  Address
                </h4>
                <p>123 Sports Avenue<br />Springfield, ST 12345</p>
              </div>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="material-icons" style={{ color: '#2563eb' }}>schedule</span>
                Hours
              </h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Monday - Friday</span>
                <span><strong>9:00 AM - 6:00 PM</strong></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Saturday</span>
                <span><strong>10:00 AM - 4:00 PM</strong></span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Sunday</span>
                <span><strong>Closed</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: '800px', margin: '3rem auto 0' }}>
          <div className="card">
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="material-icons" style={{ color: '#2563eb' }}>help</span>
              Common Questions
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4>How do I register my child?</h4>
              <p style={{ color: '#666' }}>You can register online through our Programs page or call us directly.</p>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4>What if my child misses a session?</h4>
              <p style={{ color: '#666' }}>Contact us about makeup sessions. We're flexible with schedules.</p>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4>Do you offer refunds?</h4>
              <p style={{ color: '#666' }}>Yes, we offer refunds within the first week of the program.</p>
            </div>

            <div>
              <h4>What should my child bring?</h4>
              <p style={{ color: '#666' }}>We'll provide a complete list of equipment when you enroll.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;