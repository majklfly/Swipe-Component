import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

export const Ball = () => {
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: 200, y: 500 },
      useNativeDriver: false,
    }).start();
  }, [position]);

  return (
    <Animated.View style={[position.getLayout()]}>
      <View style={styles.ball} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: "black",
  },
});
