import React, { useState, createContext, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link
} from 'react-router-dom';
import { register as registerApi, login as loginApi } from './services/api';

const AuthContext = createContext(null);

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="profile-container">
      <div className="view-header">
        <div>
          <h2>Your Profile</h2>
          <p className="subtitle">Manage your personal information and account settings.</p>
        </div>
        <button className="btn-outline" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
      <div className="profile-grid">
        <div className="info-section">
          <div className="info-group">
            <label>Full Name</label>
            <p className="info-value">{user.firstname} {user.lastname}</p>
          </div>
          <div className="info-group">
            <label>Email Address</label>
            <p className="info-value">{user.email}</p>
          </div>
        </div>
        <div className="settings-section">
          <div className="info-group">
            <label>Account Role</label>
            <span className="badge">{user.role || 'USER'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <div className="view-header">
        <div>
          <h2>Hello, {user.firstname}</h2>
          <p className="subtitle">Here is your latest content overview.</p>
        </div>
        <button className="btn-outline" onClick={() => navigate('/profile')}>View Profile</button>
      </div>
      <div className="content-grid">
        <div className="content-item">
          <div className="category-tag">System</div>
          <h3>Welcome Back</h3>
          <p>You are logged in as {user.email}.</p>
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Pass an object with email and password properties
      const response = await loginApi({ email, password });
      login(response.data);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data || "Login failed. Check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Sign in</h2>
      <p className="subtitle">Enter your details to access your dashboard.</p>
      <form onSubmit={handleLogin} style={{ marginTop: '2rem' }}>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" placeholder="reinzo@example.com" required
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" required
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Sign in'}
        </button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
        Don't have an account? <Link to="/register" style={{ color: 'black', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
      </p>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'USER'
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await registerApi(formData);
      alert("Registration successful!");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Create account</h2>
      <p className="subtitle">Join the portal to manage your content.</p>
      <form onSubmit={handleRegister} style={{ marginTop: '2rem' }}>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" placeholder="First Name" required
            onChange={(e) => setFormData({...formData, firstname: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" required
            onChange={(e) => setFormData({...formData, lastname: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" placeholder="email@example.com" required
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" required
            onChange={(e) => setFormData({...formData, password: e.target.value})} />
        </div>
        <button className="btn-primary" disabled={isLoading}>{isLoading ? 'Creating...' : 'Register'}</button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
        Already have an account? <Link to="/login" style={{ color: 'black', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
      </p>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, login: setUser, logout: () => setUser(null) }}>
      <Router>
        <div className="app-wrapper">
          <style>{`
            :root { --bg: #ffffff; --surface: #f9fafb; --text-main: #111827; --text-muted: #6b7280; --primary: #000000; --border: #e5e7eb; --radius: 12px; }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: -apple-system, sans-serif; background-color: var(--bg); color: var(--text-main); }
            .app-wrapper { min-height: 100vh; display: flex; flex-direction: column; }
            .navbar { padding: 1rem 2rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; background: white; }
            .logo { font-weight: 800; font-size: 1.1rem; text-decoration: none; color: black; }
            .container { flex: 1; width: 100%; max-width: 1000px; margin: 0 auto; padding: 2rem; }
            .centered-container { flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem; }
            .auth-card { width: 100%; max-width: 400px; animation: slideUp 0.4s ease-out; }
            .view-header { display: flex; justify-content: space-between; margin-bottom: 3rem; }
            .form-group { margin-bottom: 1.5rem; }
            label { display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; }
            input { width: 100%; padding: 0.8rem 1rem; border: 1px solid var(--border); border-radius: 8px; }
            .btn-primary { width: 100%; padding: 0.8rem; background: var(--primary); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
            .btn-outline { padding: 0.6rem 1.2rem; background: white; border: 1px solid var(--border); border-radius: 8px; font-weight: 600; cursor: pointer; }
            .link-text { background: none; border: none; color: var(--text-muted); text-decoration: underline; cursor: pointer; font-size: 0.875rem; }
            .profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
            .info-section, .settings-section { background: var(--surface); padding: 2rem; border-radius: var(--radius); }
            .badge { padding: 0.25rem 0.75rem; background: var(--primary); color: white; border-radius: 20px; font-size: 0.75rem; }
            .content-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
            .content-item { padding: 1.5rem; border: 1px solid var(--border); border-radius: var(--radius); }
            .category-tag { font-size: 0.7rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 1rem; }
            @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          `}</style>

          {user && (
            <nav className="navbar">
              <Link to="/dashboard" className="logo">LAB.ONE</Link>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/profile" className="link-text">Profile</Link>
                <button className="link-text" onClick={() => setUser(null)}>Sign out</button>
              </div>
            </nav>
          )}

          <main className={!user ? "centered-container" : "container"}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;