import { useGLTF } from '@react-three/drei'
import { motion as motion3d } from 'framer-motion-3d';

export default function Model({ isEntered, ...props }) {
  const { nodes, materials } = useGLTF('/door.gltf')

  // --- SWING ANIMATIONS ---
  // If the doors swing the wrong way (e.g. into the camera instead of away), 
  // just swap the 1.5 and -1.5 values below!
  const leftDoorVariants = {
    initial: { rotateY: 0 },
    opened: { rotateY: 1.5, transition: { duration: 1.5, ease: "easeInOut" } }
  };

  const rightDoorVariants = {
    initial: { rotateY: 0 },
    opened: { rotateY: -1.5, transition: { duration: 1.5, ease: "easeInOut" } }
  };

  return (
    <group {...props} dispose={null}>
      {/* 
        This is the main scale/rotation wrapper the 3D artist set up. 
        We leave this alone so the door stays upright. 
      */}
      <group rotation={[Math.PI, 0, Math.PI]} scale={0.025}>
        
        {/* --- LEFT DOOR --- (Changed to motion3d.group) */}
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
        
        {/* --- RIGHT DOOR --- (Changed to motion3d.group) */}
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