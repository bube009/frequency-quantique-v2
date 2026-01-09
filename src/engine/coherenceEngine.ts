export function coherenceScore(hrv: number): number {
  if (hrv < 20) return 30
  if (hrv < 50) return 60
  return 90
}
