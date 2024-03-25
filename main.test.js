/**
 * @jest-environment jsdom
 */

import Storage from './main';

beforeEach(() => {
  jest
    .useFakeTimers('modern')
    .setSystemTime(new Date('2023-12-18T05:00:00').getTime());
});

describe('Local Storage', () => {

  test('Not available', () => {

    const local = new Storage('localStorage');

    local.available = false;
    expect(local.get('testKey')).toBeUndefined();

    expect(local.set('testKey', 'testValue')).toBeUndefined();
    expect(local.remove('testKey')).toBeUndefined();
    expect(local.setIfNotExists('testKey', 'testValue')).toBeUndefined();

  });

  test('Available', () => {

    const local = new Storage('localStorage');
    expect(local.available).toBe(true);

    expect(local.get('testKey')).toBeNull();

    // test get
    expect(local.set('testKey', 'testValue'));
    expect(local.get('testKey')).toBe('testValue');

    // test setIfNotExists (exists)
    expect(local.setIfNotExists('testKey', 'secondTestValue'));
    expect(local.get('testKey')).toBe('testValue');

    // test setIfNotExists (does not exist)
    expect(local.setIfNotExists('anotherTestKey', 'secondTestValue'));
    expect(local.get('anotherTestKey')).toBe('secondTestValue');

    // set remove
    expect(local.remove('testKey')).toBeUndefined();
    expect(local.get('testKey')).toBeNull();

    // set get with expires
    expect(local.set('testKey', 'testValue', { expires: new Date('2023-12-18T07:00:00') }));
    expect(local.get('testKey')).toBe('testValue');

    jest
      .useFakeTimers('modern')
      .setSystemTime(new Date('2023-12-18T08:00:00').getTime());

    expect(local.get('testKey')).toBeNull();

  });

  test('Invalid JSON', () => {

    const local = new Storage('localStorage');
    expect(local.available).toBe(true);

    localStorage.setItem('testKey', '{"test", "test1}');
    expect(local.get('testKey')).toBeNull();

  });

  test('NULL data', () => {

    const local = new Storage('localStorage');
    expect(local.available).toBe(true);

    localStorage.setItem('testKey', null);
    expect(local.get('testKey')).toBeNull();

  });

});

describe('Session Storage', () => {

  test('Not available', () => {

    const local = new Storage('sessionStorage');

    local.available = false;
    expect(local.get('testKey')).toBeUndefined();

    expect(local.set('testKey', 'testValue')).toBeUndefined();
    expect(local.remove('testKey')).toBeUndefined();
    expect(local.setIfNotExists('testKey', 'testValue')).toBeUndefined();

  });

  test('Available', () => {

    const local = new Storage('sessionStorage');
    expect(local.available).toBe(true);

    expect(local.get('testKey')).toBeNull();

    // test get
    expect(local.set('testKey', 'testValue'));
    expect(local.get('testKey')).toBe('testValue');

    // test setIfNotExists (exists)
    expect(local.setIfNotExists('testKey', 'secondTestValue'));
    expect(local.get('testKey')).toBe('testValue');

    // test setIfNotExists (does not exist)
    expect(local.setIfNotExists('anotherTestKey', 'secondTestValue'));
    expect(local.get('anotherTestKey')).toBe('secondTestValue');

    // set remove
    expect(local.remove('testKey')).toBeUndefined();
    expect(local.get('testKey')).toBeNull();

    // set get with expires
    expect(local.set('testKey', 'testValue', { expires: new Date('2023-12-18T07:00:00') }));
    expect(local.get('testKey')).toBe('testValue');

    jest
      .useFakeTimers('modern')
      .setSystemTime(new Date('2023-12-18T08:00:00').getTime());

    expect(local.get('testKey')).toBeNull();

  });

  test('Invalid JSON', () => {

    const local = new Storage('sessionStorage');
    expect(local.available).toBe(true);

    localStorage.setItem('testKey', '{"test", "test1}');
    expect(local.get('testKey')).toBeNull();

  });

  test('NULL data', () => {

    const local = new Storage('sessionStorage');
    expect(local.available).toBe(true);

    localStorage.setItem('testKey', null);
    expect(local.get('testKey')).toBeNull();

  });

});
