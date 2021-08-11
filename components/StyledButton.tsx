import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface buttonProps {
   text: string;
   handler: () => void;
   type?: 'fill' | 'border';
}

export const StyledButtom: React.FC<buttonProps> = ({text, type, handler}) => {
   const {defaultBTN, textStyle, fill, border} = styles;
   return (
      <TouchableOpacity onPress={handler}>
         <View style={[defaultBTN, type === 'fill' ? fill : border]}>
            <Text style={[textStyle, type === 'fill' ? {color: '#fff'} : {color: 'orange'}]}>{text}</Text>
         </View>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   defaultBTN: {
      paddingVertical: 10,
      paddingHorizontal: 40,
      borderRadius: 4,
      alignItems: 'center',
   },
   textStyle: {
      textTransform: 'uppercase',
      fontSize: 18,
      fontWeight: 'bold',
   },
   fill: {
      backgroundColor: 'orange',
   },
   border: {
      borderWidth: 2,
      borderColor: 'orange',
   },
});
