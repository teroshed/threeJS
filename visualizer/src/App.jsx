import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import './App.css'


function App() {

  const [test, setTest] = useState(0);
  return (
    <>
        <button onClick={() => setTest(test + 1)}>
            Test {test}
        </button>
        <Canvas>
            <mesh >
                <boxGeometry args={[1, 2 ,3 ]} />
                <meshStandardMaterial />
            </mesh>
        </Canvas>
    </>
  )
}

export default App
