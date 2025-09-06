import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import Feather from '@expo/vector-icons/Feather'; // Import Feather icons
import StatusAmount from '@/components/payment/StatusAmount';
import EventPlanningScreen from '@/components/screen-draft/EventPlainingScreen';

interface DepositItemProps {
  vehicleName?: string;
  depositStatus?: 'paid' | 'partial' | 'unpaid'; // Simplified status types
  amount: number;
  time?: string;
  commentCount?: number; 
  owedAmount?: number; 
}


const DepositScreen: React.FC = () => {

  return (
    <EventPlanningScreen />
  );
};

export default DepositScreen;
export const DepositItem: React.FC<DepositItemProps> = ({
  vehicleName,
  depositStatus,
  amount,
  time,
  commentCount,
  owedAmount,
}) => {
  let statusBgColor = '';
  let statusDotColor = '';
  let statusMainColor = ''
  let amountTextColor = 'text-neutral-900'; // Default for paid

  switch (depositStatus) {
    case 'paid':
      statusBgColor = 'bg-[#F7FFF8]';
      statusDotColor = 'border-[#BDE9C8]';
      statusMainColor= "border-[#31B541]"
      break;
    case 'partial':
      statusBgColor = 'bg-[#FFFDF0]';
      statusDotColor = 'border-[#FFF2DD]';
      amountTextColor = 'text-yellow-700';
      statusMainColor= "border-[#FEC430]"
      break;
    case 'unpaid':
      statusBgColor = 'bg-[#FFF3F5]';
      statusDotColor = 'border-[#E9BDCA]';
      amountTextColor = 'text-neutral-900';
      statusMainColor= "border-[#FF494C]"
      break;
  }

  return (
    <View className='flex flex-row w-full'>
      <View className="flex-row items-stretch h-full">
     <View className="flex px-2 bg-neutral-100 justify-center items-center border-b-white border-b">
      <View className="flex-row">
        <View className="mr-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <View
              key={`col1-${index}`}
              className="size-[5px] rounded-full bg-gray-300 my-1"
            />
          ))}
        </View>

        <View>
          {Array.from({ length: 6 }).map((_, index) => (
            <View
              key={`col2-${index}`}
              className="size-[5px] rounded-full bg-gray-300 my-1"
            />
          ))}
        </View>
      </View>
    </View>
      
      <View
  className="flex-col justify-center items-center w-8 ml-2   border border-[#C4CAD8] "
  style={{ borderStyle: 'dashed' }}
>
        <Text
          className="text-gray-600 text-sm font-semibold absolute whitespace-nowrap text-nowrap w-28 text-center"
          style={{ transform: [{ rotate: '-90deg' }] }} 
        >
          Fikirizana 24
        </Text>
      </View>
    </View>
<View className={`flex-row justify-between w-72 ml-3 items-end rounded-lg p-3 mb-3 ${statusBgColor} border ${statusDotColor}`}>
      <View className="flex-1 flex-row items-center">
       
        <View className='gap-y-1'>
            <View className='flex flex-row gap-2 justify-center'>
                <View className={`size-[16px] rounded-[5px] border-4 bg-white mr-2 ${statusMainColor}`} />
                <Text className="font-semibold text-lg text-gray-800">{vehicleName}</Text>
            </View>
            
          <View className="flex-row items-center mt-1">
            <Feather name="clock" size={14} color="#4B5563" />
            <Text className="ml-1 text-sm text-gray-600">{time}</Text>
            {commentCount !== undefined && (
              <View className="flex-row items-center ml-3">
                <Feather name="message-square" size={14} color="#4B5563" />
                <Text className="ml-1 text-sm text-gray-600">{commentCount}</Text>
              </View>
            )}
          </View>
        <View className="flex-row items-center mt-1">
          <StatusAmount amount={amount} status="up" />
          {owedAmount !== undefined && (
            <View className="ml-4">
              <StatusAmount amount={owedAmount} status="down" />
            </View>
          )}
        </View>
        </View>
      </View>
      <TouchableOpacity className="p-1 bg-gray-50 border border-gray-200 rounded-md ">
        <Feather name="more-horizontal" size={24} color="#6B7280" />
      </TouchableOpacity>
    </View>
      <View className="w-[344px] h-[102px] rounded-sm overflow-hidden ml-3">
   <ImageBackground
        source={require('@/assets/images/pattern/pattern02.png')}
        resizeMode="cover"
        style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
      />
          </View>
    </View>
    
  );
};