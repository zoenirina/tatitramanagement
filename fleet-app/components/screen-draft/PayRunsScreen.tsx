import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';

// --- Dummy Data ---
const peopleData = [
  { id: '1', name: 'Chance Schleifer', email: 'chance.schleifer@mail.com', selected: false },
  { id: '2', name: 'Abram Dorwart', email: 'abram.dorwart@mail.com', selected: true },
  { id: '3', name: 'Lindsey Septimus', email: 'lindsey.septimus@mail.com', selected: false },
  { id: '4', name: 'Alfonso Workman', email: 'alfonso.workman@mail.com', selected: true },
  { id: '5', name: 'Maren Kenter', email: 'maren.kenter@mail.com', selected: false },
  { id: '6', name: 'Adilson Rhiel Madsen', email: 'adilson.madsen@mail.com', selected: false },
  { id: '7', name: 'James Levin', email: 'james.levin@mail.com', selected: true },
  { id: '8', name: 'Carla Botosh', email: 'carla.botosh@mail.com', selected: false },
];

// --- Types ---
type Person = {
  id: string;
  name: string;
  email: string;
  selected: boolean;
};

type PersonListItemProps = {
  person: Person;
  onSelect: (id: string) => void;
};

// --- List Item ---
const PersonListItem: React.FC<PersonListItemProps> = ({ person, onSelect }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center py-3 px-4 bg-white border-b border-gray-100"
      onPress={() => onSelect(person.id)}
    >
      {/* Avatar placeholder */}
      <View className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden" />

      <View className="flex-1">
        <Text className="text-gray-800 text-base font-medium">{person.name}</Text>
        <Text className="text-gray-500 text-sm">{person.email}</Text>
      </View>

      <View className="ml-4">
        {person.selected ? (
          <Feather name="check-circle" size={24} color="#6366F1" />
        ) : (
          <Feather name="circle" size={24} color="#D1D5DB" />
        )}
      </View>
    </TouchableOpacity>
  );
};

// --- Main Screen ---
const PayRunsScreen: React.FC = () => {
  const [people, setPeople] = useState<Person[]>(peopleData);
  const [searchText, setSearchText] = useState('');

  const handleSelectPerson = (id: string) => {
    setPeople((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, selected: !p.selected } : p
      )
    );
  };

  const selectedCount = people.filter((p) => p.selected).length;

  const filteredPeople = people.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase()) ||
    p.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200 bg-white">
        <TouchableOpacity className="p-2">
          <Feather name="chevron-left" size={24} color="#374151" />
        </TouchableOpacity>

        <View className="flex-1 items-center">
          <Text className="text-lg font-semibold text-gray-800">Pay Runs</Text>
          <Text className="text-sm text-gray-500 mt-1">May 1, 2025 - May 25, 2025</Text>
        </View>

        <View className="w-8" /> {/* Placeholder to align */}
      </View>

      {/* Search */}
      <View className="px-4 mt-4 mb-2">
        <View className="flex-row items-center bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
          <Feather name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 text-base text-gray-700 ml-2"
            placeholder="Search person"
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* List */}
      <ScrollView className="flex-1 mx-4 rounded-lg overflow-hidden bg-white shadow-md mb-4">
        {filteredPeople.map((person) => (
          <PersonListItem
            key={person.id}
            person={person}
            onSelect={handleSelectPerson}
          />
        ))}
      </ScrollView>

      {/* Footer */}
      <View className="p-4 bg-white border-t border-gray-200">
        <TouchableOpacity className="bg-indigo-600 py-3 rounded-xl items-center justify-center shadow-lg">
          <Text className="text-white text-lg font-semibold">
            Continue - {selectedCount}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Home indicator space for iOS */}
      {Platform.OS === 'ios' && (
        <View className="h-6 bg-white absolute bottom-0 left-0 right-0" />
      )}
    </SafeAreaView>
  );
};

export default PayRunsScreen;
