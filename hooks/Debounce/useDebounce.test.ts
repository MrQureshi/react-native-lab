import { renderHook } from '@testing-library/react-native';
import { act } from 'react';

import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should return the initial value', () => {
    const { result } = renderHook(() => useDebounce('React'));

    expect(result.current).toBe('React');
  });

  it('should update the value after the specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: {
          value: 'React',
        },
      },
    );

    rerender({
      value: 'React Native',
    });

    expect(result.current).toBe('React');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('React Native');
  });

  it('should reset the timer if the value changes before the delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: {
          value: 'R',
        },
      },
    );

    rerender({ value: 'Re' });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    rerender({ value: 'React' });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('R');

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('React');
  });
});
