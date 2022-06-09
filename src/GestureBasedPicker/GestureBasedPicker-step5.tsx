import React from "react";
import Icon from "@expo/vector-icons/MaterialIcons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { View } from "react-native";
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
  const scale = useSharedValue(1);

  const tap = Gesture.Tap().onEnd(() => {
    console.log("Nothing yet");
  });

  const longPress = Gesture.Tap()
    .maxDuration(1e8)
    .onBegin(() => {
      scale.value = withDelay(
        50,
        withTiming(3, { duration: 2000 }, () => {
          scale.value = withSpring(1);
        })
      );
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
    });

  const styles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      zIndex: scale.value > 1 ? 100 : 1,
    };
  });

  return (
    <GestureDetector gesture={Gesture.Exclusive(tap, longPress)}>
      <AnimatedIcon name={iconName} size={WIDTH} color={color} style={styles} />
    </GestureDetector>
  );
}

function snapPoint(x: number, vx: number) {
  "worklet";
  const tossX = x + vx * 0.1;
  const position = Math.max(
    -STICKERS_COUNT + 1,
    Math.min(0, Math.round(tossX / WIDTH))
  );

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
    .onEnd((e) => {
      offsetY.value = withSpring(snapPoint(offsetY.value, e.velocityX), {
        velocity: e.velocityX,
      });
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
