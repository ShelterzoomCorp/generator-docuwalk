<%_ if (!included) { _%>
import { SagaIterator } from 'redux-saga';
import { call, takeLatest, put } from 'redux-saga/effects';

import { handleErrorSaga } from 'src/utils/handleErrorSaga';

import {
  startLoading,
  stopLoading,
  finishLoading,
} from './<%= store %>Reducers';
<%_ } _%>

function* <%= reducer %>Saga(action: PayloadAction<Payload>) {
  try {
    yield put(startLoading());

    yield put(finishLoading());
  } catch (error) {
    yield put(stopLoading(error));
    yield call(handleErrorSaga, error);
  }
}

export function* watch<%= storeCamelName %>Sagas(): SagaIterator {
  yield takeLatest(<%= reducer %>, <%= reducer %>Saga);
}