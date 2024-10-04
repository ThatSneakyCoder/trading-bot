module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feature', 'bug_fix', 'refactor', 'docs', 'test', 'chore']],
    'subject-case': [0, 'never', []],
  },
};
