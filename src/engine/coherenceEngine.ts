export function coherenceScore(hrv: number): number {
  if (hrv < 20) return 30      // faible
  if (hrv < 50) return 60      // moyen
  return 90                   // élevé
}
