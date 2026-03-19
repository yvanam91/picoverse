import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBoxShadow(style: string = 'none', color: string = '#e5e7eb', opacity: number = 0.5): string {
  if (style === 'none') return 'none'

  // Helper to get rgba from hex
  const hexToRgba = (hex: string, op: number) => {
    let cleanHex = hex.replace('#', '')
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(char => char + char).join('')
    }
    
    // Basic validation
    if (!/^[0-9a-fA-F]{6}$/.test(cleanHex)) {
      return `rgba(0, 0, 0, ${op})`
    }
    
    const r = parseInt(cleanHex.substring(0, 2), 16)
    const g = parseInt(cleanHex.substring(2, 4), 16)
    const b = parseInt(cleanHex.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${op})`
  }

  const rgba = hexToRgba(color, opacity)

  switch (style) {
    case 'hard':
      return `4px 4px 0px 0px ${rgba}`
    case 'soft':
      return `0px 10px 25px -5px ${rgba}, 0px 8px 10px -6px ${rgba}`
    default:
      return 'none'
  }
}

export function normalizeSlug(text: string): string {
  if (!text) return ''
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}
