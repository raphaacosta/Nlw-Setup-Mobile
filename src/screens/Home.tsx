import { View, Text, ScrollView } from "react-native";

import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates';
import Header from "../components/Header";
import HabitDay, { DAY_SIZE } from "../components/HabitDay";

const weekDays = [
  "D",
  "S",
  "T",
  "Q",
  "Q",
  "S",
  "S"
];

const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;

export default function Home() {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, index) => (
          <Text
            key={`${weekDay} - ${index}`}
            className='text-zinc-400 text-xl font-bold text-cenmter mx-1'
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map(date => (
            <HabitDay key={date.toISOString()} />
          ))}

          {
            amountOfDaysToFill > 0 && Array
              .from({ length: amountOfDaysToFill })
              .map((_, i) => (
                <View
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))
          }
        </View>
      </ScrollView>
    </View>
  )
}