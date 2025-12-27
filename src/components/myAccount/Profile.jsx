// src/components/myAccount/Profile.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaCamera, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Profile({ userProfile, setUserProfile, profileImage, setProfileImage }) {
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...userProfile });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);

      // TODO: Upload to server
      // const formData = new FormData();
      // formData.append('avatar', file);
      // await uploadAvatar(formData);
    }
  };

  const handleEdit = () => {
    setTempProfile({ ...userProfile });
    setEditMode(true);
  };

  const handleCancel = () => {
    setTempProfile({ ...userProfile });
    setEditMode(false);
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
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h2>
        {!editMode ? (
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center justify-center gap-2"
          >
            <FaEdit />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
            >
              <FaTimes />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-2 disabled:opacity-50"
            >
              <FaSave />
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>

      <div className="max-w-2xl">
        {/* Profile Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b"
        >
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-4xl sm:text-5xl font-bold text-white overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                userProfile.name?.charAt(0)?.toUpperCase() || '?'
              )}
            </div>
            {editMode && (
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition shadow-lg">
                <FaCamera className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              {userProfile.name || 'Guest User'}
            </h3>
            <p className="text-gray-600 mb-2">{userProfile.email}</p>
            {editMode && (
              <p className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full inline-block">
                Click camera icon to change photo
              </p>
            )}
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Full Name */}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FaEnvelope className="inline mr-2 text-orange-500" />
              Email Address
            </label>
            <input
              type="email"
              value={userProfile.email}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Email cannot be changed for security reasons
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <FaPhone className="inline mr-2 text-orange-500" />
              Phone Number
            </label>
            <input
              type="tel"
              value={editMode ? tempProfile.phone : userProfile.phone}
              onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
              disabled={!editMode}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition"
              placeholder="+971 50 123 4567"
            />
          </div>

          {/* Account Information */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl p-6 border border-orange-200">
            <h4 className="font-bold text-gray-900 mb-4">Account Information</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Account Status</span>
                <span className="font-semibold text-green-600">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-semibold text-gray-900">
                  {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Type</span>
                <span className="font-semibold text-orange-600">Standard</span>
              </div>
            </div>
          </div>

          {/* Save Button (mobile) */}
          {editMode && (
            <div className="sm:hidden sticky bottom-4 left-0 right-0 flex gap-2">
              <button
                onClick={handleCancel}
                disabled={saving}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}