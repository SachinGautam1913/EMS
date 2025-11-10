import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import Avatar from './Avatar';
import Button from './Button';

/**
 * Avatar Uploader Component with Preview
 * @param {Object} props
 * @param {string} props.currentAvatar - Current avatar URL
 * @param {Function} props.onChange - Callback with file object
 * @param {string} props.name - Employee name for initials
 */
const AvatarUploader = ({ currentAvatar, onChange, name }) => {
  const [preview, setPreview] = useState(currentAvatar || null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Call onChange callback
      // TODO: Replace with actual API call to upload file
      onChange(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar src={preview} name={name} size="xl" />
        {preview && (
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
      
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="avatar-upload"
        />
        <label htmlFor="avatar-upload" className="cursor-pointer">
          <span className="btn btn-secondary px-3 py-1.5 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2">
            <Upload size={16} className="inline mr-2" />
            {preview ? 'Change' : 'Upload'} Photo
          </span>
        </label>
      </div>
      
      <p className="text-xs text-gray-500 text-center">
        JPG, PNG or GIF. Max size 5MB
      </p>
    </div>
  );
};

export default AvatarUploader;

