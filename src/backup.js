export async function readBackup(file) {
  const signature = new Uint8Array(await file.slice(0, 2).arrayBuffer())
  if (signature[0] !== 0x1f || signature[1] !== 0x8b) return file.text()
  if (typeof DecompressionStream === 'undefined') {
    throw new Error('Peramban ini tidak mendukung pemulihan cadangan terkompresi.')
  }
  const stream = file.stream().pipeThrough(new DecompressionStream('gzip'))
  return new Response(stream).text()
}
