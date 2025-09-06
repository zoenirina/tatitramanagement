// services/rentalApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrlApi } from '@/constants/baseURL';
import { Driver } from './driverApi';
import { Vehicle } from './vehicleApi';

export type RentalStatus = 'Ongoing' | 'Completed' | 'Overdue';

export interface Rental {
  rentalId: number;
  vehicle: Vehicle | null;
  driver: Driver | null;
  startDate: string;
  dailyRate?: number | null;
  returnDate?: string | null;
  status: RentalStatus;
}

export const rentalApi = createApi({
  reducerPath: 'rentalApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrlApi }),
  tagTypes: ['Rentals'],
  endpoints: (builder) => ({
    // Lister toutes les locations
    getRentals: builder.query<Rental[], void>({
      query: () => 'rentals',
      providesTags: ['Rentals'],
    }),

    // Récupérer une location
    getRentalById: builder.query<Rental, number>({
      query: (id) => `rentals/${id}`,
      providesTags: (_res, _err, id) => [{ type: 'Rentals', id }],
    }),

    // Ajouter une location
    addRental: builder.mutation<Rental, Partial<Rental>>({
      query: (body) => ({
        url: 'rentals',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Rentals'],
    }),

    // Modifier
    updateRental: builder.mutation<Rental, Rental>({
      query: ({ rentalId, ...body }) => ({
        url: `rentals/${rentalId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_res, _err, { rentalId }) => [
        { type: 'Rentals', id: rentalId },
        { type: 'Rentals' },
      ],
    }),

    // Supprimer
    deleteRental: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `rentals/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rentals'],
    }),
  }),
});

export const {
  useGetRentalsQuery,
  useGetRentalByIdQuery,
  useAddRentalMutation,
  useUpdateRentalMutation,
  useDeleteRentalMutation,
} = rentalApi;
