# 🚀 GitHub Actions – React Native CI/CD Pipeline

A production-ready GitHub Actions workflow that automatically validates code quality, builds an Android Release APK using Fastlane, generates release notes, uploads the application to Firebase App Distribution, stores the APK as a GitHub Actions artifact, and notifies the team through Slack whenever a Pull Request targets the `develop` or `main` branches.

This workflow demonstrates a modern Continuous Integration and Continuous Delivery (CI/CD) pipeline where GitHub Actions orchestrates the workflow while Fastlane manages the mobile automation.

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
- ✅ ESLint validation
- ✅ Prettier formatting verification
- ✅ Automatic Android Version Code generation
- ✅ Dynamic Release Notes generated from the Pull Request
- ✅ Firebase Service Account generation from GitHub Secrets
- ✅ Android Release APK generation using Fastlane
- ✅ Automatic Firebase App Distribution
- ✅ APK uploaded as a GitHub Actions Artifact
- ✅ Slack notification on successful builds
- ✅ Slack notification on failed builds
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
ESLint
      │
      ▼
Prettier Check
      │
      ▼
Generate Release Notes
      │
      ▼
Create Firebase Service Account
      │
      ▼
Generate Android Version Code
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
Upload APK Artifact
      │
      ▼
Slack Notification
      │
      ▼
✅ Build Ready for QA
```

---

# 📋 Workflow Details

| Item             | Value                                 |
| ---------------- | ------------------------------------- |
| Workflow         | React Native CI/CD                    |
| Job              | Android Build & Firebase Distribution |
| Runner           | `ubuntu-latest`                       |
| Node.js          | `22`                                  |
| Java             | `17 (Temurin)`                        |
| Ruby             | `.ruby-version`                       |
| Package Manager  | Yarn                                  |
| Build Tool       | Fastlane                              |
| Distribution     | Firebase App Distribution             |
| Artifact Storage | GitHub Actions Artifact               |
| Notifications    | Slack                                 |

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

Installs all project dependencies using the project's lockfile.

---

## Install Ruby Dependencies

Installs all Ruby gems defined in the project's `Gemfile`.

---

## TypeScript Type Check

Runs the TypeScript compiler to detect type errors without generating output files.

---

## ESLint

Validates the codebase using the project's configured lint rules.

---

## Prettier Check

Ensures every file follows the configured formatting rules.

---

## Generate Release Notes

Automatically generates release notes using information from the Pull Request.

Generated information includes:

- Release Date
- Android Version
- Branch Name
- Developer
- Pull Request Title
- Pull Request Description

These release notes are attached to every Firebase App Distribution release.

---

## Create Firebase Service Account

Recreates the Firebase Service Account JSON file from the encrypted GitHub Secret.

Secret used:

```text
FIREBASE_SERVICE_ACCOUNT
```

No Firebase credentials are stored in the repository.

---

## Automatic Android Versioning

The workflow automatically injects a unique Android `versionCode` before building the application.

The version code is generated using the GitHub Actions workflow run number.

Example:

| Workflow Run | Android Version |
| ------------ | --------------- |
| #15          | 1.0.0 (15)      |
| #16          | 1.0.0 (16)      |
| #17          | 1.0.0 (17)      |

Only the `VERSION_NAME` is maintained manually inside:

```text
android/version.properties
```

This approach guarantees:

- Every Firebase release has a unique version.
- No duplicate Android version codes.
- No automatic Git commits.
- Local development remains unchanged.

---

## Fastlane Android Development Workflow

The workflow executes:

```bash
bundle exec fastlane android dev
```

The `dev` lane performs:

1. Clean Android Project
2. Run ESLint
3. Build Release APK
4. Upload Release APK to Firebase App Distribution

---

## Firebase App Distribution

Every successful workflow automatically uploads the generated Release APK to Firebase App Distribution.

The uploaded build contains:

- Dynamic Release Notes
- Automatically generated Android Version Code
- Release APK
- QA Tester Distribution

---

## GitHub Actions Artifacts

Every successful workflow uploads the generated Release APK as a GitHub Actions Artifact.

Artifacts are retained for 30 days and can be downloaded directly from the completed workflow.

This provides a secondary download source in addition to Firebase App Distribution.

---

## Slack Notifications

The workflow automatically sends notifications to Slack.

### Successful Build

Includes:

- Android Version
- Developer
- Branch
- Pull Request Title
- Pull Request Description
- GitHub Workflow Link

### Failed Build

Includes:

- Repository
- Branch
- Developer
- Pull Request Title
- GitHub Workflow Link

This enables the development and QA teams to monitor every build without opening GitHub Actions.

---

# 🔐 Required GitHub Secrets

| Secret                     | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| `FIREBASE_SERVICE_ACCOUNT` | Firebase Service Account JSON used by Fastlane          |
| `SLACK_WEBHOOK_URL`        | Slack Incoming Webhook URL used for build notifications |

---

# 📌 Purpose

This workflow provides a complete Android CI/CD pipeline for React Native projects.

For every Pull Request, it automatically:

- Validates the project.
- Runs TypeScript, ESLint, and Prettier checks.
- Generates dynamic release notes.
- Automatically generates a unique Android version code.
- Builds a Release APK.
- Uploads the APK to Firebase App Distribution.
- Stores the APK as a GitHub Actions Artifact.
- Sends Slack notifications to the development team.

By combining GitHub Actions, Fastlane, Firebase App Distribution, and Slack, the project delivers a reliable, repeatable, scalable, and production-ready mobile CI/CD workflow.

---

# 🛠 Technologies

- GitHub Actions
- Fastlane
- Firebase App Distribution
- Slack Incoming Webhooks
- Ruby
- Bundler
- Node.js 22
- Java 17 (Temurin)
- Yarn
- TypeScript
- ESLint
- Prettier
- React Native
