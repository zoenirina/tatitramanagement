import { View, Text, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

type Props = {
  title: string;
  colored?: boolean;
  onConfirm?: () => void; // fonction à appeler quand on clique sur check
};

export default function HeaderBack({ title, colored = false, onConfirm }: Props) {
  const navigation = useNavigation();

  return (
    <View className={`${colored ? 'bg-brand-primary-500' : 'bg-white'} shadow z-10 px-4 pt-12 pb-4 border-b border-b-neutral-200`}>
      <View className="flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className={`p-2 rounded-full ${colored ? 'bg-brand-primary-700' : 'bg-pri-neutral-100'}`}
        >
          <Feather name="x" size={24} color={colored ? '#fff' : '#333'} />
        </TouchableOpacity>

        <Text className={`${colored ? 'text-white' : 'text-gray-800'} text-xl font-semibold`}>
          {title}
        </Text>

        <TouchableOpacity
          onPress={onConfirm}
          className={`p-2 rounded-full ${colored ? 'bg-brand-primary-300' : 'bg-brand-primary-50'}`}
        >
          <Feather name="check" size={20} color={colored ? '#fff' : '#6F48FF'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
