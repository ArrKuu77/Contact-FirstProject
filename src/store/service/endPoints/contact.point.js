import { apiService } from "../apiService.service";

const endAuthPointApiService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "user-profile",
        method: "GET",
      }),
      providesTags: ["contact"],
    }),
    getContacts: builder.query({
      query: () => ({
        url: "contact",
        method: "GET",
      }),
      providesTags: ["contact"],
    }),
    createContact: builder.mutation({
      query: (formData) => ({
        url: "contact",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["contact"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contact"],
    }),
    updateContact: builder.mutation({
      query: (edit) => ({
        url: `contact/${edit.id}`,
        method: "PUT",
        body: edit.value,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetProfileQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = endAuthPointApiService;
