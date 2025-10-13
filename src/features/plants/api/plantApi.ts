import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';
import {
  PlantCreateSchema,
  PlantUpdateSchema,
  PlantResponseSchema,
  type PlantCreate,
  type PlantUpdate,
  type PlantResponse
} from '../schemas/plant.schema';
import {
  DeviceCreateSchema,
  DeviceUpdateSchema,
  DeviceResponseSchema,
  type DeviceCreate,
  type DeviceUpdate,
  type DeviceResponse
} from '../schemas/device.schema';

import { getApiUrl } from '../../../lib/config/api';

// Use API Gateway for all requests
export const PLANTS_API_BASE_URL = getApiUrl('gateway');

// Query Keys
export const plantKeys = {
  all: ['plants'] as const,
  userPlants: (userId: string) => ['plants', 'user', userId] as const,
  plant: (plantId: string) => ['plants', plantId] as const,
  plantDevices: (plantId: string) => ['plants', plantId, 'devices'] as const,
  plantPhoto: (plantId: string) => ['plants', plantId, 'photo'] as const,
};

// Device Query Keys
export const deviceKeys = {
  all: ['devices'] as const,
  device: (deviceId: string) => ['devices', deviceId] as const,
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Get all plants for a specific user
 */
const getUserPlants = async (userId: string): Promise<PlantResponse[]> => {
  const response = await axios.get(
    `${PLANTS_API_BASE_URL}/api/v1/plants/users/${userId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  // Validate response data
  return z.array(PlantResponseSchema).parse(response.data);
};

/**
 * Get a specific plant by ID
 */
const getPlant = async (plantId: string): Promise<PlantResponse> => {
  const response = await axios.get(
    `${PLANTS_API_BASE_URL}/api/v1/plants/${plantId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return PlantResponseSchema.parse(response.data);
};

/**
 * Create a new plant
 */
const createPlant = async (plantData: PlantCreate): Promise<PlantResponse> => {
  console.log('🌱 Creating plant - Input data:', plantData);
  console.log('🌱 API Base URL:', PLANTS_API_BASE_URL);
  
  // Validate input data
  const validatedData = PlantCreateSchema.parse(plantData);
  console.log('🌱 Validated data:', validatedData);
  
  // Get headers
  const headers = getAuthHeaders();
  console.log('🌱 Request headers:', headers);
  
  const url = `${PLANTS_API_BASE_URL}/api/v1/plants/`;
  console.log('🌱 Request URL:', url);

  try {
    const response = await axios.post(url, validatedData, { headers });
    console.log('🌱 API Response:', response.data);
    
    const parsedResponse = PlantResponseSchema.parse(response.data);
    console.log('🌱 Parsed response:', parsedResponse);
    
    return parsedResponse;
  } catch (error) {
    console.error('🌱 Error creating plant:', error);
    if (axios.isAxiosError(error)) {
      console.error('🌱 Axios error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method
      });
    }
    throw error;
  }
};

/**
 * Update an existing plant
 */
const updatePlant = async ({
  plantId,
  plantData
}: {
  plantId: string;
  plantData: PlantUpdate;
}): Promise<PlantResponse> => {
  const validatedData = PlantUpdateSchema.parse(plantData);

  const response = await axios.put(
    `${PLANTS_API_BASE_URL}/api/v1/plants/${plantId}`,
    validatedData,
    {
      headers: getAuthHeaders(),
    }
  );

  return PlantResponseSchema.parse(response.data);
};

/**
 * Delete a plant
 */
const deletePlant = async (plantId: string): Promise<void> => {
  await axios.delete(`${PLANTS_API_BASE_URL}/api/v1/plants/${plantId}`, {
    headers: getAuthHeaders(),
  });
};

/**
 * Upload plant photo
 */
const uploadPlantPhoto = async ({
  plantId,
  file
}: {
  plantId: string;
  file: File;
}): Promise<PlantResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(
    `${PLANTS_API_BASE_URL}/api/v1/plants/${plantId}/photo`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return PlantResponseSchema.parse(response.data);
};

// Query Hooks

/**
 * Hook to get all plants for a user
 */
export const useUserPlants = (userId: string) => {
  return useQuery({
    queryKey: plantKeys.userPlants(userId),
    queryFn: () => getUserPlants(userId),
    enabled: !!userId,
  });
};

/**
 * Hook to get a specific plant
 */
export const usePlant = (plantId: string) => {
  return useQuery({
    queryKey: plantKeys.plant(plantId),
    queryFn: () => getPlant(plantId),
    enabled: !!plantId,
  });
};

// Mutation Hooks

/**
 * Hook to create a new plant
 */
export const useCreatePlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlant,
    onSuccess: (newPlant) => {
      // Invalidate and refetch user plants
      queryClient.invalidateQueries({
        queryKey: plantKeys.userPlants(newPlant.user_id)
      });
      console.log('Plant created successfully:', newPlant.name);
    },
    onError: (error) => {
      console.error('Error creating plant:', error);
    },
  });
};

/**
 * Hook to update a plant
 */
export const useUpdatePlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePlant,
    onSuccess: (updatedPlant) => {
      // Update the specific plant in cache
      queryClient.setQueryData(
        plantKeys.plant(updatedPlant.id),
        updatedPlant
      );

      // Invalidate user plants list
      queryClient.invalidateQueries({
        queryKey: plantKeys.userPlants(updatedPlant.user_id)
      });

      console.log('Plant updated successfully:', updatedPlant.name);
    },
    onError: (error) => {
      console.error('Error updating plant:', error);
    },
  });
};

/**
 * Hook to delete a plant
 */
export const useDeletePlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlant,
    onSuccess: (_, plantId) => {
      // Remove the plant from cache
      queryClient.removeQueries({
        queryKey: plantKeys.plant(plantId)
      });

      // Invalidate all plants queries (we don't know the user_id here)
      queryClient.invalidateQueries({
        queryKey: plantKeys.all
      });

      console.log('Plant deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting plant:', error);
    },
  });
};

/**
 * Hook to upload plant photo
 */
export const useUploadPlantPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadPlantPhoto,
    onSuccess: (updatedPlant) => {
      // Update the plant in cache with new photo
      queryClient.setQueryData(
        plantKeys.plant(updatedPlant.id),
        updatedPlant
      );

      // Invalidate user plants list
      queryClient.invalidateQueries({
        queryKey: plantKeys.userPlants(updatedPlant.user_id)
      });

      console.log('Plant photo uploaded successfully');
    },
    onError: (error) => {
      console.error('Error uploading plant photo:', error);
    },
  });
};

/**
 * Get plant photo URL
 */
export const getPlantPhotoUrl = (plantId: string): string => {
  return `${PLANTS_API_BASE_URL}/api/v1/plants/${plantId}/photo`;
};

/**
 * Hook to get plant photo with caching and error handling
 */
export const usePlantPhoto = (plantId: string) => {
  return useQuery({
    queryKey: plantKeys.plantPhoto(plantId),
    queryFn: async () => {
      try {
        const url = getPlantPhotoUrl(plantId);
        // Test if the image exists by making a HEAD request
        await axios.head(url, {
          headers: getAuthHeaders(),
        });

        // If successful, return the URL
        return url;
      } catch (error) {
        // If image doesn't exist, return null to use fallback
        return null;
      }
    },
    enabled: !!plantId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

/**
 * Helper function to get plant image URL with fallback
 */
export const getPlantImageUrl = (plant: { id: string; photo_filename: string | null }): string => {
  if (plant.photo_filename) {
    // Use the actual plant photo from the API
    return getPlantPhotoUrl(plant.id);
  }
  // Fallback to default image
  return 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80';
};

// =============================================================================
// DEVICE API FUNCTIONS
// =============================================================================

/**
 * Get all devices
 */
const getAllDevices = async (): Promise<DeviceResponse[]> => {
  const response = await axios.get(
    `${PLANTS_API_BASE_URL}/api/v1/devices/`,
    {
      headers: getAuthHeaders(),
    }
  );

  return z.array(DeviceResponseSchema).parse(response.data);
};

/**
 * Get a specific device by ID
 */
const getDevice = async (deviceId: string): Promise<DeviceResponse> => {
  const response = await axios.get(
    `${PLANTS_API_BASE_URL}/api/v1/devices/${deviceId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return DeviceResponseSchema.parse(response.data);
};

/**
 * Create a new device
 */
const createDevice = async (deviceData: DeviceCreate): Promise<DeviceResponse> => {
  console.log('🔧 Creating device:', deviceData);

  const validatedData = DeviceCreateSchema.parse(deviceData);
  console.log('🔧 Validated device data:', validatedData);

  const response = await axios.post(
    `${PLANTS_API_BASE_URL}/api/v1/devices/`,
    validatedData,
    {
      headers: getAuthHeaders(),
    }
  );

  const parsedResponse = DeviceResponseSchema.parse(response.data);
  console.log('🔧 Device created successfully:', parsedResponse);

  return parsedResponse;
};

/**
 * Update an existing device
 */
const updateDevice = async ({
  deviceId,
  deviceData
}: {
  deviceId: string;
  deviceData: DeviceUpdate;
}): Promise<DeviceResponse> => {
  const validatedData = DeviceUpdateSchema.parse(deviceData);

  const response = await axios.put(
    `${PLANTS_API_BASE_URL}/api/v1/devices/${deviceId}`,
    validatedData,
    {
      headers: getAuthHeaders(),
    }
  );

  return DeviceResponseSchema.parse(response.data);
};

/**
 * Delete a device
 */
const deleteDevice = async (deviceId: string): Promise<void> => {
  await axios.delete(`${PLANTS_API_BASE_URL}/api/v1/devices/${deviceId}`, {
    headers: getAuthHeaders(),
  });
};

/**
 * Get devices assigned to a plant
 */
const getPlantDevices = async (plantId: string): Promise<DeviceResponse[]> => {
  const response = await axios.get(
    `${PLANTS_API_BASE_URL}/api/v1/plants/${plantId}/devices`,
    {
      headers: getAuthHeaders(),
    }
  );

  return z.array(DeviceResponseSchema).parse(response.data);
};

/**
 * Assign a device to a plant
 */
const assignDeviceToPlant = async ({
  plantId,
  deviceId
}: {
  plantId: string;
  deviceId: string;
}): Promise<void> => {
  console.log('🔗 Assigning device to plant:', { plantId, deviceId });

  await axios.post(
    `${PLANTS_API_BASE_URL}/api/v1/plants/${plantId}/devices/${deviceId}`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );

  console.log('🔗 Device assigned successfully');
};

/**
 * Remove a device from a plant
 */
const removeDeviceFromPlant = async ({
  plantId,
  deviceId
}: {
  plantId: string;
  deviceId: string;
}): Promise<void> => {
  console.log('🔗 Removing device from plant:', { plantId, deviceId });

  await axios.delete(
    `${PLANTS_API_BASE_URL}/api/v1/plants/${plantId}/devices/${deviceId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  console.log('🔗 Device removed successfully');
};

// =============================================================================
// DEVICE QUERY HOOKS
// =============================================================================

/**
 * Hook to get all devices
 */
export const useDevices = () => {
  return useQuery({
    queryKey: deviceKeys.all,
    queryFn: getAllDevices,
  });
};

/**
 * Hook to get a specific device
 */
export const useDevice = (deviceId: string) => {
  return useQuery({
    queryKey: deviceKeys.device(deviceId),
    queryFn: () => getDevice(deviceId),
    enabled: !!deviceId,
  });
};

/**
 * Hook to get devices assigned to a plant
 */
export const usePlantDevices = (plantId: string) => {
  return useQuery({
    queryKey: plantKeys.plantDevices(plantId),
    queryFn: () => getPlantDevices(plantId),
    enabled: !!plantId,
  });
};

// =============================================================================
// DEVICE MUTATION HOOKS
// =============================================================================

/**
 * Hook to create a new device
 */
export const useCreateDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDevice,
    onSuccess: (newDevice) => {
      // Invalidate and refetch all devices
      queryClient.invalidateQueries({
        queryKey: deviceKeys.all
      });
      console.log('🔧 Device created successfully:', newDevice.name);
    },
    onError: (error) => {
      console.error('🔧 Error creating device:', error);
    },
  });
};

/**
 * Hook to update a device
 */
export const useUpdateDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDevice,
    onSuccess: (updatedDevice) => {
      // Update the specific device in cache
      queryClient.setQueryData(
        deviceKeys.device(updatedDevice.id),
        updatedDevice
      );

      // Invalidate all devices list
      queryClient.invalidateQueries({
        queryKey: deviceKeys.all
      });

      console.log('🔧 Device updated successfully:', updatedDevice.name);
    },
    onError: (error) => {
      console.error('🔧 Error updating device:', error);
    },
  });
};

/**
 * Hook to delete a device
 */
export const useDeleteDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDevice,
    onSuccess: (_, deviceId) => {
      // Remove the device from cache
      queryClient.removeQueries({
        queryKey: deviceKeys.device(deviceId)
      });

      // Invalidate all devices queries
      queryClient.invalidateQueries({
        queryKey: deviceKeys.all
      });

      console.log('🔧 Device deleted successfully');
    },
    onError: (error) => {
      console.error('🔧 Error deleting device:', error);
    },
  });
};

/**
 * Hook to assign a device to a plant
 */
export const useAssignDeviceToPlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignDeviceToPlant,
    onSuccess: (_, { plantId }) => {
      // Invalidate plant devices
      queryClient.invalidateQueries({
        queryKey: plantKeys.plantDevices(plantId)
      });

      // Invalidate plant data (might have changed)
      queryClient.invalidateQueries({
        queryKey: plantKeys.plant(plantId)
      });

      console.log('🔗 Device assigned to plant successfully');
    },
    onError: (error) => {
      console.error('🔗 Error assigning device to plant:', error);
    },
  });
};

/**
 * Hook to remove a device from a plant
 */
export const useRemoveDeviceFromPlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeDeviceFromPlant,
    onSuccess: (_, { plantId }) => {
      // Invalidate plant devices
      queryClient.invalidateQueries({
        queryKey: plantKeys.plantDevices(plantId)
      });

      // Invalidate plant data (might have changed)
      queryClient.invalidateQueries({
        queryKey: plantKeys.plant(plantId)
      });

      console.log('🔗 Device removed from plant successfully');
    },
    onError: (error) => {
      console.error('🔗 Error removing device from plant:', error);
    },
  });
};
