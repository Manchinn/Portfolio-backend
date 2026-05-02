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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const getJson = (path) =>
  fetch(`${baseUrl}${path}`).then(async (res) => ({ res, body: await res.json() }))

const postJson = (path, payload) =>
  fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(async (res) => ({ res, body: await res.json() }))

const putJson = (path, payload) =>
  fetch(`${baseUrl}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(async (res) => ({ res, body: await res.json() }))

const deleteJson = (path) =>
  fetch(`${baseUrl}${path}`, { method: 'DELETE' }).then(async (res) => ({
    res,
    body: await res.json(),
  }))

// ---------------------------------------------------------------------------
// GET /api/todos
// ---------------------------------------------------------------------------

describe('GET /api/todos', () => {
  it('returns empty array initially', async () => {
    const { res, body } = await getJson('/api/todos')
    assert.equal(res.status, 200)
    assert.equal(body.success, true)
    assert.ok(Array.isArray(body.data))
    assert.equal(body.data.length, 0)
  })

  it('returns todos after creating some', async () => {
    await postJson('/api/todos', { title: 'Seeded todo A' })
    await postJson('/api/todos', { title: 'Seeded todo B' })

    const { res, body } = await getJson('/api/todos')
    assert.equal(res.status, 200)
    assert.equal(body.success, true)
    assert.ok(Array.isArray(body.data))
    assert.ok(body.data.length >= 2)
  })
})

// ---------------------------------------------------------------------------
// POST /api/todos
// ---------------------------------------------------------------------------

describe('POST /api/todos', () => {
  it('creates a todo with just title, completed defaults to false', async () => {
    const { res, body } = await postJson('/api/todos', { title: 'Buy groceries' })
    assert.equal(res.status, 200)
    assert.equal(body.success, true)
    assert.equal(body.data.title, 'Buy groceries')
    assert.equal(body.data.completed, false)
  })

  it('creates a todo with title and completed: true', async () => {
    const { res, body } = await postJson('/api/todos', {
      title: 'Already done task',
      completed: true,
    })
    assert.equal(res.status, 200)
    assert.equal(body.success, true)
    assert.equal(body.data.title, 'Already done task')
    assert.equal(body.data.completed, true)
  })

  it('returns 400 when title is missing', async () => {
    const { res, body } = await postJson('/api/todos', { completed: false })
    assert.equal(res.status, 400)
    assert.equal(body.success, false)
    assert.ok(typeof body.error === 'string')
  })

  it('returns 400 when title is empty string', async () => {
    const { res, body } = await postJson('/api/todos', { title: '' })
    assert.equal(res.status, 400)
    assert.equal(body.success, false)
    assert.ok(typeof body.error === 'string')
  })

  it('validates returned todo has all required fields: id, title, completed, createdAt', async () => {
    const { body } = await postJson('/api/todos', { title: 'Field validation todo' })
    const todo = body.data

    assert.ok(typeof todo.id === 'number', 'id must be a number')
    assert.ok(typeof todo.title === 'string', 'title must be a string')
    assert.ok(typeof todo.completed === 'boolean', 'completed must be a boolean')
    assert.ok(typeof todo.createdAt === 'string', 'createdAt must be a string')
    assert.ok(!isNaN(Date.parse(todo.createdAt)), 'createdAt must be a valid ISO date string')
  })
})

// ---------------------------------------------------------------------------
// PUT /api/todos/:id
// ---------------------------------------------------------------------------

describe('PUT /api/todos/:id', () => {
  let todoId

  before(async () => {
    const { body } = await postJson('/api/todos', { title: 'Original title' })
    todoId = body.data.id
  })

  it('updates title of existing todo', async () => {
    const { res, body } = await putJson(`/api/todos/${todoId}`, {
      title: 'Updated title',
    })
    assert.equal(res.status, 200)
    assert.equal(body.success, true)
    assert.equal(body.data.id, todoId)
    assert.equal(body.data.title, 'Updated title')
  })

  it('updates completed status of existing todo', async () => {
    const { res, body } = await putJson(`/api/todos/${todoId}`, {
      completed: true,
    })
    assert.equal(res.status, 200)
    assert.equal(body.success, true)
    assert.equal(body.data.id, todoId)
    assert.equal(body.data.completed, true)
  })

  it('returns 404 for nonexistent id', async () => {
    const { res, body } = await putJson('/api/todos/999999', { title: 'Ghost' })
    assert.equal(res.status, 404)
    assert.equal(body.success, false)
    assert.ok(typeof body.error === 'string')
  })

  it('returns 400 when no update fields are provided', async () => {
    const { res, body } = await putJson(`/api/todos/${todoId}`, {})
    assert.equal(res.status, 400)
    assert.equal(body.success, false)
    assert.ok(typeof body.error === 'string')
  })
})

// ---------------------------------------------------------------------------
// DELETE /api/todos/:id
// ---------------------------------------------------------------------------

describe('DELETE /api/todos/:id', () => {
  let todoId

  before(async () => {
    const { body } = await postJson('/api/todos', { title: 'Todo to delete' })
    todoId = body.data.id
  })

  it('deletes an existing todo and returns { deleted: true }', async () => {
    const { res, body } = await deleteJson(`/api/todos/${todoId}`)
    assert.equal(res.status, 200)
    assert.equal(body.success, true)
    assert.equal(body.data.deleted, true)
  })

  it('verifies the deleted todo is no longer present in GET /api/todos', async () => {
    const { body } = await getJson('/api/todos')
    const found = body.data.find((t) => t.id === todoId)
    assert.equal(found, undefined, 'Deleted todo should not appear in the list')
  })

  it('returns 404 when deleting a nonexistent id', async () => {
    const { res, body } = await deleteJson('/api/todos/999999')
    assert.equal(res.status, 404)
    assert.equal(body.success, false)
    assert.ok(typeof body.error === 'string')
  })
})

// ---------------------------------------------------------------------------
// Integration flow: full CRUD cycle
// ---------------------------------------------------------------------------

describe('Integration flow: full CRUD cycle', () => {
  it('create → read → update → delete → verify gone', async () => {
    // CREATE
    const { res: createRes, body: createBody } = await postJson('/api/todos', {
      title: 'CRUD cycle todo',
    })
    assert.equal(createRes.status, 200)
    assert.equal(createBody.success, true)
    const id = createBody.data.id
    assert.ok(typeof id === 'number')

    // READ — confirm it appears in the list
    const { body: listBody } = await getJson('/api/todos')
    const found = listBody.data.find((t) => t.id === id)
    assert.ok(found, 'Newly created todo should appear in GET /api/todos')
    assert.equal(found.title, 'CRUD cycle todo')
    assert.equal(found.completed, false)

    // UPDATE — change title and mark complete
    const { res: updateRes, body: updateBody } = await putJson(`/api/todos/${id}`, {
      title: 'CRUD cycle todo — updated',
      completed: true,
    })
    assert.equal(updateRes.status, 200)
    assert.equal(updateBody.success, true)
    assert.equal(updateBody.data.title, 'CRUD cycle todo — updated')
    assert.equal(updateBody.data.completed, true)

    // DELETE
    const { res: deleteRes, body: deleteBody } = await deleteJson(`/api/todos/${id}`)
    assert.equal(deleteRes.status, 200)
    assert.equal(deleteBody.success, true)
    assert.equal(deleteBody.data.deleted, true)

    // VERIFY GONE — must not appear in list
    const { body: afterBody } = await getJson('/api/todos')
    const afterFound = afterBody.data.find((t) => t.id === id)
    assert.equal(afterFound, undefined, 'Deleted todo must not appear in list')

    // VERIFY GONE — PUT and DELETE must both 404
    const { res: putAfter } = await putJson(`/api/todos/${id}`, { title: 'ghost' })
    assert.equal(putAfter.status, 404)

    const { res: deleteAfter } = await deleteJson(`/api/todos/${id}`)
    assert.equal(deleteAfter.status, 404)
  })
})
