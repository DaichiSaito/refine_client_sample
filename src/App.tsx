import { AuthBindings, GitHubBanner, Refine } from '@refinedev/core'
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'

import {
  ErrorComponent,
  notificationProvider,
  RefineThemes,
  ThemedLayoutV2,
} from '@refinedev/mantine'

import { ColorScheme, ColorSchemeProvider, Global, MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { NotificationsProvider } from '@mantine/notifications'
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6'
import { dataProvider } from './rest-data-provider'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Header } from './components/header'
import { BlogPostCreate, BlogPostEdit, BlogPostList, BlogPostShow } from './pages/blog-posts'
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from './pages/categories'
import { UserCreate, UserEdit, UserList, UserShow } from './pages/users'
import { ArticleCreate, ArticleEdit, ArticleList, ArticleShow } from './pages/articles'
import { accessControlProvider } from './access_control_provider'
import { Login } from './pages/login'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  const { isLoading, isAuthenticated, user, logout, getIdTokenClaims } = useAuth0()

  if (isLoading) {
    return <span>loading...</span>
  }

  const authProvider: AuthBindings = {
    login: async () => {
      return {
        success: true,
      }
    },
    logout: async () => {
      logout({ logoutParams: { returnTo: window.location.origin } })
      return {
        success: true,
      }
    },
    onError: async (error) => {
      console.error(error)
      return { error }
    },
    check: async () => {
      try {
        const token = await getIdTokenClaims()
        console.log(token)
        if (token) {
          axios.defaults.headers.common = {
            Authorization: `Bearer ${token.__raw}`,
          }
          return {
            authenticated: true,
          }
        } else {
          return {
            authenticated: false,
            error: {
              message: 'Check failed',
              name: 'Token not found',
            },
            redirectTo: '/login',
            logout: true,
          }
        }
      } catch (error: any) {
        return {
          authenticated: false,
          error: new Error(error),
          redirectTo: '/login',
          logout: true,
        }
      }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      if (user) {
        return {
          ...user,
          avatar: user.picture,
        }
      }
      return null
    },
  }

  getIdTokenClaims().then((token) => {
    console.log(token)
    if (token) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${token.__raw}`,
      }
    }
  })

  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          {/* You can change the theme colors here. example: theme={{ ...RefineThemes.Magenta, colorScheme:colorScheme }} */}
          <MantineProvider
            theme={{ ...RefineThemes.Blue, colorScheme: colorScheme }}
            withNormalizeCSS
            withGlobalStyles
          >
            <Global styles={{ body: { WebkitFontSmoothing: 'auto' } }} />
            <NotificationsProvider position='top-right'>
              <DevtoolsProvider>
                <Refine
                  // dataProvider={dataProvider(
                  //   "https://api.fake-rest.refine.dev"
                  // )}
                  dataProvider={dataProvider('http://localhost:3000')}
                  authProvider={authProvider}
                  notificationProvider={notificationProvider}
                  routerProvider={routerBindings}
                  accessControlProvider={accessControlProvider}
                  resources={[
                    {
                      name: 'users',
                      list: '/users',
                      create: '/users/create',
                      edit: '/users/edit/:id',
                      show: '/users/show/:id',
                      meta: {
                        canDelete: true,
                      },
                    },
                    {
                      name: 'categories',
                      list: '/categories',
                      create: '/categories/create',
                      edit: '/categories/edit/:id',
                      show: '/categories/show/:id',
                      meta: {
                        canDelete: true,
                      },
                    },
                    {
                      name: 'articles',
                      list: '/articles',
                      create: '/articles/create',
                      edit: '/articles/edit/:id',
                      show: '/articles/show/:id',
                      meta: {
                        canDelete: true,
                      },
                    },
                  ]}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: 'QXCRMC-j0DgPR-KDltsR',
                  }}
                >
                  <Routes>
                    <Route
                      element={
                        <ThemedLayoutV2 Header={() => <Header sticky />}>
                          <Outlet />
                        </ThemedLayoutV2>
                      }
                    >
                      <Route index element={<NavigateToResource resource='categories' />} />
                      <Route path='/users'>
                        <Route index element={<UserList />} />
                        <Route path='create' element={<UserCreate />} />
                        <Route path='edit/:id' element={<UserEdit />} />
                        <Route path='show/:id' element={<UserShow />} />
                      </Route>
                      <Route path='/categories'>
                        <Route index element={<CategoryList />} />
                        <Route path='create' element={<CategoryCreate />} />
                        <Route path='edit/:id' element={<CategoryEdit />} />
                        <Route path='show/:id' element={<CategoryShow />} />
                      </Route>
                      <Route path='/articles'>
                        <Route index element={<ArticleList />} />
                        <Route path='create' element={<ArticleCreate />} />
                        <Route path='edit/:id' element={<ArticleEdit />} />
                        <Route path='show/:id' element={<ArticleShow />} />
                      </Route>
                      {/* <Route
                        index
                        element={<NavigateToResource resource="blog_posts" />}
                      />
                      <Route path="/blog-posts">
                        <Route index element={<BlogPostList />} />
                        <Route path="create" element={<BlogPostCreate />} />
                        <Route path="edit/:id" element={<BlogPostEdit />} />
                        <Route path="show/:id" element={<BlogPostShow />} />
                      </Route>
                      <Route path="/categories">
                        <Route index element={<CategoryList />} />
                        <Route path="create" element={<CategoryCreate />} />
                        <Route path="edit/:id" element={<CategoryEdit />} />
                        <Route path="show/:id" element={<CategoryShow />} />
                      </Route> */}
                      <Route path='*' element={<ErrorComponent />} />
                    </Route>
                    <Route>
                      <Route path='/login' element={<Login />}></Route>
                    </Route>
                  </Routes>

                  <RefineKbar />
                  <UnsavedChangesNotifier />
                  <DocumentTitleHandler />
                </Refine>
                <DevtoolsPanel />
              </DevtoolsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  )
}

export default App
