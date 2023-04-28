import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginInput } from '../../pages/Login';
import { RegisterInput } from '../../pages/Register';
import { IGenericResponse, IUserState } from './types';
import { setUser } from '../features/userSlice';



export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5000/api/user/`,
        prepareHeaders: (headers, { getState }) => {
            const user = JSON.parse(localStorage.getItem('user'))
            if (user.token) {
              headers.set('Authorization', `Bearer ${user.token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<IGenericResponse, RegisterInput>({
            query(data) {
                return {
                    url: 'registration',
                    method: 'POST',
                    body: data,
                };
            },
        }),
        loginUser: builder.mutation<IUserState, LoginInput>({
            query(data) {
                return {
                    url: 'login',
                    method: 'POST',
                    body: data,
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {
                    console.log(error)
                }
            },
        }),
        refreshUser: builder.mutation<IUserState, { token: string; }>({
            query(data) {
                return {
                    url: 'refreshJWTToken',
                    method: 'POST',
                    body: data,
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {
                    console.log(error)
                }
            },
        }),

    })
})

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useRefreshUserMutation,
} = authApi;