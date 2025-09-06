// screens/VehiclesScreen.tsx
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../../components/common/Header';
import { useGetVehiclesQuery, Vehicle } from '../../store/services/vehicleApi';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const VehicleListItem = ({
  item,
}: {
  item: Vehicle ;
}) => (
  <View className="flex-row items-center bg-white rounded-lg p-4 mb-3 shadow-md">
    <View className="flex-1">
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center">
          <View className="bg-brand-primary-500 p-2 rounded-full mr-4 flex-row justify-center items-center">
            <Feather name="truck" size={20} color="#ffffff" />
          </View>
          <View className="flex-col items-start justify-center">
            <Text className="text-lg font-bold text-neutral-900">{item.brand}</Text>
            <Text className="text-sm text-neutral-700">{item.owner?.name}</Text>
          </View>
        </View>
        <Text className="text-sm font-semibold text-neutral-900">{item.plateNumber}</Text>
      </View>

      <View className="flex-row items-center justify-between mt-2">
        <View className="flex-row items-center">
          <View
            className={`w-2 h-2 rounded-full ${
              status === 'En service' ? 'bg-green-500' : 'bg-yellow-500'
            } mr-2`}
          />
          <Text className="text-sm text-neutral-700">{item.status}</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-purple-600 font-semibold">Détail</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default function VehiclesScreen() {
    const navigation = useNavigation<any>();
  
  const { data: vehicles, isLoading, error } = useGetVehiclesQuery();

  return (
    <View className="flex-1 bg-neutral-100">
      <Header title="Liste Véhicules" />
            <TouchableOpacity
        className="border border-dashed border-neutral-300 bg-[#FBFBFB] px-6 py-3 rounded-lg mx-4 my-2 flex-row  justify-center gap-2 items-center"
        onPress={() => navigation.navigate('vehicle/add')}
      >
        <Feather name='plus-circle' size={20} color="#404040"></Feather>
        <Text className="text-neutral-900 text-center">Ajouter un chauffeur</Text>
      </TouchableOpacity>
      {isLoading ? (
        <ActivityIndicator className="mt-8" size="large" color="#8B5CF6" />
      ) : error ? (
        <Text className="text-center mt-8 text-red-500">Erreur de chargement</Text>
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 16 }}
          data={vehicles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <VehicleListItem item={item} />
          )}
        />
      )}
    </View>
  );
}

// // screens/VehiclesScreen.tsx
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import Header from '../../components/common/Header';
// import BottomTab from '../../components/common/BottomTab';
// import Feather from '@expo/vector-icons/Feather';

// const data = [
//   { id: '1', title: 'Fikirizana 12', status: 'En service' },
//   { id: '2', title: 'Fikirizana 13', status: 'En réparation' },
// ];

// const VehicleListItem = ({ status }: { status: 'En service' | 'En réparation' }) => (
//   <View className="flex-row items-center bg-white rounded-lg p-4 mb-3 shadow-md">

//     <View className="flex-1">
//        <View className="flex-row items-start justify-between ">
//  <View className="flex-row items-center ">
//     <View className="bg-purple-100 p-2 rounded-full mr-4 flex-row justify-center items-center ">
//       <Feather name="truck" size={20} color="#8B5CF6" />
//     </View> 
//     <View className="flex-col items-start justify-center">
//        <Text className="text-lg font-bold text-neutral-900">Fikirizana 12</Text>
//       <Text className="text-sm text-neutral-700">Rakotoveloson Dilan</Text>
//     </View>
//     </View>
//      <Text className="text-sm font-semibold text-neutral-900 ">#205632 FE</Text>
//        </View>
      
     
    
//     <View className="flex-row items-center justify-between mt-2">
//        <View className="flex-row items-center ">
//         <View className={`w-2 h-2 rounded-full ${status === 'En service' ? 'bg-green-500' : 'bg-yellow-500'} mr-2`} />
//         <Text className={`text-sm text-neutral-700`}>{status}</Text>
//       </View>
//       <TouchableOpacity>
//         <Text className="text-purple-600 font-semibold">Détail</Text>
//       </TouchableOpacity>
//     </View>
      
//     </View>
//   </View>
// );

// export default function VehiclesScreen() {
//   return (
//     <View className="flex-1 bg-neutral-100">
//       <Header title="Liste Véhicules" />
//       <FlatList
//         contentContainerStyle={{ padding: 16 }}
//         data={data}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//             <VehicleListItem status='En service'/>
//         )}
//       />
//     </View>
//   );
// }
