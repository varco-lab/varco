import { describe, it, expect } from 'vitest'
import { decodeSearchParams } from './decode-search-params.js'

describe('decodeSearchParams', () => {
    it('decodes empty query', () => {
        const result = decodeSearchParams('')
        expect(result).toEqual({})
    })

    it('decodes single parameter', () => {
        const result = decodeSearchParams('?foo=bar')
        expect(result).toEqual({ foo: 'bar' })
    })

    it('decodes multiple parameters', () => {
        const result = decodeSearchParams('?foo=bar&baz=qux')
        expect(result).toEqual({ foo: 'bar', baz: 'qux' })
    })

    it('handles parameters without value', () => {
        const result = decodeSearchParams('?foo=&baz=qux')
        expect(result).toEqual({ foo: '', baz: 'qux' })
    })
})
