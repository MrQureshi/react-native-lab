# 🚀 Fastlane iOS Setup Guide

> **Note**
>
> This document only explains how to initialize Fastlane for the iOS project using `fastlane init`. It does **not** cover the implementation of custom lanes. Since this is a React Native project, the actual automation workflow is implemented in the project's **root Fastfile**, where both Android and iOS lanes are managed from a single entry point.

This document explains how Fastlane was initialized for the iOS project and why specific options were chosen.

---

# Prerequisites

Before initializing Fastlane, ensure the following are installed:

- Ruby (managed with `rbenv`)
- Bundler
- Fastlane (installed through the project's `Gemfile`)
- Xcode
- CocoaPods
- A working React Native iOS project

Verify the project builds successfully:

```bash
npx react-native run-ios
```

If the application runs successfully on the iOS Simulator, you're ready to initialize Fastlane.

---

# Step 1 — Navigate to the iOS Directory

From the project root:

```bash
cd ios
```

---

# Step 2 — Initialize Fastlane

Run:

```bash
bundle exec fastlane init
```

Fastlane will inspect the Xcode project and begin the initialization process.

---

# Step 3 — Choose Manual Setup

When prompted:

```text
Ambiguous choice. Please choose one of:

1. 📸 Automate screenshots
2. 👩‍✈️ Automate beta distribution to TestFlight
3. 🚀 Automate App Store distribution
4. 🛠 Manual setup - manually setup your project to automate your tasks
```

Select:

```text
4
```

or choose:

```text
🛠 Manual setup - manually setup your project to automate your tasks
```

---

# Why Manual Setup?

This repository is a learning project.

The objective is to understand how Fastlane works internally rather than relying on automatically generated release pipelines.

Manual setup allows us to:

- Learn Fastlane fundamentals.
- Create custom lanes step by step.
- Understand every action used in the automation.
- Avoid unnecessary App Store and TestFlight configuration.

---

# Apple ID Prompt

Fastlane may ask for an Apple ID.

For this learning project:

- No Apple Developer account is required.
- No TestFlight configuration is required.
- No App Store Connect configuration is required.

If prompted, simply skip or cancel any Apple ID–related setup and continue with the manual configuration.

---

# Generated Structure

After initialization, Fastlane creates the following directory:

```text
ios/
└── fastlane/
    ├── Appfile
    ├── Fastfile
    └── README.md
```

---

# Next Steps

This guide only covers the initialization of Fastlane inside the `ios` directory.

The generated `ios/fastlane` folder provides the basic Fastlane structure (`Fastfile`, `Appfile`, and `README.md`) required for iOS automation.

Since this is a React Native project, our primary Fastlane workflow is managed from the **root Fastfile**, which acts as the single entry point for both Android and iOS automation.

Continue with the Fastlane documentation in the project's root directory to build the complete iOS development workflow.

The root Fastfile demonstrates how to create and organize custom lanes such as:

```text
ios
├── clean
├── eslint
├── boot_simulator
├── build_debug
├── build_release
└── dev
```

The `dev` lane orchestrates the complete iOS development workflow by combining multiple lanes into a single command, providing the same developer experience as the Android Fastlane implementation.

Refer to the root `README.md` and `Fastfile` for the remaining setup and lane implementation.

---

# Learning Goal

The goal is not simply to automate iOS builds, but to understand:

- How Fastlane communicates with Xcode.
- The purpose of workspaces and schemes.
- Debug vs. Release builds.
- How Fastlane orchestrates native iOS development workflows.

By the end of this guide, you'll have a reusable Fastlane configuration for iOS that follows the same architecture as the Android implementation.
