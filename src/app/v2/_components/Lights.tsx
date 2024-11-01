export const Lights = () => {
  const camSize = 150
  return (
    <>
      <ambientLight intensity={0.3 * Math.PI} />
      <directionalLight
        castShadow
        position={[2.5, 50, 5]}
        intensity={0.2 * Math.PI}
        shadow-mapSize={1024}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-camSize, camSize, -camSize, camSize, 0.1, 100]}
        />
      </directionalLight>
      <pointLight position={[-10, 0, -20]} intensity={Math.PI} />
      <pointLight position={[0, -10, 0]} intensity={Math.PI} />
    </>
  )
}
