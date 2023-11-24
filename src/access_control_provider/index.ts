import { AccessControlProvider } from '@refinedev/core'

const role = 'super'
// const role = 'normal'

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action, params }) => {
    console.log(resource) // products, orders, etc.
    console.log(action) // list, edit, delete, etc.
    console.log(params) // { id: 1 }, { id: 2 }, etc.

    if (role === 'super') {
      return {
        can: true,
      }
    }

    if (role === 'normal') {
      if (resource === 'categories') {
        return { can: false }
      }
      return {
        can: true,
      }
    }

    return {
      can: false,
      reason: 'Unauthorized',
    }
  },
}
