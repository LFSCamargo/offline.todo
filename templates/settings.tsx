import { Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

import { HeroIcons } from '~/components/HeroIcons';
import { Separator } from '~/components/Separator';

type Props = {
  handleDeleteTodos: () => void;
};

export function SettingsTemplate({ handleDeleteTodos }: Props) {
  return (
    <SafeAreaView className="flex flex-1 pt-4">
      <View className="flex flex-row items-center justify-between p-4 px-8">
        <View className="flex flex-col">
          <Text className="text-2xl font-bold">Settings</Text>
          <Text className="w-72">App settings, here you can decide the type of profile</Text>
        </View>
        <View className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500">
          <Text className="color-white">LF</Text>
        </View>
      </View>
      <View className="p-4 px-8">
        <TouchableOpacity className="flex flex-row items-center justify-between py-5">
          <View className="flex flex-row items-center gap-4">
            <View className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900">
              <HeroIcons.Outline.ArrowUpOnSquareStack width={24} height={24} color="white" />
            </View>
            <View className="flex flex-col">
              <Text className="text-xl font-bold">Export Database</Text>
              <Text className="w-72">Export your database to a json file</Text>
            </View>
          </View>
          <HeroIcons.Outline.ChevronRight className="w-6" color="black" />
        </TouchableOpacity>
        <Separator />
        <TouchableOpacity className="flex flex-row items-center justify-between py-5">
          <View className="flex flex-row items-center gap-4">
            <View className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-400">
              <HeroIcons.Outline.ArrowPathRoundedSquare width={24} height={24} color="white" />
            </View>
            <View className="flex flex-col">
              <Text className="text-xl font-bold">Configure Sync</Text>
              <Text className="w-72">Configure the synchronization settings</Text>
            </View>
          </View>
          <HeroIcons.Outline.ChevronRight className="w-6" color="black" />
        </TouchableOpacity>
        <Separator />
        <TouchableOpacity
          className="flex flex-row items-center justify-between py-5"
          onPress={() => handleDeleteTodos()}>
          <View className="flex flex-row items-center gap-4">
            <View className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500">
              <HeroIcons.Outline.Trash width={24} height={24} color="white" />
            </View>
            <View className="flex flex-col">
              <Text className="text-xl font-bold">Clear Database</Text>
              <Text className="w-72">Clear all data from the database</Text>
            </View>
          </View>
          <HeroIcons.Outline.ChevronRight className="w-6" color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
