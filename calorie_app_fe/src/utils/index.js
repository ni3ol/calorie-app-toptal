import { useState, useCallback, useEffect } from "react";

export const usePromiseLazy = (f, deps) => {
  const [state, setState] = useState({
    isLoading: false,
    result: undefined,
    error: undefined,
  });
  const execute = useCallback(
    async (...args) => {
      setState({ isLoading: true, result: state.result, error: undefined });
      try {
        const theResult = await f(...args);
        setState({ isLoading: false, result: theResult, error: undefined });
        return { result: theResult, error: undefined };
      } catch (caughtError) {
        setState({ isLoading: false, result: undefined, error: caughtError });
        return { result: undefined, error: caughtError };
      }
    },
    [f, state.result, ...deps]
  );
  const setResult = (result) => {
    setState({ ...state, result });
  };
  return {
    result: state.result,
    error: state.error,
    isLoading: state.isLoading,
    setResult,
    execute,
  };
};

export const usePromise = (f, deps) => {
  const { execute, result, setResult, isLoading, error } = usePromiseLazy(
    f,
    deps
  );
  useEffect(() => {
    execute();
  }, [...deps]);
  return { execute, result, setResult, isLoading, error };
};
