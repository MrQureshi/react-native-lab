## 🚀 Fastlane Documentation

This project uses **Fastlane** to automate Android and iOS development workflows, including local development, Release builds, Firebase App Distribution, and simulator automation.

---

# Installation

Make sure you have the latest version of the Xcode Command Line Tools installed:

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

For Fastlane installation instructions, visit:

https://docs.fastlane.tools

---

# Available Actions

# 🤖 Android

## android clean

Clean the Android project.

```sh
bundle exec fastlane android clean
```

---

## android eslint

Run ESLint for the JavaScript / TypeScript codebase.

```sh
bundle exec fastlane android eslint
```

---

## android build_debug

Build a Debug APK.

```sh
bundle exec fastlane android build_debug
```

---

## android install_debug

Install the Debug APK on a connected Android device or emulator.

```sh
bundle exec fastlane android install_debug
```

---

## android build_release

Build a Release APK.

```sh
bundle exec fastlane android build_release
```

---

## android build_aab

Build a Release Android App Bundle (AAB).

```sh
bundle exec fastlane android build_aab
```

---

## android firebase

Upload the Debug APK to Firebase App Distribution.

```sh
bundle exec fastlane android firebase
```

---

## android firebase_release

Upload the Release APK to Firebase App Distribution.

```sh
bundle exec fastlane android firebase_release
```

---

## android dev

Runs the complete Android development workflow.

Workflow:

- Clean Android project
- Run ESLint
- Build Release APK
- Upload Release APK to Firebase App Distribution

```sh
bundle exec fastlane android dev
```

---

# 🍎 iOS

## ios clean

Clean Xcode Derived Data.

```sh
bundle exec fastlane ios clean
```

---

## ios eslint

Run ESLint.

```sh
bundle exec fastlane ios eslint
```

---

## ios build_debug

Build the Debug application for the iOS Simulator.

```sh
bundle exec fastlane ios build_debug
```

---

## ios boot_simulator

Boot the default iOS Simulator.

```sh
bundle exec fastlane ios boot_simulator
```

You can also launch a specific simulator:

```sh
bundle exec fastlane ios boot_simulator device:"iPhone 15 Pro"
```

---

## ios install_debug

Install the generated application onto the booted simulator.

```sh
bundle exec fastlane ios install_debug
```

---

## ios launch_app

Launch the application on the booted simulator.

```sh
bundle exec fastlane ios launch_app
```

---

## ios dev

Runs the complete iOS development workflow.

Workflow:

- Clean Derived Data
- Run ESLint
- Build Debug Application
- Boot iOS Simulator
- Install Application
- Launch Application

```sh
bundle exec fastlane ios dev
```

---

---

# ☁️ Google Cloud & Firebase Setup

Before using Firebase App Distribution with Fastlane, complete the following one-time setup.

## Step 1 – Create a Firebase Project

1. Open the Firebase Console.
2. Create a new Firebase project.
3. Register your Android application.
4. Download the `google-services.json` file.
5. Place it in:

```text
android/app/google-services.json
```

---

## Step 2 – Enable Firebase App Distribution

From the Firebase Console:

1. Open your project.
2. Navigate to **App Distribution**.
3. Complete the App Distribution setup.

---

## Step 3 – Create a Google Cloud Service Account

1. Open the Google Cloud Console associated with your Firebase project.
2. Navigate to:

```text
IAM & Admin
    └── Service Accounts
```

3. Create a new Service Account (for example, `fastlane`).
4. Grant the **Firebase App Distribution Admin** role.
5. Generate a new **JSON Key**.
6. Download the JSON credentials.

---

## Step 4 – Store the Credentials

Rename the downloaded file to:

```text
firebase-service-account.json
```

Store it locally:

```text
secrets/firebase-service-account.json
```

> **Important:** Never commit this file to source control.

Add it to `.gitignore`:

```text
secrets/
```

---

## Step 5 – Configure Fastlane

Update your `Fastfile` constants:

```ruby
FIREBASE_CREDENTIALS = "secrets/firebase-service-account.json"
FIREBASE_APP_ID = "<YOUR_FIREBASE_APP_ID>"
```

The `FIREBASE_APP_ID` can be copied from the Firebase Console under **Project Settings → General**.

---

## Step 6 – Configure GitHub Actions

For cloud execution, add the following GitHub repository secret:

| Secret                     | Description                                 |
| -------------------------- | ------------------------------------------- |
| `FIREBASE_SERVICE_ACCOUNT` | Contents of `firebase-service-account.json` |

During every GitHub Actions run, the workflow recreates the credential file before executing Fastlane. This ensures the credentials are never stored in the repository while still allowing secure authentication with Firebase App Distribution.

---

# 🤖 GitHub Actions Integration

The Android `dev` lane is executed automatically by the GitHub Actions CI/CD workflow on every Pull Request targeting:

- `develop`
- `main`

Workflow:

```text
Pull Request
      │
      ▼
GitHub Actions
      │
      ▼
Fastlane Android Dev
      │
      ├── Clean
      ├── ESLint
      ├── Build Release APK
      └── Firebase App Distribution
```

This provides automatic validation, Release APK generation, and Firebase distribution without requiring any manual intervention.

---

This README is automatically generated by Fastlane and may be regenerated whenever Fastlane documentation is updated.

More information:

- https://fastlane.tools
- https://docs.fastlane.tools
