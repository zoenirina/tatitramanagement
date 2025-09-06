import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
  Extrapolate,
  useAnimatedStyle
} from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
// import TextButton from './components/TextButton';
// import CoinLabel from './components/CoinLabel';
import { TouchableOpacity } from 'react-native';
import { GestureResponderEvent } from 'react-native';

const HEADER_HEIGHT = 250;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const { width } = Dimensions.get('window');

const Profile: React.FC = () => {
  const scrollY = useSharedValue(0);
  const cartQuantity = 3;

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    }
  });

  // 👤 Profile section disappears on scroll
  const profileAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 80], [1, 0], Extrapolate.CLAMP),
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, 100], [0, -50], Extrapolate.CLAMP),
      },
    ],
  }));

  // 🪙 Coin section moves up to top
  const coinsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, 100], [0, -130], Extrapolate.CLAMP),
      }
    ],
  }));

  // 📦 Header height shrinks slightly (optional)
  const headerBackgroundAnimatedStyle = useAnimatedStyle(() => ({
    height: interpolate(scrollY.value, [0, 100], [HEADER_HEIGHT, 230], Extrapolate.CLAMP)
  }));

  const renderHeader = () => (
    <Animated.View
      style={[
        styles.header,
        headerBackgroundAnimatedStyle
      ]}
    />
  );

  const renderProfile = () => (
    <Animated.View
      style={[
        styles.profileContainer,
        profileAnimatedStyle
      ]}
    >
      <Image
        source={{ uri: 'https://placekitten.com/100/100' }}
        style={styles.profileImage}
      />
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.profileName}>Hello, John Doe</Text>
        <Text style={styles.profileSubText}>You have {cartQuantity} items in cart</Text>
      </View>
    </Animated.View>
  );

  const renderCoins = () => (
    <Animated.View style={[styles.coinBoxWrapper, coinsAnimatedStyle]}>
      <View style={styles.coinBox}>
        <CoinLabel label="Coins" value={5000} />
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderProfile()}
      {renderCoins()}

      <AnimatedScrollView
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={onScroll}
      >
        <TextButton label="Social Network Connection" onPress={() => {}} />
        <TextButton label="Promotion Code" onPress={() => {}} />
        <TextButton label="Bonus Gift" onPress={() => {}} />
        <TextButton label="Order Management" onPress={() => {}} />
        <TextButton label="Your Widget" onPress={() => {}} />
        <TextButton label="Recently Viewed Products" onPress={() => {}} />
        <TextButton label="Logout" onPress={() => {}} />
      </AnimatedScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0'
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#6C63FF',
    zIndex: 1
  },
  profileContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 3
  },
  profileImage: {
    height: 68,
    width: 68,
    borderRadius: 34,
    backgroundColor: '#FFF'
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  profileSubText: {
    color: '#888',
    fontSize: 14
  },
      button: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
    elevation: 2
  },
  label: {
    fontSize: 16,
    color: '#333'
  },
  coinBoxWrapper: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20,
    zIndex: 2
  },
  coinBox: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5
  },
  scrollContent: {
    marginTop: HEADER_HEIGHT,
    paddingHorizontal: 20,
    paddingBottom: 200
  }
});

export default Profile;

// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   GestureResponderEvent
// } from 'react-native';
// import Animated, {
//   useAnimatedScrollHandler,
//   useSharedValue,
//   interpolate,
//   Extrapolate,
//   useAnimatedStyle
// } from 'react-native-reanimated';
// // import TextButton from './components/TextButton';
// // import CoinLabel from './components/CoinLabel';


type Props = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
};

const TextButton: React.FC<Props> = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

// // const styles = StyleSheet.create({

// // });

// const HEADER_HEIGHT = 250;
// const { width } = Dimensions.get('window');
// const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

// export default function Profile() {
//   const scrollY = useSharedValue(0);
//   const cartQuantity = 3;

//   const onScroll = useAnimatedScrollHandler((event) => {
//     scrollY.value = event.contentOffset.y;
//   });

//   const headerBackgroundAnimatedStyle = useAnimatedStyle(() => {
//     return {
//       height: interpolate(
//         scrollY.value,
//         [0, 100],
//         [HEADER_HEIGHT, 230],
//         Extrapolate.CLAMP
//       )
//     };
//   });

//   const profileAnimatedStyle = useAnimatedStyle(() => {
//     return {
//       opacity: interpolate(scrollY.value, [80, 0], [0, 1], Extrapolate.CLAMP)
//     };
//   });

//   const coinsAnimatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateY: interpolate(scrollY.value, [0, 100], [0, -90], Extrapolate.CLAMP)
//         }
//       ]
//     };
//   });

//   function renderHeader() {
//     return (
//       <Animated.View
//         style={[
//           {
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             backgroundColor: '#6C63FF',
//             zIndex: 1
//           },
//           headerBackgroundAnimatedStyle
//         ]}
//       />
//     );
//   }

//   function renderProfile() {
//     return (
//       <Animated.View
//         style={[
//           {
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginTop: 16,
//             marginHorizontal: 20
//           },
//           profileAnimatedStyle
//         ]}
//       >
//         <Image
//           source={{ uri: 'https://placekitten.com/100/100' }}
//           style={{
//             height: 68,
//             width: 68,
//             borderRadius: 34,
//             backgroundColor: '#FFF'
//           }}
//         />
//         <View style={{ marginLeft: 12 }}>
//           <Text>Hello, John Doe</Text>
//           <Text style={{ color: '#888' }}>
//             You have {cartQuantity} items in cart
//           </Text>
//         </View>
//       </Animated.View>
//     );
//   }

//   function renderCoins() {
//     return (
//       <Animated.View
//         style={[
//           {
//             position: 'absolute',
//             top: 170,
//             left: 20,
//             right: 20
//           },
//           coinsAnimatedStyle
//         ]}
//       >
//         <View style={styles.coinBox}>
//           <CoinLabel label="Coins" value={5000} />
//         </View>
//       </Animated.View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {renderHeader()}
//       {renderProfile()}
//       {renderCoins()}

//       <AnimatedScrollView
//         contentContainerStyle={{
//           marginTop: HEADER_HEIGHT,
//           paddingHorizontal: 20,
//           paddingBottom: 170
//         }}
//         scrollEventThrottle={16}
//         onScroll={onScroll}
//       >
//         <TextButton label="Option Section 1" onPress={() => {}} />
//         <TextButton label="Option Section 2" onPress={() => {}} />
//         <TextButton label="Logout" onPress={() => {}} /> <TextButton label="Option Section 1" onPress={() => {}} />
//         <TextButton label="Option Section 2" onPress={() => {}} />
//         <TextButton label="Logout" onPress={() => {}} /> <TextButton label="Option Section 1" onPress={() => {}} />
//         <TextButton label="Option Section 2" onPress={() => {}} />
//         <TextButton label="Logout" onPress={() => {}} /> <TextButton label="Option Section 1" onPress={() => {}} />
//         <TextButton label="Option Section 2" onPress={() => {}} />
//         <TextButton label="Logout" onPress={() => {}} /> <TextButton label="Option Section 1" onPress={() => {}} />
//         <TextButton label="Option Section 2" onPress={() => {}} />
//         <TextButton label="Logout" onPress={() => {}} />
//       </AnimatedScrollView>
//     </View>
//   );
// }

type Props2 = {
  label: string;
  value: number;
};

const CoinLabel: React.FC<Props2> = ({ label, value }) => {
  return (
    <View>
      <Text style={{fontSize: 14,
    color: '#666'}}>{label}</Text>
      <Text style={{
        fontSize: 20,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginTop: 4
      }}>{value}</Text>
    </View>
  );
};



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F0F0F0'
//   },
//   coinBox: {
//     backgroundColor: '#FFF',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     elevation: 5
//   },
//     button: {
//     backgroundColor: '#ffffff',
//     padding: 16,
//     borderRadius: 12,
//     marginVertical: 8,
//     alignItems: 'center',
//     elevation: 2
//   },
//   label: {
//     fontSize: 16,
//     color: '#333'
//   }
// });
