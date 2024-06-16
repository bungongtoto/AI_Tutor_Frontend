import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const enrollmentsAdapter = createEntityAdapter({});

const initialState = enrollmentsAdapter.getInitialState();

export const enrollmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollments: builder.query({
      query: () => ({
        url: "/enrollments",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedEnrollments = responseData.map((enrollment) => {
          enrollment.id = enrollment._id;
          return enrollment;
        });
        return enrollmentsAdapter.setAll(initialState, loadedEnrollments);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Enrollment", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Enrollment", id })),
          ];
        } else return [{ type: "Enrollment", id: "LIST" }];
      },
    }),
    addNewEnrollment: builder.mutation({
      query: (initialEnrollmentData) => ({
        url: "/enrollments",
        method: "POST",
        body: {
          ...initialEnrollmentData,
        },
      }),
      invalidatesTags: [{ type: "Enrollment", id: "LIST" }],
    }),
    updateEnrollment: builder.mutation({
      query: (initialEnrollmentData) => ({
        url: "/enrollments",
        method: "PATCH",
        body: {
          ...initialEnrollmentData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Enrollment", id: arg.id }],
    }),
    deleteEnrollment: builder.mutation({
      query: ({ id }) => ({
        url: `/enrollments`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Enrollment", id: arg.id }],
    }),
  }),
});

export const {
  useGetEnrollmentsQuery,
  useAddNewEnrollmentMutation,
  useUpdateEnrollmentMutation,
  useDeleteEnrollmentMutation,
} = enrollmentsApiSlice;

// returns the query result object
export const selectEnrollmentsResult = enrollmentsApiSlice.endpoints.getEnrollments.select();

// creates memoized selector
const selectEnrollmentsData = createSelector(
  selectEnrollmentsResult,
  (enrollmentsResult) => enrollmentsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllEnrollments,
  selectById: selectEnrollmentById,
  selectIds: selectEnrollmentIds,
  // Pass in a selector that returns the users slice of state
} = enrollmentsAdapter.getSelectors(
  (state) => selectEnrollmentsData(state) ?? initialState
);
