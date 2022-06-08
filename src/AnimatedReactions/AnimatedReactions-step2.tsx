import React from "react";
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  Easing,
  withSpring,
  withSequence,
  withRepeat,
  useAnimatedProps,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";

import { CenterScreen } from "../components/CenterScreen";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function Heart() {
  const scale = useSharedValue(1);
  const count = useSharedValue(0);
  const color = useSharedValue("rgba(170, 170, 170, 1)");
  const prevColor = useSharedValue("rgba(170, 170, 170, 1)");

  const styles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const props = useAnimatedProps(() => {
    return {
      color: color.value,
    };
  });

  return (
    <Pressable
      onPress={() => {
        prevColor.value = color.value;

        if (count.value > 10) {
          count.value = 0;

          scale.value = withSequence(
            withTiming(scale.value + 1, { duration: 500 }),
            withTiming(1)
          );

          // Lesson learned: Always use rgba with shared value
          // HEX is automatically converted to rgba and breaks when using just HEX
          color.value = withTiming(
            prevColor.value === "rgba(170, 170, 170, 1)"
              ? "rgba(255, 170, 168, 1)"
              : "rgba(170, 170, 170, 1)"
          );
        } else {
          count.value += 1;

          scale.value = withSequence(
            withTiming(scale.value + 1, { duration: 500 }),
            withTiming(scale.value + 0.5)
          );

          color.value = withTiming(
            prevColor.value === "rgba(170, 170, 170, 1)"
              ? "rgba(255, 170, 168, 1)"
              : "rgba(170, 170, 170, 1)"
          );
        }
      }}
    >
      <AnimatedIcon
        name="favorite"
        size={50}
        style={styles}
        animatedProps={props}
      />
    </Pressable>
  );
}

export function AnimatedReactions() {
  return (
    <CenterScreen>
      <Heart />
    </CenterScreen>
  );
}
