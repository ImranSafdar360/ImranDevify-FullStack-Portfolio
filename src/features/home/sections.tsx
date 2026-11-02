import type { Section } from '@/schemas/section'
import type { Settings } from '@/schemas/settings'
import { Hero } from './hero/hero'

// Maps each stored section to its component, in the order the admin set (T30 adds editing).
export function HomeSections({ sections, settings }: { sections: Section[]; settings: Settings }) {
  return sections.map((section) => {
    switch (section.type) {
      case 'hero':
        return <Hero key={section.key} content={section.content} settings={settings} />
    }
  })
}
