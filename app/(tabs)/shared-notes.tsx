import { SafeAreaView } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function SharedNotesScreen() {
  return (
    <SafeAreaView className="flex flex-1">
      <ScreenContent title="Shared Notes" path="app/(tabs)/shared-notes.tsx" />
    </SafeAreaView>
  );
}
