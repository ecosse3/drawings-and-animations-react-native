import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Icon from "@expo/vector-icons/MaterialIcons";

import { CenterScreen } from "../components/CenterScreen";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function FlyingHeart() {
  const time = useSharedValue(0);
  const DURATION = 30; // in seconds
  const G = 15;
  const vx = 300;
  const vy = 500;

  const styles = useAnimatedStyle(() => {
    const t = time.value / 1000;
    const x = vx * t;
    const y = vy * t - (-G * t * t) / 2;

    return {
      transform: [{ translateX: x }, { translateY: -y }],
    };
  });

  useEffect(() => {
    time.value = withTiming(DURATION * 1000, {
      duration: DURATION * 1000,
      easing: Easing.linear,
    });
  }, [time]);

  return (
    <AnimatedIcon name="favorite" size={50} color={"#FFAAA8"} style={styles} />
  );
}

export function AnimatedReactions() {
  return (
    <CenterScreen>
      <FlyingHeart />
    </CenterScreen>
  );
}
