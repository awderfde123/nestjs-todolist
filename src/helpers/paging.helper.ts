import { Metadata, PagingQuery } from '../models/dto/pagination'

export function getSortObject(sortQuerystring: string) {
  const arr = sortQuerystring ? sortQuerystring.split(',') : []
  if (arr.length === 0) {
    return { modifiedAt: -1, createdAt: -1 }
  }
  const sortObj = {}
  for (let part of arr) {
    part = part.trim()
    if (!part) {
      continue
    }
    const isDesc = part.indexOf('-') === 0
    const name = part.replace(/[^0-9a-zA-Z.]/, '')
    if (isDesc) {
      sortObj[name] = -1
    } else {
      sortObj[name] = 1
    }
  }
  return sortObj
}

export function getPageUrl(path: string, currentPage: number, newPage: number) {
  if (!path || currentPage === newPage) {
    return null
  }
  const arr = path.split(/[?&]/)
  let result = ''
  let counter = 0
  for (let part of arr) {
    part = part.trim()
    if (!part) {
      continue
    }
    const prefix = counter === 0 ? '' : counter === 1 ? '?' : '&'
    counter++
    if (part === 'page=' + currentPage) {
      result += prefix + 'page=' + newPage
      continue
    }
    result += prefix + part
  }
  return result
}

export function getMetadataObject(
  count: number,
  paging: PagingQuery,
  url: string,
  sortObj: Object,
): Metadata {
  const first = 1
  const last =
    Math.floor(count / paging.limit) + (count % paging.limit > 0 ? 1 : 0)
  const previous = paging.page === 1 ? 1 : paging.page - 1
  const next = paging.page === last ? last : paging.page + 1
  const pageExists = paging.page > 0 && paging.page <= last
  const metadata: Metadata = {
    count: count,
    page: pageExists ? paging.page : 1,
    last: pageExists ? last : 1,
    limit: paging.limit,
    sort: sortObj,
    links: pageExists
      ? {
          first: getPageUrl(url, paging.page, first),
          previous: getPageUrl(url, paging.page, previous),
          current: url,
          next: getPageUrl(url, paging.page, next),
          last: getPageUrl(url, paging.page, last),
        }
      : null,
  }
  return metadata
}

export function getMetadata(
  count: number,
  paging: PagingQuery,
  url: string,
): Metadata {
  paging.limit = +paging.limit
  paging.page = +paging.page
  const sort = getSortObject(paging.sort)
  const metadata = getMetadataObject(count, paging, url, sort)
  return metadata
}
