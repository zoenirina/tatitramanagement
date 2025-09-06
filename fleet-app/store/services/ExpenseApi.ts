// services/expenseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrlApi } from '@/constants/baseURL';
import { Driver } from './driverApi';
import { Vehicle } from './vehicleApi';

export type ExpenseCategory = 'Essence' | 'Maintenance' | 'Violation' | 'Pénalité' | 'Dette' | 'Other';

export interface Expense {
  id: number;
  vehicle: Vehicle | null;
  driver?: Driver | null;
  date: string; // yyyy-MM-dd
  category: ExpenseCategory;
  cost?: number | null;
  description?: string;
  performedBy?: string;
  nextDueDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export const expenseApi = createApi({
  reducerPath: 'expenseApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrlApi }),
  tagTypes: ['Expenses'],
  endpoints: (builder) => ({
    // Liste des dépenses
    getExpenses: builder.query<Expense[], void>({
      query: () => 'expenses',
      providesTags: ['Expenses'],
    }),

    // Détail
    getExpenseById: builder.query<Expense, number>({
      query: (id) => `expenses/${id}`,
      providesTags: (_res, _err, id) => [{ type: 'Expenses', id }],
    }),

    // Ajout
    addExpense: builder.mutation<Expense, Partial<Expense>>({
      query: (body) => ({
        url: 'expenses',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Expenses'],
    }),

    // Mise à jour
    updateExpense: builder.mutation<Expense, Expense>({
      query: ({ id, ...body }) => ({
        url: `expenses/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Expenses', id: id },
        { type: 'Expenses' },
      ],
    }),

    // Suppression
    deleteExpense: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `expenses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expenses'],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useGetExpenseByIdQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
