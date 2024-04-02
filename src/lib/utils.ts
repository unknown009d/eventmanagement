import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const imagePlaceHolder = "/EventImages/ImagePlaceholder.webp";

export const MAX_FILE_SIZE = 5 // 5MB
export const MAX_FILE_SIZE_FULL = MAX_FILE_SIZE * 1024 * 1024
export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]
export const acceptImage = ACCEPTED_IMAGE_TYPES.map(type => `.${type.split('/')[1]}`).join(',') 
