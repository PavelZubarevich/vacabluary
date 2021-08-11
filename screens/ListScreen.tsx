import React from 'react';
import {StyleSheet, Text, View, FlatList, ListRenderItem} from 'react-native';
import {useTypedSelector} from '../redux/hooks/useTypedSelector';
import {wordsState} from '../redux/types/types';
import {VacCard} from '../components';

export const ListScreen: React.FC = () => {
   const {main, title} = styles;
   const values: Array<wordsState> = useTypedSelector(state => state.words);

   const renderItem: ListRenderItem<wordsState> = ({item}) => <VacCard data={item} />;

   return (
      <View style={main}>
         <Text style={title}>Your words</Text>

         <FlatList
            data={values}
            renderItem={renderItem}
            keyExtractor={item => String(item.id)}
            showsVerticalScrollIndicator={false}
            style={{width: '100%', marginVertical: 10}}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   main: {
      backgroundColor: '#fff',
      flex: 1,
      alignItems: 'center',
   },
   title: {
      fontSize: 20,
   },
});
