const { normalizeURL, getURLfromHTML } = require('./crawl')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLfromHTML absolute', () => {
    const inputHTMLbody = `
    <html>
     <body>
      <a href="https://blog.boot.dev/">
        Boot.dev blog
      </a>
     </body>
    </html>
    `
    const inputbaseURL = 'https://blog.boot.dev'
    const actual = getURLfromHTML(inputHTMLbody, inputbaseURL)
    const expected = ['https://blog.boot.dev/']
    expect(actual).toEqual(expected)
})

test('getURLfromHTML relative', () => {
    const inputHTMLbody = `
    <html>
     <body>
      <a href="/path/">
        Boot.dev blog
      </a>
     </body>
    </html>
    `
    const inputbaseURL = 'https://blog.boot.dev'
    const actual = getURLfromHTML(inputHTMLbody, inputbaseURL)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLfromHTML both', () => {
    const inputHTMLbody = `
    <html>
     <body>
      <a href="https://blog.boot.dev/path1/">
        Boot.dev blog
      </a>
      <a href="/path2/">
        Boot.dev blog
      </a>
     </body>
    </html>
    `
    const inputbaseURL = 'https://blog.boot.dev'
    const actual = getURLfromHTML(inputHTMLbody, inputbaseURL)
    const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/']
    expect(actual).toEqual(expected)
})

test('getURLfromHTML invalid', () => {
    const inputHTMLbody = `
    <html>
     <body>
      <a href="invalid">
        Invalid
      </a>
     </body>
    </html>
    `
    const inputbaseURL = 'https://blog.boot.dev'
    const actual = getURLfromHTML(inputHTMLbody, inputbaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})