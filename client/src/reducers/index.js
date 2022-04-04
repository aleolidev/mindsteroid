import { combineReducers } from "redux";

import folders from './folders';
import decks from './decks';

export const reducers = combineReducers({ folders, decks });