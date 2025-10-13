import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

// Schemas based on the authentication service API
export const UserProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  full_name: z.string(),
  profile_photo_url: z.string().nullable(),
  is_active: z.boolean(),
  roles: z.array(z.string()),
  created_at: z.string(),
  updated_at: z.string(),
});

export const UserUpdateRequestSchema = z.object({
  first_name: z.string().min(2).max(100).optional(),
  last_name: z.string().min(2).max(100).optional(),
});

export const ChangePasswordRequestSchema = z.object({
  current_password: z.string().min(1),
  new_password: z.string().min(8),
});

export const FileUploadResponseSchema = z.object({
  filename: z.string(),
  url: z.string(),
  content_type: z.string(),
  size: z.number(),
  uploaded_at: z.string(),
});

export const FileMetadataResponseSchema = z.object({
  filename: z.string(),
  size: z.number(),
  content_type: z.string(),
  last_modified: z.string(),
  url: z.string().nullable(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type UserUpdateRequest = z.infer<typeof UserUpdateRequestSchema>;
export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>;
export type FileUploadResponse = z.infer<typeof FileUploadResponseSchema>;
export type FileMetadataResponse = z.infer<typeof FileMetadataResponseSchema>;

import { getApiUrl } from '../../lib/config/api';

// Use API Gateway for all requests
const API_BASE_URL = getApiUrl('gateway');

/**
 * Get current user ID from localStorage
 */
const getCurrentUserId = (): string => {
  const userData = localStorage.getItem('user');
  if (!userData) {
    throw new Error('User not found in localStorage');
  }
  const user = JSON.parse(userData);
  return user.id;
};

/**
 * Get current user profile
 */
const getCurrentUser = async (): Promise<UserProfile> => {
  const userId = getCurrentUserId();
  const response = await axios.get(`${API_BASE_URL}/api/v1/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
  return UserProfileSchema.parse(response.data);
};

/**
 * Update current user profile
 */
const updateCurrentUser = async (data: UserUpdateRequest): Promise<UserProfile> => {
  const userId = getCurrentUserId();
  const validatedData = UserUpdateRequestSchema.parse(data);
  const response = await axios.put(`${API_BASE_URL}/api/v1/users/${userId}`, validatedData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });
  return UserProfileSchema.parse(response.data);
};

/**
 * Change current user password
 */
const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
  const userId = getCurrentUserId();
  const validatedData = ChangePasswordRequestSchema.parse(data);
  await axios.post(`${API_BASE_URL}/api/v1/users/${userId}/change-password`, validatedData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });
};

/**
 * Upload profile photo
 */
const uploadProfilePhoto = async (file: File): Promise<FileUploadResponse> => {
  const userId = getCurrentUserId();
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_BASE_URL}/api/v1/users/${userId}/photo`, formData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return FileUploadResponseSchema.parse(response.data);
};

/**
 * Get profile photo
 */
const getProfilePhoto = async (): Promise<Blob> => {
  const userId = getCurrentUserId();
  const response = await axios.get(`${API_BASE_URL}/api/v1/users/${userId}/photo`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
    responseType: 'blob',
  });
  return response.data;
};

/**
 * Delete profile photo
 */
const deleteProfilePhoto = async (): Promise<void> => {
  const userId = getCurrentUserId();
  await axios.delete(`${API_BASE_URL}/api/v1/users/${userId}/photo`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
};

/**
 * Get profile photo metadata
 */
const getProfilePhotoMetadata = async (): Promise<FileMetadataResponse> => {
  const userId = getCurrentUserId();
  const response = await axios.get(`${API_BASE_URL}/api/v1/users/${userId}/photo/metadata`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
  return FileMetadataResponseSchema.parse(response.data);
};

// Query Keys
export const profileKeys = {
  all: ['profile'] as const,
  current: () => [...profileKeys.all, 'current'] as const,
  photo: () => [...profileKeys.all, 'photo'] as const,
  photoMetadata: () => [...profileKeys.all, 'photo', 'metadata'] as const,
};

/**
 * Custom hooks for profile operations
 */

// Get current user profile
export const useCurrentUser = () => {
  return useQuery({
    queryKey: profileKeys.current(),
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Update current user profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      // Update the user data in localStorage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...currentUser, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: profileKeys.current() });
    },
  });
};

// Change password
export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

// Upload profile photo
export const useUploadProfilePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProfilePhoto,
    onSuccess: () => {
      // Invalidate photo-related queries
      queryClient.invalidateQueries({ queryKey: profileKeys.photo() });
      queryClient.invalidateQueries({ queryKey: profileKeys.photoMetadata() });
      queryClient.invalidateQueries({ queryKey: profileKeys.current() });
    },
  });
};

// Get profile photo
export const useProfilePhoto = () => {
  return useQuery({
    queryKey: profileKeys.photo(),
    queryFn: getProfilePhoto,
    enabled: false, // Only fetch when explicitly called
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Delete profile photo
export const useDeleteProfilePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProfilePhoto,
    onSuccess: () => {
      // Invalidate photo-related queries
      queryClient.invalidateQueries({ queryKey: profileKeys.photo() });
      queryClient.invalidateQueries({ queryKey: profileKeys.photoMetadata() });
      queryClient.invalidateQueries({ queryKey: profileKeys.current() });
    },
  });
};

// Get profile photo metadata
export const useProfilePhotoMetadata = () => {
  return useQuery({
    queryKey: profileKeys.photoMetadata(),
    queryFn: getProfilePhotoMetadata,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
