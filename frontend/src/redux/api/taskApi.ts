import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginInput } from '../../pages/Login';
import { RegisterInput } from '../../pages/Register';
import { IGenericResponse, IUserState } from './types';
import { RootState } from '../store';




export const taskApi = createApi({
    reducerPath: 'taskApi',
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
                    url: 'add_user_in_task',
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