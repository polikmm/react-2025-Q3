import { renderHook, act } from '@testing-library/react';
import { useLS } from './useLS';

describe('useLS should', () => {
  const KEY = 'test-key';
  const INITIAL_VALUE = 'initial';

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('return initialValue if localStorage is empty', () => {
    const { result } = renderHook(() => useLS(KEY, INITIAL_VALUE));
    const [value] = result.current;
    expect(value).toBe(INITIAL_VALUE);
  });

  test('read localStorage when initialize', () => {
    localStorage.setItem(KEY, JSON.stringify('saved value'));
    const { result } = renderHook(() => useLS(KEY, INITIAL_VALUE));
    const [value] = result.current;
    expect(value).toBe('saved value');
  });

  test('set new value & save it in localStorage', () => {
    const { result } = renderHook(() => useLS(KEY, INITIAL_VALUE));
    const [, setValue] = result.current;

    act(() => {
      setValue('new value');
    });

    const [updatedValue] = result.current;
    expect(updatedValue).toBe('new value');
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify('new value'));
  });

  test('delete key & reset LS to initialValue', () => {
    const { result } = renderHook(() => useLS(KEY, INITIAL_VALUE));
    const [, setValue, remove] = result.current;

    act(() => {
      setValue('temporary');
    });

    act(() => {
      remove();
    });

    const [valueAfterRemove] = result.current;
    expect(valueAfterRemove).toBe(INITIAL_VALUE);
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify('initial'));
  });

  test('handle reading error', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('read error');
    });

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useLS(KEY, INITIAL_VALUE));

    expect(result.current[0]).toBe(INITIAL_VALUE);
    expect(errorSpy).toHaveBeenCalledWith(
      `Error reading localStorage key "${KEY}":`,
      expect.any(Error)
    );

    errorSpy.mockRestore();
  });

  test('handle writing error', () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('write error');
    });

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useLS(KEY, INITIAL_VALUE));
    const [, setValue] = result.current;

    act(() => {
      setValue('will fail');
    });

    expect(errorSpy).toHaveBeenCalledWith(
      `Error setting localStorage key "${KEY}":`,
      expect.any(Error)
    );

    errorSpy.mockRestore();
  });

  test('handle delition error', () => {
    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('remove error');
    });

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useLS(KEY, INITIAL_VALUE));
    const [, , remove] = result.current;

    act(() => {
      remove();
    });

    expect(errorSpy).toHaveBeenCalledWith(
      `Error removing localStorage key "${KEY}":`,
      expect.any(Error)
    );

    errorSpy.mockRestore();
  });
});
