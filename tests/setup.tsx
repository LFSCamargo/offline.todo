import { vi } from 'vitest';

vi.mock('react-native-gesture-handler', async (importOriginal) => {
  const actual = await importOriginal<any>();
  const NativeModules = require('react-native').NativeModules;

  // Ensure that the native module is mocked as well
  if (!NativeModules.RNGestureHandlerModule) {
    NativeModules.RNGestureHandlerModule = {
      attachGestureHandler: vi.fn(),
      createGestureHandler: vi.fn(),
      dropGestureHandler: vi.fn(),
      updateGestureHandler: vi.fn(),
      handleSetJSResponder: vi.fn(),
      handleClearJSResponder: vi.fn(),
    };
  }
  return {
    ...actual,
    Gesture: {
      Pan: () => ({
        // Chainable stub methods. Adjust these as needed by your component.
        onBegin: (callback: Function) => ({
          onChange: (callback: Function) => ({
            onFinalize: (callback: Function) => ({
              run: () => {}, // Dummy run method.
            }),
          }),
        }),
      }),
    },
    // You can pass through any other exports if needed
    GestureHandlerRootView: ({ children }: { children: React.ReactNode }) => children,
  };
});

vitest.mock('react-native', () => {
  const React = require('react');
  const actual = require('react-native');
  const View = actual.View;
  function MockedFlatList(props: any) {
    const items = props.data.map((item: any, index: number) => {
      const key = props.keyExtractor(item, index);
      return <View key={key}>{props.renderItem({ item, index })}</View>;
    });
    return <View>{items}</View>;
  }
  Object.defineProperty(actual, 'FlatList', {
    get: () => MockedFlatList,
  });
  return actual;
});

vitest.mock('react-native-reanimated', () => {
  const reanimated = {
    default: {},
    // A simple shared value mock that holds a value.
    useSharedValue: vitest.fn(),

    // A dummy hook for animated styles that returns an empty style object.
    useAnimatedStyle: vitest.fn(),

    // Mimic animation helpers by returning the final value immediately.
    withTiming: vitest.fn(),
    withSpring: vitest.fn(),

    // A basic interpolation function returning the first output value.
    interpolate: vitest.fn(),

    // Dummy easing function.
    Easing: {
      linear: vitest.fn(),
    },

    // runOnUI simply runs the provided function.
    runOnUI: vitest.fn(),

    // Add other functions or constants as needed.
    // For example, a no-op for call:
    call: vitest.fn(),
  };

  // In some cases, the module might be imported as a default export.
  reanimated.default = reanimated;

  return reanimated;
});
