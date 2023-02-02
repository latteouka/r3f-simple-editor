export default function () {
  return (
    <mesh rotation={[Math.PI / 2 + Math.PI, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial color={0xfef3e3} />
    </mesh>
  )
}
