
import React, { useState } from 'react';
import axios from 'axios';
function SettingsPage({email}) {
  let LogObj=JSON.parse(localStorage.getItem("LoginObj"));
  let tkn=LogObj.token;
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      const [errors, setErrors] = useState({});
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [success, setSuccess] = useState(false);
    
      const validateForm = () => {
        const newErrors = {};
        
        if (!formData.currentPassword) {
          newErrors.currentPassword = 'Current password is required';
        }
        
        if (!formData.newPassword) {
          newErrors.newPassword = 'New password is required';
        } else if (formData.newPassword.length < 8) {
          newErrors.newPassword = 'Password must be at least 8 characters';
        }
        
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your new password';
        } else if (formData.newPassword !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = async (e) => {
        
        e.preventDefault();
        setSuccess(false);
        
        if (!validateForm()) {
          return;
        }
        // alert(formData.newPassword)
        setIsSubmitting(true);
        
        try {
          // Simulate API call
          alert("inside the function login A")
        let url = `https://franchisebackend-production.up.railway.app/franchise/changepwd`;
        let resp = await axios.post(url,{fremail:email,npass:formData.newPassword},{headers: {'authorization' : `Bearer ${tkn}`}});
        
        if(resp.data.status){
            alert("Done")
        }
          setSuccess(true);
          setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        } catch (error) {
            console.error('Error:', error);
          setErrors({ submit: 'Failed to change password. Please try again.' });
        } finally {
          setIsSubmitting(false);
        }
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
    
    
    
    
  return (
    <div>
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            Password changed successfully!
          </div>
        )}
        
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errors.submit}
          </div>
        )}

        <div className="mb-4">
          <label 
            htmlFor="currentPassword"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <input
            type="text"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.currentPassword ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.currentPassword}</p>
          )}
        </div>

        <div className="mb-4">
          <label 
            htmlFor="newPassword"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="text"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.newPassword ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
          )}
        </div>

        <div className="mb-6">
          <label 
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            type="text"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Changing Password...' : 'Change Password'}
        </button>
      </form>
    </div>
  
    </div>
  )
}

export default SettingsPage



 