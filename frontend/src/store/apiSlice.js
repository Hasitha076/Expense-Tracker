import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "https://expense-tracker-backend-g7ho.onrender.com/" }),
    endpoints: builder => ({
        getCategories: builder.query({
            query: () => ({
                url: '/api/categories/findAll',
                method: 'get'
            }),
            providesTags: ['categories']
        }),
        getLabels: builder.query({
            query: () => ({
                url: '/api/labels',
                method: 'get'
            }),
            providesTags: ['transaction']
        }),
        addTransaction: builder.mutation({
            query: (initialTransaction) => ({
                url: '/api/transaction/create',
                method: 'post',
                body: initialTransaction
            }),
            invalidatesTags: ['transaction']
        }),
        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: '/api/transaction/deleteById',
                method: 'delete',
                body: id
            }),
            invalidatesTags: ['transaction']

        })
    })
})

export const { useGetCategoriesQuery, useGetLabelsQuery, useAddTransactionMutation, useDeleteTransactionMutation } = apiSlice
export default apiSlice
