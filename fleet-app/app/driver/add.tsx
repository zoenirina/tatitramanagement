import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import HeaderBack from '../../components/common/HeaderBack'
import Input from '../../components/form/Input'
import * as ImagePicker from 'expo-image-picker'
 
export default function Add() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cin, setCin] = useState('');
  const [remark, setRemark] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // quality: 0.7,
      // allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 bg-neutral-100">
      <HeaderBack title="Nouveau chauffeur"  colored/>

      <View className="mt-6 gap-y-4 mx-6">

        {/* Upload image */}
        <TouchableOpacity
          onPress={pickImage}
          className="border border-dashed border-gray-400 h-28 rounded-xl justify-center items-center bg-white"
        >
          {image ? (
            <Image source={{ uri: image }} className="w-full h-full rounded-xl" resizeMode="cover" />
          ) : (
            <Text className="text-gray-500">Sélectionner une image</Text>
          )}
        </TouchableOpacity>

        {/* Inputs */}
        <Input
          label="Nom complet"
          name="name"
          value={name}
          onChangeText={setName}
          required
        />

        <Input
          label="Téléphone"
          name="phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Input
          label="Carte d’identité"
          name="cin"
          value={cin}
          onChangeText={setCin}
        />

        {/* Remarque */}
        <View>
          <Text className="text-sm font-medium text-gray-900 mb-2">Remarque</Text>
          <TextInput
            placeholder="Ajouter une remarque..."
            value={remark}
            onChangeText={setRemark}
            multiline
            numberOfLines={4}
            className="bg-white p-4 rounded-xl border border-gray-200 text-gray-900 text-sm h-28"
            textAlignVertical="top"
          />
        </View>
      </View>
    </View>
  );
}
