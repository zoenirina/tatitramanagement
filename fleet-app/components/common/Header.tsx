// components/Header.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function Header({ title }: { title: string }) {
  return (
    <View className='bg-white shadow-sm z-10 px-4 pt-12 pb-4 border-b border-b-neutral-200'>
        <View className=" flex-row justify-between items-center ">
            <TouchableOpacity>
                <Feather name="menu" size={24} color="#333" />
            </TouchableOpacity>
            <Text className="text-lg font-semibold text-gray-800">{title}</Text>
            <View className="flex-row items-center gap-x-4 border rounded-full border-neutral-300 p-2">
                <Feather name="search" size={20} color="#333" />
            </View>
            </View>

            <View className="flex flex-row justify-between mt-6 w-full">
                <TouchableOpacity className="bg-brand-primary-500 rounded-full px-6 py-2">
                <Text className="text-white font-semibold">Actif</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-6 py-2">
                <Text className="text-neutral-500 font-semibold">Inactif</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-6 py-2">
                <Text className="text-neutral-500 font-semibold">Tous</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row justify-end items-center px-4 py-2">
                <Feather name="sliders" size={20} color="#6B7280" />
                <Text className="ml-1 text-gray-600">Filtre</Text>
                </TouchableOpacity>
            </View>
    </View>
  
  );
}
