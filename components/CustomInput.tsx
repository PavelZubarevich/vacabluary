import React, {useState} from 'react';
import {useEffect} from 'react';
import {StyleSheet, TextInput, View, NativeSyntheticEvent, TextInputEndEditingEventData} from 'react-native';

interface custmInputProps {
   placeholder: string;
   width?: string | number;
   value: string;
   change: (text: string, placeholder: string) => void;
}

export const CustomInput: React.FC<custmInputProps> = ({placeholder, width, value, change}) => {
   const [isWarning, setWarning] = useState<boolean>(false);
   const [text, setText] = useState<string>(value);

   useEffect(() => {
      setText(value);
   }, [value]);

   const validation = (event: NativeSyntheticEvent<TextInputEndEditingEventData>): void => {
      let {text} = event.nativeEvent;
      text = text.trim();

      if (text.length < 1 || (text.length <= 3 && placeholder.includes('Example'))) {
         setText(text);
         setWarning(true);
      } else {
         change(text, placeholder);
      }
   };

   const {main, input, warning} = styles;

   return (
      <View style={[main, {width: width}, isWarning && warning]}>
         <TextInput
            placeholder={placeholder}
            placeholderTextColor={'#999'}
            style={input}
            value={text}
            onChange={event => setText(event.nativeEvent.text)}
            onEndEditing={event => validation(event)}
            onFocus={() => setWarning(false)}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   main: {
      borderBottomColor: '#444',
      borderBottomWidth: 1,
      marginBottom: 25,
   },
   input: {
      fontSize: 16,
      paddingBottom: 3,
      paddingHorizontal: 10,
      height: 40,
      color: '#444',
   },
   warning: {
      borderBottomColor: 'red',
      borderBottomWidth: 2,
   },
});
