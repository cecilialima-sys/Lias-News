"use client"

import { useEffect, useRef } from "react"

const neuralBlueprint = {
  nodes: [
    { x: 4, y: 88 }, { x: 10, y: 82 }, { x: 18, y: 90 }, { x: 26, y: 80 },
    { x: 35, y: 92 }, { x: 46, y: 84 }, { x: 56, y: 91 }, { x: 66, y: 79 },
    { x: 76, y: 90 }, { x: 86, y: 82 }, { x: 96, y: 91 }, { x: 16, y: 72 },
    { x: 31, y: 70 }, { x: 52, y: 72 }, { x: 72, y: 68 }, { x: 88, y: 71 }
  ],
  links: [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10],
    [1, 11], [3, 12], [5, 13], [7, 14], [9, 15], [11, 12], [12, 13], [13, 14], [14, 15],
    [2, 12], [4, 13], [6, 14], [8, 15]
  ]
}

export function NeuralBackground() {
  const clusterRef = useRef<HTMLDivElement>(null)
  const nodeElementsRef = useRef<HTMLSpanElement[]>([])
  const linkElementsRef = useRef<{ el: HTMLSpanElement; start: { x: number; y: number }; end: { x: number; y: number } }[]>([])

  useEffect(() => {
    const cluster = clusterRef.current
    if (!cluster) return

    // Clear existing elements
    cluster.innerHTML = ""
    nodeElementsRef.current = []
    linkElementsRef.current = []

    // Create links
    neuralBlueprint.links.forEach(([startIndex, endIndex]) => {
      const start = neuralBlueprint.nodes[startIndex]
      const end = neuralBlueprint.nodes[endIndex]
      const dx = end.x - start.x
      const dy = end.y - start.y
      const length = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)

      const el = document.createElement("span")
      el.className = "neural-link"
      el.style.left = `${start.x}%`
      el.style.top = `${start.y}%`
      el.style.width = `${length}%`
      el.style.transform = `rotate(${angle}deg)`
      cluster.appendChild(el)

      linkElementsRef.current.push({ el, start, end })
    })

    // Create nodes
    neuralBlueprint.nodes.forEach((node) => {
      const el = document.createElement("span")
      el.className = "neural-node"
      el.style.left = `${node.x}%`
      el.style.top = `${node.y}%`
      cluster.appendChild(el)

      nodeElementsRef.current.push(el)
    })

    let rafId: number | null = null

    const handleMouseMove = (event: MouseEvent) => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      rafId = requestAnimationFrame(() => {
        energizeNetwork(event.clientX, event.clientY)
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const energizeNetwork = (clientX: number, clientY: number) => {
    const pointerX = (clientX / window.innerWidth) * 100
    const pointerY = (clientY / window.innerHeight) * 100

    neuralBlueprint.nodes.forEach((node, index) => {
      const distance = Math.hypot(node.x - pointerX, node.y - pointerY)
      nodeElementsRef.current[index]?.classList.toggle("is-energized", distance < 12)
    })

    linkElementsRef.current.forEach((link) => {
      const midX = (link.start.x + link.end.x) / 2
      const midY = (link.start.y + link.end.y) / 2
      const distance = Math.hypot(midX - pointerX, midY - pointerY)
      link.el.classList.toggle("is-energized", distance < 14)
    })
  }

  return (
    <div className="neural-bg" aria-hidden="true">
      <div ref={clusterRef} className="neural-cluster" />
    </div>
  )
}
