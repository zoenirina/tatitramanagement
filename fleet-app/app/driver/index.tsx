// screens/DriversScreen.tsx
import { View, Text, FlatList, Image } from 'react-native'
import Header from '../../components/common/Header'
import BottomTab from '../../components/common/BottomTab'
import Feather from '@expo/vector-icons/Feather';

const data = [
  { id: '1', name: 'Angelo Micka', phone: '034 01 557 78', status: 'Actif' },
  { id: '2', name: 'Toky', phone: '034 01 557 78', status: 'Actif' },
]

const UserListItem = () => (
  <View className="flex-col  bg-white rounded-lg p-4 mb-3 shadow-md">
    <View className="flex flex-row justify-between">
        <View className="flex-row items- gap-x-2">
            <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            className="w-12 h-12 rounded-full"
            />
            <View className="flex-col items-start">
                <Text className="text-lg font-bold text-gray-800">Angelo Micka</Text>
                <View className="flex-row items-center mt-1">
                    <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                <Text className="text-sm text-green-700">Actif</Text>
            </View>
            </View>
        </View>
      
        
        <Feather name="chevron-right" size={24} color="#D1D5DB" />
    </View>
    
    {/* <View className="flex-1"> */}
      
      <View className="flex-row justify-around mt-3   bg-neutral-100 rounded-lg p-4">
        <View className="flex-col items-center">
          <Feather name="voicemail" size={16} color="#4B5563" />
          <Text className="ml-2 text-sm text-gray-600">034 01 557 78</Text>
        </View>
        <View className="flex-col items-center">
          <Feather name="dollar-sign" size={16} color="#4B5563" />
          <Text className="ml-2 text-sm text-gray-600">En règle</Text>
        </View>
        <View className="flex-col items-center">
          <Feather name="x-circle" size={16} color="#4B5563" />
          <Text className="ml-2 text-sm text-gray-600">Aucun</Text>
        </View>
      </View>
    {/* </View> */}
    
  </View>
);

export default function Driver() {
  return (
    <View className="flex-1 bg-neutral-100">
      <Header title="Liste Chauffeurs" />
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <UserListItem />
        //   <View className="bg-white p-4 rounded-xl mb-3 flex-row items-center gap-x-4">
        //     <Image
        //       source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
        //       className="w-12 h-12 rounded-full"
        //     />
        //     <View className="flex-1">
        //       <Text className="font-semibold">{item.name}</Text>
        //       <Text className="text-gray-500 text-xs">{item.phone}</Text>
        //     </View>
        //     <Text className="text-green-600 text-xs">{item.status}</Text>
        //   </View>
        )}
      />

      {/* <UserListItem /> */}
      <BottomTab active="Chauffeur" />
    </View>
  );
}
