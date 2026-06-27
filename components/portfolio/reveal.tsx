"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px 0px -80px", amount: 0.16 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export function MotionGrid({ children, className }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-80px 0px -80px", amount: 0.12 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export function MotionItem({ children, className }: RevealProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
