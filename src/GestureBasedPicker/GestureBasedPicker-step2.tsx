import React, { useState } from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Pressable, View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

import { CenterScreen } from "../components/CenterScreen";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const WIDTH = 50;
const STICKERS_COUNT = 4;

function Sticker({
  iconName,
  color,
}: {
  iconName: React.ComponentProps<typeof Icon>["name"];
  color: string;
}) {
  const [selected, setSelected] = useState(false);

  return (
    <>
      <Pressable onPress={() => setSelected((val) => !val)}>
        <AnimatedIcon
          key={selected ? 1 : 0}
          name={iconName}
          size={WIDTH}
          color={selected ? color : "#AAA"}
        />
      </Pressable>
    </>
  );
}

function snapPoint(x: number) {
  "worklet";
  const position = Math.max(
    -STICKERS_COUNT + 1,
    Math.min(0, Math.round(x / WIDTH))
  );

  console.log({ position });
  console.log(Math.min(0, Math.round(x / WIDTH)));

  return position * WIDTH;
}

function Toolbar() {
  const offsetY = useSharedValue(0);

  const styles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offsetY.value }],
    };
  });

  const pan = Gesture.Pan()
    .onChange((e) => {
      offsetY.value += e.changeX;
    })
    .onEnd(() => {
      offsetY.value = withSpring(snapPoint(offsetY.value));
    });

  return (
    <View
      style={{
        overflow: "visible",
        width: 0,
      }}
    >
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            { flexDirection: "row", width: WIDTH * 4, marginLeft: -WIDTH / 2 },
            styles,
          ]}
        >
          <Sticker iconName="favorite" color="#ffaaa8" />
          <Sticker iconName="grade" color="#001a72" />
          <Sticker iconName="thumb-up" color="#ffee86" />
          <Sticker iconName="emoji-events" color="#8ed3ef" />
        </Animated.View>
      </GestureDetector>
      <Icon
        name="expand-less"
        size={30}
        style={{ position: "absolute", bottom: -30, left: -15 }}
      />
    </View>
  );
}

export function GestureBasedPicker() {
  return (
    <CenterScreen>
      <Toolbar />
    </CenterScreen>
  );
}
