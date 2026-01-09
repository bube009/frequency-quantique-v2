export function mapFrequency(score: number): number {
  if (score < 40) return 174
  if (score < 70) return 417
  return 528
}
