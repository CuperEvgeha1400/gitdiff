import { useClassName } from 'share/lib/useClassName/useClassName'
describe('ClassNames Test', () => {
    test('Initial test', () => {
        expect(useClassName({ cls: 'fdfd', mode: {}, classes: [] })).toBe('fdfd')
    })
    test('Give mode example true', () => {
        expect(useClassName({ cls: 'fdfd', mode: { 'shared': true }, classes: [] })).toBe('fdfd shared')
    })
    test('Give mode example false', () => {
        expect(useClassName({ cls: 'fdfd', mode: { 'shared': false }, classes: [] })).toBe('fdfd')
    })
    test('Give classes example ', () => {
        expect(useClassName({ cls: 'fdfd', mode: {}, classes: ['src'] })).toBe('fdfd src')
    })
})
