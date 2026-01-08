export function extractPPG(frame: ImageData): number {
  let sum = 0;
  for (let i = 0; i < frame.data.length; i += 4) {
    sum += frame.data[i]; // canal rouge
  }
  return sum / (frame.data.length / 4);
}
