import { combineReducers } from "redux";

import folders from './folders';
import decks from './decks';
import cards from './cards';

export const reducers = combineReducers({ folders, decks, cards });