import * as core from '@actions/core'
import {
  convertToFullPath,
  parseYamlString,
  readYamlFile,
  writeYamlFile
} from './utils'
import {Version} from './version'

export async function run(): Promise<void> {
  try {
    // const foo = core.getInput('INCREASE-BUILD-NUMBER')
    // console.log(foo)
    const shouldIncreaseBuildnumber: boolean = core.getBooleanInput(
      'INCREASE-BUILD-NUMBER'
    )
    const workingDirectory = core.getInput('working-directory')
    if (!shouldIncreaseBuildnumber) {
      return
    }
    increaseBuildNumber(workingDirectory)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
    throw error
  }
}

export function increaseBuildNumber(path: string): void {
  const fullPath = convertToFullPath(path)
  const yaml = parseYamlString(readYamlFile(fullPath))
  const versionString = yaml.get('version')
  if (typeof versionString !== 'string') {
    throw Error('Version string nog found')
  }
  const version = Version.fromString(versionString)
  version.buildNumber++
  core.exportVariable('FLUTTER_BUILD_VERSION', version.stringify)
  yaml.set('version', version.stringify)
  writeYamlFile(fullPath, yaml)
}

run()
