// app/client.tsx
/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/start'
import { createRouter } from './router'

/**
 * # What is this file?
 * 
 * We need a way to hydrate our client-side JavaScript once the route 
 * resolves to the client. We do this by piping the same router information to 
 * our client entry point (this file).
 * 
 * This enables us to kick off client-side routing once the user's initial 
 * server request has fulfilled.
 * 
 * https://tanstack.com/start/latest/docs/framework/react/build-from-scratch#the-client-entry-point
 */

const router = createRouter()

// We need to hydrate our client-side JavaScript once the route resolves to the client. We do this by hydrating the root of our application with the StartClient component
// This enables us to kick off client-side routing once the user's initial server request has fulfilled.
hydrateRoot(document, <StartClient router={router} />)