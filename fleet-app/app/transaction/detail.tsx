import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const Detail = () => {
  return (
    <SafeAreaView className="flex-1 bg-neutral-100 ">
      <View className=" pb-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6 bg-white shadow-sm px-5 pt-16 pb-5">
          <TouchableOpacity>
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-gray-800">Transaction Details</Text>
          <TouchableOpacity>
            <Feather name="more-horizontal" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Transaction Amount and Date */}
        <View className="items-center mb-8 bg-neutral-100 py-6">
          <Text className="text-4xl font-bold text-gray-900 mb-1">$3,300.00</Text>
          <Text className="text-base text-gray-500">Mar 24, 2025 - 11:39 AM</Text>
        </View>

       <View className=" bg-white px-5 pt-5">
         <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center">
            <Text className="text-lg font-medium text-gray-800 mr-2">Employees</Text>
            <View className="bg-brand-primary-50 rounded-full w-6 h-6 items-center justify-center">
              <Text className="text-brand-primary-500 text-sm font-semibold">4</Text>
            </View>
          </View>
       <View className="bg-green-100 rounded-full px-4 py-2 items-center justify-center">
              <Text className="text-emerald-800 text-sm font-semibold">Payé</Text>
            </View>
        </View>

        {/* Employee Details Card */}
        <View className="bg-white rounded-2xl shadow-sm p-5 mb-8 border border-neutral-200">
             <View className="flex-row items-center mb-5 pb-5 border-b border-b-neutral-200">
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/76.jpg' }}
              className="w-12 h-12 rounded-full mr-3"
            />
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">Véhicule 01</Text>
              <Text className="text-sm text-gray-500">#1200 FA</Text>
            </View>
            <TouchableOpacity className="bg-brand-primary-50 p-2 rounded-full">
              <Feather name="eye" size={18} color="#6F48FF" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center mb-5 ">
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/76.jpg' }}
              className="w-12 h-12 rounded-full mr-3"
            />
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">Alfonso Workman</Text>
              <Text className="text-sm text-gray-500">Product Manager</Text>
            </View>
            <TouchableOpacity className="bg-brand-primary-50 p-2 rounded-full">
              <Feather name="eye" size={18} color="#6F48FF" />
            </TouchableOpacity>
          </View>

         <View className="space-y-4 bg-neutral-100 gap-y-3 rounded-xl p-4">
  {/* Ligne 1 */}
  <View className="flex-row justify-between items-center">
    <Text className="text-base text-gray-600 uppercase">JOURS TRAVAILLÉS</Text>
    <Text className="text-base font-medium text-gray-800">20 jours</Text>
  </View>

  {/* Ligne 2 */}
  <View className="flex-row justify-between items-center">
    <Text className="text-base text-gray-600 uppercase">VERSEMENTS EFFECTUÉS</Text>
    <Text className="text-base font-medium text-gray-800">3 300 Ar</Text>
  </View>

  {/* Ligne 3 */}
  <View className="flex-row justify-between items-center">
    <Text className="text-base text-gray-600 uppercase">MONTANT ATTENDU</Text>
    <Text className="text-base font-medium text-gray-800">4 000 Ar</Text>
  </View>

  {/* Ligne 4 */}
  <View className="flex-row justify-between items-center">
    <Text className="text-base text-gray-600 uppercase">MONTANT NON VERSÉ</Text>
    <Text className="text-base font-medium text-neutral-900">700 Ar</Text>
  </View>

  {/* Ligne 5 */}
  <View className="flex-row justify-between items-center">
    <Text className="text-base text-gray-600 uppercase">ÉTAT DU CHAUFFEUR</Text>
    <Text className="text-sm font-medium text-emerald-600 bg-gray-100 rounded-full px-2 py-1 border border-emerald-200">En règle</Text>
  </View>

  {/* Résumé */}
  <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-neutral-200">
    <Text className="text-base font-semibold text-gray-800 uppercase">SOLDE FINAL</Text>
    <Text className="text-base font-bold text-gray-900">✓ A jour</Text>
  </View>
</View>

        </View>

        <View className="flex-row justify-center mb-56">
          <View className="w-2 h-2 rounded-full bg-brand-primary-500 mx-1"></View>
          <View className="w-2 h-2 rounded-full bg-gray-300 mx-1"></View>
          <View className="w-2 h-2 rounded-full bg-gray-300 mx-1"></View>
        </View>

        {/* Back to Home Button */}
        {/* <TouchableOpacity className="bg-brand-primary-500 py-4 rounded-xl items-center justify-center">
          <Text className="text-white text-lg font-semibold">Back to Home</Text>
        </TouchableOpacity> */}
       </View>
      </View>
    </SafeAreaView>
  );
};

export default Detail;