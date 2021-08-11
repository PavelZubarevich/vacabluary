import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface headerProps {
   text: string;
}

export const Header: React.FC<headerProps> = ({text}) => {
   const {main, textStyle} = styles;
   return (
      <View style={main}>
         <Text style={textStyle}>{text}</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   main: {
      padding: 15,
      paddingBottom: 5,
      alignItems: 'center',
      backgroundColor: '#fff',
   },
   textStyle: {
      width: '85%',
      color: '#444',
      textAlign: 'center',
      fontSize: 25,
      textTransform: 'uppercase',
      borderBottomColor: 'orange',
      borderBottomWidth: 2,
   },
});
