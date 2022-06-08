import React, { useState } from "react";
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
  const [selected, setSelected] = useState(false);

  const styles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const props = useAnimatedProps(() => {
    return {
      color: withTiming(selected ? "#FFAAA8" : "#AAA"),
    };
  });

  return (
    <Pressable onPress={() => setSelected((value) => !value)}>
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
