import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type RadioButtonProps = {
  label: string;
  description?: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  description,
  value,
  selected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
  onPress={() => onSelect(value)}
  className="flex-row items-center p-3 rounded-xl mb-2 border border-neutral-200 bg-white"
>
  <View className="items-center justify-center">
    <View
      className={`h-7 w-7  items-center justify-center ${
        selected ? 'bg-brand-primary-500/20 rounded-full ' : 'bg-transparent'
      }`}
    >
      <View
        className={`h-5 w-5 rounded-full border-2 ${
          selected ? 'border-brand-primary-500' : 'border-gray-300'
        } bg-white items-center justify-center`}
      >
        {selected && (
          <View className="h-2.5 w-2.5 rounded-full bg-brand-primary-500" />
        )}
      </View>
    </View>
  </View>

  <View className="ml-3 flex-1">
    <Text className="text-sm font-semibold text-gray-900">{label}</Text>
    {description && (
      <Text className="text-xs text-gray-500 mt-1">{description}</Text>
    )}
  </View>
</TouchableOpacity>

  );
};

export default RadioButton;
