import * as path from 'path'
import {
  readYamlFile,
  convertToFullPath,
  parseYamlString,
  YamlString,
  writeYamlFile
} from '../src/utils'
const staticYamlDirectory = convertToFullPath(path.join('__tests__', 'static'))
type versionNumber = 45 | 46
type YamlTestString<T extends versionNumber> = `# TestComment
name: foo
version: 3.2.1+${T}
`
export const yamlTestStrings: readonly [
  YamlTestString<45>,
  YamlTestString<46>
] = [
  `# TestComment
name: foo
version: 3.2.1+45
`,
  `# TestComment
name: foo
version: 3.2.1+46
`
] as const

describe('test yaml reading & writing', () => {
  test('simple read', () => {
    const result = readYamlFile(staticYamlDirectory)
    expect(result).toEqual(expect.stringContaining('name:'))
  })
  test('Error: file does not exist', () => {
    const nonExistantDirectory = convertToFullPath(path.join('doesNotExist'))
    expect(() => readYamlFile(nonExistantDirectory)).toThrow('does not exist')
  })

  test('test read and writing yaml', () => {
    const changeableYamlDirectory = convertToFullPath(
      path.join('__tests__', 'changeable')
    )
    writeYamlFile(changeableYamlDirectory, yamlTestStrings[0] as YamlString)
    expect(readYamlFile(changeableYamlDirectory)).toEqual(yamlTestStrings[0])
    writeYamlFile(changeableYamlDirectory, '' as YamlString)
    expect(readYamlFile(changeableYamlDirectory)).toEqual('')
  })
})

describe('yaml parsing and writing', () => {
  test('contains correct elements', () => {
    const parsedYaml = parseYamlString(yamlTestStrings[0] as YamlString)
    expect(parsedYaml.toString()).toEqual(
      expect.stringContaining('# TestComment')
    )
    expect(parsedYaml.toJS().version).toEqual('3.2.1+45')
  })
  test('read and write', () => {
    const parsedYaml = parseYamlString(yamlTestStrings[0] as YamlString)
    expect(parsedYaml.toString()).toEqual(yamlTestStrings[0])
  })
})
