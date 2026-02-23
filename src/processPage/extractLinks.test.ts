import { describe, it, expect } from 'vitest'
import { extractLinks } from './extractLinks'

function generateHtml(urls: string[]): string {
  return urls.map((u) => `<a href="${u}">link</a>`).join('\n')
}

describe('extractLinks', () => {
  const BASE_URL = 'http://example.com'
  const exampleUrls = ['http://example.com/about', 'http://example.com/contact']

  it('finds links within the passed html', () => {
    const html = generateHtml(exampleUrls)
    const result = extractLinks(html, BASE_URL)

    expect(result).toEqual(exampleUrls)
  })

  it('does not return duplicate links', () => {
    const html = generateHtml([...exampleUrls, ...exampleUrls])
    const result = extractLinks(html, BASE_URL)

    expect(result).toEqual(exampleUrls)
  })

  it('does not return the original link', () => {
    const html = generateHtml([BASE_URL, ...exampleUrls])
    const result = extractLinks(html, BASE_URL)

    expect(result).toEqual(exampleUrls)
  })

  it('works with partial URLs', () => {
    const html = generateHtml(['/about', '/contact'])
    const result = extractLinks(html, BASE_URL)

    expect(result).toEqual(['http://example.com/about', 'http://example.com/contact'])
  })

  it('only extracts http/https links', () => {
    const html = generateHtml([...exampleUrls, 'ftp://example.com/file', 'mailto:iana@iana.org'])
    const result = extractLinks(html, BASE_URL)

    expect(result).toEqual(exampleUrls)
  })

  it('only extracts links from same domain', () => {
    const html = generateHtml([...exampleUrls, 'http://otherdomain.com/page'])
    const result = extractLinks(html, BASE_URL)

    expect(result).toEqual(exampleUrls)
  })
})
