import { wordsState, types, action } from "../types/types";

const initialState: Array<wordsState> = [{
   id: 0,
   engWord: 'veryverylongWord',
   rusWord: 'privet',
   examples: ['lorem inpus text', 'lorem inpus text', 'lorem inpus text lorem inpus textlorem inpus text lorem inpus text'],
   checked: false
},
{
   id: 2,
   engWord: 'hello',
   rusWord: 'privet',
   examples: [],
   checked: true
}
];

export function wordsReduser(state = initialState, action: action) {
   switch (action.type) {
      case types.ADD_WORD: 
         return [
            ...state,
            action.payload
         ]
      case types.DELETE_WORD:
         return [
            ...state.filter(elem => elem.id !== action.payload)
         ]
      case types.CHECK_WORD:
         
         return [
            ...state.map(elem => {
               if(elem.id !== action.payload) {
                  return elem
               } else {
                  return {
                     ...elem,
                     checked: !elem.checked
                  }
               }   
               
            })
         ]
      default:
         return state;
   }
}
