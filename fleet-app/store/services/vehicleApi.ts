// services/vehicleApi.ts
import { baseUrlApi } from '@/constants/baseURL';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export interface Vehicle {
//   id: string;
//   title: string;
//   status: 'En service' | 'En réparation';
// }

export type VehicleType = 'POUSSE_POUSSE' | 'VOITURE' | 'MOTO' | 'CAMION' | 'FOURGON' | 'BUS';
export type VehicleStatus = 'DISPONIBLE' | 'LOUE' | 'EN_MAINTENANCE';


export interface Vehicle {
  id: number;
  type: VehicleType;
  plateNumber: string;
  brand?: string;
  model?: string;
  purchaseDate?: string; // ISO
  status?: VehicleStatus;
  owner?: { ownerId: number; name?: string };
}

export const vehicleApi = createApi({
  reducerPath: 'vehicleApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrlApi }), // à adapter selon ton backend
  tagTypes: ['Vehicles'],
  endpoints: (builder) => ({
    getVehicles: builder.query<Vehicle[], void>({
      query: () => 'vehicles',
      providesTags: ['Vehicles'],
    }),
    addVehicle: builder.mutation<Vehicle, Partial<Vehicle>>({
      query: (body) => ({
        url: 'vehicles',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Vehicles'],
    }),
    updateVehicle: builder.mutation<Vehicle, Vehicle>({
      query: ({ id, ...body }) => ({
        url: `vehicles/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Vehicles'],
    }),
    deleteVehicle: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `vehicles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Vehicles'],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useAddVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
} = vehicleApi;
