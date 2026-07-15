import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchFakePosts } from '../fakePosts'

describe('fetchFakePosts', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('resolves with posts after 2 seconds', async () => {
    const pending = fetchFakePosts()

    await vi.advanceTimersByTimeAsync(1999)
    let settled = false
    void pending.then(() => {
      settled = true
    })
    await Promise.resolve()
    expect(settled).toBe(false)

    await vi.advanceTimersByTimeAsync(1)
    const posts = await pending

    expect(posts).toHaveLength(2)
    expect(posts[0]).toMatchObject({
      id: 1,
      title: expect.any(String),
      body: expect.any(String),
    })
  })
})
