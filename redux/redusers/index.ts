import {combineReducers} from 'redux';
import {wordsReduser} from './wordsReduser';

export const rootReduser = combineReducers({
   words: wordsReduser,
});

export type reduserType = ReturnType<typeof rootReduser>
