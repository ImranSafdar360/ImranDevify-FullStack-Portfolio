import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { OwnershipBadge, ownershipBadge, type Ownership } from '@/components/ui/badge'

describe('ownershipBadge', () => {
  it.each<[Ownership, string, string]>([
    ['built', 'Built', 'built'],
    ['built-solo', 'Built solo', 'built'],
    ['extended', 'Extended', 'neutral'],
    ['contributed', 'Contributed', 'neutral'],
    ['in-development', 'In development', 'development'],
  ])('maps %s to "%s" with the %s style', (ownership, label, variant) => {
    expect(ownershipBadge(ownership)).toEqual({ label, variant })
  })
})

describe('OwnershipBadge', () => {
  it('renders the label so the claim is readable, not just a colour', () => {
    render(<OwnershipBadge ownership="in-development" />)
    expect(screen.getByText('In development')).toBeInTheDocument()
  })
})
