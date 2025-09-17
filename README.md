# Contexts

-   AlertsContext - Manages alerts
-   FirebaseAuthContext - Provides the firebase user object
-   MinHeightContext - Fills the page's vertical space

## AlertsContext

**Purpose:**

The AlertsContext provides a global way to add, remove, and clear alert messages across the app.

**API:**

The context exposes the following functions:

-   `addAlert(type: "success" | "info" | "warning" | "error", message: string): string` Adds a new alert and returns its ID. Alerts are automatically removed after 5 seconds.
-   `removeAlert(id: string): void` Removes a specific alert by its ID.
-   `clearAlerts(): void` Removes all alerts.

## FirebaseAuthContext

## MinHeightContext
