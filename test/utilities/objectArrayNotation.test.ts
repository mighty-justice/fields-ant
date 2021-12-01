import { unflattenObject } from '../../src/utilities/common';

describe('uflattenObject', () => {
  it(`Correctly unflattens objects`, () => {
    // completely flattened objects
    expect(unflattenObject({ x: 'y' })).toStrictEqual({ x: 'y' });
    expect(unflattenObject({ 'x[0]': 'y' })).toStrictEqual({ x: ['y'] });
    expect(unflattenObject({ 'x[0]': 'y', 'x[1]': 'z' })).toStrictEqual({ x: ['y', 'z'] });
    expect(unflattenObject({ 'x[0].a': 'b' })).toStrictEqual({ x: [{ a: 'b' }] });
    expect(unflattenObject({ 'x.y[0]': 'z' })).toStrictEqual({ x: { y: ['z'] } });
    expect(unflattenObject({ 'a[0].b[0].c': 'x', 'a[0].b[1].c': 'y', 'a[1].d': 'z' })).toStrictEqual({
      a: [{ b: [{ c: 'x' }, { c: 'y' }] }, { d: 'z' }],
    });

    // partially flattened objects
    expect(unflattenObject({ 'x[0]': { a: 'b' } })).toStrictEqual({ x: [{ a: 'b' }] });
    expect(unflattenObject({ x: { 'y[0]': 'z' } })).toStrictEqual({ x: { y: ['z'] } });
    expect(unflattenObject({ 'a[0]': { 'b[0].c': 'x' }, 'a[0].b[1]': { c: 'y' }, 'a[1].d': 'z' })).toStrictEqual({
      a: [{ b: [{ c: 'x' }, { c: 'y' }] }, { d: 'z' }],
    });
  });
});
