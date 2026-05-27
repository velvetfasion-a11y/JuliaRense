
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '0.5px solid #c9a84c66',
  padding: '10px 0',
  fontSize: 15,
  color: '#1a1a18',
  outline: 'none',
  fontFamily: 'Georgia, serif',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s',
};

const ContactPage = () => {
  const [leftRef, leftVis] = useReveal();
  const [rightRef, rightVis] = useReveal();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleFocus = (e) => {
    e.target.style.borderBottomColor = '#c9a84c';
  };

  const handleBlur = (e) => {
    e.target.style.borderBottomColor = '#c9a84c66';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSent(true);
  };

  const contactItems = [
    { label: 'Email', value: 'hello@juliarense.com', icon: '✉', href: 'mailto:hello@juliarense.com' },
    { label: 'Phone', value: '+46 70 000 00 00', icon: '↗', href: 'tel:+46700000000' },
    { label: 'Instagram', value: '@juliarense', icon: '◎', href: 'https://instagram.com/juliarense' },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Julia Rensé - Get in Touch</title>
        <meta
          name="description"
          content="Get in touch with Julia Rensé for web development, books, or jewelry inquiries."
        />
      </Helmet>

      <div
        className="contact-page"
        style={{ background: '#faf8f3', minHeight: '100vh', fontFamily: 'Georgia, serif' }}
      >
        {/* Hero */}
        <div className="contact-page-hero">
          <p
            style={{
              fontSize: 11,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#c9a84c',
              margin: '0 0 8px',
            }}
          >
            Julia Rensé
          </p>
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 400,
              margin: '0 0 12px',
              color: '#1a1a18',
              lineHeight: 1.05,
            }}
          >
            Let&apos;s talk.
          </h1>
          <p
            style={{
              fontSize: 15,
              color: '#6b6357',
              margin: 0,
              lineHeight: 1.7,
              maxWidth: 400,
              marginInline: 'auto',
            }}
          >
            Whether you have a project in mind or simply want to say hello — I&apos;d love to hear from
            you.
          </p>
        </div>

        {/* Main */}
        <div className="contact-page-main">
          {/* Left — Form */}
          <div
            ref={leftRef}
            style={{
              opacity: leftVis ? 1 : 0,
              transform: leftVis ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 1s ease, transform 1s ease',
            }}
          >
            <p
              style={{
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                margin: '0 0 12px',
              }}
            >
              Send a message
            </p>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 400,
                color: '#1a1a18',
                margin: '0 0 40px',
                lineHeight: 1.2,
              }}
            >
              Start a conversation
            </h2>

            {sent ? (
              <div style={{ padding: '48px 0' }}>
                <p style={{ fontSize: 28, fontWeight: 400, color: '#1a1a18', margin: '0 0 12px' }}>
                  Thank you.
                </p>
                <p style={{ fontSize: 15, color: '#6b6357', lineHeight: 1.8 }}>
                  I&apos;ve received your message and will be in touch within 24 hours.
                </p>
                <p style={{ color: '#c9a84c', letterSpacing: '0.3em', margin: '32px 0 0', fontSize: 16 }}>
                  · · ·
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {[
                  { label: 'Your name', placeholder: 'Full name', type: 'text', key: 'name' },
                  { label: 'Your email', placeholder: 'your@email.com', type: 'email', key: 'email' },
                  { label: 'Subject', placeholder: 'What is this about?', type: 'text', key: 'subject' },
                ].map(({ label, placeholder, type, key }) => (
                  <div key={key}>
                    <label
                      htmlFor={`contact-${key}`}
                      style={{
                        display: 'block',
                        fontSize: 11,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#1a1a18',
                        marginBottom: 10,
                      }}
                    >
                      {label}
                    </label>
                    <input
                      id={`contact-${key}`}
                      type={type}
                      name={key}
                      value={form[key]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                      placeholder={placeholder}
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      required={key === 'name' || key === 'email'}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="contact-message"
                    style={{
                      display: 'block',
                      fontSize: 11,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#1a1a18',
                      marginBottom: 10,
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell me about your project or inquiry..."
                    rows={5}
                    required
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    alignSelf: 'flex-start',
                    background: '#1a1a18',
                    color: '#faf8f3',
                    border: 'none',
                    padding: '18px 52px',
                    fontSize: 11,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    fontFamily: 'Georgia, serif',
                    marginTop: 8,
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#c9a84c';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#1a1a18';
                  }}
                >
                  Send message
                </button>
              </form>
            )}
          </div>

          {/* Right — Info */}
          <div
            ref={rightRef}
            style={{
              opacity: rightVis ? 1 : 0,
              transform: rightVis ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
              paddingTop: 8,
            }}
          >
            <p
              style={{
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                margin: '0 0 12px',
              }}
            >
              Contact information
            </p>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 400,
                color: '#1a1a18',
                margin: '0 0 20px',
                lineHeight: 1.2,
              }}
            >
              Reach out directly
            </h2>
            <p
              style={{
                fontSize: 15,
                color: '#6b6357',
                lineHeight: 1.9,
                margin: '0 0 48px',
                maxWidth: 360,
              }}
            >
              Prefer to reach out directly? I typically respond within 24 hours and look forward to
              every conversation.
            </p>

            {contactItems.map(({ label, value, icon, href }) => (
              <a
                key={label}
                href={href}
                target={label === 'Instagram' ? '_blank' : undefined}
                rel={label === 'Instagram' ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '24px 0',
                  borderBottom: '0.5px solid #d6cdb8',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '0.5px solid #c9a84c66',
                    color: '#c9a84c',
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#6b6357',
                      margin: '0 0 4px',
                    }}
                  >
                    {label}
                  </p>
                  <p style={{ fontSize: 15, color: '#1a1a18', margin: 0 }}>{value}</p>
                </div>
              </a>
            ))}

            <p
              style={{
                fontSize: 13,
                color: '#6b6357',
                margin: '40px 0 0',
                lineHeight: 1.8,
                fontStyle: 'italic',
              }}
            >
              Based in Stockholm, Sweden.
              <br />
              Available for projects worldwide.
            </p>

            <p style={{ color: '#c9a84c', letterSpacing: '0.3em', margin: '40px 0 0', fontSize: 16 }}>
              · · ·
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
