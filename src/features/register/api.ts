import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

// Schemas based on the authentication service API
export const RegisterRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  first_name: z.string().min(2, 'First name must be at least 2 characters').max(100, 'First name must be at most 100 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters').max(100, 'Last name must be at most 100 characters'),
});

export const UserResponseSchema = z.object({
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

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;

// API base URL from environment or default to localhost:8001
const API_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:8001';

/**
 * Register API call
 */
const registerUser = async (data: RegisterRequest): Promise<UserResponse> => {
  const validatedData = RegisterRequestSchema.parse(data);

  const response = await axios.post(`${API_BASE_URL}/api/v1/users`, validatedData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return UserResponseSchema.parse(response.data);
};

/**
 * Custom hook for register mutation using TanStack Query
 */
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log('User registered successfully:', data);
      // Optionally, you could automatically log in the user after registration
      // or redirect to login page with success message
    },
    onError: (error) => {
      console.error('Registration error:', error);
      // Handle registration error (could show toast notification, etc.)
    },
  });
};
