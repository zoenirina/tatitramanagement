import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import HeaderBack from '../../components/common/HeaderBack'
import Input from '../../components/form/Input'
import * as ImagePicker from 'expo-image-picker'
import RadioButton from '@/components/form/RadioButton'

const PaymentStatusSelector: React.FC = () => {
  const [selected, setSelected] = useState<string>('payé');

  const options = [
    {
      value: 'paid',
      label: 'Payé',
      description: 'Le paiement a été effectué.',
    },
    {
      value: 'partially_paid',
      label: 'Partiellement payé',
      description: 'Une partie du montant est payée.',
    },
    {
      value: 'unpaid',
      label: 'Non payé',
      description: 'Aucun paiement n’a été reçu.',
    },
  ];

  return (
    <View>
     <RadioButton
  label="Payé"
  value="payé"
  selected={selected === 'payé'}
  onSelect={setSelected}
/>
<RadioButton
  label="Partiellement payé"
  value="partiel"
  selected={selected === 'partiel'}
  onSelect={setSelected}
/>
<RadioButton
  label="Non payé"
  value="non"
  selected={selected === 'non'}
  onSelect={setSelected}
/>
    </View>
  );
};


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
  <HeaderBack title="Créer un versement" />

  <ScrollView
    contentContainerStyle={{ padding: 24, gap: 16 }}
    showsVerticalScrollIndicator={false}
  >
    {/* Upload image */}
    <TouchableOpacity
      onPress={pickImage}
      className="border border-dashed border-gray-400 h-32 rounded-xl justify-center items-center bg-white"
    >
      {image ? (
        <Image source={{ uri: image }} className="w-full h-full rounded-xl" resizeMode="cover" />
      ) : (
        <View>
            <View className="p-2 size-14 mx-auto mb-2 rounded-xl bg-brand-primary-50 border border-brand-primary-500/40">
            <Image
                // source={require('@/assets/images/olav-tvedt.jpg')}
                source={require('@/assets/images/icons/icon02.png')}
                style={{
                width: 32, 
                height: 32,
                }}
                resizeMode="cover"
            />
            </View>       

        <Text className="text-gray-500">Sélectionner une image...</Text>
        </View>
      )}
    </TouchableOpacity>

    {/* Inputs */}
    <Input label="Conducteur" name="name" value={name} onChangeText={setName} required />
    <Input label="Date de paiement" name="phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
    <Input label="Montant à payer" name="cin" value={cin} onChangeText={setCin} />
<TextInput
        value={remark}
        onChangeText={setRemark}
        className="bg-white p-4 rounded-xl border border-gray-200 text-gray-900 text-sm "
        textAlignVertical="top"
      />
    <PaymentStatusSelector />

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
  </ScrollView>
</View>

  );
}
