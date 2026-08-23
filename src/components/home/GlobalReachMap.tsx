"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/Home/GlobalReachMap.module.css'
import { resolveStorageUrl } from '@/lib/supabase/client'
import type { GlobalReachNode } from '@/lib/supabase/types'

interface GlobalReachMapProps {
  nodes?: GlobalReachNode[]
}

const ARC_PATHS = [
  "M 8,38 Q 30,15 51,28",
  "M 51,28 Q 70,50 88,38",
  "M 15,48 Q 35,55 55,55",
  "M 25,65 Q 40,50 51,28",
  "M 88,38 Q 75,60 55,55",
]

// Desplazamiento global hacia la derecha, como % del ancho del mapa.
// Se aplica por igual a los dots y a las líneas de arco.
const SHIFT_X = 0

const GlobalReachMap = ({ nodes }: GlobalReachMapProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  if (!nodes || nodes.length === 0) return null

  const handleMouseEnter = (index: number, e: React.MouseEvent) => {
    setHoveredIndex(index)
    setTooltipPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  const hoveredNode = hoveredIndex !== null ? nodes[hoveredIndex] : null

  return (
    <div className={styles.mapWrapper}>
      {/* Grid overlay for tech feel */}
      <div className={styles.gridOverlay}></div>

      {/* Caja con el mismo ratio que el mapa: dentro de ella los % de
          dots y arcos siempre caen sobre el mismo punto del mapa */}
      <div className={styles.mapArea}>
        {/* Map base layer */}
        <Image
          src="/map-world.svg"
          alt=""
          fill
          className={styles.mapBase}
          draggable={false}
        />

        {/* SVG overlay for arcs and glow */}
        <svg className={styles.svgOverlay} viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="arc-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#22c55e" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <g transform={`translate(${SHIFT_X} 0)`}>
            {ARC_PATHS.map((d, i) => (
              <path
                key={i}
                d={d}
                className={styles.arc}
                filter="url(#arc-glow)"
              />
            ))}
          </g>
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => (
          <div
            key={i}
            className={styles.node}
            style={{ top: `${node.y}%`, left: `${node.x + SHIFT_X}%` }}
            onMouseEnter={(e) => handleMouseEnter(i, e)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <span className={styles.nodePulse}></span>
            <span className={styles.nodeDot}></span>
            {node.logo && (
              <img
                src={resolveStorageUrl(node.logo) ?? ''}
                alt={node.country}
                className={styles.nodeLogo}
              />
            )}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredNode && (
        <div
          className={styles.tooltip}
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
          }}
        >
          <div className={styles.tooltipHeader}>
            {hoveredNode.logo && (
              <img
                src={resolveStorageUrl(hoveredNode.logo) ?? ''}
                alt={hoveredNode.country}
                className={styles.tooltipLogo}
              />
            )}
            <span className={styles.tooltipCountry}>{hoveredNode.country}</span>
            {hoveredNode.label && (
              <span className={styles.tooltipLabel}>{hoveredNode.label}</span>
            )}
          </div>
          {hoveredNode.client && (
            <div className={styles.tooltipClient}>{hoveredNode.client}</div>
          )}
          {hoveredNode.description && (
            <div className={styles.tooltipDesc}>{hoveredNode.description}</div>
          )}
        </div>
      )}
    </div>
  )
}

export default GlobalReachMap
