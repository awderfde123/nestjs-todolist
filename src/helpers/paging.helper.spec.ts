import { Metadata } from '../models/dto/pagination'
import { getMetadataObject, getPageUrl, getSortObject } from './paging.helper'

describe('Test getSortObject', () => {
  it('should return SortObject', () => {
    const actual = getSortObject('name,-date,+sort')
    const expected = {
      name: 1,
      date: -1,
      sort: 1,
    }
    expect(JSON.stringify(actual)).toBe(JSON.stringify(expected))
  })
})

describe('Test getPageUrl', () => {
  it('should return PageUrl', () => {
    const actual = getPageUrl(
      'https://example.com/list?keyword=foo&page=1',
      1,
      3,
    )
    const expected = 'https://example.com/list?keyword=foo&page=3'
    expect(actual).toBe(expected)
  })
  it('should return PageUrl', () => {
    const actual = getPageUrl(
      'https://example.com/list?page=1&keyword=foo',
      1,
      3,
    )
    const expected = 'https://example.com/list?page=3&keyword=foo'
    expect(actual).toBe(expected)
  })
})

describe('Test getMetadataObject', () => {
  it('should return MetadataObject', () => {
    const actual = getMetadataObject(
      100,
      {
        keyword: 'foo',
        page: 3,
        limit: 10,
        sort: 'name,-date,+sort',
      },
      'https://example.com/list?keyword=foo&page=3',
      {
        name: 1,
        date: -1,
        sort: 1,
      },
    )
    const expected: Metadata = {
      count: 100,
      page: 3,
      last: 10,
      limit: 10,
      sort: {
        name: 1,
        date: -1,
        sort: 1,
      },
      links: {
        first: 'https://example.com/list?keyword=foo&page=1',
        previous: 'https://example.com/list?keyword=foo&page=2',
        current: 'https://example.com/list?keyword=foo&page=3',
        next: 'https://example.com/list?keyword=foo&page=4',
        last: 'https://example.com/list?keyword=foo&page=10',
      },
    }
    expect(JSON.stringify(actual)).toBe(JSON.stringify(expected))
  })
})
