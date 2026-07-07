## fastlane documentation

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android clean

```sh
[bundle exec] fastlane android clean
```

Clean Android project

### android eslint

```sh
[bundle exec] fastlane android eslint
```

Run ESLint for TypeScript/JavaScript

### android build_debug

```sh
[bundle exec] fastlane android build_debug
```

Build Debug APK

### android install_debug

```sh
[bundle exec] fastlane android install_debug
```

Install Debug APK

### android build_release

```sh
[bundle exec] fastlane android build_release
```

Build Release APK

### android build_aab

```sh
[bundle exec] fastlane android build_aab
```

Build Release App Bundle (AAB)

### android firebase

```sh
[bundle exec] fastlane android firebase
```

Upload Debug APK to Firebase App Distribution

### android firebase_release

```sh
[bundle exec] fastlane android firebase_release
```

Upload Release APK to Firebase App Distribution

### android dev

```sh
[bundle exec] fastlane android dev
```

Development workflow

---

## iOS

### ios clean

```sh
[bundle exec] fastlane ios clean
```

Clean iOS Derived Data

### ios eslint

```sh
[bundle exec] fastlane ios eslint
```

Run ESLint

### ios build_debug

```sh
[bundle exec] fastlane ios build_debug
```

Build Debug app for iOS Simulator

### ios boot_simulator

```sh
[bundle exec] fastlane ios boot_simulator
```

Boot iOS Simulator

### ios install_debug

```sh
[bundle exec] fastlane ios install_debug
```

Install app on booted simulator

### ios launch_app

```sh
[bundle exec] fastlane ios launch_app
```

Launch app

### ios dev

```sh
[bundle exec] fastlane ios dev
```

Development workflow

---

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
