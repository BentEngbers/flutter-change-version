import {Version} from '../src/version'

test('test parseVersion correct', () => {
  const testVersionString = '1.2.3+45'
  const {buildName, buildNumber} = Version.fromString(testVersionString)
  expect(buildName).toEqual('1.2.3')
  expect(buildNumber).toEqual(45)
})
test('test parseVersion correct', () => {
  const testVersionString = '1.2.3+45'
  const version = Version.fromString(testVersionString)
  expect(version.buildName).toEqual('1.2.3')
  expect(version.buildNumber).toEqual(45)
  expect(version.stringify).toEqual(testVersionString)
})
test('test parseVersion', () => {
  const testVersionString = '1.2.3+45'
  const version = Version.fromString(testVersionString)
  expect(version.buildName).toEqual('1.2.3')
  expect(version.buildNumber).toEqual(45)
  expect(version.stringify).toEqual(testVersionString)
})

test('test parseVersion incorrect extra plus', () => {
  const testVersionString = '1.2.3+45+2'
  expect(() => Version.fromString(testVersionString)).toThrow(
    `does not contain exactly one '+' symbol`
  )
})
test('test parseVersion incorrect not a number', () => {
  const testVersionString = '1.2.3+a'
  expect(() => Version.fromString(testVersionString)).toThrow(
    `is not a integer`
  )
})
test('test major is not a number', () => {
  const testVersionString = 'a.2.3+1'
  expect(() => Version.fromString(testVersionString)).toThrow(
    `is not a integer`
  )
})
test('test minor is not a number', () => {
  const testVersionString = '1.b.3+1'
  expect(() => Version.fromString(testVersionString)).toThrow(
    `is not a integer`
  )
})
test('test patch is not a number', () => {
  const testVersionString = '1.2.c+1'
  expect(() => Version.fromString(testVersionString)).toThrow(
    `is not a integer`
  )
})
test('test increase buildNumber', () => {
  const version = new Version(1, 2, 3, 301)
  version.buildNumber++
  expect(version.stringify).toEqual('1.2.3+302')
})
