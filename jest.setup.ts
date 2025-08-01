// jest.setup.ts
import "@testing-library/jest-dom";

// Mock fetch for RTK Query
global.fetch = jest.fn();

// Mock next-auth getSession
jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: null,
    status: "unauthenticated",
  }),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}));