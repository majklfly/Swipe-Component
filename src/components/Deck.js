import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
} from "react-native";

const { width, height } = Dimensions.get("window");

const SWIPE_THRESHOLD = 0.25 * width;

export const Deck = ({
  data,
  renderCard,
  onSwipeRight,
  onSwipeLeft,
  renderNoMoreCards,
}) => {
  Deck.defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    renderNoMoreCards: () => {},
  };

  const [index, setIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction) => {
    const x = direction === "right" ? width : -width;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      onSwipeComplete(direction);
    });
  };

  const onSwipeComplete = (direction) => {
    const item = data[index];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    setIndex((prev) => {
      console.log(prev);
      return prev + 1;
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-width * 1.5, 0, width * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });

    return { ...position.getLayout(), transform: [{ rotate }] };
  };

  useEffect(() => {}, []);

  const renderCards = () => {
    if (index >= data.length) {
      return renderNoMoreCards();
    }

    return data
      .map((item, i) => {
        if (i < index) {
          return null;
        }

        if (i === index) {
          return (
            <Animated.View
              key={item.id}
              {...panResponder.panHandlers}
              style={[getCardStyle(), styles.cardStyleFirst]}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            style={[styles.cardStyle, { top: 10 * (i - index) }]}
            key={item.id}
          >
            {renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
    width: width,
    marginTop: "20%",
  },
  cardStyleFirst: {
    position: "absolute",
    width: width,
    marginTop: "20%",
    elevation: 10,
  },
});
