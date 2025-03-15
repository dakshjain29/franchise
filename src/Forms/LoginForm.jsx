import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route,useNavigate, Link,useLocation } from 'react-router-dom';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import FranchHome from '../FranchiseDash/FranchHome';
import axios from 'axios';
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
//   async function Acceptapp(id) {
//     try {
//         alert("inside the function updatestatus A")
//       let url = `http://localhost:2008/admin/acceptapp`;
//       let resp = await axios.post(url,{email:id},{headers:{"Content-Type":"application/x-www-form-urlencoded"}});

//       alert(resp.data.msg);
//       FetchData(); // Refresh data after update
      
//     } catch (error) {
//       console.error("Error updating status A:", error);
//     }
//   }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus('');
      var {email,password} = formData;
      try {
        // // Simulate API call
        // await new Promise(resolve => setTimeout(resolve, 1000));
        alert("inside the function login A")
        let url = `http://localhost:2008/franchise/loginFranchise`;
        let resp = await axios.post(url,{fremail:email,pass:password},{headers:{"Content-Type":"application/x-www-form-urlencoded"}});
        console.log(resp.data.appdata);
        if(resp.data.appdata.length==0){
            alert("Invalid Credentials");
        }
        else{
            localStorage.setItem("email",email)
            setSubmitStatus('success');
            fnavigate("/frDashboard");
            console.log('Form submitted:', formData);
            
        }
        
        
        
      } catch (error) {
        console.error('Login error:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        
        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            Login successful!
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            Login failed. Please try again.
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.email && (
                <div className="mt-2 text-sm text-red-600">
                  <span className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </span>
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="text"
                  
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="mt-2 text-sm text-red-600">
                  <span className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.password}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={()=>{alert("Sign in button clicked")}}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;