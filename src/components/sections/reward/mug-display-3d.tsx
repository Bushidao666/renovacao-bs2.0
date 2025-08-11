'use client'

import * as React from 'react'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { motion } from 'framer-motion'

interface MugDisplay3DProps {
  username?: string
}

export function MugDisplay3D({ username = 'SpyHacker' }: MugDisplay3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [_error, _setError] = useState(false)
  
  useEffect(() => {
    if (!mountRef.current) return
    
    const container = mountRef.current
    const scene = new THREE.Scene()
    scene.background = null // Transparent background
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      30,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    )
    camera.position.set(-0.2, 0.4, 2.2)
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    })
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    container.appendChild(renderer.domElement)
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)
    
    const mainLight = new THREE.DirectionalLight(0xffffff, 1)
    mainLight.position.set(5, 5, 5)
    mainLight.castShadow = true
    mainLight.shadow.mapSize.width = 2048
    mainLight.shadow.mapSize.height = 2048
    scene.add(mainLight)
    
    // Green accent lights
    const greenLight1 = new THREE.PointLight(0x00ff00, 0.5, 10)
    greenLight1.position.set(-2, 0, 2)
    scene.add(greenLight1)
    
    const greenLight2 = new THREE.PointLight(0x00ff00, 0.3, 10)
    greenLight2.position.set(2, 2, -2)
    scene.add(greenLight2)
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enablePan = false
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 2
    controls.maxPolarAngle = Math.PI / 2
    controls.minPolarAngle = Math.PI / 3
    
    // Fallback: Create a simple mug if model doesn't load
    const createFallbackMug = () => {
      const group = new THREE.Group()
      
      // Mug body
      const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.35, 1, 32)
      const bodyMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x0a0a0a,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      })
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
      body.castShadow = true
      body.receiveShadow = true
      group.add(body)
      
      // Handle
      const handleGeometry = new THREE.TorusGeometry(0.15, 0.04, 8, 16, Math.PI)
      const handle = new THREE.Mesh(handleGeometry, bodyMaterial)
      handle.position.set(0.45, 0, 0)
      handle.rotation.z = Math.PI / 2
      handle.castShadow = true
      group.add(handle)
      
      // Load and apply logo texture directly to mug material
      const textureLoader = new THREE.TextureLoader()
      textureLoader.load(
        '/Blacksider 2.0 horizontal fundo preto.png',
        (logoTexture) => {
          logoTexture.colorSpace = THREE.SRGBColorSpace
          logoTexture.flipY = true
          
          // Keep texture at original size
          logoTexture.wrapS = THREE.RepeatWrapping
          logoTexture.wrapT = THREE.RepeatWrapping
          
          // Update body material with logo texture
          body.material = new THREE.MeshPhysicalMaterial({
            map: logoTexture,
            color: 0xffffff,
            metalness: 0.1,
            roughness: 0.3,
            clearcoat: 1,
            clearcoatRoughness: 0.05,
          })
        }
      )
      
      return group
    }
    
    // Load GLTF model
    const loader = new GLTFLoader()
    let mugModel: THREE.Object3D
    const goldenParticles: THREE.Group = new THREE.Group()
    let reflectionPlane: THREE.Mesh | undefined
    let glowPlane: THREE.Mesh | undefined
    
    loader.load(
      '/models/model1.glb',
      (gltf) => {
        mugModel = gltf.scene
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(mugModel)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        
        const maxSize = Math.max(size.x, size.y, size.z)
        const scale = 2.0 / maxSize
        mugModel.scale.setScalar(scale)
        
        mugModel.position.x = -center.x * scale
        mugModel.position.y = -center.y * scale
        mugModel.position.z = -center.z * scale
        
        // Load logo texture first
        const textureLoader = new THREE.TextureLoader()
        const imagePath = '/Blacksider 2.0 horizontal fundo preto.png'
        
        textureLoader.load(
          imagePath,
          (logoTexture) => {
            console.log('Logo texture loaded successfully')
            logoTexture.colorSpace = THREE.SRGBColorSpace
            logoTexture.flipY = true // Correct orientation
            
            // Keep texture at original size
            logoTexture.wrapS = THREE.RepeatWrapping
            logoTexture.wrapT = THREE.RepeatWrapping
            
            // Apply materials to mug
            mugModel.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                console.log('Mesh found:', child.name)
                
                // Apply logo texture to the main mug body
                if (child.name.includes('Mug') || child.name.includes('Porcelain') || child.name.includes('001')) {
                  // Create material with logo texture
                  const mugMaterial = new THREE.MeshPhysicalMaterial({
                    map: logoTexture,
                    color: 0xffffff, // White to show texture colors properly
                    metalness: 0.05,
                    roughness: 0.2,
                    clearcoat: 1,
                    clearcoatRoughness: 0.01,
                    envMapIntensity: 2,
                    reflectivity: 0.8,
                  })
                  child.material = mugMaterial
                  child.castShadow = true
                  child.receiveShadow = true
                  console.log('Applied logo texture to:', child.name)
                }
                // Handle other parts (handle, rim) with black material
                else {
                  child.material = new THREE.MeshPhysicalMaterial({
                    color: 0x0a0a0a,
                    metalness: 0.9,
                    roughness: 0.1,
                    clearcoat: 1,
                    clearcoatRoughness: 0.05,
                  })
                  child.castShadow = true
                  child.receiveShadow = true
                }
              }
            })
          },
          (progress) => {
            console.log('Loading logo:', (progress.loaded / progress.total * 100) + '%')
          },
          (error) => {
            console.error('Error loading logo texture:', error)
            console.error('Attempted path:', imagePath)
            
            // Fallback to black mug if texture fails
            mugModel.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                child.material = new THREE.MeshPhysicalMaterial({
                  color: 0x0a0a0a,
                  metalness: 0.9,
                  roughness: 0.1,
                  clearcoat: 1,
                  clearcoatRoughness: 0.05,
                  envMapIntensity: 1.5,
                })
                child.castShadow = true
                child.receiveShadow = true
              }
            })
          }
        )
        
        scene.add(mugModel)
        setIsLoading(false)
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%')
      },
      (error) => {
        console.error('Error loading model:', error)
        // Fallback to created mug
        mugModel = createFallbackMug()
        scene.add(mugModel)
        setIsLoading(false)
      }
    )
    
    // Golden luxury particles (rare)
    // goldenParticles setup
    const goldenCount = 5
    
    for (let i = 0; i < goldenCount; i++) {
      const particleGeometry = new THREE.SphereGeometry(0.008, 8, 8)
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      })
      const particle = new THREE.Mesh(particleGeometry, particleMaterial)
      
      // Random position in sphere
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = 1.2 + Math.random() * 0.8
      
      particle.position.x = radius * Math.sin(phi) * Math.cos(theta)
      particle.position.y = radius * Math.sin(phi) * Math.sin(theta)
      particle.position.z = radius * Math.cos(phi)
      
      particle.userData = { 
        offset: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5
      }
      
      goldenParticles.add(particle)
    }
    
    scene.add(goldenParticles)
    
    // Reflection/Shadow plane (subtle)
    const reflectionGeometry = new THREE.CircleGeometry(0.8, 64)
    const reflectionMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    })
    reflectionPlane = new THREE.Mesh(reflectionGeometry, reflectionMaterial) // eslint-disable-line prefer-const
    reflectionPlane.rotation.x = -Math.PI / 2
    reflectionPlane.position.y = -0.6
    scene.add(reflectionPlane)
    
    // Glow under mug
    const glowGeometry = new THREE.RingGeometry(0.2, 0.6, 64)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    })
    glowPlane = new THREE.Mesh(glowGeometry, glowMaterial) // eslint-disable-line prefer-const
    glowPlane.rotation.x = -Math.PI / 2
    glowPlane.position.y = -0.59
    scene.add(glowPlane)
    
    // Animation
    const clock = new THREE.Clock()
    const animate = () => {
      requestAnimationFrame(animate)
      
      const elapsedTime = clock.getElapsedTime()
      
      
      // Animate golden particles
      goldenParticles.children.forEach((particle) => {
        const userData = particle.userData
        const floatY = Math.sin(elapsedTime * userData.speed + userData.offset) * 0.1
        particle.position.y += floatY * 0.01
        
        // Sparkle effect
        const material = (particle as THREE.Mesh).material as THREE.MeshBasicMaterial
        material.opacity = 0.6 + Math.sin(elapsedTime * 3 + userData.offset) * 0.4
      })
      
      // Animate reflection/glow
      if (reflectionPlane && glowPlane) {
        const distance = 0.6 + Math.sin(elapsedTime * 0.5) * 0.03
        reflectionPlane.position.y = -distance
        glowPlane.position.y = -distance + 0.01
        
        // Pulse glow
        const glowOpacity = 0.08 + Math.sin(elapsedTime * 2) * 0.02
        ;(glowPlane.material as THREE.MeshBasicMaterial).opacity = glowOpacity
      }
      
      // Float mug elegantly
      if (mugModel) {
        mugModel.position.y = Math.sin(elapsedTime * 0.5) * 0.03
        mugModel.rotation.y += 0.002 // Subtle rotation
      }
      
      controls.update()
      renderer.render(scene, camera)
    }
    
    animate()
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = container.offsetWidth / container.offsetHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.offsetWidth, container.offsetHeight)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [username])
  
  return (
    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] max-w-full overflow-hidden">
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <motion.div
            className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
      
      {/* 3D Container */}
      <div ref={mountRef} className="w-full h-full" />
      
      {/* Premium badge */}
      <motion.div
        className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black px-2 py-1 sm:px-3 rounded-bl-lg font-bold text-[10px] sm:text-xs uppercase tracking-wider"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        Edição Limitada
      </motion.div>
      
      {/* Glow overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
      </div>
    </div>
  )
}