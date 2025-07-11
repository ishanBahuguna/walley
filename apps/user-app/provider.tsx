"use client"

import { Provider } from "react-redux";

import { store } from "@repo/store/store";
import { SessionProvider } from "next-auth/react";

export const Providers = ({children}:{children : React.ReactNode}) => {
    return (
        <SessionProvider>
        <Provider store={store}>
            {children}
        </Provider>

        </SessionProvider>
    )
}