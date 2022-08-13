# Table of contents
- [Table of contents](#table-of-contents)
- [About this github action for flutter](#about-this-github-action-for-flutter)
- [Usage](#usage)
  - [Example](#example)
  - [Lightweight](#lightweight)

# About this github action for flutter
This small github action can increment the build number variable in the pubspec.yaml.
so the version tag: `1.0.0+1` becomes `1.0.0+2`.
This action gives clear error messages if something went wrong.

 
# Usage

|        input variable | type   | default value | description                                                                                     |
| --------------------: | ------ | ------------- | ----------------------------------------------------------------------------------------------- |
|     working-directory | string | "./"          | The root directory of a flutter project in this repository, containing the `pubspec.yaml` file. |
| increase-build-number |        | "true"        | Set tot "true" if the build number should be increased                                          |

## Example 
say you have a folder in your repository called `root-flutter-folder`, then you can call the action like this.
``` yaml
- name: Increment flutter build number
  uses: BentEngbers/flutter-change-version@v1.0.3
  with:
      working-directory: ./root-flutter-folder
```

## Lightweight
This extension is written in typescript and only contains 126 lines of code and 17 tests (as of 13-08-2022).


