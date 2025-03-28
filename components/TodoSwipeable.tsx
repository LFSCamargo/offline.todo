import { useEffect, useRef } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { twMerge } from 'tailwind-merge';

import { HeroIcons } from './HeroIcons';

import { TodoState, useTodos } from '~/store/todos';

const WIDTH_SCREEN = Dimensions.get('window').width;

interface IFieldSwipe {
  todo: TodoState['todos'][0];
}

const TodoSwipeableRow: React.FC<IFieldSwipe> = ({ todo }) => {
  const innerRef = useRef<Animated.View>(null);
  const swipeTranslateX = useSharedValue(0);
  const pressed = useSharedValue(false);
  const itemHeight = useSharedValue(1);
  const marginVertical = useSharedValue(0);

  const { removeTodo, markAsCompleted } = useTodos();

  useEffect(() => {
    innerRef.current?.measure((x, y, width, height) => {
      itemHeight.value = withTiming(height);
    });
  }, []);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      if (event.translationX < 0) {
        swipeTranslateX.value = event.translationX;
      }
    })
    .onFinalize(() => {
      const isShouldDismiss = swipeTranslateX.value < -WIDTH_SCREEN * 0.3;
      if (isShouldDismiss) {
        itemHeight.value = 1;
        marginVertical.value = withTiming(0);
        swipeTranslateX.value = withTiming(-WIDTH_SCREEN, undefined, (isDone) => {
          if (isDone) {
            itemHeight.value = withTiming(0);
            runOnJS(removeTodo)(todo.id);
          }
        });
      } else {
        swipeTranslateX.value = withSpring(0);
      }
      pressed.value = false;
    });

  const transformStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: swipeTranslateX.value }],
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: withTiming(swipeTranslateX.value < -WIDTH_SCREEN * 0.1 ? 1 : 0.3),
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View ref={innerRef} className="relative">
        <Animated.View
          style={transformStyle}
          className="z-50 flex min-h-[56px] flex-row items-center justify-between bg-neutral-100 p-4 px-8">
          <Animated.View className="flex flex-1 flex-row items-start gap-4">
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, left: 40, right: 40 }}
              onPress={() => markAsCompleted(todo.id)}
              className={twMerge(
                'flex h-7 w-7 items-center justify-center rounded-full bg-red-500',
                !todo.completed && 'bg-neutral-200'
              )}>
              {todo.completed && <HeroIcons.Outline.Check width={20} height={20} color="white" />}
            </TouchableOpacity>
            <Text
              className={twMerge(
                `flex w-72 flex-1 items-center pt-1`,
                todo.completed && 'line-through'
              )}>
              {todo.title}
            </Text>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={opacityStyle}
          className="absolute left-0 top-0 h-full w-full flex-row items-center justify-end bg-red-500 pr-10">
          <HeroIcons.Outline.Trash width={24} height={24} color="white" className="" />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
function TodoSwipeableContainer({ children }: React.PropsWithChildren<{}>) {
  return <GestureHandlerRootView>{children}</GestureHandlerRootView>;
}

export const TodoSwipeable = {
  Row: TodoSwipeableRow,
  Container: TodoSwipeableContainer,
};
