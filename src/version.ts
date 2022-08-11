function toInt(str: string): number {
  const parseValue = parseInt(str.trim(), 10)
  if (Number.isNaN(parseValue)) {
    throw Error(`${str} is not a integer`)
  }
  return parseValue
}

export class Version {
  buildNumber: number
  buildMajor: number
  buildMinor: number
  buildPatch: number
  get buildName(): string {
    return `${this.buildMajor}.${this.buildMinor}.${this.buildPatch}`
  }

  get stringify(): string {
    return `${this.buildName}+${this.buildNumber}`
  }

  constructor(
    buildMajor: number,
    buildMinor: number,
    buildPatch: number,
    buildNumber: number
  ) {
    this.buildMajor = buildMajor
    this.buildMinor = buildMinor
    this.buildPatch = buildPatch
    this.buildNumber = buildNumber
  }

  static fromString(versionString: string): Version {
    const splitPlus = versionString.split('+')
    if (splitPlus.length !== 2) {
      throw Error(
        `The versionString "${splitPlus}" does not contain exactly one '+' symbol`
      )
    }
    const [buildName, versionCodeString] = splitPlus
    const buildNumber = toInt(versionCodeString)
    const splitPoint = buildName.split('.')
    if (splitPoint.length !== 3) {
      throw Error(
        `The buildName "${buildName}" does not contain exactly two '.' symbol`
      )
    }
    const [buildMajor, buildMinor, buildPatch] = splitPoint
    return new Version(
      toInt(buildMajor),
      toInt(buildMinor),
      toInt(buildPatch),
      buildNumber
    )
  }
}
