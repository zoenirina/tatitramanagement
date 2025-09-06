import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Text } from 'react-native';

type Props = {
  message?: string;
};

const ErrorMessage: React.FC<Props> = ({ message }) => {
  if (!message) return null;

  return (
    <Text className="text-red-500 text-xs mt-1 flex items-center gap-1.5">
      <Feather name="info" size={14} color="#ef4444" />
      {message}
    </Text>
  );
};

export default ErrorMessage;
