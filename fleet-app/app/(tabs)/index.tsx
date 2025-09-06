import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  GestureResponderEvent,
  ScrollView
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
  useAnimatedStyle
} from 'react-native-reanimated';

import Feather from '@expo/vector-icons/Feather'; // ou Ionicons, etc.
import RemixIcon from 'react-native-remix-icon';
import ActionButton from '@/components/ui/ActionButton';
import { useNavigation } from 'expo-router';
import AnimatedBorderIcon from '@/components/ui/AnimatedBorderIcon';
import { expenses } from '../data/transaction';

type Expense = {
  id: string;
  title: string;
  type: string;
  date: string;
  amount: string;
  status: 'Approved' | 'Pending Approval' | 'Draft';
  icon: string;
  iconColor: string;
};

// Composant pour afficher le badge de statut
function StatusBadge({ status }: { status: Expense['status'] }) {
  const styleMap = {
    Approved: 'bg-green-100 text-green-600',
    'Pending Approval': 'bg-yellow-100 text-yellow-600',
    Draft: 'bg-neutral-100 text-neutral-500',
  };

  const style = styleMap[status] || 'bg-neutral-100 text-neutral-500';

  return (
    <View className={`px-2 py-0.5 rounded-full mt-1 ${style}`}>
      <Text className={`text-sm font-medium ${style}`}>{status}</Text>
    </View>
  );
}

// Composant réutilisable pour une dépense
function ExpenseItem({
  title,
  date,
  amount,
  status,
  type,
  icon,
  iconColor,
}: Expense) {
  return (
    <View className="flex-row items-center py-3 border-b border-neutral-100">
      {/* Icône catégorie */}
      <View
        className="size-12 rounded-full items-center justify-center mr-3 bg-neutral-100 border border-neutral-200"
        // style={{ backgroundColor: iconColor + '20' }}
      >
        <RemixIcon name={icon} size={22} color={iconColor} />
      </View>

      <View className="flex-1">
        <Text className="text-base font-medium text-neutral-900">{title}</Text>
        <View className="flex-row items-center space-x-1 mt-0.5">
          <RemixIcon name="calendar-2-line" size={14} color="#9CA3AF" />
          <Text className="text-sm text-neutral-500 ml-1 mr-2">{date}</Text>
          <RemixIcon name="exchange-funds-line" size={14} color="#9CA3AF" />
          <Text className="text-sm text-neutral-500 ml-1">{type}</Text>
        </View>
      </View>

      <View className="items-end">
        <Text className="text-base font-bold text-neutral-800">{amount}</Text>
        <StatusBadge status={status} />
      </View>
    </View>
  );
}

export function ExpenseScreen() {


    const navigation = useNavigation<any>();
  

  return (
    <View className="flex-1  pt-16">
       <View className="rounded-xl before:bg-indigo-400/60 overflow-hidden bg-brand-primary-300">
  <View className="absolute inset-0 z-0" />

  <View className=" p-5 flex-row items-center gap-x-2">
    <AnimatedBorderIcon></AnimatedBorderIcon>
    <View className="flex-1">
      <Text className="text-brand-primary-50 font-semibold">
        Great job Rahul! You've saved 20% more than last month.
      </Text>
    </View>
    <Feather name="arrow-right" size={20} color="white" className="ml-auto" />
  </View>
</View>

<View className="flex-row justify-between mt-8 gap-x-2">
        <View className=" bg-[#FDFAF0] rounded-lg p-4 space-y-2 flex-1 gap-y-1 ">
          <Text className="text-neutral-900/60">Dépense</Text>
          <Text className="text-neutral-900 text-2xl font-bold">$24,589</Text>
          <Text className="text-xs text-neutral-900/60"><Feather name='trending-down' size={18} color={"#ff6464"} /> 13.39% in this month</Text>
        </View>

        <View className="bg-brand-primary-50 backdrop-blur-md backdrop-filter rounded-lg p-4 gap-y-1 flex-1">
          <Text className="text-neutral-900/60">Vesement</Text>
          <Text className="text-neutral-900 text-2xl font-bold">$40,432</Text>
          <Text className="text-xs text-neutral-900/60"><Feather name='trending-up' size={18} color={"#00FF8F"} /> 5.22% in this month</Text>
        </View>
      </View>


      <TouchableOpacity
        className="border w-full border-dashed border-neutral-300 bg-[#FBFBFB] px-6 py-3 rounded-lg my-2 flex-row  justify-center gap-2 items-center"
        onPress={() => navigation.navigate('draft')}
      >
        <Feather name='plus-circle' size={20} color="#4F2FC5"></Feather>
        <Text className="text-brand-primary-700 text-center">Ajouter un chauffeur</Text>
      </TouchableOpacity>

       <TouchableOpacity
        className="border w-full border-dashed border-neutral-300 bg-[#FBFBFB] px-6 py-3 rounded-lg my-2 flex-row  justify-center gap-2 items-center"
        onPress={() => navigation.navigate('transaction/detail')}
      >
        <Feather name='plus-circle' size={20} color="#4F2FC5"></Feather>
        <Text className="text-brand-primary-700 text-center">Créer </Text>
      </TouchableOpacity>

      <Text className="text-xl font-bold text-neutral-900 mb-4">Transactions</Text>
      {expenses.map((item) => (
        <ExpenseItem key={item.id} {...item} />
      ))}
    </View>
  );
}

const HEADER_HEIGHT = 250;
const HEADER_MIN_HEIGHT = 180; // hauteur finale visible (menu + coin)



const renderHeaderTopBar = () => (
  <View style={styles.headerTopBar}>
    <TouchableOpacity>
      <Feather name="menu" size={24} color="white" />
    </TouchableOpacity>
    <TouchableOpacity>
      <Feather name="bell" size={24} color="white" />
    </TouchableOpacity>
  </View>
);

// const HEADER_HEIGHT = 250;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const { width } = Dimensions.get('window');

// Composant TextButton
type Props = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
};

const TextButton: React.FC<Props> = ({ label, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

// Composant CoinLabel
type Props2 = {
  label: string;
  value: number;
};

const CoinLabel: React.FC<Props2> = ({ label, value }) => (
  <View>
    <Text style={{ fontSize: 14, color: '#666' }}>{label}</Text>
    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6C63FF', marginTop: 4 }}>{value}</Text>
  </View>
);

const ProfileScreen: React.FC = () => {
  const scrollY = useSharedValue(0);
  const cartQuantity = 3;

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    }
  });

  const profileAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 80], [1, 0], 'clamp'),
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, 100], [0, -50], 'clamp'),
      },
    ],
  }));

  const coinsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, 120], [0, -120], 'clamp'),
      }
    ],
  }));

  const headerBackgroundAnimatedStyle = useAnimatedStyle(() => ({
  height: interpolate(scrollY.value, [0, 100], [HEADER_HEIGHT, HEADER_MIN_HEIGHT], 'clamp')
}));

  const renderHeader = () => (
    <Animated.View style={[styles.header, headerBackgroundAnimatedStyle]} />
  );

  const renderProfile = () => (
    <Animated.View style={[styles.profileContainer, profileAnimatedStyle]}>
      <View className="flex-col ">
        <Text className="text-neutral-200 ">Total Balance</Text>
      <Text className="text-brand-primary-50 mt-3 text-4xl font-bold">Ar 500,489</Text>
      </View>
    </Animated.View>
  );

  const renderCoins = () => (
    <Animated.View style={[styles.coinBoxWrapper, coinsAnimatedStyle]}>
      <View style={styles.coinBox}>
         <View className="flex-row justify-around w-full">
    { [
  { label: 'Verser', icon: 'arrow-up-right' },
  { label: 'Dépenser', icon: 'arrow-down-left' },
  { label: 'Rapport', icon: 'repeat' },
  { label: 'Stats', icon: 'bar-chart' },
].map((action, index) => (
      <ActionButton key={index} {...action} />
    ))}
  </View>
      </View>
    </Animated.View>
  );

   
  return (
    <View style={styles.container}>
      {renderHeader()}
        {renderHeaderTopBar()}
      {renderProfile()}
      {renderCoins()}

      <AnimatedScrollView
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={onScroll}
      >

        <ExpenseScreen/>
        {/* <TextButton label="Social Network Connection" onPress={() => {}} />
        <TextButton label="Promotion Code" onPress={() => {}} />
        <TextButton label="Bonus Gift" onPress={() => {}} />
        <TextButton label="Order Management" onPress={() => {}} />
        <TextButton label="Your Widget" onPress={() => {}} />
        <TextButton label="Recently Viewed Products" onPress={() => {}} />
        <TextButton label="Logout" onPress={() => {}} />  <TextButton label="Bonus Gift" onPress={() => {}} />
        <TextButton label="Order Management" onPress={() => {}} />
        <TextButton label="Your Widget" onPress={() => {}} />
        <TextButton label="Recently Viewed Products" onPress={() => {}} />
        <TextButton label="Logout" onPress={() => {}} />  <TextButton label="Bonus Gift" onPress={() => {}} />
        <TextButton label="Order Management" onPress={() => {}} />
        <TextButton label="Your Widget" onPress={() => {}} />
        <TextButton label="Recently Viewed Products" onPress={() => {}} />
        <TextButton label="Logout" onPress={() => {}} /> */}
      </AnimatedScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#120E33',
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
  headerTopBar: {
  position: 'absolute',
  top: 40,
  left: 20,
  right: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 4 // au-dessus du header background
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
    top: 200,
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
    paddingBottom: 280
  }
});
