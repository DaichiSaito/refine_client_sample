import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mantine/core'
export const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <>
      <h1>ログインページ</h1>
      <Button onClick={() => loginWithRedirect()}>ログイン</Button>
    </>
  )
}
