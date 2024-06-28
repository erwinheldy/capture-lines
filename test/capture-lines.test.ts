import { expect, it } from 'vitest'
import { captureLines } from '../src/capture-lines'

const file = 'test/content.html'

async function test(allowMultipleCaptures?: boolean, includeMarkers?: boolean) {
  return await captureLines({
    file,
    startMarker: '    <ul>',
    endMarker: '    </ul>',
    allowMultipleCaptures,
    includeMarkers,
  })
}

it('basic', async () => {
  await expect(test()).resolves.toEqual(`      <li>1</li>
      <li>2</li>
      <li>3</li>`)
})

it('allowMultipleCaptures', async () => {
  await expect(test(true)).resolves.toEqual(`      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>`)
})

it('includeMarkers', async () => {
  await expect(test(false, true)).resolves.toEqual(`    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>`)
})

it('allowMultipleCaptures and includeMarkers', async () => {
  await expect(test(true, true)).resolves.toEqual(`    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <ul>
      <li>4</li>
      <li>5</li>
      <li>6</li>
    </ul>`)
})

it('no result', async () => {
  await expect(captureLines({ file, startMarker: 'START', endMarker: 'END' })).resolves.toEqual('')
})
