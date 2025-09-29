import { z } from 'zod';

// Base UUID schema
const uuidSchema = z.string().uuid();

// Plant Create Schema (para crear nuevas plantas)
export const PlantCreateSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  species: z.string().min(1, 'La especie es requerida'),
  description: z.string().optional(),
  user_id: uuidSchema,
});

// Plant Update Schema (para actualizar plantas existentes)
export const PlantUpdateSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  species: z.string().min(1, 'La especie es requerida'),
  description: z.string().optional(),
});

// Custom date string validation - more flexible than strict datetime
const flexibleDateString = z.string().refine((val) => {
  // Try to parse as date
  const date = new Date(val);
  return !isNaN(date.getTime()) && val.length > 10;
}, {
  message: "Invalid date format"
});

// Plant Response Schema (respuesta de la API)
export const PlantResponseSchema = z.object({
  name: z.string(),
  species: z.string(),
  description: z.string().nullable(),
  id: uuidSchema,
  user_id: uuidSchema,
  photo_filename: z.string().nullable(),
  created_at: flexibleDateString,
  updated_at: flexibleDateString,
});

// Infer types from schemas
export type PlantCreate = z.infer<typeof PlantCreateSchema>;
export type PlantUpdate = z.infer<typeof PlantUpdateSchema>;
export type PlantResponse = z.infer<typeof PlantResponseSchema>;
