export default function Floor(props) {
  return (
    <mesh rotation={[Math.PI / 2 + Math.PI, 0, 0]} receiveShadow {...props}>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial color={0xfef3e3} />
    </mesh>
  )
}
