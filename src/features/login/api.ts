import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

// Schemas based on the authentication service API
export const LoginRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const TokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string().default('bearer'),
  expires_in: z.number(),
  user: z.object({
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
  }),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type TokenResponse = z.infer<typeof TokenResponseSchema>;

import { getApiUrl } from '../../lib/config/api';

// Use API Gateway for all requests
const API_BASE_URL = getApiUrl('gateway');

/**
 * Login API call
 */
const loginUser = async (data: LoginRequest): Promise<TokenResponse> => {
  const validatedData = LoginRequestSchema.parse(data);

  const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, validatedData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return TokenResponseSchema.parse(response.data);
};

/**
 * Custom hook for login mutation using TanStack Query
 */
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // The login logic is now handled in the component using useAuth hook
      console.log('Login successful:', data.user.email);
    },
    onError: (error) => {
      console.error('Login error:', error);
      // Handle login error (could show toast notification, etc.)
    },
  });
};
