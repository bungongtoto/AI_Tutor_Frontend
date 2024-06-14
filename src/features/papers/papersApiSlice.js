import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const papersAdapter = createEntityAdapter({});

const initialState = papersAdapter.getInitialState();

export const papersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPapers: builder.query({
      query: () => ({
        url: "/papers",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedPapers = responseData.map((paper) => {
          paper.id = paper._id;
          return paper;
        });
        return papersAdapter.setAll(initialState, loadedPapers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Paper", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Paper", id })),
          ];
        } else return [{ type: "Paper", id: "LIST" }];
      },
    }),
    addNewPaper: builder.mutation({
      query: (initialPaperData) => ({
        url: "/papers",
        method: "POST",
        body: {
          ...initialPaperData,
        },
      }),
      invalidatesTags: [{ type: "Paper", id: "LIST" }],
    }),
    updatePaper: builder.mutation({
      query: (initialPaperData) => ({
        url: "/papers",
        method: "PATCH",
        body: {
          ...initialPaperData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Paper", id: arg.id }],
    }),
    deletePaper: builder.mutation({
      query: ({ id }) => ({
        url: `/papers`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Paper", id: arg.id }],
    }),
  }),
});

export const {
  useGetPapersQuery,
  useAddNewPaperMutation,
  useUpdatePaperMutation,
  useDeletePaperMutation,
} = papersApiSlice;

// returns the query result object
export const selectPapersResult = papersApiSlice.endpoints.getPapers.select();

// creates memoized selector
const selectPapersData = createSelector(
  selectPapersResult,
  (papersResult) => papersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPapers,
  selectById: selectPaperById,
  selectIds: selectPaperIds,
  // Pass in a selector that returns the users slice of state
} = papersAdapter.getSelectors(
  (state) => selectPapersData(state) ?? initialState
);
