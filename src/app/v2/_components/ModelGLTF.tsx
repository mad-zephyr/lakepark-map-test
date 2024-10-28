import { Center, useGLTF } from "@react-three/drei";
import { PrimitiveProps } from "@react-three/fiber";
import { FC } from "react";

type ModelGLTF = {
  url: string;
} & Partial<PrimitiveProps>;

export const ModelGLTF: FC<ModelGLTF> = ({ url, ...props }) => {
  const model = useGLTF(url);
  return (
    <Center top>
      <primitive {...props} object={model} />
    </Center>
  );
};
