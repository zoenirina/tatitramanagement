import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const TaskDetailScreen = () => {
  return (
    <View className="flex-1 bg-neutral-100 mt-12">
      {/* Top Bar */}
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <TouchableOpacity className="flex-row items-center px-3 py-1.5 bg-green-100 rounded-full">
          <Feather name="check" size={16} color="green" />
          <Text className="ml-1 text-sm font-semibold text-green-700">Mark Complete</Text>
        </TouchableOpacity>
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity>
            <Feather name="share" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="paperclip" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="maximize" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="more-horizontal" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="arrow-right" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="x" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Task Title */}
        <Text className="mb-6 text-2xl font-bold text-gray-800">
          Schedule Me An Appointment With My Endocrinologist
        </Text>

        {/* Task Details */}
        <View className="mb-6 space-y-4">
          <View className="flex-row items-center">
            <Text className="w-24 text-gray-600">Assignee</Text>
            <View className="flex-row items-center">
              <Image
                source={{ uri: 'https://i.pravatar.cc/300?img=1' }} // Placeholder image
                className="w-8 h-8 rounded-full"
              />
              <Text className="ml-2 font-semibold text-gray-800">Jenifer Anniston</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Text className="w-24 text-gray-600">Due Date</Text>
            <View className="flex-row items-center p-2 bg-gray-100 rounded-lg">
              <Feather name="calendar" size={16} color="gray" />
              <Text className="ml-2 text-gray-800">Jul 16 - 24</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Text className="w-24 text-gray-600">Projects</Text>
           <View className="flex-col">
             <View className="flex-row flex-wrap items-center space-x-2">
              <View className="flex-row items-center px-3 py-2 bg-gray-100 rounded-lg">
                <Feather name="clock" size={16} color="gray" />
                <Text className="ml-1 text-gray-800">Status</Text>
              </View>
              <View className="px-3 py-2 bg-orange-200 rounded-lg">
                <Text className="text-orange-800">In Progress</Text>
              </View>
            </View>

            <View className="flex-row flex-wrap items-center space-x-2">             
              <View className="flex-row items-center px-3 py-2 bg-gray-100 rounded-lg">
                <Feather name="align-left" size={16} color="gray" />
                <Text className="ml-1 text-gray-800">Priority</Text>
              </View>
              <View className="px-3 py-2 bg-purple-200 rounded-lg">
                <Text className="text-purple-800">Low</Text>
              </View>
            </View>
           </View>

          </View>
        </View>

        {/* Description */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-semibold text-gray-800">Description</Text>
          <View className="p-3 bg-gray-100 rounded-lg">
            <Text className="text-gray-700">Schedule and attend an appointment! 🎯</Text>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row mb-4 border-b border-gray-200">
          <TouchableOpacity className="px-4 py-3 border-b-2 border-blue-500">
            <Text className="font-semibold text-blue-600">Comments</Text>
          </TouchableOpacity>
          <TouchableOpacity className="px-4 py-3">
            <Text className="font-semibold text-gray-600">Updates</Text>
          </TouchableOpacity>
        </View>

        {/* <View className="mb-4 space-y-4">
          <View className="flex-row">
            <Image
              source={{ uri: 'https://i.pravatar.cc/300?img=2' }}
              className="w-10 h-10 rounded-full"
            />
            <View className="ml-3 flex-1">
              <View className="flex-row items-center mb-1">
                <Text className="font-semibold text-gray-800">John Smith</Text>
                <Text className="ml-2 text-sm text-gray-500">• 17th Feb 2024</Text>
              </View>
              <Text className="text-gray-700">
                Hi 👋 I'll do that task now, you can start working on another task!
              </Text>
            </View>
          </View>

          <View className="flex-row">
            <Image
              source={{ uri: 'https://i.pravatar.cc/300?img=3' }} // Placeholder image
              className="w-10 h-10 rounded-full"
            />
            <View className="ml-3 flex-1">
              <View className="flex-row items-center mb-1">
                <Text className="font-semibold text-gray-800">Anita</Text>
                <Text className="ml-2 text-sm text-gray-500">• Just Now</Text>
              </View>
              <Text className="text-gray-700">Hello!</Text>
            </View>
          </View>
        </View> */}
      </ScrollView>

      {/* Comment Input */}
      <View className="flex-row items-center p-4 border-t border-gray-200 bg-white">
        <TextInput
          className="flex-1 px-4 py-2 mr-2 bg-gray-100 rounded-full text-gray-700"
          placeholder="Add a comment..."
          placeholderTextColor="gray"
        />
        <TouchableOpacity className="p-2">
          <Feather name="paperclip" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2 bg-blue-500 rounded-full">
          <Feather name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskDetailScreen;
