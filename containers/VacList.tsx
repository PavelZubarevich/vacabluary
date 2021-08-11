import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTypedSelector} from '../redux/hooks/useTypedSelector';
import {store} from '../redux/state';

export const VacList: React.FC = () => {
   const {main} = styles;

   const wordsList = useTypedSelector(store => store.words);
   console.log(wordsList);
   return (
      <View style={main}>
         <Text>jgfdhgdhfgl</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   main: {},
});
