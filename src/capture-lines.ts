import { readFile } from 'node:fs/promises'

export async function captureLines(options: CaptureLinesOptions): Promise<string> {
  const { file, startMarker, endMarker, allowMultipleCaptures, includeMarkers } = options

  const text = await readFile(file, 'utf8')
  const lines = text.split('\n')

  let captureMode = false
  const capturedLines = []

  for (const line of lines) {
    if (captureMode) {
      if (line === endMarker) {
        if (includeMarkers) {
          capturedLines.push(line)
        }
        captureMode = false
        if (!allowMultipleCaptures) {
          break
        }
      }
      else {
        capturedLines.push(line)
      }
    }
    else {
      if (line === startMarker) {
        if (includeMarkers) {
          capturedLines.push(line)
        }
        captureMode = true
      }
    }
  }

  return capturedLines.join('\n')
}

export interface CaptureLinesOptions {
  file: string
  startMarker: string
  endMarker: string
  allowMultipleCaptures?: boolean
  includeMarkers?: boolean
}
