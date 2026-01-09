export function calculateHRV(intervals: number[]): number {
  if (intervals.length < 2) return 0
  const mean = intervals.reduce((a, b) => a + b) / intervals.length
  return Math.sqrt(intervals.reduce((s, v) => s + (v - mean) ** 2, 0) / intervals.length)
}
