import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginInput } from '../../pages/Login';
import { RegisterInput } from '../../pages/Register';
import { IGenericResponse, IUserState } from './types';
import { setUser } from '../features/userSlice';



export const projectsApi = createApi({
    reducerPath: 'projectsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5000/api/`,
    }),
    endpoints: (builder) => ({
        getAllProjects: builder.query<any, { limit: string; page: string }>({
            query(arg) {
                const { limit, page } = arg
                return {
                    url: 'get_all_project',
                    params: { limit, page },
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
    })
})

export const {
    useLoginUserMutation,
    useGetAllProjectsQuery,
} = projectsApi;