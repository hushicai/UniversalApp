// 通用获取异步数据的封装
// 主要用于配合Suspense
import {useEffect, useRef, useState} from 'react';

export default function useAsyncData<T>(fetcher: Promise<T>) {
  const ref = useRef<Promise<T> | null>(null);
  ref.current = fetcher;

  const [resource, setResource] = useState<Resource<T>>(null);

  useEffect(() => {
    if (ref.current) {
      setResource(wrapPromise(ref.current));
    }
  }, []);

  return resource?.read();
}

type Resource<T> = null | {read: () => T | undefined};

// This is the official basic promiseWrapper they implement in React Suspense Demo:
function wrapPromise<T>(promise: Promise<T>) {
  let status = 'pending';
  let result: T;
  let suspender = promise.then(
    r => {
      status = 'success';
      result = r;
    },
    e => {
      status = 'error';
      result = e;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
}
