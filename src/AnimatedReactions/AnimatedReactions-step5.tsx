import React, { useState } from "react";
import Animated, { BounceIn, Keyframe } from "react-native-reanimated";
import Icon from "@expo/vector-icons/MaterialIcons";
import { Pressable } from "react-native";

import { CenterScreen } from "../components/CenterScreen";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const BetterBounce = new Keyframe({
  0: { transform: [{ scale: 1 }] },
  45: { transform: [{ scale: 2 }] },
  100: { transform: [{ scale: 1 }] },
});

function Heart() {
  const [selected, setSelected] = useState(false);

  return (
    <Pressable onPress={() => setSelected((val) => !val)}>
      <AnimatedIcon
        key={selected ? 1 : 0}
        name="favorite"
        size={50}
        color={selected ? "#FFAAA8" : "#AAA"}
        entering={BounceIn}
        exiting={BetterBounce}
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
