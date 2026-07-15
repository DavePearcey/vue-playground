export type FakePost = {
  id: number
  title: string
  body: string
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Fake external API — always waits 2s before resolving. */
export async function fetchFakePosts(): Promise<FakePost[]> {
  await delay(2000)

  return [
    {
      id: 1,
      title: 'Suspense suspended',
      body: 'While this promise was pending, Vue showed the fallback slot.',
    },
    {
      id: 2,
      title: 'Async setup resolved',
      body: 'The child used top-level await, so Suspense waited for it.',
    },
  ]
}
