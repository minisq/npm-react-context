import React, { useContext, createContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { FaCircleCheck, FaBell, FaCircleExclamation, FaTriangleExclamation, FaXmark } from "react-icons/fa6"

// #region - types

type AlertsContextValue = {
    addAlert: (type: AlertType, message: string) => string
    removeAlert: (id: string) => void
    clearAlerts: () => void
}

type AlertType = "success" | "info" | "warning" | "error"

type Alert = {
    type: AlertType
    message: string
    id: string
}

type AlertIconProps = {
    type: AlertType
}

type AlertsProps = {
    alerts: Alert[]
    removeAlert: (id: string) => void
    clearAlerts: () => void
}

type AlertsProviderProps = {
    children: React.ReactNode
}

// #endregion

const x = "x"

const AlertsContext = createContext<AlertsContextValue | undefined>(undefined)

const AlertIcon: React.FC<AlertIconProps> = ({ type }) => {
    const Icon = {
        success: FaCircleCheck,
        info: FaBell,
        warning: FaCircleExclamation,
        error: FaTriangleExclamation,
    }[type]

    return (
        <div className={`alerts__alert__icon alerts__alert__icon--${type}`}>
            <Icon />
        </div>
    )
}

const Alerts: React.FC<AlertsProps> = ({ alerts, removeAlert, clearAlerts }) => {
    return (
        <div className="alerts">
            {alerts.map((alert) => (
                <div className="alerts__alert" key={alert.id}>
                    <div className="alerts__alert__left">
                        <AlertIcon type={alert.type} />
                        <p>{alert.message}</p>
                    </div>
                    <div className="alerts__alert__right">
                        <button onClick={() => removeAlert(alert.id)}>
                            <FaXmark />
                        </button>
                    </div>
                </div>
            ))}
            {alerts.length > 0 && <button onClick={clearAlerts}>Clear alerts</button>}
        </div>
    )
}

export const AlertsProvider: React.FC<AlertsProviderProps> = ({ children }) => {
    const [alerts, setAlerts] = useState<Alert[]>([])

    const clearAlerts = () => setAlerts([])

    const removeAlert = (id: string) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id))
    }

    const addAlert = (type: AlertType, message: string) => {
        const id = uuidv4()
        setAlerts((prev) => [...prev, { type, message, id }])
        setTimeout(() => removeAlert(id), 5000)
        return id
    }

    return (
        <AlertsContext.Provider value={{ addAlert, removeAlert, clearAlerts }}>
            <Alerts {...{ alerts, removeAlert, clearAlerts }} />
            {children}
        </AlertsContext.Provider>
    )
}

export const useAlerts = () => {
    const context = useContext(AlertsContext)

    if (context === undefined) throw Error("useAlerts must be used within an AlertsProvider")

    return context as AlertsContextValue
}
