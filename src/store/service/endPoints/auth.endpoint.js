import { apiService } from "../apiService.service";

const endAuthPointApiService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (formData) => ({
        url: "login",
        method: "POST",
        body: formData,
      }),
    }),
    signUp: builder.mutation({
      query: (formData) => ({
        url: "register",
        method: "POST",
        body: formData,
      }),
    }),
    changePassword: builder.mutation({
      query: (formData) => ({
        url: "change-password",
        method: "POST",
        body: formData,
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "user-logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useSignInMutation,
  useSignUpMutation,
  useLogOutMutation,
} = endAuthPointApiService;
