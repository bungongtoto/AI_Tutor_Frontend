import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const questionsAdapter = createEntityAdapter({});

const initialState = questionsAdapter.getInitialState();

export const questionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => ({
        url: "/questions",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedQuestions = responseData.map((questions) => {
          questions.id = questions._id;
          return questions;
        });
        return questionsAdapter.setAll(initialState, loadedQuestions);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Question", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Question", id })),
          ];
        } else return [{ type: "Question", id: "LIST" }];
      },
    }),
    addNewQuestion: builder.mutation({
      query: (initialQuestionData) => ({
        url: "/questions",
        method: "POST",
        body: {
          ...initialQuestionData,
        },
      }),
      invalidatesTags: [{ type: "Question", id: "LIST" }],
    }),
    updateQuestion: builder.mutation({
      query: (initialQuestionData) => ({
        url: "/questions",
        method: "PATCH",
        body: {
          ...initialQuestionData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Question", id: arg.id }],
    }),
    deleteQuestion: builder.mutation({
      query: ({ id }) => ({
        url: `/questions`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Question", id: arg.id }],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useAddNewQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionsApiSlice;

// returns the query result object
export const selectQuestionsResult = questionsApiSlice.endpoints.getQuestions.select();

// creates memoized selector
const selectQuestionsData = createSelector(
  selectQuestionsResult,
  (questionsResult) => questionsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllQuestions,
  selectById: selectQuestionById,
  selectIds: selectQuestionIds,
  // Pass in a selector that returns the questions slice of state
} = questionsAdapter.getSelectors(
  (state) => selectQuestionsData(state) ?? initialState
);
