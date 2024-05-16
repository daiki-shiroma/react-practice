module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    // This is necessary because next.js forces { "jsx": "preserve" }, but
    // ts-jest appears to require { "jsx": "react" }
    "^.+\\.[jt]sx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react",
        },
      },
    ],
  },
};
