import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const examsAdapter = createEntityAdapter({});

const initialState = examsAdapter.getInitialState();

export const examsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExams: builder.query({
      query: () => ({
        url: "/exams",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedExams = responseData.map((exam) => {
          exam.id = exam._id;
          return exam;
        });
        return examsAdapter.setAll(initialState, loadedExams);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Exam", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Exam", id })),
          ];
        } else return [{ type: "Exam", id: "LIST" }];
      },
    }),
    addNewExam: builder.mutation({
      query: (initialExamData) => ({
        url: "/exams",
        method: "POST",
        body: {
          ...initialExamData,
        },
      }),
      invalidatesTags: [{ type: "Exam", id: "LIST" }],
    }),
    updateExam: builder.mutation({
      query: (initialExamData) => ({
        url: "/exams",
        method: "PATCH",
        body: {
          ...initialExamData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Exam", id: arg.id }],
    }),
    deleteExam: builder.mutation({
      query: ({ id }) => ({
        url: `/exams`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Exam", id: arg.id }],
    }),
  }),
});

export const {
  useGetExamsQuery,
  useAddNewExamMutation,
  useUpdateExamMutation,
  useDeleteExamMutation,
} = examsApiSlice;

// returns the query result object
export const selectExamsResult = examsApiSlice.endpoints.getExams.select();

// creates memoized selector
const selectExamsData = createSelector(
  selectExamsResult,
  (examsResult) => examsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllExams,
  selectById: selectExamById,
  selectIds: selectExamIds,
  // Pass in a selector that returns the users slice of state
} = examsAdapter.getSelectors(
  (state) => selectExamsData(state) ?? initialState
);
