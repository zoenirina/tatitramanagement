import React from 'react';
import { View, Text } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

interface StatusAmountProps {
  amount: number;
  status: 'up' | 'down';
}

export default function StatusAmount({ amount, status }: StatusAmountProps) {
  // Si amount est 0 ou inférieur → on force le statut à "down"
  const isDown = status === 'down' || amount <= 0;
  const isUp = !isDown;

  const iconName = isUp ? 'arrow-up' : 'arrow-down';
  const iconColor = isUp ? '#16a34a' : '#dc2626'; // green-600 or red-600
  const bgColor = isUp ? 'bg-green-50' : 'bg-red-50';
  const textColor = isUp ? 'text-neutral-900' : 'text-red-600';

  return (
    <View className="flex-row items-center">
      <View className={`${bgColor} p-0.5 rounded-full mr-1 flex-row justify-center items-center`}>
        <Feather name={iconName} size={14} color={iconColor} />
      </View>
      <Text className={`ml-1 text-base font-bold ${textColor}`}>{amount} AR</Text>
    </View>
  );
}

