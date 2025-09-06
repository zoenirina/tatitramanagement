import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

type Props = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  name?: string;
  className?: string;
} & TextInputProps;

const Input: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  className = '',
  ...props
}) => {
  return (
    <View className="w-full">
      {label && (
        <Text className="mb-2 text-sm font-medium text-neutral-900">
          {label}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className={`bg-white px-4 py-4 rounded-xl border border-gray-200 text-gray-900 text-sm w-full ${className}`}
        {...props}
      />
      {error && (
        <Text className="text-red-500 text-xs mt-1">{error}</Text>
      )}
    </View>
  );
};

export default Input;
