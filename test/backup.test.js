import assert from 'node:assert/strict'
import test from 'node:test'
import { readBackup } from '../src/backup.js'

test('legacy gzip backups remain readable', async () => {
  const input = JSON.stringify({ units: [{ id: 'ptsp' }], seksi: [], social: [] })
  const stream = new Blob([input]).stream().pipeThrough(new CompressionStream('gzip'))
  const compressed = await new Response(stream).blob()
  const signature = new Uint8Array(await compressed.slice(0, 2).arrayBuffer())

  assert.deepEqual([...signature], [0x1f, 0x8b])
  assert.equal(await readBackup(compressed), input)
})

test('JSON backups remain readable', async () => {
  const input = '{"units":[],"seksi":[],"social":[]}'
  assert.equal(await readBackup(new Blob([input])), input)
})
