import { animated, useSpring } from '@react-spring/three'
import { useEffect } from 'react'
import Items from './Items'

const Test = () => {
  const [spring, api]: any = useSpring(() => ({
    position: [0, 0, 0],
    config: { friction: 10 },
  }))

  useEffect(() => {
    api.start({
      position: [0, 5, 0],
    })
  }, [])

  return (
    <animated.group {...spring}>
      <Items name='blue_box' temp={false} />
    </animated.group>
  )
}
export default Test
