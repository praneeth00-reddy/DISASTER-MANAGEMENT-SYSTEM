import { useState } from "react";
import "./App.css";

const cellStyle = { border: "1px solid #ddd", padding: 10, textAlign: "left" };

function App() {
  const [modal, setModal] = useState("");
  const [incidentCount, setIncidentCount] = useState(24);
  const [isAdmin, setIsAdmin] = useState(false);

  // Demo data is saved in this browser using localStorage.
  const [users, setUsers] = useState(() =>
    JSON.parse(localStorage.getItem("dg_users") || "[]")
  );
  const [loginHistory, setLoginHistory] = useState(() =>
    JSON.parse(localStorage.getItem("dg_login_history") || "[]")
  );
  const [alerts, setAlerts] = useState(() =>
    JSON.parse(localStorage.getItem("dg_alerts") || "null") || [
      { id: 1, title: "Heavy Rainfall Alert", description: "Heavy rainfall expected in low-lying areas. Residents are advised to stay indoors.", updated: "Initial alert" },
      { id: 2, title: "Flood Risk", description: "Water levels are rising. Avoid unnecessary travel near rivers and low-lying areas.", updated: "Initial alert" },
    ]
  );

  const [report, setReport] = useState({
    type: "",
    location: "",
    description: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [reports, setReports] = useState(() =>
    JSON.parse(localStorage.getItem("dg_reports") || "[]")
  );

  // Open report modal
  function openReport(type = "") {
    setReport({
      type,
      location: "",
      description: "",
    });

    setModal("report");
  }

  // Submit disaster report
  function submitReport(event) {
    event.preventDefault();

    const newReport = {
      ...report,
      id: Date.now(),
    };

    setReports((previous) => {
      const updated = [...previous, newReport];
      localStorage.setItem("dg_reports", JSON.stringify(updated));
      return updated;
    });
    setIncidentCount((previous) => previous + 1);

    alert(
      `🚨 Disaster Report Submitted!\n\nType: ${report.type}\nLocation: ${report.location}\nDescription: ${report.description}`
    );

    setModal("");
  }

  // User login
  function loginUser(event) {
    event.preventDefault();

    // Demo only: this treats each entered email as a user.
    // It does not verify a real account or store passwords.
    const normalizedEmail = email.trim().toLowerCase();
    const updatedUsers = users.some((user) => user.email === normalizedEmail)
      ? users
      : [...users, { email: normalizedEmail, firstSeen: new Date().toLocaleString() }];
    const updatedHistory = [
      ...loginHistory,
      { id: Date.now(), email: normalizedEmail, time: new Date().toLocaleString() },
    ];

    setUsers(updatedUsers);
    setLoginHistory(updatedHistory);
    localStorage.setItem("dg_users", JSON.stringify(updatedUsers));
    localStorage.setItem("dg_login_history", JSON.stringify(updatedHistory));

    alert("✅ User Login Successful!\nWelcome User!");
    setEmail("");
    setPassword("");
    setModal("");
  }

  // Admin login
  function loginAdmin(event) {
    event.preventDefault();

    if (
      adminEmail === "admin@disasterguard.com" &&
      adminPassword === "admin123"
    ) {
      setIsAdmin(true);
      setAdminEmail("");
      setAdminPassword("");
      setModal("");
    } else {
      alert("❌ Invalid Admin Email or Password!");
    }
  }

  // Find shelter
  function findShelter() {
    alert(
      "🏠 Finding nearby safe shelters...\nConnect a maps API to enable this feature."
    );
  }

  if (isAdmin) {
    function addAlert() {
      const title = prompt("Enter alert title:");
      if (!title?.trim()) return;
      const description = prompt("Enter alert details:");
      if (!description?.trim()) return;
      const updated = [
        ...alerts,
        { id: Date.now(), title: title.trim(), description: description.trim(), updated: new Date().toLocaleString() },
      ];
      setAlerts(updated);
      localStorage.setItem("dg_alerts", JSON.stringify(updated));
    }

    function deleteAlert(id) {
      const updated = alerts.filter((alert) => alert.id !== id);
      setAlerts(updated);
      localStorage.setItem("dg_alerts", JSON.stringify(updated));
    }

    function deleteReport(id) {
      const updated = reports.filter((item) => item.id !== id);
      setReports(updated);
      localStorage.setItem("dg_reports", JSON.stringify(updated));
      setIncidentCount((count) => Math.max(24, count - 1));
    }

    return (
      <main style={{ maxWidth: 1100, margin: "30px auto", padding: 24, fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <h1>🚨 DisasterGuard Admin Dashboard</h1>
          <button className="admin-btn" onClick={() => setIsAdmin(false)}>Logout / Back to Website</button>
        </div>
        <p>Manage demo users, login activity, disaster reports, and emergency alerts.</p>

        <section style={{ marginTop: 28 }}>
          <h2>👥 Users seen logging in ({users.length})</h2>
          {users.length === 0 ? <p>No users have logged in yet.</p> : (
            <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr><th style={cellStyle}>Email</th><th style={cellStyle}>First seen</th></tr></thead>
              <tbody>{users.map((user) => <tr key={user.email}><td style={cellStyle}>{user.email}</td><td style={cellStyle}>{user.firstSeen}</td></tr>)}</tbody>
            </table></div>
          )}
        </section>

        <section style={{ marginTop: 28 }}>
          <h2>🔐 User Login History ({loginHistory.length})</h2>
          {loginHistory.length === 0 ? <p>No login activity yet.</p> : (
            <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr><th style={cellStyle}>Email</th><th style={cellStyle}>Login time</th></tr></thead>
              <tbody>{[...loginHistory].reverse().map((item) => <tr key={item.id}><td style={cellStyle}>{item.email}</td><td style={cellStyle}>{item.time}</td></tr>)}</tbody>
            </table></div>
          )}
        </section>

        <section style={{ marginTop: 28 }}>
          <h2>🚨 Disaster Reports ({reports.length})</h2>
          {reports.length === 0 ? <p>No disaster reports submitted yet.</p> : reports.map((item) => (
            <article key={item.id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <h3>{item.type}</h3><p><strong>Location:</strong> {item.location}</p><p>{item.description}</p>
              <button onClick={() => deleteReport(item.id)}>Delete Report</button>
            </article>
          ))}
        </section>

        <section style={{ marginTop: 28, marginBottom: 50 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <h2>📢 Manage Emergency Alerts ({alerts.length})</h2>
            <button className="submit-btn" onClick={addAlert}>Add Alert</button>
          </div>
          {alerts.map((alert) => (
            <article key={alert.id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <h3>{alert.title}</h3><p>{alert.description}</p><small>{alert.updated}</small><br />
              <button onClick={() => deleteAlert(alert.id)} style={{ marginTop: 10 }}>Delete Alert</button>
            </article>
          ))}
        </section>
      </main>
    );
  }

  return (
    <>
      {/* NAVBAR */}

      <header>
        <nav className="navbar">
          <div className="logo">
            🚨 Disaster<span>Guard</span>
          </div>

          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#disasters">Disasters</a></li>
            <li><a href="#resources">Resources</a></li>
            <li><a href="#alerts">Alerts</a></li>
            <li><a href="#about">About</a></li>
          </ul>

          <div className="nav-buttons">
            <button
              className="login-btn"
              onClick={() => setModal("login")}
            >
              User Login
            </button>

            <button
              className="admin-btn"
              onClick={() => setModal("admin")}
            >
              Admin Login
            </button>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}

      <section id="home" className="hero">
        <div className="hero-content">
          <p className="small-title">
            🚨 EMERGENCY RESPONSE PLATFORM
          </p>

          <h1>
            Stay Alert.
            <br />
            <span>Stay Safe.</span>
          </h1>

          <p>
            A smart disaster management platform designed to
            report emergencies, coordinate rescue operations,
            locate shelters and manage resources efficiently.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => openReport()}
            >
              🚨 Report Disaster
            </button>

            <button
              className="secondary-btn"
              onClick={findShelter}
            >
              🏠 Find Shelter
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="status">
            <span className="green-dot"></span>
            SYSTEM ACTIVE
          </div>

          <h3>Emergency Status</h3>

          <div className="status-item">
            <span>Active Incidents</span>
            <strong>{incidentCount}</strong>
          </div>

          <div className="status-item">
            <span>Volunteers</span>
            <strong>186</strong>
          </div>

          <div className="status-item">
            <span>Safe Shelters</span>
            <strong>42</strong>
          </div>

          <div className="status-item">
            <span>Resources Available</span>
            <strong>78%</strong>
          </div>
        </div>
      </section>

      {/* DISASTER TYPES */}

      <section id="disasters" className="section">
        <div className="section-title">
          <p>EMERGENCY CATEGORIES</p>
          <h2>Disaster Types</h2>
        </div>

        <div className="disaster-grid">
          {[
            {
              icon: "🌊",
              name: "Flood",
              description:
                "Report flooding and water-related emergencies.",
            },
            {
              icon: "🔥",
              name: "Fire",
              description:
                "Report fire incidents requiring immediate response.",
            },
            {
              icon: "🌪️",
              name: "Cyclone",
              description:
                "Track and report cyclone-related emergencies.",
            },
            {
              icon: "🏚️",
              name: "Earthquake",
              description:
                "Report earthquake damage and affected areas.",
            },
          ].map((disaster) => (
            <div className="disaster-card" key={disaster.name}>
              <div className="icon">{disaster.icon}</div>

              <h3>{disaster.name}</h3>

              <p>{disaster.description}</p>

              <button onClick={() => openReport(disaster.name)}>
                Report
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ALERTS */}

      <section id="alerts" className="alerts-section">
        <div className="section-title">
          <p>REAL-TIME INFORMATION</p>
          <h2>Emergency Alerts</h2>
        </div>

        <div className="alerts-container">
          {alerts.map((alert) => (
            <div className="alert-card" key={alert.id}>
              <div className="alert-icon">⚠️</div>
              <div>
                <h3>{alert.title}</h3>
                <p>{alert.description}</p>
                <small>{alert.updated}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESOURCES */}

      <section id="resources" className="section">
        <div className="section-title">
          <p>EMERGENCY SUPPORT</p>
          <h2>Available Resources</h2>
        </div>

        <div className="resource-grid">
          {[
            { icon: "🚑", name: "Medical Teams", count: "18", unit: "Available" },
            { icon: "🚒", name: "Rescue Vehicles", count: "12", unit: "Available" },
            { icon: "💧", name: "Water Supplies", count: "2,450", unit: "Units" },
            { icon: "🏠", name: "Safe Shelters", count: "42", unit: "Active" },
          ].map((resource) => (
            <div className="resource-card" key={resource.name}>
              <span>{resource.icon}</span>
              <h3>{resource.name}</h3>
              <strong>{resource.count}</strong>
              <p>{resource.unit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}

      <section id="about" className="about">
        <div>
          <p className="small-title">ABOUT THE PLATFORM</p>

          <h2>
            Faster Response.
            <br />
            Better Coordination.
          </h2>

          <p>
            DisasterGuard helps communities and authorities
            coordinate emergency response through a centralized
            digital platform.
          </p>
        </div>

        <div className="about-features">
          <div>📍 Location-based reporting</div>
          <div>🚨 Emergency alerts</div>
          <div>👥 Volunteer coordination</div>
          <div>📦 Resource management</div>
          <div>🏠 Shelter information</div>
          <div>📊 Analytics dashboard</div>
        </div>
      </section>

      {/* FOOTER */}

      <footer>
        <div className="logo">
          🚨 Disaster<span>Guard</span>
        </div>

        <p>Smart technology for safer communities.</p>

        <p className="copyright">
          © 2026 DisasterGuard. All rights reserved.
        </p>
      </footer>

      {/* MODALS */}

      {modal && (
        <div
          className="modal"
          style={{ display: "flex" }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setModal("");
            }
          }}
        >
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setModal("")}
            >
              &times;
            </span>

            {/* REPORT FORM */}

            {modal === "report" && (
              <>
                <h2>🚨 Report a Disaster</h2>

                <form onSubmit={submitReport}>
                  <label>Disaster Type</label>

                  <select
                    value={report.type}
                    onChange={(event) =>
                      setReport({
                        ...report,
                        type: event.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select disaster</option>
                    <option>Flood</option>
                    <option>Fire</option>
                    <option>Cyclone</option>
                    <option>Earthquake</option>
                    <option>Landslide</option>
                    <option>Accident</option>
                    <option>Other</option>
                  </select>

                  <label>Location</label>

                  <input
                    type="text"
                    placeholder="Enter location"
                    value={report.location}
                    onChange={(event) =>
                      setReport({
                        ...report,
                        location: event.target.value,
                      })
                    }
                    required
                  />

                  <label>Description</label>

                  <textarea
                    placeholder="Describe the emergency..."
                    value={report.description}
                    onChange={(event) =>
                      setReport({
                        ...report,
                        description: event.target.value,
                      })
                    }
                    required
                  />

                  <button className="submit-btn" type="submit">
                    Submit Report
                  </button>
                </form>
              </>
            )}

            {/* USER LOGIN FORM */}

            {modal === "login" && (
              <>
                <h2>👤 User Login</h2>

                <form onSubmit={loginUser}>
                  <label>Email</label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />

                  <label>Password</label>

                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
                  />

                  <button className="submit-btn" type="submit">
                    User Login
                  </button>
                </form>
              </>
            )}

            {/* ADMIN LOGIN FORM */}

            {modal === "admin" && (
              <>
                <h2>🛠️ Admin Login</h2>

                <form onSubmit={loginAdmin}>
                  <label>Admin Email</label>

                  <input
                    type="email"
                    placeholder="Enter admin email"
                    value={adminEmail}
                    onChange={(event) =>
                      setAdminEmail(event.target.value)
                    }
                    required
                  />

                  <label>Admin Password</label>

                  <input
                    type="password"
                    placeholder="Enter admin password"
                    value={adminPassword}
                    onChange={(event) =>
                      setAdminPassword(event.target.value)
                    }
                    required
                  />

                  <button className="submit-btn" type="submit">
                    Admin Login
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;

