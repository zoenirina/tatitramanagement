import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

type ActionButtonProps = {
  label: string;
  icon: string;
  onPress?: () => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({ label, icon, onPress }) => {
  return (
    <TouchableOpacity className="items-center" onPress={onPress}>
      <View className="bg-[#6C4DD2] p-2.5 rounded-full shadow-inner">
        <Feather name={icon as any} size={20} color="white" />
      </View>
      <Text className="mt-1 text-sm text-gray-800">{label}</Text>
    </TouchableOpacity>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//   },
//   iconWrapper: {
//     backgroundColor: '#6C4DD2',
//     padding: 15,
//     borderRadius: 25,
//   },
//   label: {
//     marginTop: 5,
//     color: '#333',
//     fontSize: 14,
//   },
// });

export default ActionButton;
