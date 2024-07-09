import { useSession } from 'next-auth/react'

export function useUserAccess() {
  const { data: session } = useSession()

  return {
    isProUser: session?.user?.UserAccessLevel ?? false,
    isAuthenticated: !!session,
  }
}