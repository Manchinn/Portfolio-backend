import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import app from '../server.js'

let server
let baseUrl

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      const port = server.address().port
      baseUrl = `http://localhost:${port}`
      resolve()
    })
  })
})

after(async () => {
  await new Promise((resolve) => server.close(resolve))
})

describe('GET /api/notifications', () => {
  it('returns success with array of notifications', async () => {
    const res = await fetch(`${baseUrl}/api/notifications`)
    const body = await res.json()
    assert.equal(res.status, 200)
    assert.equal(body.success, true)
    assert.ok(Array.isArray(body.data))
    assert.ok(body.data.length > 0)
  })

  it('each notification has required fields', async () => {
    const res = await fetch(`${baseUrl}/api/notifications`)
    const { data } = await res.json()
    for (const n of data) {
      assert.ok(n.id, 'missing id')
      assert.ok(['info', 'success', 'warning'].includes(n.type), `invalid type: ${n.type}`)
      assert.ok(n.title, 'missing title')
      assert.ok(n.message, 'missing message')
      assert.ok(n.date, 'missing date')
      assert.equal(typeof n.read, 'boolean')
    }
  })

  it('returns Thai notifications with ?lang=th', async () => {
    const res = await fetch(`${baseUrl}/api/notifications?lang=th`)
    const { data } = await res.json()
    // Thai text contains Thai characters
    const hasThai = data.some(n => /[\u0E00-\u0E7F]/.test(n.title))
    assert.ok(hasThai, 'Expected Thai characters in title')
  })

  it('returns Chinese notifications with ?lang=zh', async () => {
    const res = await fetch(`${baseUrl}/api/notifications?lang=zh`)
    const { data } = await res.json()
    const hasChinese = data.some(n => /[\u4E00-\u9FFF]/.test(n.title))
    assert.ok(hasChinese, 'Expected Chinese characters in title')
  })

  it('falls back to English for invalid lang', async () => {
    const res = await fetch(`${baseUrl}/api/notifications?lang=xx`)
    const { data } = await res.json()
    assert.ok(data.length > 0)
    // Should be English (no Thai/Chinese in first title)
    assert.ok(/[a-zA-Z]/.test(data[0].title))
  })
})

describe('POST /api/notifications/read', () => {
  it('marks notifications as read and returns readCount', async () => {
    const res = await fetch(`${baseUrl}/api/notifications/read`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: [1, 2] })
    })
    const body = await res.json()
    assert.equal(res.status, 200)
    assert.equal(body.success, true)
    assert.equal(body.data.readCount, 2)
  })

  it('GET reflects updated read status after marking', async () => {
    const res = await fetch(`${baseUrl}/api/notifications`)
    const { data } = await res.json()
    const n1 = data.find(n => n.id === 1)
    const n2 = data.find(n => n.id === 2)
    assert.equal(n1.read, true)
    assert.equal(n2.read, true)
  })

  it('returns 400 when ids is not an array', async () => {
    const res = await fetch(`${baseUrl}/api/notifications/read`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: 'not-an-array' })
    })
    const body = await res.json()
    assert.equal(res.status, 400)
    assert.equal(body.success, false)
  })

  it('handles empty ids array', async () => {
    const res = await fetch(`${baseUrl}/api/notifications/read`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: [] })
    })
    const body = await res.json()
    assert.equal(res.status, 200)
    assert.equal(body.data.readCount, 0)
  })
})
