# capture-lines

A utility to capture lines from a text file between specified start and end markers with optional inclusion of markers and support for multiple captures.

## Installation

You can install this package via npm:

```sh
npm install capture-lines
```

## Usage / Example

Here is an example of how to use the `captureLines` function:

```typescript
import { captureLines } from 'capture-lines'

const result = await captureLines({
  file: 'path/to/your/file.txt',
  startMarker: 'START',
  endMarker: 'END',
  allowMultipleCaptures: true,
  includeMarkers: true,
})

console.log(result)
```

## Options

The `captureLines` function takes an options object with the following properties:
 - file: `string` - The path to the file to read.
 - startMarker: `string` - The marker that indicates the start of the capture.
 - endMarker: `string` - The marker that indicates the end of the capture.
 - allowMultipleCaptures: `boolean` (optional) - Whether to allow multiple captures within the file. Default is `false`.
 - includeMarkers: `boolean` (optional) - Whether to include the start and end markers in the captured output. Default is `false`.

## License

[MIT](./LICENSE)
