import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import {
  LinearGradient,
  LinearGradientProps,
} from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

// Typage correct du composant animé
const AnimatedLinearGradient = Animated.createAnimatedComponent(
  LinearGradient as React.ComponentType<LinearGradientProps>
);

const AnimatedBorderIcon: React.FC = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 4000 }), -1, true);
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [-50, 50]);
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.borderWrapper}>
        <AnimatedLinearGradient
          colors={['#8F8EF9', '#FBA6FA', '#6F48FF', '#FBA6FA', '#706EFD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.animatedBorder, animatedStyle]}
        />
        <View style={styles.innerBox}>
          <Feather name="zap" size={18} color="#6F48FF" />
        </View>
      </View>
    </View>
  );
};

export default AnimatedBorderIcon;

const BORDER_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderWrapper: {
    width: BORDER_SIZE,
    height: BORDER_SIZE,
    borderRadius: BORDER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  animatedBorder: {
    position: 'absolute',
    top: 0,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    zIndex: -1,
  },
  innerBox: {
    width: BORDER_SIZE - 6,
    height: BORDER_SIZE - 6,
    backgroundColor: '#ffffff',
    borderRadius: (BORDER_SIZE - 6) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
