import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeroIcons } from '~/components/HeroIcons';
import { Separator } from '~/components/Separator';
import { useTodos } from '~/store/todos';
import { SettingsTemplate } from '~/templates/settings';

export default function SettingsScreen() {
  const { deleteAllTodos } = useTodos();

  function handleDeleteTodos() {
    Alert.alert(
      'Delete all todos',
      'Are you sure you want to delete all todos? \n This action cannot be undone',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteAllTodos(),
          style: 'destructive',
        },
      ]
    );
  }

  return <SettingsTemplate handleDeleteTodos={handleDeleteTodos} />;
}
