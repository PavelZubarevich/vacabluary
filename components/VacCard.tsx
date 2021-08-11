import React, {useState, useEffect, useRef, ReactNode} from 'react';
import {StyleSheet, Text, View, Animated, TouchableOpacity} from 'react-native';
import {wordsState} from '../redux/types/types';
import Icon from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {checkWord, deleteWord} from '../redux/actions/actionsCreator';

interface cardProps {
   data: wordsState;
}

export const VacCard: React.FC<cardProps> = ({data}) => {
   const {engWord, rusWord, checked, id, examples} = data;

   const dispatch = useDispatch();

   const [isOpen, setOpen] = useState<boolean>(false);

   const arrowAnim = useRef(new Animated.Value(0)).current;
   const arrowRotateAnim = useRef(new Animated.Value(1)).current;
   const switchExamples = useRef(new Animated.Value(0)).current;

   useEffect(() => {
      Animated.loop(
         Animated.sequence([
            Animated.timing(arrowAnim, {
               toValue: 3,
               duration: 700,
               useNativeDriver: true,
            }),
            Animated.timing(arrowAnim, {
               toValue: 0,
               duration: 700,
               useNativeDriver: true,
            }),
         ]),
      ).start();
   }, []);

   const openExamples = () => {
      Animated.parallel([
         Animated.timing(arrowRotateAnim, {
            toValue: isOpen ? 1 : -1,
            useNativeDriver: true,
            duration: 600,
         }),

         Animated.timing(switchExamples, {
            toValue: isOpen ? 0 : 1,
            useNativeDriver: false,
            duration: 600,
         }),
      ]).start();

      isOpen
         ? setTimeout(() => {
              setOpen(!isOpen);
           }, 500)
         : setOpen(!isOpen);
   };

   const leftAction = (): ReactNode => {
      return (
         <TouchableOpacity style={{paddingLeft: 10, width: 45, height: '85%'}} onPress={() => removeWord()}>
            <Icon name={'cross'} color={'orange'} size={40} />
         </TouchableOpacity>
      );
   };

   const removeWord = () => {
      dispatch(deleteWord(id));
   };

   const {
      main,
      words,
      wordsDecor,
      examplesBlock,
      examplesList,
      textStyle,
      smallTextStyle,
      checkedDecor,
      examplesText,
      arrow,
   } = styles;

   return (
      <Swipeable renderLeftActions={leftAction} overshootLeft={false} overshootFriction={2}>
         <View style={[main, {marginBottom: examples.length ? (isOpen ? 40 : 5) : 30}]}>
            <View style={words}>
               <Text style={[textStyle, engWord.length > 14 && smallTextStyle]}>{engWord}</Text>

               <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => dispatch(checkWord(id))}>
                  <Icon name={'chevron-thin-left'} size={30} color={'orange'} />
                  <View style={[wordsDecor, checked && checkedDecor]} />
                  <Icon name={'chevron-thin-right'} size={30} color={'orange'} />
               </TouchableOpacity>

               <Text style={[textStyle, rusWord.length > 14 && smallTextStyle]}>{rusWord}</Text>
            </View>

            {examples.length > 0 && (
               <View style={{maxHeight: examples.length * 86}}>
                  <Animated.View
                     style={[
                        examplesBlock,

                        {
                           height: switchExamples.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0%', '105%'],
                           }),
                        },
                     ]}>
                     <View style={[examplesList]}>
                        {examples.map(elem => {
                           return (
                              <Text key={String(Math.random())} style={examplesText}>
                                 {elem}
                              </Text>
                           );
                        })}
                     </View>
                  </Animated.View>
                  <TouchableOpacity onPress={openExamples} style={arrow}>
                     <Animated.View
                        style={{
                           transform: [{translateY: arrowAnim}, {scaleY: arrowRotateAnim}],
                        }}>
                        <Icon name={'chevron-small-down'} size={35} color={'orange'} />
                     </Animated.View>
                  </TouchableOpacity>
               </View>
            )}
         </View>
      </Swipeable>
   );
};

const styles = StyleSheet.create({
   main: {
      marginTop: 5,
      paddingHorizontal: 20,
   },
   words: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
   },
   wordsDecor: {
      width: 10,
      height: 10,
      marginHorizontal: -5,
      borderColor: 'orange',
      borderWidth: 2,
      transform: [{rotateZ: '45deg'}],
   },
   checkedDecor: {
      backgroundColor: 'orange',
      width: 15,
      height: 15,
      marginHorizontal: -8,
   },
   textStyle: {
      fontSize: 18,
      width: '45%',
      textAlign: 'center',
   },
   smallTextStyle: {
      fontSize: 15,
   },
   examplesBlock: {
      overflow: 'hidden',
      height: '0%',
      backgroundColor: '#fff',
   },
   examplesList: {
      marginTop: 5,
   },
   examplesText: {
      width: '100%',
      height: 81,
      textAlignVertical: 'center',
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderColor: 'orange',
   },
   arrow: {
      alignItems: 'center',
      marginTop: -8,
   },
});
