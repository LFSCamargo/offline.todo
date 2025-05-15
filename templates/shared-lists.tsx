import { View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export function SharedListsTemplate() {
  return (
    <View>
      <ScreenContent path="app/(tabs)/shared-lists.tsx" title="Shared Lists" />
    </View>
  );
}
