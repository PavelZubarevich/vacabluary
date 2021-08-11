import { types, wordsState } from "../types/types"


export function addWord(payload:wordsState) {
   return {type: types.ADD_WORD, payload}
}
export function deleteWord(id:number) {
   return {type: types.DELETE_WORD, payload: id}
}
export function checkWord(id:number) {
   return {type: types.CHECK_WORD, payload: id}
}

