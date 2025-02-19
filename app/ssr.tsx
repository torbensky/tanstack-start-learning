// app/ssr.tsx
import {
    createStartHandler,
    defaultStreamHandler, // `defaultStreamHandler` is used to render our application to a stream, allowing us to take advantage of streaming HTML to the client. (This is the default handler, but you can also use other handlers like defaultRenderHandler, or even build your own)
} from '@tanstack/start/server'

// `getRouterManifest` is used to generate the router manifest, which is used to determine many aspects of asset management and preloading for our application.
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
 * 
 * # Other things to know
 * 
 * - A new router is created for each request
 */

export default createStartHandler({
    createRouter,
    getRouterManifest,
})(defaultStreamHandler)