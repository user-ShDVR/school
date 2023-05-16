import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';




export const projectsApi = createApi({
    reducerPath: 'projectsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5000/api/`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).userState.token;
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllProjects: builder.query<any, { limit: string; page: string }>({
            query(arg) {
                const { limit, page } = arg;
                return {
                    url: 'get_all_project',
                    params: { limit, page },
                };
            },
        }),
        getAllUserProjects: builder.query<any, { limit: string; page: string }>({
            query(arg) {
                const { limit, page } = arg;
                const user = JSON.parse(localStorage.getItem('user'))
                return {
                    url: 'getUserProjects',
                    params: { limit, page, userId: user.user.id},
                };
            },
        }),
        createProject: builder.mutation({
            query(data) {
                const user = JSON.parse(localStorage.getItem('user'))
                data['userId'] = user.user.id;
                return {
                    url: 'project',
                    method: 'POST',
                    body: data,
                }
            }
        }),
        addUser: builder.mutation({
            query(data) {
                const user = JSON.parse(localStorage.getItem('user'))
                data['userId'] = user.user.id;
                return {
                    url: 'add_user_in_project',
                    method: 'POST',
                    body: data,
                }
            }
        }),
    })
})

export const {
    useCreateProjectMutation,
    useAddUserMutation,
    useGetAllProjectsQuery,
    useGetAllUserProjectsQuery,
} = projectsApi;