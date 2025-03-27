import { Link, Tabs } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';

import { HeroIcons } from '~/components/HeroIcons';

const IconSize = 32;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: 8,
          height: 100,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => (
            <HeroIcons.Outline.Inbox width={IconSize} height={IconSize} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="agenda"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <HeroIcons.Outline.Calendar width={IconSize} height={IconSize} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <HeroIcons.Outline.Cog width={34} height={34} color={color} />,
        }}
      />
    </Tabs>
  );
}
