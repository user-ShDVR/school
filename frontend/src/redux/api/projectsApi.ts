import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginInput } from '../../pages/Login';
import { RegisterInput } from '../../pages/Register';
import { IGenericResponse, IUserState } from './types';




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
        createProject: builder.mutation({
            query(data) {
                const user = JSON.parse(localStorage.getItem('user'))
                data['author'] = user.id
                console.log(data)
                return {
                    url: 'project',
                    method: 'POST',
                    body: data,
                }
            }
        }),
    })
})

export const {
    useCreateProjectMutation,
    useGetAllProjectsQuery,
} = projectsApi;