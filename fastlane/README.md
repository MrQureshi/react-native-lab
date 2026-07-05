# 🚀 Fastlane Documentation

This project uses **Fastlane** to automate common development workflows for both **Android** and **iOS**.

---

# Prerequisites

Before using Fastlane, ensure the following are installed:

- Ruby (managed with `rbenv`)
- Bundler
- Fastlane (installed via the project's `Gemfile`)
- Android Studio (for Android builds)
- Xcode and Xcode Command Line Tools (for iOS builds)

Install the Xcode Command Line Tools (macOS only):

```sh
xcode-select --install
```

Install project dependencies:

```sh
bundle install
```

Run all Fastlane commands from the project root:

```sh
bundle exec fastlane <platform> <lane>
```

---

# Available Actions

# 🤖 Android

## Clean Project

```sh
bundle exec fastlane android clean
```

Cleans the Android Gradle project.

---

## Run ESLint

```sh
bundle exec fastlane android eslint
```

Runs ESLint on the JavaScript/TypeScript codebase.

---

## Build Debug APK

```sh
bundle exec fastlane android build_debug
```

Builds a Debug APK.

---

## Install Debug APK

```sh
bundle exec fastlane android install_debug
```

Installs the Debug APK on a connected Android device or emulator.

---

## Build Release APK

```sh
bundle exec fastlane android build_release
```

Builds the Release APK.

---

## Build Release AAB

```sh
bundle exec fastlane android build_aab
```

Builds the Release Android App Bundle (.aab).

---

## Development Workflow

```sh
bundle exec fastlane android dev
```

Runs the complete Android development workflow:

- Clean project
- Run ESLint
- Build Debug APK
- Install Debug APK
- Build Release APK
- Build Release AAB

---

# 🍎 iOS

## Clean Derived Data

```sh
bundle exec fastlane ios clean
```

Removes Xcode DerivedData to ensure a clean build.

---

## Run ESLint

```sh
bundle exec fastlane ios eslint
```

Runs ESLint on the JavaScript/TypeScript codebase.

---

## Build Debug App (Simulator)

```sh
bundle exec fastlane ios build_debug
```

Builds the application for the iOS Simulator without requiring code signing.

---

## Boot iOS Simulator

Boot the default configured iOS Simulator:

```sh
bundle exec fastlane ios boot_simulator
```

Or boot a specific simulator by providing the device name:

```sh
bundle exec fastlane ios boot_simulator device:"iPhone 15 Pro"
```

> **Tip:** List all available simulators on your machine with:
>
> ```sh
> xcrun simctl list devices
> ```

## Install Debug App

```sh
bundle exec fastlane ios install_debug
```

Installs the latest Debug build onto the booted iOS Simulator.

---

## Launch Application

```sh
bundle exec fastlane ios launch_app
```

Launches the installed application on the booted iOS Simulator.

---

## Development Workflow

```sh
bundle exec fastlane ios dev
```

Runs the complete iOS development workflow:

- Clean Derived Data
- Run ESLint
- Build Debug application
- Boot the iOS Simulator
- Install the application
- Launch the application

---

# Development Commands

## Android

```sh
bundle exec fastlane android dev
```

## iOS

```sh
bundle exec fastlane ios dev
```

These commands provide a complete one-command development workflow for each platform.

---

# Project Structure

```text
fastlane/
└── Fastfile

android/
ios/
Gemfile
```

A single **Fastfile** is used to manage automation for both Android and iOS, providing a unified automation workflow for the React Native project.

---

# Learn More

- Fastlane: https://fastlane.tools
- Fastlane Documentation: https://docs.fastlane.tools
