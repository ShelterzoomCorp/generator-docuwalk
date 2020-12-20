<%_ if (inFile && withSelectors) { _%>
import { createSlice, createSelector } from '@reduxjs/toolkit';
<%_ } else { _%>
import { createSlice } from '@reduxjs/toolkit';
<%_ } _%>
<%_ if (inFile && withReducers) { _%>
import { SagaIterator } from 'redux-saga';
import { call, takeLatest, put } from 'redux-saga/effects';
<%_ } _%>

<%_ if (inFile && withSelectors) { _%>
import { RootState } from 'src/app/types';
<%_ } _%>
import { <%= storeCamelName %>State } from 'src/.../types';
import { defaultActionsFactory } from 'src/utils/defaultSlice';
<%_ if (inFile && withReducers) { _%>
import { handleErrorSaga } from 'src/utils/handleErrorSaga';

import {
  startLoading,
  stopLoading,
  finishLoading,
} from './<%= store %>Reducers';
<%_ } _%>

const <%= store %>InitialState: <%= storeCamelName %>State = {
  <%_ if (withReducers) { _%>
  isLoading: false,
  error: '',
  <%_ } _%>
};

<%_ if (withReducers) { _%>
const { onStart, onError, onSuccess } = defaultActionsFactory();
<%_ } _%>

const <%= store %> = createSlice({
  name: '<%= store %>',
  initialState: <%= store %>InitialState,
  <%_ if (withReducers) { _%>
  reducers: {
    startLoading: onStart,
    stopLoading: onError,
    finishLoading: onSuccess,
    <%= reducer %>: (state, action: PayloadAction<<%= reducerCamelName %>Data>): void => {
      state.<%= reducer %>Data = action.payload.state;
    },
  },
  <%_ } _%>
});

<%_ if (withReducers) { _%>
export const {
  startLoading,
  stopLoading,
  finishLoading,
} = <%= store %>.actions;

export const <%= store %>Reducer = <%= store %>.reducer;
<%_ } _%>

<%_ if (inFile && withReducers) { _%>
  <%- include('../../saga/templates/Sagas.ts', {store, storeCamelName, reducer, included: true}); %>
<%_ } _%>

<%_ if (inFile && withSelectors) { _%>
  <%- include('../../selector/templates/Selectors.ts', {store, selector, selectorCamelName, included: true}); %>
<%_ } _%>
