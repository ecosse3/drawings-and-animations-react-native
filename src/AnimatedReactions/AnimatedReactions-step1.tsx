import React from "react";
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  Easing,
  withSpring,
  withSequence,
  withRepeat,
} from "react-native-reanimated";
import { Pressable } from "react-native";

import { CenterScreen } from "../components/CenterScreen";

function Heart() {
  const scale = useSharedValue(1);
  const count = useSharedValue(0);

  const styles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Pressable
      onPress={() => {
        if (count.value > 10) {
          count.value = 0;

          scale.value = withSequence(
            withTiming(scale.value + 1, { duration: 500 }),
            withTiming(1)
          );
        } else {
          count.value += 1;

          scale.value = withSequence(
            withTiming(scale.value + 1, { duration: 500 }),
            withTiming(scale.value + 0.5)
          );
        }
      }}
    >
      <Animated.View
        style={[{ width: 50, height: 50, backgroundColor: "#FFAAA8" }, styles]}
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

