import { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

import BackButton from "../components/BackButton";
import Checkbox from "../components/Checkbox";
import api from '../lib/axios';

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export default function New() {
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [title, setTitle] = useState('');

  const handleToggleWeekDay = (weekDayIndex: number) => {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex]);
    }
  }

  const handleCreateNewHabit = async () => {
    try {
      if (!title.trim() || weekDays.length === 0) { Alert.alert('Novo hábito', 'informe o nome do hábito e escolha a periodicidade.') }

      await api.post('habits', {
        title,
        weekDays
      })
        .then(() => {
          setTitle('');
          setWeekDays([]);
          Alert.alert('Pronto', 'Novo hábito criado com sucesso!');
        })
    } catch (error) {
      console.log(error);
      Alert.alert('Oops', 'Ocorreu um erro ao criar o novo hábito.')
    }
  }

  return (
    <View
      className="flex-1 bg-background px-8 pt-16"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          placeholder='ex.: Exercícios, dormir bem, etc...'
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>

        {availableWeekDays.map((weekDay, i) => (
          <Checkbox
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(i)}
            onPress={() => handleToggleWeekDay(i)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          className='w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6'
          onPress={handleCreateNewHabit}
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />
          <Text
            className='font-semibold text-base text-white ml-2'
          >
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}