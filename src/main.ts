import * as core from '@actions/core'
import {
  convertToFullPath,
  parseYamlString,
  readYamlFile,
  writeYamlFile
} from './utils'
import {Version} from './version'

async function run(): Promise<void> {
  try {
    const shouldIncreaseBuildnumber: boolean =
      core.getInput('increase-build-number') === 'true'
    if (!shouldIncreaseBuildnumber) {
      return
    }
    increaseBuildNumber('./')
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
  core.exportVariable('NEW_VERSION', version.stringify)
  yaml.set('version', version.stringify)
  writeYamlFile(fullPath, yaml)
}

run()
