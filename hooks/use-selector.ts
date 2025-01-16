import { useState, useEffect } from 'react';
import { useStore } from '../contexts/store';

export function useSelector(selector:any) {
  const { state } = useStore();
  const [selectedState, setSelectedState] = useState(() => selector(state));

  useEffect(() => {
    const newState = selector(state);
    if (newState !== selectedState) {
      setSelectedState(newState);
    }
  }, [state, selector, selectedState]);

  return selectedState;
}
