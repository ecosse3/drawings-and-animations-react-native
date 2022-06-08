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
  useAnimatedReaction,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";

import { CenterScreen } from "../components/CenterScreen";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function Heart() {
  const [selected, setSelected] = useState(false);

  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const styles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
    };
  });

  const props = useAnimatedProps(() => {
    return {
      color: withTiming(selected ? "#FFAAA8" : "#AAA"),
    };
  });

  useAnimatedReaction(
    () => selected,
    (isSelected) => {
      if (isSelected) {
        scale.value = withSequence(withTiming(1.5), withTiming(1));
        rotate.value = withSequence(
          withTiming(25),
          withSequence(withTiming(-25), withTiming(0))
        );
      }
    }
  );

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
