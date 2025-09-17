# Contexts

-   AlertsContext - Manages alerts
-   FirebaseAuthContext - Provides the firebase user object
-   MinHeightContext - Fills the page's vertical space

## AlertsContext

### Purpose:

The AlertsContext provides a global way to add, remove, and clear alert messages across the app.

### API:

The context exposes the following functions:

-   `addAlert(type: "success" | "info" | "warning" | "error", message: string): string` Adds a new alert and returns its ID. Alerts are automatically removed after 5 seconds.
-   `removeAlert(id: string): void` Removes a specific alert by its ID.
-   `clearAlerts(): void` Removes all alerts.

### Example usage:

Wrap your app in the `AlertsProvider`

```
import { AlertsProvider } from "@minisquare/react-context"

const App = () => {
    return (
        <AlertsProvider>
            <YourContent />
        </AlertsProvider>
    )
}
```

Manage alerts with the `useAlerts` hook

```
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

## MinHeightContext
