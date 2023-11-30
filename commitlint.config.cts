/* eslint-env node */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'header-max-length': [0], // level: disabled
    'function-rules/header-max-length': [
      2, // level: error
      'always',
      (parsed) => {
        if (parsed.header.length > 100) {
          return [
            false,
            `header must not to be longer than 100 characters, current length is ${parsed.header.length}`
          ]
        }
        if (
          !parsed.header.match(
            /^((feat)|(test)|(build)|(chore)|(ci)|(docs)|(fix)|(perf)|(refactor)|(style))\(((evv-\d{1,4})|(EVV-\d{1,4}))\):/gm
          )
        ) {
          return [false, `the scope must follow the pattern Ticket = "fix(evv-153):commit example"`]
        }
        return [true]
      }
    ]
  }
}
