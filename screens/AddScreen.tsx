import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import {CustomInput} from '../components';
import {StyledButtom} from '../components';
import Icon from 'react-native-vector-icons/Entypo';
import {wordsState, types} from '../redux/types/types';
import {addWord} from '../redux/actions/actionsCreator';

enum inputsPlaceholders {
   rusWord = 'Rus word',
   engWord = 'Eng word',
   examples = 'Example',
}

export const AddScreen: React.FC = () => {
   const [payload, setPayload] = useState<wordsState>({
      id: new Date().getTime(),
      engWord: '',
      rusWord: '',
      examples: [],
      checked: false,
   });

   const dispatch = useDispatch();

   const takeParms = (text: string, placeholder: string): void => {
      let newValue: object;

      if (placeholder === inputsPlaceholders.engWord) {
         newValue = {engWord: text};
      } else if (placeholder === inputsPlaceholders.rusWord) {
         newValue = {rusWord: text};
      } else {
         const number = parseInt(placeholder) - 1;
         const array = payload.examples;
         array[number] = text;

         newValue = {examples: array};
      }

      setPayload(prevState => {
         return {
            ...prevState,
            ...newValue,
         };
      });
   };

   const addExample = (): void => {
      const newArray = payload.examples.push('');

      setPayload(prevState => {
         return {
            ...prevState,
            newArray,
         };
      });
   };

   const removeExample = (): void => {
      payload.examples.pop();

      setPayload(prevState => {
         return {
            ...prevState,
            examples: payload.examples,
         };
      });
   };

   const addHandler = (): void => {
      let ready: boolean = true;
      const keys: Array<string> = ['engWord', 'rusWord'];
      type Tkeys = keyof wordsState;

      let key: Tkeys;
      for (key in payload) {
         if (keys.includes(key) && !payload[key]) {
            ready = false;
         }
         if (key === 'examples') {
            payload[key].forEach(elem => !elem.length && (ready = false));
         }
      }
      if (ready) {
         dispatch(addWord(payload));
         resetHandle();
      }
   };

   const resetHandle = (): void => {
      setPayload({
         id: new Date().getTime(),
         engWord: '',
         rusWord: '',
         examples: [],
         checked: false,
      });
   };

   const {main, title, sectionTitle, inputWords, decor, inputExamples, examplesButtonsStyle, buttons} = styles;

   return (
      <ScrollView contentContainerStyle={main}>
         <Text style={title}>Add</Text>

         <View style={inputWords}>
            <CustomInput
               placeholder={inputsPlaceholders.engWord}
               width={'35%'}
               change={takeParms}
               value={payload.engWord}
            />
            <View style={decor} />
            <CustomInput
               placeholder={inputsPlaceholders.rusWord}
               width={'35%'}
               change={takeParms}
               value={payload.rusWord}
            />
         </View>

         <View style={inputExamples}>
            <Text style={sectionTitle}>Add Examples:</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
               {payload.examples.map((elem, index) => {
                  return (
                     <CustomInput
                        key={index}
                        placeholder={++index + ' ' + inputsPlaceholders.examples}
                        change={takeParms}
                        value={elem}
                     />
                  );
               })}
            </ScrollView>
            <View style={examplesButtonsStyle}>
               {payload.examples.length > 0 && (
                  <TouchableOpacity onPress={removeExample}>
                     <Icon name={'minus'} size={45} color={'orange'} />
                  </TouchableOpacity>
               )}

               <TouchableOpacity onPress={addExample}>
                  <Icon name={'plus'} size={45} color={'orange'} />
               </TouchableOpacity>
            </View>
         </View>

         <View style={buttons}>
            <StyledButtom text={'reset'} type={'border'} handler={resetHandle} />
            <StyledButtom text={'add'} type={'fill'} handler={addHandler} />
         </View>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   main: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingBottom: 20,
   },
   title: {
      fontSize: 20,
      marginBottom: 25,
   },
   sectionTitle: {
      fontSize: 18,
      marginBottom: 10,
   },
   inputWords: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
   },
   decor: {
      width: 30,
      height: 10,
      marginHorizontal: 25,
      borderColor: 'orange',
      borderTopWidth: 3,
      borderBottomWidth: 3,
   },
   inputExamples: {
      width: '90%',
      maxHeight: '60%',
      marginBottom: 40,
   },
   examplesPlus: {
      alignSelf: 'center',
   },
   examplesButtonsStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
   },
   buttons: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   btn: {
      width: '40%',
   },
});
