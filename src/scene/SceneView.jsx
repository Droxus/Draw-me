import {
  useEffect,
  useState,
} from 'react';

import { Box } from '@mui/material';

import { useGlobalContext } from '../GlobalContext';
import { Scene } from './';

export function SceneView() {
  const { setScene } = useGlobalContext();
  const [canvasRef, setCavasRef] = useState(null);
  useEffect(() => {
    if (canvasRef) {
      const controller = new Scene(canvasRef);
      setScene(controller);
      return () => {
        controller.destroy();
      };
    }
  }, [canvasRef]);
  return (
    <Box
      component="canvas"
      display="block"
      width={300}
      height={150}
      ref={setCavasRef}
      sx={(theme) => ({
        height: "100%",
        width: "100%",
      })}
    ></Box>
  );
}
