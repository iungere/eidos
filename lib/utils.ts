import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hashText = (text: string) => {
  let hash = 0
  if (text.length == 0) {
    return hash
  }
  for (let i = 0; i < text.length; i++) {
    let char = text.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}
