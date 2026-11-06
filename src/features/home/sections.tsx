import type { Project } from '@/schemas/project'
import type { Section } from '@/schemas/section'
import type { Settings } from '@/schemas/settings'
import { Capabilities } from './capabilities/capabilities'
import { Hero } from './hero/hero'
import { Integrations } from './integrations/integrations'

type HomeSectionsProps = { sections: Section[]; settings: Settings; projects: Project[] }

// Maps each stored section to its component, in the order the admin set (T30 adds editing).
export function HomeSections({ sections, settings, projects }: HomeSectionsProps) {
  return sections.map((section) => {
    switch (section.type) {
      case 'hero':
        return <Hero key={section.key} content={section.content} settings={settings} />
      case 'integrations':
        return <Integrations key={section.key} content={section.content} />
      case 'capabilities':
        return <Capabilities key={section.key} content={section.content} projects={projects} />
    }
  })
}
