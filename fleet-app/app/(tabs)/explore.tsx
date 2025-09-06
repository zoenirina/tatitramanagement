import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { DepositItem } from '@/app/(tabs)/deposit';
export default function TabTwoScreen() {
     const deposits = [
    { vehicleName: 'Rakotonandrasana', depositStatus: 'paid', amount: 3000, time: '17:30' },
    { vehicleName: 'Rakotonandrasana', depositStatus: 'partial', amount: 7000, time: '17:30', commentCount: 1, owedAmount: 2000 },
    { vehicleName: 'Rakotonandrasana', depositStatus: 'paid', amount: 3000, time: '17:30' },
    { vehicleName: 'Rakotonandrasana', depositStatus: 'unpaid', amount: 0, time: '17:30', commentCount: 1 },
    { vehicleName: 'Rakotonandrasana', depositStatus: 'paid', amount: 3000, time: '17:30' },
    { vehicleName: 'Rakotonandrasana', depositStatus: 'paid', amount: 3000, time: '17:30' },
    { vehicleName: 'Rakotonandrasana', depositStatus: 'paid', amount: 3000, time: '17:30' },
  ];
  return (
    <View className="flex-1 bg-neutral-100">
     <View className="w-full bg-neutral-100 h-fit">
      <View className="flex-row items-center justify-between p-4 bg-white pt-14">
        <TouchableOpacity>
          <Feather name="menu" size={24} color="gray" />
        </TouchableOpacity>
        <View className="flex-row items-center gap-x-2">
          <TouchableOpacity>
            <Feather name="search" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity className="relative">
            <Feather name="bell" size={20} color="gray" />
            <View className="absolute top-0 right-0 w-2 h-2 bg-purple-500 rounded-full" />
          </TouchableOpacity>
          <Image
            source={{ uri: 'https://i.pravatar.cc/300?img=5' }}
            className="w-8 h-8 rounded-full"
          />
        </View>
      </View>

      <View className="px-4 pt-4 bg-white">
        <View className="flex-row items-center justify-between mb-6 bg-white p-3 rounded-lg shadow-sm">
          <View className="flex-row items-center">
            <View className="p-1.5 rounded-md bg-brand-primary-300">
            <Feather name="calendar" size={18} color="#F1EDFF" />
            </View>
            <Text className="ml-2 text-lg font-bold text-gray-800">Event Planning</Text>
            <Feather name="chevron-down" size={20} color="gray" className="ml-1" />
          </View>
          <TouchableOpacity className="flex-row items-center px-4 py-2 bg-brand-primary-500 rounded-lg">
            <Feather name="share-2" size={16} color="white" />
            <Text className="ml-2 text-white font-semibold">Share</Text>
          </TouchableOpacity>
        </View>

       
      </View>

       <View className="flex-row justify-around bg-white p-1 rounded-lg mb-6 shadow-sm ">
          <TouchableOpacity className="flex-row items-center flex-1 justify-center py-2">
            <Feather name="list" size={16} color="gray" />
            <Text className="ml-1 text-gray-600">List</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center flex-1 justify-center py-2">
            <Feather name="columns" size={16} color="gray" />
            <Text className="ml-1 text-gray-600">Board</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center flex-1 justify-center py-2 relative">
            <View className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-primary-500" />
            <Feather name="clock" size={16} color="#6F48FF" />
            <Text className="ml-1 text-brand-primary-700 font-semibold">Timeline</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center flex-1 justify-center py-2">
            <Feather name="calendar" size={16} color="gray" />
            <Text className="ml-1 text-gray-600">Calendar</Text>
          </TouchableOpacity>
        </View>

         <View className="px-4 pt-4 pb-4 ">
            <View className="flex-row items-center justify-between bg-white p-3 rounded-lg  shadow-sm">
              <TouchableOpacity className="flex-row items-center">
                  <Feather name="plus" size={20} color="gray" />
                  <Text className="ml-2 text-lg text-gray-700">Add Meal</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                  <Feather name="chevron-down" size={20} color="gray" />
              </TouchableOpacity>
            </View>
         </View>

       
    </View>

    
     <ScrollView className="flex-1 pt-6 h-full bg-white" >
           {deposits.map((deposit, index) => (
             <DepositItem key={index} {...deposit}  />
           ))}
         </ScrollView>
      
      
    </View>
  );
};

