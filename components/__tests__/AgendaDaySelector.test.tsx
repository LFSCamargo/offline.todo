import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import dayjs from 'dayjs';

import { AgendaDaySelector } from '../AgendaDaySelector';

import { DateHandlingUtility } from '~/utils/date-handling';

describe('[COMPONENT]: AgendaDaySelector', () => {
  it('should render the component', async () => {
    const currentDate = new Date();

    const { getByTestId } = render(
      <AgendaDaySelector selectedDate={currentDate} setSelectedDate={() => {}} />
    );

    await waitFor(() => {
      expect(getByTestId('AgendaDaySelector')).toBeTruthy();
    });
  });

  it('should render the component with a different date', async () => {
    const currentDate = dayjs(new Date()).add(4, 'day').toDate();

    const { getByTestId } = render(
      <AgendaDaySelector selectedDate={currentDate} setSelectedDate={() => {}} />
    );

    await waitFor(() => {
      expect(getByTestId('AgendaDaySelector')).toBeTruthy();
    });
  });

  it('should subtract 1 week from current date when clicking previous button', () => {
    const currentDate = dayjs();
    const minus1Week = currentDate.subtract(1, 'week').toDate();

    const setSelectedDate = vitest.fn();

    const { getByTestId } = render(
      <AgendaDaySelector selectedDate={currentDate.toDate()} setSelectedDate={setSelectedDate} />
    );

    const previousButton = getByTestId('previous');

    act(() => {
      fireEvent.press(previousButton);
    });

    expect(setSelectedDate).toHaveBeenCalledWith(minus1Week);
  });

  it('should add 1 week from current date when clicking next button', () => {
    const currentDate = dayjs();
    const plus1Week = currentDate.add(1, 'week').toDate();

    const setSelectedDate = vitest.fn();

    const { getByTestId } = render(
      <AgendaDaySelector selectedDate={currentDate.toDate()} setSelectedDate={setSelectedDate} />
    );

    const nextButton = getByTestId('next');

    act(() => {
      fireEvent.press(nextButton);
    });

    expect(setSelectedDate).toHaveBeenCalledWith(plus1Week);
  });

  it('should set the selected date when clicking on a day', () => {
    // Mar 30 2025
    const currentDate = new Date('2025-03-30');
    const weekStartDate = DateHandlingUtility.getWeekStartByDate(currentDate);

    const twoDaysLater = dayjs(weekStartDate).add(1, 'day').toDate();

    const setSelectedDate = vitest.fn();

    const { getByTestId } = render(
      <AgendaDaySelector selectedDate={currentDate} setSelectedDate={setSelectedDate} />
    );

    const clickableDay = getByTestId('day-1');

    act(() => {
      fireEvent.press(clickableDay);
    });

    expect(setSelectedDate).toHaveBeenCalledWith(twoDaysLater);
  });
});
