import { useSession, signIn, signOut } from 'next-auth/react'

export default function Page({ children }) {
  const { data: session } = useSession()

  return (
    <div className='mt-8 container mx-auto'>
      <nav>
        {session ? (
          <button onClick={() => signOut()}>Sign out</button>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </nav>
      <main>{children}</main>
    </div>
  )
}
