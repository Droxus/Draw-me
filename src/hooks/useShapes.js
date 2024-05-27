import {
  useEffect,
  useState,
} from 'react';

import { useGlobalContext } from '../GlobalContext';

export function useShapes() {
  const { scene } = useGlobalContext();
  const [shapes, setFreshShapes] = useState([]);
  console.debug("Shapes updated", scene);
  useEffect(() => {
    if (scene) {
      const listener = (event, scene) => {
        if (event.type == "destroy") {
          setFreshShapes(null);
        } else {
          console.debug("Shapes updated", scene.shapes);
          setFreshShapes(scene.shapes?.map((x) => x));
        }
      };
      scene.addListener(listener);
      return () => {
        scene.removeListener(listener);
      };
    }
  }, [scene]);
  return shapes;
}
