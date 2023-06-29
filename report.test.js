const { sortPages } = require('./report')
const { test, expect } = require('@jest/globals')

test('sortPages trial', () => {
    const input = {
        'https://in.search.yahoo.com/?fr2=inr': 3,
        'https://in.search.yahoo.com/?fr2=inr/path': 1
    }
    const actual = sortPages(input)
    const expected = [
        ['https://in.search.yahoo.com/?fr2=inr', 3],
        ['https://in.search.yahoo.com/?fr2=inr/path', 1]
    ]
    expect(actual).toEqual(expected)
})
