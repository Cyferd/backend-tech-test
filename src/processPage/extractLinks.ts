import * as cheerio from 'cheerio'

export function extractLinks(html: string, source: string): string[] {
  const urls: string[] = []
  const $ = cheerio.load(html)

  $('a[href]').each((_, element) => {
    const link = $(element).attr('href')
    if (!link) return

    urls.push(link)
  })

  return urls
}
