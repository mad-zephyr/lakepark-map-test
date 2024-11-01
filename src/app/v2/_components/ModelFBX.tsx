import { useFBX } from '@react-three/drei'
import { PrimitiveProps } from '@react-three/fiber'
import { FC } from 'react'

type TModelFBX = {
  url: string
} & Partial<PrimitiveProps>

export const ModelFBX: FC<TModelFBX> = ({ url, ...props }) => {
  const model = useFBX(url).clone()

  return <primitive {...props} object={model} />
}
