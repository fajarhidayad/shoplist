/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UserImport } from './routes/_user'
import { Route as AuthImport } from './routes/_auth'
import { Route as UserStatisticsImport } from './routes/_user/statistics'
import { Route as UserItemsImport } from './routes/_user/items'
import { Route as AuthRegisterImport } from './routes/_auth/register'
import { Route as AuthLoginImport } from './routes/_auth/login'
import { Route as UserHistoryIndexImport } from './routes/_user/history.index'
import { Route as UserHistoryIdImport } from './routes/_user/history.$id'

// Create Virtual Routes

const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const UserRoute = UserImport.update({
  id: '/_user',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const UserStatisticsRoute = UserStatisticsImport.update({
  path: '/statistics',
  getParentRoute: () => UserRoute,
} as any)

const UserItemsRoute = UserItemsImport.update({
  path: '/items',
  getParentRoute: () => UserRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  path: '/register',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

const UserHistoryIndexRoute = UserHistoryIndexImport.update({
  path: '/history/',
  getParentRoute: () => UserRoute,
} as any)

const UserHistoryIdRoute = UserHistoryIdImport.update({
  path: '/history/$id',
  getParentRoute: () => UserRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_user': {
      id: '/_user'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof UserImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_auth/register': {
      id: '/_auth/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof AuthImport
    }
    '/_user/items': {
      id: '/_user/items'
      path: '/items'
      fullPath: '/items'
      preLoaderRoute: typeof UserItemsImport
      parentRoute: typeof UserImport
    }
    '/_user/statistics': {
      id: '/_user/statistics'
      path: '/statistics'
      fullPath: '/statistics'
      preLoaderRoute: typeof UserStatisticsImport
      parentRoute: typeof UserImport
    }
    '/_user/history/$id': {
      id: '/_user/history/$id'
      path: '/history/$id'
      fullPath: '/history/$id'
      preLoaderRoute: typeof UserHistoryIdImport
      parentRoute: typeof UserImport
    }
    '/_user/history/': {
      id: '/_user/history/'
      path: '/history'
      fullPath: '/history'
      preLoaderRoute: typeof UserHistoryIndexImport
      parentRoute: typeof UserImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthLoginRoute: typeof AuthLoginRoute
  AuthRegisterRoute: typeof AuthRegisterRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthLoginRoute: AuthLoginRoute,
  AuthRegisterRoute: AuthRegisterRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface UserRouteChildren {
  UserItemsRoute: typeof UserItemsRoute
  UserStatisticsRoute: typeof UserStatisticsRoute
  UserHistoryIdRoute: typeof UserHistoryIdRoute
  UserHistoryIndexRoute: typeof UserHistoryIndexRoute
}

const UserRouteChildren: UserRouteChildren = {
  UserItemsRoute: UserItemsRoute,
  UserStatisticsRoute: UserStatisticsRoute,
  UserHistoryIdRoute: UserHistoryIdRoute,
  UserHistoryIndexRoute: UserHistoryIndexRoute,
}

const UserRouteWithChildren = UserRoute._addFileChildren(UserRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '': typeof UserRouteWithChildren
  '/about': typeof AboutLazyRoute
  '/login': typeof AuthLoginRoute
  '/register': typeof AuthRegisterRoute
  '/items': typeof UserItemsRoute
  '/statistics': typeof UserStatisticsRoute
  '/history/$id': typeof UserHistoryIdRoute
  '/history': typeof UserHistoryIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '': typeof UserRouteWithChildren
  '/about': typeof AboutLazyRoute
  '/login': typeof AuthLoginRoute
  '/register': typeof AuthRegisterRoute
  '/items': typeof UserItemsRoute
  '/statistics': typeof UserStatisticsRoute
  '/history/$id': typeof UserHistoryIdRoute
  '/history': typeof UserHistoryIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_user': typeof UserRouteWithChildren
  '/about': typeof AboutLazyRoute
  '/_auth/login': typeof AuthLoginRoute
  '/_auth/register': typeof AuthRegisterRoute
  '/_user/items': typeof UserItemsRoute
  '/_user/statistics': typeof UserStatisticsRoute
  '/_user/history/$id': typeof UserHistoryIdRoute
  '/_user/history/': typeof UserHistoryIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/about'
    | '/login'
    | '/register'
    | '/items'
    | '/statistics'
    | '/history/$id'
    | '/history'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/about'
    | '/login'
    | '/register'
    | '/items'
    | '/statistics'
    | '/history/$id'
    | '/history'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/_user'
    | '/about'
    | '/_auth/login'
    | '/_auth/register'
    | '/_user/items'
    | '/_user/statistics'
    | '/_user/history/$id'
    | '/_user/history/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AuthRoute: typeof AuthRouteWithChildren
  UserRoute: typeof UserRouteWithChildren
  AboutLazyRoute: typeof AboutLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AuthRoute: AuthRouteWithChildren,
  UserRoute: UserRouteWithChildren,
  AboutLazyRoute: AboutLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/_user",
        "/about"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/login",
        "/_auth/register"
      ]
    },
    "/_user": {
      "filePath": "_user.tsx",
      "children": [
        "/_user/items",
        "/_user/statistics",
        "/_user/history/$id",
        "/_user/history/"
      ]
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/_auth/login": {
      "filePath": "_auth/login.tsx",
      "parent": "/_auth"
    },
    "/_auth/register": {
      "filePath": "_auth/register.tsx",
      "parent": "/_auth"
    },
    "/_user/items": {
      "filePath": "_user/items.tsx",
      "parent": "/_user"
    },
    "/_user/statistics": {
      "filePath": "_user/statistics.tsx",
      "parent": "/_user"
    },
    "/_user/history/$id": {
      "filePath": "_user/history.$id.tsx",
      "parent": "/_user"
    },
    "/_user/history/": {
      "filePath": "_user/history.index.tsx",
      "parent": "/_user"
    }
  }
}
ROUTE_MANIFEST_END */
