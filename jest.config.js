const { createDefaultPreset } = require('ts-jest');
const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: 'jsdom', // ⬅️ важно!
  transform: {
    ...tsJestTransformCfg
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // ⬅️ чтобы не падали импорты стилей
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: ['**/?(*.)+(test).[tj]s?(x)'] // поддержка *.test.ts и *.test.tsx
};
