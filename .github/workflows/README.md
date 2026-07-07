# 🚀 GitHub Actions – React Native CI/CD Pipeline

A production-ready GitHub Actions workflow that automatically validates code quality, builds an Android Release APK using Fastlane, and distributes the application to Firebase App Distribution whenever a pull request targets the `develop` into `main` branches.

This workflow demonstrates a modern Continuous Integration (CI) pipeline where GitHub Actions orchestrates the workflow while Fastlane manages the mobile automation.

---

# ✨ Features

- ✅ Automatic execution on Pull Requests targeting `develop` and `main`
- ✅ Repository checkout using the latest GitHub Actions
- ✅ Node.js 22 environment setup
- ✅ Java 17 environment setup
- ✅ Ruby & Bundler setup for Fastlane
- ✅ Yarn dependency caching
- ✅ Ruby dependency caching
- ✅ JavaScript dependency installation
- ✅ TypeScript type checking
- ✅ Prettier formatting verification
- ✅ Firebase Service Account generation from GitHub Secrets
- ✅ Android Release APK generation using Fastlane
- ✅ Automatic Firebase App Distribution
- ⏸️ Ready for Jest tests

---

# 📁 Workflow Structure

```text
.github/
└── workflows/
    └── ci-cd.yml
```

---

# ⚙️ CI/CD Pipeline Flow

```text
Pull Request
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
Setup Java
      │
      ▼
Setup Ruby
      │
      ▼
Install JavaScript Dependencies
      │
      ▼
Install Ruby Dependencies
      │
      ▼
TypeScript Type Check
      │
      ▼
Prettier Check
      │
      ▼
Create Firebase Service Account
      │
      ▼
Fastlane Android Development Workflow
      │
      ├── Clean Android Project
      ├── Run ESLint
      ├── Build Release APK
      └── Upload APK to Firebase App Distribution
      │
      ▼
✅ Firebase Build Ready for Testing
```

---

# 📋 Workflow Details

| Item            | Value                                 |
| --------------- | ------------------------------------- |
| Workflow        | React Native CI                       |
| Job             | Quality Check & Firebase Distribution |
| Runner          | `ubuntu-latest`                       |
| Node.js         | `22`                                  |
| Java            | `17 (Temurin)`                        |
| Ruby            | `.ruby-version`                       |
| Package Manager | Yarn                                  |
| Build Tool      | Fastlane                              |
| Distribution    | Firebase App Distribution             |

---

# 🚀 Workflow Trigger

```yaml
on:
  pull_request:
    branches:
      - main
      - develop
```

The workflow automatically runs whenever a Pull Request targets:

- `develop`
- `main`

---

# 🔍 Pipeline Steps

## Checkout Repository

Downloads the latest source code into the GitHub Actions runner.

---

## Setup Node.js

Installs Node.js and restores the Yarn dependency cache.

---

## Setup Java

Installs Java 17 required for Android builds.

---

## Setup Ruby

Installs Ruby and Bundler required by Fastlane.

---

## Install JavaScript Dependencies

Installs all project dependencies using the lockfile.

---

## Install Ruby Dependencies

Installs all Ruby gems defined in the project's `Gemfile`.

---

## TypeScript Type Check

Runs the TypeScript compiler to detect type errors without generating output files.

---

## Prettier Check

Ensures the repository follows the configured formatting rules.

---

## Create Firebase Service Account

Recreates the Firebase Service Account JSON file from the encrypted GitHub repository secret (`FIREBASE_SERVICE_ACCOUNT`).

This allows Fastlane to authenticate securely without storing credentials in the repository.

---

## Fastlane Android Development Workflow

Executes:

```bash
bundle exec fastlane android dev
```

The `dev` lane performs the following tasks:

1. Clean Android project
2. Run ESLint
3. Build Release APK
4. Upload the Release APK to Firebase App Distribution

---

# 🔐 Required GitHub Secret

| Secret                     | Description                                                                                    |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| `FIREBASE_SERVICE_ACCOUNT` | Firebase Service Account JSON used by Fastlane to authenticate with Firebase App Distribution. |

---

# 📌 Purpose

This workflow ensures that every Pull Request:

- Uses the correct development environment.
- Passes TypeScript validation.
- Follows the project's formatting standards.
- Successfully builds an Android Release APK.
- Automatically distributes the latest build to Firebase App Distribution for testing.

By combining GitHub Actions with Fastlane, the repository provides a reliable, repeatable, and fully automated mobile CI/CD workflow.

---

# 🛠 Technologies

- GitHub Actions
- Fastlane
- Firebase App Distribution
- Ruby
- Bundler
- Node.js
- Java 17
- Yarn
- TypeScript
- ESLint
- Prettier
- React Native
