// app/ssr.tsx
import {
    createStartHandler,
    defaultStreamHandler,
} from '@tanstack/start/server'
import { getRouterManifest } from '@tanstack/start/router-manifest'

import { createRouter } from './router'

/**
 * # What is this file?
 * 
 * As TanStack Start is an SSR framework, we need to pipe router information to 
 * our server entry point (which is this file).
 * 
 * This allows us to know what routes and loaders we need to execute when the 
 * user hits a given route.
 * 
 * https://tanstack.com/start/latest/docs/framework/react/build-from-scratch#the-server-entry-point
 */

export default createStartHandler({
    createRouter,
    getRouterManifest,
})(defaultStreamHandler)