import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { EASE_REVEAL, EASE_REVEAL_PATH, EASE_UI, EASE_UI_PATH } from './config'

let registered = false

// Register plugins and the two portfolio eases once, on the client.
export function registerGsap() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP)
  CustomEase.create(EASE_REVEAL, EASE_REVEAL_PATH)
  CustomEase.create(EASE_UI, EASE_UI_PATH)
  registered = true
}

export { gsap, ScrollTrigger, SplitText }
