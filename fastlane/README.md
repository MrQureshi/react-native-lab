# 🚀 Fastlane Documentation

This project uses **Fastlane** together with **GitHub Actions** to provide a production-ready mobile CI/CD pipeline for React Native applications.

The automation includes:

- Android Development & Release Builds
- iOS Development Automation
- Firebase App Distribution
- Google Cloud Authentication
- Automatic Android Versioning
- Dynamic Release Notes
- Slack Notifications
- GitHub Actions Integration

---

# 📦 Installation

Make sure you have the latest version of the Xcode Command Line Tools installed:

```sh
xcode-select --install
```

Install the project dependencies:

```sh
bundle install
```

Run all Fastlane commands from the project root:

```sh
bundle exec fastlane <platform> <lane>
```

For Fastlane installation instructions:

https://docs.fastlane.tools

---

# 🤖 Available Lanes

# Android

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

1. Clean Android Project
2. Run ESLint
3. Build Release APK
4. Upload Release APK to Firebase App Distribution

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

Launch a specific simulator:

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

1. Clean Derived Data
2. Run ESLint
3. Build Debug Application
4. Boot iOS Simulator
5. Install Application
6. Launch Application

```sh
bundle exec fastlane ios dev
```

---

# ☁️ Google Cloud & Firebase Setup

Before using Firebase App Distribution with Fastlane, complete the following one-time setup.

---

## Step 1 – Create a Firebase Project

1. Open Firebase Console.
2. Create a Firebase project.
3. Register your Android application.
4. Download `google-services.json`.
5. Copy it to:

```text
android/app/google-services.json
```

---

## Step 2 – Enable Firebase App Distribution

From Firebase Console:

1. Open your project.
2. Navigate to **App Distribution**.
3. Complete the setup.

---

## Step 3 – Create a Google Cloud Service Account

Navigate to:

```text
Google Cloud Console
      │
      ▼
IAM & Admin
      │
      ▼
Service Accounts
```

Create a Service Account.

Recommended name:

```text
fastlane
```

Grant the following role:

```text
Firebase App Distribution Admin
```

Generate a JSON Key and download it.

---

## Step 4 – Store the Credentials

Rename the downloaded file:

```text
firebase-service-account.json
```

Store it locally:

```text
secrets/firebase-service-account.json
```

Never commit this file.

Ensure `.gitignore` contains:

```text
secrets/
```

---

## Step 5 – Configure Fastlane

Update the constants inside your Fastfile.

```ruby
FIREBASE_CREDENTIALS = "secrets/firebase-service-account.json"

FIREBASE_APP_ID = "<YOUR_FIREBASE_APP_ID>"
```

The Firebase App ID can be found in:

```text
Firebase Console
      │
      ▼
Project Settings
      │
      ▼
General
      │
      ▼
App ID
```

---

## Step 6 – Configure GitHub Actions

Add the following GitHub Repository Secret:

| Secret                     | Description                                 |
| -------------------------- | ------------------------------------------- |
| `FIREBASE_SERVICE_ACCOUNT` | Contents of `firebase-service-account.json` |
| `SLACK_WEBHOOK_URL`        | Slack Incoming Webhook URL                  |

During every GitHub Actions execution, the workflow recreates the credential file automatically.

This allows secure authentication without storing credentials in the repository.

---

# 🔢 Automatic Android Versioning

Android versioning is fully automated during CI/CD.

Only the application version is maintained manually.

File:

```text
android/version.properties
```

Example:

```properties
VERSION_NAME=1.0.0
VERSION_CODE=1
```

During GitHub Actions:

- `VERSION_NAME` is read from `version.properties`.
- `VERSION_CODE` is automatically injected using the GitHub Actions workflow run number.

Example:

| GitHub Run | Android Version |
| ---------- | --------------- |
| #21        | 1.0.0 (21)      |
| #22        | 1.0.0 (22)      |
| #23        | 1.0.0 (23)      |

Benefits:

- Every Firebase build has a unique version.
- No duplicate Android versions.
- No Git commits required.
- Local development continues to work normally.

---

# 📝 Dynamic Release Notes

Every Firebase build includes automatically generated release notes.

The release notes include:

- Release Date
- Android Version
- Branch Name
- Developer Name
- Pull Request Title
- Pull Request Description

These notes are generated by GitHub Actions and supplied to Fastlane during Firebase App Distribution.

---

# 🤖 GitHub Actions Integration

The Android `dev` lane executes automatically on every Pull Request targeting:

- `develop`
- `main`

Pipeline:

```text
Pull Request
      │
      ▼
GitHub Actions
      │
      ▼
Quality Checks
      │
      ├── TypeScript
      ├── ESLint
      └── Prettier
      │
      ▼
Generate Release Notes
      │
      ▼
Inject Android Version Code
      │
      ▼
Fastlane Android Dev
      │
      ├── Clean
      ├── ESLint
      ├── Build Release APK
      └── Firebase App Distribution
      │
      ▼
Upload APK Artifact
      │
      ▼
Slack Notification
```

This provides fully automated validation, build generation, distribution, and team notifications.

---

# 💬 Slack Notifications

The CI/CD workflow automatically sends Slack notifications.

## Successful Build

Includes:

- Android Version
- Developer
- Branch
- Pull Request Title
- Pull Request Description
- GitHub Workflow Link

---

## Failed Build

Includes:

- Repository
- Branch
- Developer
- Pull Request Title
- GitHub Workflow Link

This keeps developers and QA informed without manually checking GitHub Actions.

---

# 📦 GitHub Actions Artifacts

Every successful workflow uploads the generated Release APK as a GitHub Actions Artifact.

Benefits:

- Secondary APK download location
- Build history
- Easy access for developers
- Easy access for QA

Artifacts are retained according to the GitHub Actions retention policy.

---

# 📚 Additional Documentation

Useful resources:

- Fastlane Documentation
  https://docs.fastlane.tools

- Firebase App Distribution
  https://firebase.google.com/docs/app-distribution

- GitHub Actions Documentation
  https://docs.github.com/actions

- Google Cloud Service Accounts
  https://cloud.google.com/iam/docs/service-accounts

---

This project demonstrates a production-ready mobile DevOps pipeline by combining Fastlane, GitHub Actions, Firebase App Distribution, Google Cloud, and Slack to automate Android build, distribution, and team communication.
