import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Module name mapping for Next.js imports and aliases
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "jest-transform-stub",
  },

  // Transform configuration with proper JSX handling
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx", // Enable JSX transformation for tests
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          moduleResolution: "node",
          resolveJsonModule: true,
          isolatedModules: true,
        },
      },
    ],
  },

  // File extensions Jest should handle
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  // Transform ignore patterns for node_modules
  transformIgnorePatterns: ["node_modules/(?!(next-auth|@next)/)"],

  // Test match patterns
  testMatch: ["**/__tests__/**/*.(ts|tsx|js)", "**/*.(test|spec).(ts|tsx|js)"],

  // Collect coverage from these files
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "!app/**/*.d.ts",
    "!app/**/layout.tsx",
    "!app/**/page.tsx",
  ],
};

export default config;