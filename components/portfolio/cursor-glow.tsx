"use client"

import * as React from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"

export function CursorGlow() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const maskImage = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.16), transparent 72%)`

  React.useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)
    }

    window.addEventListener("mousemove", onMouseMove)
    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 hidden bg-foreground/20 dark:bg-white md:block"
      style={{
        WebkitMaskImage: maskImage,
        maskImage,
      }}
    />
  )
}
