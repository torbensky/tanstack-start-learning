// app/routes/__root.tsx
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { getCookie } from '@tanstack/start/server'
import { getSessionUser } from '../auth'


const fetchAuth = createServerFn({ method: 'GET' }).handler(async () => {
  const sessionId = getCookie('session_id')
  if(sessionId === undefined){
    return undefined
  }

  return getSessionUser(sessionId)
})

/**
 * # What is this file?
 * 
 * we need to create the root of our application. This is the entry point for 
 * all other routes. The code in this file will wrap all other routes in the 
 * application.
 * 
 * [Learn more](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch#the-root-of-your-application)
 * 
 * Other than the client entry point, the __root route of your application is the entry point for your application. The code in this file will wrap all other routes in the app, including your home page. It behaves like a layout route for your whole application.
 * Because it is always rendered, it is the perfect place to construct your application shell and take care of any global logic.
 * 
 * [Learn more](https://tanstack.com/start/latest/docs/framework/react/learn-the-basics#the-root-of-your-application)
 */

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Torb TanStack Start Learning',
      },
    ],
  }),
  beforeLoad: async () => {
    const user = await fetchAuth()

    return {
      user,
    }
  },
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
        <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {/* Notice this Scripts component. This is used to load all of the client-side JavaScript for the application. */}
        <Scripts />
      </body>
    </html>
  )
}