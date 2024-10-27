import { useEffect, useState } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { Subject } from 'rxjs';

type RxStore<T> = {
  defaultValue: T;
  subject: Subject<T>;
  callback?: (v: T) => void;
};

export function useRxStore<T>({ defaultValue, subject, callback }: RxStore<T>) {
  const [data, setData] = useState<T>(defaultValue);

  useEffect(() => {
    const valueSub = subject.subscribe(v => {
      setData(v);
      callback?.(v);
    });

    return () => {
      valueSub.unsubscribe();
    };
  }, [callback, subject]);


  return data;
}
