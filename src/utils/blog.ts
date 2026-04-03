import { existsSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { CollectionEntry } from 'astro:content'

type BlogEntry = CollectionEntry<'blog'>

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const blogContentRoot = join(repoRoot, 'src', 'content', 'blog')

function getEntryTimestamp(entry: BlogEntry): number {
  return new Date(entry.data.updatedDate ?? entry.data.publishDate ?? 0).valueOf()
}

function getEntryMtime(entry: BlogEntry): number {
  const candidates = [
    join(blogContentRoot, `${entry.id}.md`),
    join(blogContentRoot, `${entry.id}.mdx`),
    join(blogContentRoot, entry.id, 'index.md'),
    join(blogContentRoot, entry.id, 'index.mdx')
  ]

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return statSync(candidate).mtimeMs
    }
  }

  return 0
}

export function sortBlogPosts(posts: BlogEntry[]): BlogEntry[] {
  return [...posts].sort((a, b) => {
    const timestampDiff = getEntryTimestamp(b) - getEntryTimestamp(a)
    if (timestampDiff !== 0) {
      return timestampDiff
    }

    const mtimeDiff = getEntryMtime(b) - getEntryMtime(a)
    if (mtimeDiff !== 0) {
      return mtimeDiff
    }

    return b.id.localeCompare(a.id)
  })
}
