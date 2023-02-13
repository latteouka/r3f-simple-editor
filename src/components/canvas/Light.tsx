export default function Light() {
  return (
    <>
      <ambientLight intensity={0.5} color='#FEF3E3' />
      <directionalLight
        // ref={directionalLightRef}
        args={['#FEF3E3', 1]}
        castShadow
        position={[2, 7, 6]}
        shadow-mapSize={1024}
        shadow-normalBias={-0.005}
        shadow-bias={-0.005}
        shadow-camera-near={0.1}
        shadow-camera-far={15}
        shadow-camera-top={-8}
        shadow-camera-bottom={8}
        shadow-camera-left={-8}
        shadow-camera-right={8}
      />

      <pointLight color='#F9F4E6' position={[-0.1, 1, -0.1]} intensity={0.2} distance={3} />
    </>
  )
}
