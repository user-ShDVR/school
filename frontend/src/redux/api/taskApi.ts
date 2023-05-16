import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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
        getOne: builder.query<any, { taskId: string }>({
            query(arg) {
                const { taskId } = arg;
                return {
                    url: 'get_one',
                    params: { taskId },
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
        addRate: builder.mutation({
            query(data) {
                return {
                    url: 'create_rate',
                    method: 'POST',
                    body: data,
                }
            }
        }),
        getAllUserTasks: builder.query<any, { limit: string; page: string; type?: string; }>({
            query(arg) {
                const { limit, page, type } = arg;
                const user = JSON.parse(localStorage.getItem('user'))
                 
                return {
                    url: 'getUserTasks',
                    params: { limit, page, type, userId: user.user.id },
                };
            },
        }),
    })
})

export const {
    useCreateTaskMutation,
    useAddUserMutation,
    useAddRateMutation,
    useGetAllUserTasksQuery,
    useGetAllTasksQuery,
    useGetOneQuery,
} = taskApi;