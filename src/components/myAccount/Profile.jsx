// ==========================================
// 📁 FILE 2: src/components/myAccount/Profile.jsx
// ==========================================
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaCamera, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function Profile({ userProfile, setUserProfile, profileImage, setProfileImage }) {
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...userProfile });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload
      const formData = new FormData();
      formData.append('avatar', file);
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/users/avatar`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });
        
        if (response.ok) {
          const data = await response.json();
          setProfileImage(data.avatar);
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tempProfile)
      });

      if (response.ok) {
        setUserProfile({ ...tempProfile });
        setEditMode(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h2>
        {!editMode ? (
          <button
            onClick={() => {
              setTempProfile({ ...userProfile });
              setEditMode(true);
            }}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2 hover:bg-orange-600 transition"
          >
            <FaEdit />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setTempProfile({ ...userProfile });
                setEditMode(false);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-300"
            >
              <FaTimes />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 disabled:opacity-50"
            >
              <FaSave />
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>

      <div className="max-w-2xl">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b"
        >
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-4xl sm:text-5xl font-bold text-white overflow-hidden">
              {profileImage ? (
                <img src={`${API_BASE_URL}${profileImage}`} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                userProfile.name?.charAt(0)?.toUpperCase() || '?'
              )}
            </div>
            {editMode && (
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition shadow-lg">
                <FaCamera className="text-white" />
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{userProfile.name}</h3>
            <p className="text-gray-600 mb-2">{userProfile.email}</p>
            {editMode && (
              <p className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full inline-block">
                Click camera icon to change photo
              </p>
            )}
          </div>
        </motion.div>

        {/* Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FaUser className="inline mr-2 text-orange-500" />
              Full Name
            </label>
            <input
              type="text"
              value={editMode ? tempProfile.name : userProfile.name}
              onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
              disabled={!editMode}
              className="w-full px-4 py-3 border rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FaEnvelope className="inline mr-2 text-orange-500" />
              Email
            </label>
            <input
              type="email"
              value={userProfile.email}
              disabled
              className="w-full px-4 py-3 border rounded-lg bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed for security</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FaPhone className="inline mr-2 text-orange-500" />
              Phone
            </label>
            <input
              type="tel"
              value={editMode ? tempProfile.phone : userProfile.phone}
              onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
              disabled={!editMode}
              className="w-full px-4 py-3 border rounded-lg disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="+971 50 123 4567"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;