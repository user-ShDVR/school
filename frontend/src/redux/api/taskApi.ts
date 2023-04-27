import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginInput } from '../../pages/Login';
import { RegisterInput } from '../../pages/Register';
import { IGenericResponse, IUserState } from './types';




export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:5000/api/`,
    }),
    endpoints: (builder) => ({
        getAllTasks: builder.query<any, { limit: string; page: string }>({
            query(arg) {
                const { limit, page } = arg;
                return {
                    url: 'get_all_task',
                    params: { limit, page },
                };
            },
        }),
        createTask: builder.mutation({
            query(data) {
                const user = JSON.parse(localStorage.getItem('user'))
                data['userId'] = user.user.id;
                return {
                    url: 'task',
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
    useCreateTaskMutation,
    useAddUserMutation,
    useGetAllTasksQuery,
} = taskApi;