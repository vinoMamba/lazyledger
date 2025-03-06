import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { useQueryClient } from '@tanstack/react-query'

const router = createRouter({
  routeTree,
  context: { queryClient: undefined! },
  defaultNotFoundComponent: () => <div>Not Found</div>,
  defaultErrorComponent: () => <div>Error</div>,
  defaultPendingComponent: () => <div>Loading...</div>,

})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const Application = () => {
  const queryClient = useQueryClient()

  return <RouterProvider router={router} context={{ queryClient }} />
}
