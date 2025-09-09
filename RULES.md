# Project Rules & Quality Standards

This document outlines the coding standards and practices for the Plugin Security Scanner project.

## 1. Commit Messages
All commit messages MUST follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This helps in automating changelogs and keeping the history clean.
- `feat:` (a new feature)
- `fix:` (a bug fix)
- `docs:` (documentation only changes)
- `style:` (changes that do not affect the meaning of the code)
- `refactor:` (a code change that neither fixes a bug nor adds a feature)
- `test:` (adding missing tests or correcting existing tests)
- `chore:` (changes to the build process or auxiliary tools)

## 2. Frontend (Next.js)
- **Linting:** We will use ESLint with the `eslint-config-next` package. All code must pass linting checks before being committed.
- **Formatting:** Prettier will be used for automatic code formatting.

## 3. Backend (Go)
- **Linting:** We will use `golangci-lint` to enforce Go best practices and catch common issues.
- **Formatting:** All code must be formatted using the standard `gofmt` tool.

## 4. API Design ("Model Context Protocol")
- The REST API between the frontend and backend will be formally defined using the **OpenAPI 3.0** specification.
- This ensures a clear, strongly-typed contract for communication and allows for generating client code if needed.