import grimoire from '../data/grimoire.json'

export function suggestGrimoireState(coherence: number) {
  if (coherence < 40) {
    return grimoire.filter(g => g.group === 'Énergie' || g.group === 'Nerveux')[0]
  }
  if (coherence < 70) {
    return grimoire.filter(g => g.group === 'Émotionnel')[0]
  }
  return grimoire.filter(g => g.group === 'Global')[0]
}
