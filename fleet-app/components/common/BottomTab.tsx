import { View, TouchableOpacity, Text } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

type TabItem = {
  name: string;
  icon: keyof typeof Feather.glyphMap;
  route: string;
};

const tabs: TabItem[] = [
  { name: 'Accueil', icon: 'home', route: 'index' },
  { name: 'Véhicule', icon: 'truck', route: 'vehicle' },
  { name: 'Chauffeur', icon: 'user', route: 'driver' },
  { name: 'Versement', icon: 'bar-chart', route: 'deposit' },
  { name: 'Plus', icon: 'more-horizontal', route: 'explore' },
];

export default function BottomTab({ state, navigation }: BottomTabBarProps) {
  return (
    <View className="flex-row justify-around items-center pb-8 bg-white border-t border-neutral-200 ">
      {tabs.map((tab, i) => {
        const isActive = state.index === i;

        return (
          <TouchableOpacity
            key={i}
            className={`items-center pt-3 border-t-2 ${
              isActive ? 'border-t-[#6f48ff]' : 'border-t-transparent'
            }`}
            onPress={() => navigation.navigate(tab.route)}
          >
            <Feather
              name={tab.icon}
              size={20}
              color={isActive ? '#6f48ff' : '#999'}
            />
            <Text className={`text-xs ${isActive ? 'text-brand-primary-700' : 'text-gray-500'}`}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
