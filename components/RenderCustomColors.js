import React from "react";
import { Bubble, Time, Day } from 'react-native-gifted-chat';

   // Text bubble color settings
   const renderBubble = (props, bubbleColor) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: bubbleColor,
            borderColor: '#000',
            borderWidth: 2,
          },
          left: {
            backgroundColor: '#FFF',
            borderColor: '#000',
            borderWidth: 2
          },
        }}
        textStyle={{
          right: {
            color: 'black'
          }
        }}
      />
    );
  };


    //Timestamp color settings
    const renderTime = (props) => {
        return (
        <Time
          {...props}
          timeTextStyle={{ 
            left: { color: 'black' },
            right: { color: 'black' }
          }}
        />
      );
    };

 //Date color settings
 const renderDay = (props) => {
    return (
      <Day
        {...props}
        textStyle={{
          color: 'black'
        }}
      />
    )
  };

export default {
    renderBubble,
    renderTime,
    renderDay
};