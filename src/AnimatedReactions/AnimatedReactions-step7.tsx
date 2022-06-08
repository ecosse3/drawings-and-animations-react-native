import React, { useEffect, useRef, useState } from "react";
import Animated, {
  BounceIn,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomOut,
} from "react-native-reanimated";
import Icon from "@expo/vector-icons/MaterialIcons";
import { Pressable } from "react-native";

import { CenterScreen } from "../components/CenterScreen";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const VX_MAX = 60;
const VY_MAX = 80;
const DURATION = 30; // in seconds
const G = 15;

function randomSpeed() {
  return {
    vx: Math.random() * 2 * VX_MAX - VY_MAX,
    vy: Math.random() * VY_MAX,
    angular: Math.random() * Math.PI - Math.PI / 2,
  };
}

function FlyingHeart() {
  const time = useSharedValue(0);
  const { vx, vy, angular } = useRef(randomSpeed()).current;

  const styles = useAnimatedStyle(() => {
    const t = time.value / 1000;
    const x = vx * t;
    const y = vy * t + (-G * t * t) / 2;
    const angle = angular * t;

    return {
      transform: [
        { translateX: x },
        { translateY: -y },
        { rotateZ: `${angle}rad` },
      ],
    };
  });

  useEffect(() => {
    const calculatedTime = DURATION * 1000;

    time.value = withTiming(calculatedTime, {
      duration: (DURATION * 1000) / 10,
      easing: Easing.linear,
    });
  }, [time]);

  return (
    <AnimatedIcon
      name="favorite"
      size={50}
      color={"#ffaaa8"}
      style={[{ position: "absolute" }, styles]}
    />
  );
}

function ExplodingHearts({ count = 20 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        return <FlyingHeart key={index} />;
      })}
    </>
  );
}
function Heart() {
  const [selected, setSelected] = useState(false);

  return (
    <>
      <Pressable onPress={() => setSelected((val) => !val)}>
        <AnimatedIcon
          key={selected ? 0 : 1}
          name="favorite"
          size={50}
          color={selected ? "#FFAAA8" : "#AAA"}
          exiting={ZoomOut}
          entering={BounceIn}
        />
      </Pressable>
      {selected && <ExplodingHearts />}
    </>
  );
}

export function AnimatedReactions() {
  return (
    <CenterScreen>
      <Heart />
    </CenterScreen>
  );
}
