import { extractLinks } from './extractLinks'

async function fetchHtml(url: string): Promise<string> {
  const response = await fetch(url)
  return response.text()
}

export async function processPage(url: string): Promise<string[]> {
  try {
    const html = await fetchHtml(url)
    return extractLinks(html, url)
  } catch (e) {
    console.error(`Error processing page ${url}:`, e)
    return []
  }
}
