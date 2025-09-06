// services/driverApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrlApi } from '../../constants/baseURL'; // Assure-toi que ce fichier exporte `baseUrlApi`

export interface Driver {
  driverId: number;
  owner: { ownerId: number; name?: string }; // adapte selon ton backend
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  address?: string;
  hireDate?: string;
  status: 'ACTIF' | 'INACTIF' | 'SUSPENDU';
  amountDue: number;
}

export const driverApi = createApi({
  reducerPath: 'driverApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrlApi }),
  tagTypes: ['Drivers'],
  endpoints: (builder) => ({
    getDrivers: builder.query<Driver[], void>({
      query: () => 'drivers',
      providesTags: ['Drivers'],
    }),
    getDriverById: builder.query<Driver, number>({
      query: (id) => `drivers/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Drivers', id }],
    }),
    addDriver: builder.mutation<Driver, Partial<Driver>>({
      query: (body) => ({
        url: 'drivers',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Drivers'],
    }),
    updateDriver: builder.mutation<Driver, Driver>({
      query: ({ driverId, ...body }) => ({
        url: `drivers/${driverId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _err, { driverId }) => [
        { type: 'Drivers', id: driverId },
        { type: 'Drivers' },
      ],
    }),
    deleteDriver: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `drivers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Drivers'],
    }),
  }),
});

export const {
  useGetDriversQuery,
  useGetDriverByIdQuery,
  useAddDriverMutation,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
} = driverApi;
