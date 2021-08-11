export enum types {
   ADD_WORD = 'ADD_WORD',
   DELETE_WORD = 'DELETE_WORD',
   CHECK_WORD = 'CHECK_WORD',
   ADD_EXAMPLE= 'ADD_EXAMPLE'
}

export interface wordsState { 
   id: number,
   engWord: string,
   rusWord: string,
   examples: Array<string>,
   checked: boolean
}

interface addAction {
   type: types.ADD_WORD,
   payload: wordsState, 
}
interface deleteAction {
   type: types.DELETE_WORD,
   payload: number
}
interface checkAction {
   type: types.CHECK_WORD,
   payload: number
}
interface addExampleAction {
   type: types.ADD_EXAMPLE,
   payload: string
}

export type action = addAction | deleteAction | checkAction | addExampleAction