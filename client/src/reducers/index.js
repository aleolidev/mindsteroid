import { combineReducers } from "redux";

import auth from './auth';
import folders from './folders';
import decks from './decks';
import cards from './cards';

export const reducers = combineReducers({ auth, folders, decks, cards });