// services/paymentApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrlApi } from '@/constants/baseURL';
import { Driver } from './driverApi';
import { Vehicle } from './vehicleApi';

export type PaymentMethod = 'Espèces' | 'Mobile_Money' | 'Virement_bancaire' | 'Chèque' | 'Autre';
export type PaymentStatus = 'Payé' | 'Partiel' | 'Trop_perçu' | 'En_attente';

export interface Payment {
  paymentId: number;

  rental?: {
    rentalId: number;
    label?: string;
  } | null;
  driver?: Driver | null;
  vehicle?: Vehicle | null;

  amountDue?: number | null;
  amountPaid?: number | null;

  paymentDate: string;
  paymentMethod: PaymentMethod;

  notes?: string;
  status?: PaymentStatus;
  createdAt?: string;
  updatedAt?: string;
}

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrlApi }),
  tagTypes: ['Payments'],
  endpoints: (builder) => ({
    // Tous les paiements
    getPayments: builder.query<Payment[], void>({
      query: () => 'payments',
      providesTags: ['Payments'],
    }),

    // Paiements par semaine (ex: /payments/week?start=2024-07-01&end=2024-07-07)
    getPaymentsByWeek: builder.query<Payment[], { start: string; end: string }>({
      query: ({ start, end }) => `payments/week?start=${start}&end=${end}`,
      providesTags: ['Payments'],
    }),

    // Paiements à une date précise (ex: /payments/date/2024-07-01)
    getPaymentsByDate: builder.query<Payment[], string>({
      query: (date) => `payments/date/${date}`,
      providesTags: ['Payments'],
    }),

    // Détail d'un paiement
    getPaymentById: builder.query<Payment, number>({
      query: (id) => `payments/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'Payments', id }],
    }),

    // Ajouter
    addPayment: builder.mutation<Payment, Partial<Payment>>({
      query: (body) => ({
        url: 'payments',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Payments'],
    }),

    // Modifier
    updatePayment: builder.mutation<Payment, Payment>({
      query: ({ paymentId, ...body }) => ({
        url: `payments/${paymentId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _err, { paymentId }) => [
        { type: 'Payments', id: paymentId },
        { type: 'Payments' },
      ],
    }),

    // Supprimer
    deletePayment: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `payments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Payments'],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useGetPaymentsByWeekQuery,
  useGetPaymentsByDateQuery,
  useGetPaymentByIdQuery,
  useAddPaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentApi;
