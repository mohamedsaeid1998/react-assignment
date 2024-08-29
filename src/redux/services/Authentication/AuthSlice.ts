import { toast } from 'react-toastify';
import CookieServices from '@/services/cookieServices/CookieServices';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AUTH_URLS, BASE_URL } from '@/services/endPoints/EndPoints';
import { IFormError, ILoginResponse } from '@/interFaces';
export const AuthenticationApiSlice = createApi({
  reducerPath: "auth",
  tagTypes: ["Authentication"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: AUTH_URLS.login,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ILoginResponse) => {
        CookieServices.set('token', response.jwt)
        CookieServices.set('user', JSON.stringify(response.user))
        toast.success(`Welcome ${response.user.username}`);
        return response;
      }, transformErrorResponse: (error: IFormError) => {
        toast.error(error.data.error.message);
        return error;
      }
    }),
    register: builder.mutation({
      query: (data) => ({
        url: AUTH_URLS.register,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ILoginResponse) => {
        toast.success("Created Account Successfully");
        return response;
      },
      transformErrorResponse: (error: IFormError) => {
        toast.error(error.data.error.message);
        return error;
      }
    }),

  })
})
export const { useLoginMutation, useRegisterMutation } = AuthenticationApiSlice
