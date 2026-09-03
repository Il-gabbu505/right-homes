import { useGLTF } from '@react-three/drei'
import { motion as motion3d } from 'framer-motion-3d';

export default function Model({ isEntered, ...props }) {
  const { nodes, materials } = useGLTF('/door.gltf')

  // --- SWING ANIMATIONS ---
  // Increased duration to 3.5s and added a 0.5s delay to match the camera
  const leftDoorVariants = {
    initial: { rotateY: 0 },
    opened: { rotateY: 1.5, transition: { duration: 3.5, ease: "easeInOut", delay: 0.5 } }
  };

  const rightDoorVariants = {
    initial: { rotateY: 0 },
    opened: { rotateY: -1.5, transition: { duration: 3.5, ease: "easeInOut", delay: 0.5 } }
  };

  return (
    <group {...props} dispose={null}>
      {/* 
        This is the main scale/rotation wrapper the 3D artist set up. 
        We leave this alone so the door stays upright. 
      */}
      <group rotation={[Math.PI, 0, Math.PI]} scale={0.025}>
        
        {/* --- LEFT DOOR --- */}
        <motion3d.group 
          position={[-35.451, 43.151, 1.036]}
          variants={leftDoorVariants}
          initial="initial"
          animate={isEntered ? "opened" : "initial"}
        >
          <mesh geometry={nodes.Mesh.geometry} material={materials.A23DMAT_004} />
          <mesh geometry={nodes.Mesh_1.geometry} material={materials.A23DMAT_003} />
          <mesh geometry={nodes.Mesh_2.geometry} material={materials.A23DMAT_001} />
          <mesh geometry={nodes.Mesh_3.geometry} material={materials.A23DMAT_002} />
        </motion3d.group>

        {/* --- DOOR FRAME --- (Static, does not move) */}
        <mesh geometry={nodes.A23DOBJ_002.geometry} material={materials.A23DMAT_001} />
        
        {/* --- RIGHT DOOR --- */}
        <motion3d.group 
          position={[36.055, 44.792, 1.036]}
          variants={rightDoorVariants}
          initial="initial"
          animate={isEntered ? "opened" : "initial"}
        >
          <mesh geometry={nodes.Mesh002.geometry} material={materials.A23DMAT_004} />
          <mesh geometry={nodes.Mesh002_1.geometry} material={materials.A23DMAT_002} />
          <mesh geometry={nodes.Mesh002_2.geometry} material={materials.A23DMAT_001} />
          <mesh geometry={nodes.Mesh002_3.geometry} material={materials.A23DMAT_003} />
        </motion3d.group>

      </group>
    </group>
  )
}

useGLTF.preload('/door.gltf')