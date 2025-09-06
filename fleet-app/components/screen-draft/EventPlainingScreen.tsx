import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { DepositItem } from '@/app/(tabs)/deposit';

const EventPlanningScreen = () => {
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
            source={{ uri: 'https://i.pravatar.cc/300?img=5' }} // Placeholder image for avatar
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

      <ScrollView className="flex-1 ">
     <ScrollView className="flex-1 pt-6 h-full bg-white" >
           {deposits.map((deposit, index) => (
             <DepositItem key={index} {...deposit}  />
           ))}
         </ScrollView>
        <View className="mb-4 px-4">
          <Text className="text-lg font-semibold text-gray-800 mb-3">TODO <Text className="text-gray-500 text-base">2</Text></Text>
          
          <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center">
                <Feather name="calendar" size={18} color="gray" />
                <Text className="ml-2 text-lg font-semibold text-gray-800">Schedule me an appointment with my endocrinologist</Text>
              </View>
              <TouchableOpacity>
                <Feather name="more-horizontal" size={20} color="gray" />
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap items-center mb-3">
              <Text className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium mr-2 mb-1">High Priority</Text>
              <Text className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-1">15 min recipe</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Feather name="clock" size={16} color="gray" />
                <Text className="ml-1 text-gray-600 text-sm">15 Days left</Text>
              </View>
              <View className="flex-row items-center space-x-3">
                <View className="flex-row items-center">
                  <Feather name="paperclip" size={16} color="gray" />
                  <Text className="ml-1 text-gray-600">17</Text>
                </View>
                <View className="flex-row items-center">
                  <Feather name="message-circle" size={16} color="gray" />
                  <Text className="ml-1 text-gray-600">6</Text>
                </View>
              </View>
            </View>
          </View>

          <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center">
                <Feather name="users" size={18} color="gray" />
                <Text className="ml-2 text-lg font-semibold text-gray-800">Help DStudio get more customers</Text>
              </View>
              <TouchableOpacity>
                <Feather name="more-horizontal" size={20} color="gray" />
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap items-center mb-3">
              <Text className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mr-2 mb-1">Low Priority</Text>
              <View className="flex-row items-center px-3 py-1 bg-brand-primary-100 text-brand-primary-700 rounded-full text-sm font-medium mb-1">
                <Feather name="user" size={12} color="#3B82F6" className="mr-1" />
                <Text className="text-brand-primary-700">Remote</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Feather name="clock" size={16} color="gray" />
                <Text className="ml-1 text-gray-600 text-sm">15 Days left</Text>
              </View>
              <View className="flex-row items-center space-x-3">
                <View className="flex-row items-center">
                  <Feather name="paperclip" size={16} color="gray" />
                  <Text className="ml-1 text-gray-600">9</Text>
                </View>
                <View className="flex-row items-center">
                  <Feather name="message-circle" size={16} color="gray" />
                  <Text className="ml-1 text-gray-600">13</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventPlanningScreen;
