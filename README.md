# @minisquare/react-context

-   AlertsContext - Manages alerts
-   FirebaseAuthContext - Provides firebase's user object
-   MinHeightContext - Helps to prevent blank vertical space

### Installation

Install the package with your preferred package manager:

#### npm

```bash
npm install @minisquare/react-context
```

#### Yarn

```bash
yarn add @minisquare/react-context
```

## AlertsContext

### Purpose:

The AlertsContext provides a global way to add, remove, and clear alert messages across the app.

### API:

The context exposes the following functions:

-   `addAlert(type: "success" | "info" | "warning" | "error", message: string): string`
    Adds a new alert and returns its ID. Alerts are automatically removed after 5 seconds.
-   `removeAlert(id: string): void`
    Removes a specific alert by its ID.
-   `clearAlerts(): void`
    Removes all alerts.

### Example usage:

Wrap your app in the `AlertsProvider`:

```jsx
import { AlertsProvider } from "@minisquare/react-context"

const App = () => {
    return (
        <AlertsProvider>
            <YourContent />
        </AlertsProvider>
    )
}
```

Manage alerts with the `useAlerts` hook:

```jsx
import { useAlerts } from "@minisquare/react-context"

const Form = () => {
    const { addAlert, removeAlert } = useAlerts()

    const save = async ({ email, password }) => {
        if (!email || !password) {
            return addAlert("warning", "Please check your details.")
        }

        const alertId = addAlert("info", "Saving...")

        try {
            // ...save logic
            addAlert("success", "Saved successfully!")
        } catch (error) {
            addAlert("error", "Failed to save.")
        } finally {
            removeAlert(alertId)
        }
    }

    // ...form logic
}
```

## FirebaseAuthContext

### Purpose

The FirebaseAuthContext provides a global instance of `user` so that `onAuthStateChanged` doesn't need to be called to get the current user in many places.

### Example usage

Wrap your app in the `FirebaseAuthProvider` and pass it the initialized Firebase `auth` instance:

```jsx
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { FirebaseAuthProvider } from "@minisquare/react-context"

const firebaseConfig = {
    // ...your config
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const App = () => {
    return (
        <FirebaseAuthProvider auth={auth}>
            <YourContent />
        </FirebaseAuthProvider>
    )
}
```

Access the current Firebase user with the `useFirebaseAuth` hook:

```jsx
import { useFirebaseAuth } from "@minisquare/react-context"

const Profile = () => {
    const { user } = useFirebaseAuth()

    if (!user) return <p>Please sign in.</p>

    return <p>Welcome, {user.displayName ?? user.email}</p>
}
```

## MinHeightContext
