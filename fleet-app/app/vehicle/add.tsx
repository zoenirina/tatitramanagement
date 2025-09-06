import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import HeaderBack from '../../components/common/HeaderBack';
import { Vehicle, VehicleType } from '@/store/services/vehicleApi';
import { useAddVehicleMutation } from '@/store/services/vehicleApi';
import Input from '@/components/form/Input';

const defaultVehicle: Partial<Vehicle> = {
  type: 'POUSSE_POUSSE',
  plateNumber: '',
  brand: '',
  model: '',
  purchaseDate: '',
};

export default function AddVehicleScreen() {
  const [vehicle, setVehicle] = useState<Partial<Vehicle>>(defaultVehicle);
  const [image, setImage] = useState<string | null>(null);
  const [addVehicle, { isLoading }] = useAddVehicleMutation();

  const handleChange = (e: any) => {
    setVehicle((prev) => ({ ...prev, [e.name]: e.value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!vehicle.type || !vehicle.plateNumber) {
      Alert.alert('Champs requis', 'Type et immatriculation sont obligatoires.');
      return;
    }

    try {
      await addVehicle(vehicle).unwrap();
      Alert.alert('Succès', 'Véhicule ajouté.');
      setVehicle(defaultVehicle);
      setImage(null);
    } catch (err) {
      Alert.alert('Erreur', 'Échec de l’enregistrement');
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <HeaderBack title="Nouveau véhicule" colored/>

      <View className="mt-6 gap-y-4 mx-6">
        {/* Upload Image */}
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

        <Input
          label="Type"
          name="type"
          value={vehicle.type || ''}
          onChangeText={handleChange}
        />

        <Input
          label="Immatriculation"
          name="plateNumber"
          value={vehicle.plateNumber || ''}
          onChangeText={handleChange}
        />

        <Input
          label="Marque"
          name="brand"
          value={vehicle.brand || ''}
          onChangeText={handleChange}
        />

        <Input
          label="Modèle"
          name="model"
          value={vehicle.model || ''}
          onChangeText={handleChange}
        />

        <Input
          label="Date d'achat"
          name="purchaseDate"
          value={vehicle.purchaseDate || ''}
          onChangeText={handleChange}
        />

        {/* <TouchableOpacity
          onPress={handleSubmit}
          className="bg-indigo-600 py-3 rounded-lg mt-4 items-center"
          disabled={isLoading}
        >
          <Text className="text-white font-semibold">
            {isLoading ? 'Enregistrement...' : 'Enregistrer'}
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
