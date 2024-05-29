import {
  useEffect,
  useState,
} from 'react';

import { useGlobalContext } from '../GlobalContext';

export function useSelectedShape() {
  const { controls } = useGlobalContext();
  const [shape, setShape] = useState(null);
  useEffect(() => {
    if (controls) {
      const listener = (event, controls) => {
        if (event.type == "updated") {
          if (event.key == "selectedShape") {
            setShape(controls?.selectedShape);
          }
        }
        if (event.type == "destroy") {
          setShape(null);
        }
      };
      controls.addListener(listener);
      return () => {
        controls.removeListener(listener);
      };
    }
  }, [controls]);
  return shape;
}
