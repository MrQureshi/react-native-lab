# Fastlane (Learning Journey)

This project uses **Fastlane** to automate repetitive Android development tasks and to better understand how CI/CD pipelines are built behind the scenes.

> **Goal:** Learn Fastlane from first principles by implementing each lane manually instead of relying on generated templates or copy-paste configurations.

## Current Progress

### ✅ Environment Setup

- Installed and configured **rbenv**
- Installed **Ruby 3.4**
- Configured **Bundler**
- Installed **Fastlane** locally using Bundler
- Created and configured a custom `Fastfile`

## Implemented Android Lanes

### `clean`

Removes Android build artifacts by executing the Gradle `clean` task.

```bash
bundle exec fastlane android clean
```

---

### `eslint`

Runs the project's ESLint configuration through the existing Yarn script to validate TypeScript/JavaScript code quality.

```bash
bundle exec fastlane android eslint
```

---

### `build_debug`

Builds a Debug APK using Gradle's `assembleDebug` task.

```bash
bundle exec fastlane android build_debug
```

## Upcoming Lanes

- `install_debug`
- `dev` (Development workflow)
- `build_release`
- `beta`
- `production`

## Planned Development Workflow

```text
dev
 ├── clean
 ├── eslint
 ├── build_debug
 └── install_debug
```

The `dev` lane will orchestrate multiple reusable lanes into a single command, demonstrating Fastlane's philosophy of composing small, focused automation tasks into larger development workflows.

## Learning Focus

This repository is intentionally built as a learning resource. Every lane is implemented step by step to understand:

- Fastlane architecture
- Lanes and workflow composition
- Built-in actions (`gradle`, `sh`, etc.)
- Android build automation
- CI/CD best practices
- Scalable automation for React Native projects

## If you find this repository helpful, consider giving it a ⭐.

Thank you for your support! 🚀
