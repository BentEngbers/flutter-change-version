import * as fs from 'fs'
import * as path from 'path'
import {Opaque} from 'type-fest'
import {parseDocument, Document, ParsedNode} from 'yaml'
const FileNameYaml = 'pubspec.yaml'

export type fullPathType = Opaque<string, 'fullPathType'>
export type YamlString = Opaque<string, 'yamlString'>
export type YamlDocument = Document.Parsed<ParsedNode>

export function convertToFullPath(directory: string): fullPathType {
  const fullPath = path.join(process.cwd(), directory, FileNameYaml)
  return fullPath as fullPathType
}
export function readYamlFile(fullPath: fullPathType): YamlString {
  if (fs.existsSync(fullPath)) {
    return fs.readFileSync(fullPath, 'utf8') as YamlString
  }
  throw Error(`file: ${fullPath} does not exist`)
}
export function writeYamlFile(
  fullPath: fullPathType,
  yamlString: Document.Parsed<ParsedNode>
): void {
  if (fs.existsSync(fullPath)) {
    return fs.writeFileSync(fullPath, yamlString.toString(), 'utf8')
  }
  throw Error(`file: ${fullPath} does not exist`)
}
export function parseYamlString(
  yamlContents: YamlString
): Document.Parsed<ParsedNode> {
  try {
    const doc = parseDocument(yamlContents)
    return doc
  } catch (e) {
    throw Error(`There was an error parsing the yaml file:\n${e}`)
  }
}
