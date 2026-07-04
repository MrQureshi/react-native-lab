# 🚀 GitHub Actions – React Native CI

A production-ready GitHub Actions workflow that automatically validates code quality for a React Native project on every push and pull request targeting the `main` and `develop` branches.

This workflow demonstrates how to build a clean Continuous Integration (CI) pipeline using official GitHub Actions while keeping release automation separate.

---

## ✨ Features

- ✅ Automatic execution on every push to `main` and `develop`
- ✅ Automatic execution on pull requests targeting `main` and `develop`
- ✅ Repository checkout using the latest GitHub Action
- ✅ Node.js environment setup
- ✅ Yarn dependency caching
- ✅ Dependency installation
- ✅ TypeScript type checking
- ✅ ESLint validation
- ✅ Prettier formatting verification
- ⏸️ Ready for Jest tests when they are added

---

## 📁 Workflow Structure

```text
.github/
└── workflows/
    └── qualityCheck.yml
```

---

## ⚙️ Pipeline Flow

```text
Push / Pull Request
          │
          ▼
GitHub Actions Trigger
          │
          ▼
Checkout Repository
          │
          ▼
Setup Node.js
          │
          ▼
Restore Yarn Cache
          │
          ▼
Install Dependencies
          │
          ▼
TypeScript Type Check
          │
          ▼
ESLint
          │
          ▼
Prettier Check
          │
          ▼
✅ Quality Check Passed
```

---

## 📋 Workflow Details

| Item            | Value           |
| --------------- | --------------- |
| Workflow        | React Native CI |
| Job             | Quality Check   |
| Runner          | `ubuntu-latest` |
| Node.js         | `22`            |
| Package Manager | Yarn            |

---

## 🚀 Workflow Trigger

```yaml
on:
  push:
    branches:
      - main
      - develop

  pull_request:
    branches:
      - main
      - develop
```

The workflow automatically runs whenever:

- Code is pushed to the **main** branch.
- Code is pushed to the **develop** branch.
- A pull request targets the **main** branch.
- A pull request targets the **develop** branch.

---

## 🔍 Quality Checks

### Checkout Repository

Downloads the latest source code into the GitHub Actions runner.

### Setup Node.js

Installs Node.js and restores the Yarn dependency cache for faster workflow execution.

### Install Dependencies

Installs project dependencies using the lockfile to ensure consistent and reproducible installations.

### TypeScript Type Check

Runs the TypeScript compiler to detect type errors without generating output files.

### ESLint

Checks the project against the configured linting rules.

### Prettier

Verifies that all project files follow the configured formatting rules.

---

## 📌 Purpose

This workflow ensures that every code change:

- Builds with the correct dependency versions.
- Contains no TypeScript compilation errors.
- Passes ESLint validation.
- Follows the project's formatting standards.

By automating these checks, code quality is verified before changes are merged or released.

---
