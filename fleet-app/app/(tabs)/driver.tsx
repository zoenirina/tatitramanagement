import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import Header from '../../components/common/Header'
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Driver as DriverEntity, useGetDriversQuery } from '@/store/services/driverApi';


const UserListItem = ({ driver }: { driver: DriverEntity }) => (
  <View className="flex-col bg-white rounded-lg p-4 mb-3 shadow-md">
    <View className="flex flex-row justify-between">
      <View className="flex-row items-center gap-x-2">
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          className="w-12 h-12 rounded-full"
        />
        <View className="flex-col items-start">
          <Text className="text-lg font-bold text-neutral-900">
            {driver.firstName} {driver.lastName ?? ''}
          </Text>
          <View className="flex-row items-center mt-1">
            <View
              className={`w-2 h-2 rounded-full mr-2 ${
                driver.status === 'ACTIF'
                  ? 'bg-green-500'
                  : driver.status === 'SUSPENDU'
                  ? 'bg-yellow-500'
                  : 'bg-gray-400'
              }`}
            />
            <Text
              className={`text-sm ${
                driver.status === 'ACTIF'
                  ? 'text-green-700'
                  : driver.status === 'SUSPENDU'
                  ? 'text-yellow-600'
                  : 'text-gray-500'
              }`}
            >
              {driver.status}
            </Text>
          </View>
        </View>
      </View>
      <Feather name="chevron-right" size={24} color="#D1D5DB" />
    </View>

    <View className="flex-row justify-around mt-3 bg-neutral-100 rounded-xl p-4">
      <View className="flex-col items-center">
        <Feather name="voicemail" size={16} color="#111827" />
        <Text className="ml-2 text-sm text-neutral-900">{driver.phone}</Text>
      </View>
      <View className="h-6 w-[1px] bg-neutral-300"></View>
      <View className="flex-col items-center">
        <Feather name="dollar-sign" size={16} color="#111827" />
        <Text className="ml-2 text-sm text-neutral-900">
          {driver.amountDue === 0 ? 'En règle' : `${driver.amountDue} AR`}
        </Text>
      </View>
      <View className="h-6 w-[1px] bg-neutral-300"></View>
      <View className="flex-col items-center">
        <Feather name="x-circle" size={16} color="#C4CAD8" />
        <Text className="ml-2 text-sm text-[#C4CAD8]">
          {driver.email ?? 'Aucun'}
        </Text>
      </View>
    </View>
  </View>
);


export default function Driver() {
  const navigation = useNavigation<any>();
  const { data: drivers, isLoading, error } = useGetDriversQuery();

  return (
    <View className="flex-1 bg-neutral-100">
      <Header title="Liste Chauffeurs" />

      <TouchableOpacity
        className="border border-dashed border-neutral-300 bg-[#FBFBFB] px-6 py-3 rounded-lg mx-4 my-2 flex-row  justify-center gap-2 items-center"
        onPress={() => navigation.navigate('driver/add')}
      >
        <Feather name='plus-circle' size={20} color="#404040"></Feather>
        <Text className="text-neutral-900 text-center">Ajouter un chauffeur</Text>
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator className="mt-8" size="large" color="#8B5CF6" />
        // <Text className="text-center mt-4">Chargement...</Text>
      ) : error ? (
        <Text className="text-center mt-4 text-red-500">
          Erreur lors du chargement
        </Text>
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 16 }}
          data={drivers}
          keyExtractor={(item) => item.driverId.toString()}
          renderItem={({ item }) => <UserListItem driver={item} />}
        />
      )}
    </View>
  );
}


// // screens/DriversScreen.tsx
// import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
// import Header from '../../components/common/Header'
// import BottomTab from '../../components/common/BottomTab'
// import Feather from '@expo/vector-icons/Feather';
// import { useNavigation } from '@react-navigation/native';

  

// const data = [
//   { id: '1', name: 'Angelo Micka', phone: '034 01 557 78', status: 'Actif' },
//   { id: '2', name: 'Toky', phone: '034 01 557 78', status: 'Actif' },
// ]

// const UserListItem = () => (
//   <View className="flex-col  bg-white rounded-lg p-4 mb-3 shadow-md">
//     <View className="flex flex-row justify-between">
//         <View className="flex-row items- gap-x-2">
//             <Image
//             source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
//             className="w-12 h-12 rounded-full"
//             />
//             <View className="flex-col items-start">
//                 <Text className="text-lg font-bold text-neutral-800">Angelo Micka</Text>
//                 <View className="flex-row items-center mt-1">
//                     <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
//                 <Text className="text-sm text-green-700">Actif</Text>
//             </View>
//             </View>
//         </View>       
//         <Feather name="chevron-right" size={24} color="#D1D5DB" />
//     </View>
      
//       <View className="flex-row justify-around mt-3   bg-neutral-100 rounded-xl p-4">
//         <View className="flex-col items-center">
//           <Feather name="voicemail" size={16} color="#111827" />
//           <Text className="ml-2 text-sm text-neutral-900">034 01 557 78</Text>
//         </View>
//         <View className="h-6 w-[1px] bg-neutral-300"></View>
//         <View className="flex-col items-center">
//           <Feather name="dollar-sign" size={16} color="#111827" />
//           <Text className="ml-2 text-sm text-neutral-900">En règle</Text>
//         </View>
//         <View className="h-6 w-[1px] bg-neutral-300"></View>
//         <View className="flex-col items-center">
//           <Feather name="x-circle" size={16} color="#C4CAD8" />
//           <Text className="ml-2 text-sm text-[#C4CAD8]">Aucun</Text>
//         </View>
//       </View>
    
//   </View>
// );

// export default function Driver() {
//     const navigation = useNavigation<any>(); 
//   return (
//     <View className="flex-1 bg-neutral-100">
//       <Header title="Liste Chauffeurs" />
//       <TouchableOpacity
//         className="bg-indigo-600 px-6 py-3 rounded-lg"
//         onPress={() => navigation.navigate('driver/add')} 
//       >
//         <Text className="text-white">Aller au profil</Text>
//       </TouchableOpacity>
//       <FlatList
//         contentContainerStyle={{ padding: 16 }}
//         data={data}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//             <UserListItem />
//         )}
//       />
//     </View>
//   );
// }
