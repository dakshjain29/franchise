import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Eye, EyeOff, Home, LockKeyhole } from 'lucide-react';
import api from '../lib/api';
import { clearAuth, setAuth } from '../lib/auth';
import './LoginForm.css';
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  var redirecter = useNavigate();
  function fnavigate(path)
  {
    redirecter(path);
  }


  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus('');
      clearAuth();
      var {email,password} = formData;
      try {
        try {
          const adminResponse = await api.post('/admin/login', { email, password });
          if (adminResponse.data.status) {
            setAuth({ email, role: adminResponse.data.role, token: adminResponse.data.token });
            setSubmitStatus('success');
            fnavigate('/ownerDashboard');
            return;
          }
        } catch (adminError) {
          if (adminError.response?.status !== 401) throw adminError;
        }

        const franchiseResponse = await api.post('/franchise/loginFranchise', { fremail: email, pass: password });
        if (!franchiseResponse.data.appdata) {
          setSubmitStatus('error');
          return;
        }
        const authData = { email, role: 'franchise', token: franchiseResponse.data.token };
        setAuth(authData);
        setSubmitStatus('success');
        fnavigate('/frDashboard');
        
        
        
      } catch (error) {
        console.error('Login error:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <main className="login-page">
      <div className="login-topbar">
        <a href="/" className="login-brand"><span>Franchise</span><b>Hub</b></a>
        <button type="button" className="login-home-button" onClick={() => fnavigate('/')}><Home size={16} /> Go to home</button>
      </div>
      <div className="login-layout">
        <section className="login-intro">
          <p className="login-kicker"><LockKeyhole size={15} /> Secure partner access</p>
          <h1>Welcome back to your work.</h1>
          <p>Review your operations, keep sales current, and stay close to the progress you are building.</p>
          <div className="login-note"><span>FranchiseHub</span><strong>One clear place for every next step.</strong></div>
        </section>
        <section className="login-panel">
          <div className="login-panel-heading"><p className="login-kicker">Partner portal</p><h2>Sign in</h2><p>Use your account credentials to continue.</p></div>
          {submitStatus === 'success' && <div className="login-message login-success">Login successful.</div>}
          {submitStatus === 'error' && <div className="login-message login-error">Login failed. Check your details and try again.</div>}
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="email">Email address<input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} className={errors.email ? 'has-error' : ''} />{errors.email && <span className="login-field-error"><AlertCircle size={14} />{errors.email}</span>}</label>
            <label htmlFor="password">Password<div className="login-password"><input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={formData.password} onChange={handleChange} className={errors.password ? 'has-error' : ''} /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>{errors.password && <span className="login-field-error"><AlertCircle size={14} />{errors.password}</span>}</label>
            <button type="submit" disabled={isSubmitting} className="login-submit">{isSubmitting ? 'Signing in...' : 'Sign in'} <ArrowLeft size={16} className="login-submit-arrow" /></button>
          </form>
          <a href="/" className="login-back-link"><ArrowLeft size={15} /> Return to home</a>
        </section>
      </div>
    </main>
  );
};

export default LoginForm;