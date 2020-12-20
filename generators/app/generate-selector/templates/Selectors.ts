<%_ if (!included) { _%>
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'src/app/types';
<%_ } _%>

const getState = (state: RootState) => state.<%= store %>;

export const get<%= selectorCamelName %> = createSelector(getState, state => state.<%= selector %>);
