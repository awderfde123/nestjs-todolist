import {
  isArray,
  isBoolean,
  isFunction,
  isNull,
  isNullOrEmpty,
  isNullOrUndefined,
  isNumber,
  isObject,
  isString,
  isSymbol,
  isUndefined,
} from './util.helper'

describe('Test isArray', () => {
  it('should return true when Array', () => {
    const actual = isArray([])
    expect(actual).toBe(true)
  })
  it('should return false when String', () => {
    const actual1 = isArray('')
    expect(actual1).toBe(false)
    const actual2 = isArray('string')
    expect(actual2).toBe(false)
  })
  it('should return false when Number', () => {
    const actual1 = isArray(123)
    expect(actual1).toBe(false)
    const actual2 = isArray(123.456)
    expect(actual2).toBe(false)
  })
  it('should return false when Boolean', () => {
    const actual1 = isArray(true)
    expect(actual1).toBe(false)
    const actual2 = isArray(false)
    expect(actual2).toBe(false)
  })
  it('should return false when Function', () => {
    const actual1 = isArray(() => {})
    expect(actual1).toBe(false)
    const actual2 = isArray(function () {})
    expect(actual2).toBe(false)
  })
  it('should return false when Symbol', () => {
    const actual = isArray(Symbol('foo'))
    expect(actual).toBe(false)
  })
  it('should return false when Null', () => {
    const actual = isArray(null)
    expect(actual).toBe(false)
  })
  it('should return false when Undefined', () => {
    const actual = isArray(undefined)
    expect(actual).toBe(false)
  })
  it('should return false when Object', () => {
    const actual1 = isArray({})
    expect(actual1).toBe(false)
    class Foo {}
    const actual2 = isArray(new Foo())
    expect(actual2).toBe(false)
  })
})

describe('Test isString', () => {
  it('should return false when Array', () => {
    const actual = isString([])
    expect(actual).toBe(false)
  })
  it('should return true when String', () => {
    const actual1 = isString('')
    expect(actual1).toBe(true)
    const actual2 = isString('string')
    expect(actual2).toBe(true)
  })
  it('should return false when Number', () => {
    const actual1 = isString(123)
    expect(actual1).toBe(false)
    const actual2 = isString(123.456)
    expect(actual2).toBe(false)
  })
  it('should return false when Boolean', () => {
    const actual1 = isString(true)
    expect(actual1).toBe(false)
    const actual2 = isString(false)
    expect(actual2).toBe(false)
  })
  it('should return false when Function', () => {
    const actual1 = isString(() => {})
    expect(actual1).toBe(false)
    const actual2 = isString(function () {})
    expect(actual2).toBe(false)
  })
  it('should return false when Symbol', () => {
    const actual = isString(Symbol('foo'))
    expect(actual).toBe(false)
  })
  it('should return false when Null', () => {
    const actual = isString(null)
    expect(actual).toBe(false)
  })
  it('should return false when Undefined', () => {
    const actual = isString(undefined)
    expect(actual).toBe(false)
  })
  it('should return false when Object', () => {
    const actual1 = isString({})
    expect(actual1).toBe(false)
    class Foo {}
    const actual2 = isString(new Foo())
    expect(actual2).toBe(false)
  })
})

describe('Test isNumber', () => {
  it('should return false when Array', () => {
    const actual = isNumber([])
    expect(actual).toBe(false)
  })
  it('should return false when String', () => {
    const actual1 = isNumber('')
    expect(actual1).toBe(false)
    const actual2 = isNumber('string')
    expect(actual2).toBe(false)
  })
  it('should return true when Number', () => {
    const actual1 = isNumber(123)
    expect(actual1).toBe(true)
    const actual2 = isNumber(123.456)
    expect(actual2).toBe(true)
  })
  it('should return false when Boolean', () => {
    const actual1 = isNumber(true)
    expect(actual1).toBe(false)
    const actual2 = isNumber(false)
    expect(actual2).toBe(false)
  })
  it('should return false when Function', () => {
    const actual1 = isNumber(() => {})
    expect(actual1).toBe(false)
    const actual2 = isNumber(function () {})
    expect(actual2).toBe(false)
  })
  it('should return false when Symbol', () => {
    const actual = isNumber(Symbol('foo'))
    expect(actual).toBe(false)
  })
  it('should return false when Null', () => {
    const actual = isNumber(null)
    expect(actual).toBe(false)
  })
  it('should return false when Undefined', () => {
    const actual = isNumber(undefined)
    expect(actual).toBe(false)
  })
  it('should return false when Object', () => {
    const actual1 = isNumber({})
    expect(actual1).toBe(false)
    class Foo {}
    const actual2 = isNumber(new Foo())
    expect(actual2).toBe(false)
  })
})

describe('Test isBoolean', () => {
  it('should return false when Array', () => {
    const actual = isBoolean([])
    expect(actual).toBe(false)
  })
  it('should return false when String', () => {
    const actual1 = isBoolean('')
    expect(actual1).toBe(false)
    const actual2 = isBoolean('string')
    expect(actual2).toBe(false)
  })
  it('should return false when Number', () => {
    const actual1 = isBoolean(123)
    expect(actual1).toBe(false)
    const actual2 = isBoolean(123.456)
    expect(actual2).toBe(false)
  })
  it('should return true when Boolean', () => {
    const actual1 = isBoolean(true)
    expect(actual1).toBe(true)
    const actual2 = isBoolean(false)
    expect(actual2).toBe(true)
  })
  it('should return false when Function', () => {
    const actual1 = isBoolean(() => {})
    expect(actual1).toBe(false)
    const actual2 = isBoolean(function () {})
    expect(actual2).toBe(false)
  })
  it('should return false when Symbol', () => {
    const actual = isBoolean(Symbol('foo'))
    expect(actual).toBe(false)
  })
  it('should return false when Null', () => {
    const actual = isBoolean(null)
    expect(actual).toBe(false)
  })
  it('should return false when Undefined', () => {
    const actual = isBoolean(undefined)
    expect(actual).toBe(false)
  })
  it('should return false when Object', () => {
    const actual1 = isBoolean({})
    expect(actual1).toBe(false)
    class Foo {}
    const actual2 = isBoolean(new Foo())
    expect(actual2).toBe(false)
  })
})

describe('Test isFunction', () => {
  it('should return false when Array', () => {
    const actual = isFunction([])
    expect(actual).toBe(false)
  })
  it('should return false when String', () => {
    const actual1 = isFunction('')
    expect(actual1).toBe(false)
    const actual2 = isFunction('string')
    expect(actual2).toBe(false)
  })
  it('should return false when Number', () => {
    const actual1 = isFunction(123)
    expect(actual1).toBe(false)
    const actual2 = isFunction(123.456)
    expect(actual2).toBe(false)
  })
  it('should return false when Boolean', () => {
    const actual1 = isFunction(true)
    expect(actual1).toBe(false)
    const actual2 = isFunction(false)
    expect(actual2).toBe(false)
  })
  it('should return true when Function', () => {
    const actual1 = isFunction(() => {})
    expect(actual1).toBe(true)
    const actual2 = isFunction(function () {})
    expect(actual2).toBe(true)
  })
  it('should return false when Symbol', () => {
    const actual = isFunction(Symbol('foo'))
    expect(actual).toBe(false)
  })
  it('should return false when Null', () => {
    const actual = isFunction(null)
    expect(actual).toBe(false)
  })
  it('should return false when Undefined', () => {
    const actual = isFunction(undefined)
    expect(actual).toBe(false)
  })
  it('should return false when Object', () => {
    const actual1 = isFunction({})
    expect(actual1).toBe(false)
    class Foo {}
    const actual2 = isFunction(new Foo())
    expect(actual2).toBe(false)
  })
})

describe('Test isSymbol', () => {
  it('should return false when Array', () => {
    const actual = isSymbol([])
    expect(actual).toBe(false)
  })
  it('should return false when String', () => {
    const actual1 = isSymbol('')
    expect(actual1).toBe(false)
    const actual2 = isSymbol('string')
    expect(actual2).toBe(false)
  })
  it('should return false when Number', () => {
    const actual1 = isSymbol(123)
    expect(actual1).toBe(false)
    const actual2 = isSymbol(123.456)
    expect(actual2).toBe(false)
  })
  it('should return false when Boolean', () => {
    const actual1 = isSymbol(true)
    expect(actual1).toBe(false)
    const actual2 = isSymbol(false)
    expect(actual2).toBe(false)
  })
  it('should return false when Function', () => {
    const actual1 = isSymbol(() => {})
    expect(actual1).toBe(false)
    const actual2 = isSymbol(function () {})
    expect(actual2).toBe(false)
  })
  it('should return true when Symbol', () => {
    const actual = isSymbol(Symbol('foo'))
    expect(actual).toBe(true)
  })
  it('should return false when Null', () => {
    const actual = isSymbol(null)
    expect(actual).toBe(false)
  })
  it('should return false when Undefined', () => {
    const actual = isSymbol(undefined)
    expect(actual).toBe(false)
  })
  it('should return false when Object', () => {
    const actual1 = isSymbol({})
    expect(actual1).toBe(false)
    class Foo {}
    const actual2 = isSymbol(new Foo())
    expect(actual2).toBe(false)
  })
})

describe('Test isNull', () => {
  it('should return false when Array', () => {
    const actual = isNull([])
    expect(actual).toBe(false)
  })
  it('should return false when String', () => {
    const actual1 = isNull('')
    expect(actual1).toBe(false)
    const actual2 = isNull('string')
    expect(actual2).toBe(false)
  })
  it('should return false when Number', () => {
    const actual1 = isNull(123)
    expect(actual1).toBe(false)
    const actual2 = isNull(123.456)
    expect(actual2).toBe(false)
  })
  it('should return false when Boolean', () => {
    const actual1 = isNull(true)
    expect(actual1).toBe(false)
    const actual2 = isNull(false)
    expect(actual2).toBe(false)
  })
  it('should return false when Function', () => {
    const actual1 = isNull(() => {})
    expect(actual1).toBe(false)
    const actual2 = isNull(function () {})
    expect(actual2).toBe(false)
  })
  it('should return false when Symbol', () => {
    const actual = isNull(Symbol('foo'))
    expect(actual).toBe(false)
  })
  it('should return true when Null', () => {
    const actual = isNull(null)
    expect(actual).toBe(true)
  })
  it('should return false when Undefined', () => {
    const actual = isNull(undefined)
    expect(actual).toBe(false)
  })
  it('should return false when Object', () => {
    const actual1 = isNull({})
    expect(actual1).toBe(false)
    class Foo {}
    const actual2 = isNull(new Foo())
    expect(actual2).toBe(false)
  })
})

describe('Test isUndefined', () => {
  it('should return false when Array', () => {
    const actual = isUndefined([])
    expect(actual).toBe(false)
  })
  it('should return false when String', () => {
    const actual1 = isUndefined('')
    expect(actual1).toBe(false)
    const actual2 = isUndefined('string')
    expect(actual2).toBe(false)
  })
  it('should return false when Number', () => {
    const actual1 = isUndefined(123)
    expect(actual1).toBe(false)
    const actual2 = isUndefined(123.456)
    expect(actual2).toBe(false)
  })
  it('should return false when Boolean', () => {
    const actual1 = isUndefined(true)
    expect(actual1).toBe(false)
    const actual2 = isUndefined(false)
    expect(actual2).toBe(false)
  })
  it('should return false when Function', () => {
    const actual1 = isUndefined(() => {})
    expect(actual1).toBe(false)
    const actual2 = isUndefined(function () {})
    expect(actual2).toBe(false)
  })
  it('should return false when Symbol', () => {
    const actual = isUndefined(Symbol('foo'))
    expect(actual).toBe(false)
  })
  it('should return false when Null', () => {
    const actual = isUndefined(null)
    expect(actual).toBe(false)
  })
  it('should return true when Undefined', () => {
    const actual = isUndefined(undefined)
    expect(actual).toBe(true)
  })
  it('should return false when Object', () => {
    const actual1 = isUndefined({})
    expect(actual1).toBe(false)
    class Foo {}
    const actual2 = isUndefined(new Foo())
    expect(actual2).toBe(false)
  })
})

describe('Test isNullOrUndefined', () => {
  it('should return false when Array', () => {
    const actual = isNullOrUndefined([])
    expect(actual).toBe(false)
  })
  it('should return false when String', () => {
    const actual1 = isNullOrUndefined('')
    expect(actual1).toBe(false)
    const actual2 = isNullOrUndefined('string')
    expect(actual2).toBe(false)
  })
  it('should return false when Number', () => {
    const actual1 = isNullOrUndefined(123)
    expect(actual1).toBe(false)
    const actual2 = isNullOrUndefined(123.456)
    expect(actual2).toBe(false)
  })
  it('should return false when Boolean', () => {
    const actual1 = isNullOrUndefined(true)
    expect(actual1).toBe(false)
    const actual2 = isNullOrUndefined(false)
    expect(actual2).toBe(false)
  })
  it('should return false when Function', () => {
    const actual1 = isNullOrUndefined(() => {})
    expect(actual1).toBe(false)
    const actual2 = isNullOrUndefined(function () {})
    expect(actual2).toBe(false)
  })
  it('should return false when Symbol', () => {
    const actual = isNullOrUndefined(Symbol('foo'))
    expect(actual).toBe(false)
  })
  it('should return true when Null', () => {
    const actual = isNullOrUndefined(null)
    expect(actual).toBe(true)
  })
  it('should return true when Undefined', () => {
    const actual = isNullOrUndefined(undefined)
    expect(actual).toBe(true)
  })
  it('should return false when Object', () => {
    const actual1 = isNullOrUndefined({})
    expect(actual1).toBe(false)
    class Foo {}
    const actual2 = isNullOrUndefined(new Foo())
    expect(actual2).toBe(false)
  })
})

describe('Test isNullOrEmpty', () => {
  it('should return false when Array', () => {
    const actual = isNullOrEmpty([])
    expect(actual).toBe(false)
  })
  it('should return false when String', () => {
    const actual = isNullOrEmpty('string')
    expect(actual).toBe(false)
  })
  it('should return true when Empty String', () => {
    const actual = isNullOrEmpty('')
    expect(actual).toBe(true)
  })
  it('should return false when Number', () => {
    const actual1 = isNullOrEmpty(123)
    expect(actual1).toBe(false)
    const actual2 = isNullOrEmpty(123.456)
    expect(actual2).toBe(false)
  })
  it('should return false when Boolean', () => {
    const actual1 = isNullOrEmpty(true)
    expect(actual1).toBe(false)
    const actual2 = isNullOrEmpty(false)
    expect(actual2).toBe(false)
  })
  it('should return false when Function', () => {
    const actual1 = isNullOrEmpty(() => {})
    expect(actual1).toBe(false)
    const actual2 = isNullOrEmpty(function () {})
    expect(actual2).toBe(false)
  })
  it('should return false when Symbol', () => {
    const actual = isNullOrEmpty(Symbol('foo'))
    expect(actual).toBe(false)
  })
  it('should return true when Null', () => {
    const actual = isNullOrEmpty(null)
    expect(actual).toBe(true)
  })
  it('should return true when Undefined', () => {
    const actual = isNullOrEmpty(undefined)
    expect(actual).toBe(true)
  })
  it('should return false when Object', () => {
    const actual1 = isNullOrEmpty({})
    expect(actual1).toBe(false)
    class Foo {}
    const actual2 = isNullOrEmpty(new Foo())
    expect(actual2).toBe(false)
  })
})

describe('Test isObject', () => {
  it('should return false when Array', () => {
    const actual = isObject([])
    expect(actual).toBe(false)
  })
  it('should return false when String', () => {
    const actual1 = isObject('')
    expect(actual1).toBe(false)
    const actual2 = isObject('string')
    expect(actual2).toBe(false)
  })
  it('should return false when Number', () => {
    const actual1 = isObject(123)
    expect(actual1).toBe(false)
    const actual2 = isObject(123.456)
    expect(actual2).toBe(false)
  })
  it('should return false when Boolean', () => {
    const actual1 = isObject(true)
    expect(actual1).toBe(false)
    const actual2 = isObject(false)
    expect(actual2).toBe(false)
  })
  it('should return false when Function', () => {
    const actual1 = isObject(() => {})
    expect(actual1).toBe(false)
    const actual2 = isObject(function () {})
    expect(actual2).toBe(false)
  })
  it('should return false when Symbol', () => {
    const actual = isObject(Symbol('foo'))
    expect(actual).toBe(false)
  })
  it('should return false when Null', () => {
    const actual = isObject(null)
    expect(actual).toBe(false)
  })
  it('should return false when Undefined', () => {
    const actual = isObject(undefined)
    expect(actual).toBe(false)
  })
  it('should return true when Object', () => {
    const actual1 = isObject({})
    expect(actual1).toBe(true)
    class Foo {}
    const actual2 = isObject(new Foo())
    expect(actual2).toBe(true)
  })
})
