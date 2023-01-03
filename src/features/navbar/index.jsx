import { useSession, signOut, signIn } from "next-auth/react"
import Link from "next/link"
export default function NavBar({}) {
  const { data: session } = useSession()

  return (
    <>
      <nav className="bg-blue-100">
        <div className="max-w-6xl px-8 mx-auto">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {/* <!-- logo --> */}
              <div>
                <Link href="/">
                  <a className="flex items-center px-3 py-5 text-gray-700 hover:text-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    <span className="px-2 font-bold">Book Beats</span>
                  </a>
                </Link>
              </div>
              {/* primary nav --> */}
              <div className="items-center hidden space-x-1 md:flex">
                <Link href="/admin/books/list">
                  <a className="px-3 py-5 text-gray-700 hover:text-gray-900">
                    Books
                  </a>
                </Link>
                <Link href="/admin/books/assignments">
                  <a className="px-3 py-5 text-gray-700 hover:text-gray-900">
                    Assignments
                  </a>
                </Link>
                <Link href="/admin/bags">
                  <a className="px-3 py-5 text-gray-700 hover:text-gray-900">
                    Bags
                  </a>
                </Link>
                <Link href="/admin/bags/parser">
                  <a className="px-3 py-5 text-gray-700 hover:text-gray-900">
                    Bag Parser
                  </a>
                </Link>
                {/* <Link href="/admin/readers/invitees">
                  <a className="px-3 py-5 text-gray-700 hover:text-gray-900">
                    Readers
                  </a>
                </Link> */}
                {/* <Link href="/admin/bags/judges">
                  <a className="px-3 py-5 text-gray-700 hover:text-gray-900">
                    Scores
                  </a>
                </Link> */}
                <Link href="/admin/books/parser">
                  <a className="px-3 py-5 text-gray-700 hover:text-gray-900">
                    Import Books
                  </a>
                </Link>
              </div>
            </div>
            {/* secondary nav--> */}
            <div className="items-center hidden space-x-1 md:flex">
              {session ? (
                <>
                  Signed in as
                  <br />
                  {session.user?.email}
                  <br />
                  <a onClick={signOut} className="px-3 py-5">
                    Log out
                  </a>
                </>
              ) : (
                <>
                  <a onClick={signIn} className="px-3 py-5">
                    Login
                  </a>
                  <a
                    href="#"
                    className="px-3 py-3 text-yellow-900 transition duration-300 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800 "
                  >
                    Sign up
                  </a>
                </>
              )}
            </div>
            {/* mobile button --> */}
            <div className="flex items-center md:hidden">
              {" "}
              <button className="mobile-menu-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <div className="mobile-menu md:hidden">
          <a
            href="/admin/books/assignments"
            className="block px-4 py-2 text-sm hover:bg-gray-200"
          >
            Books
          </a>
          <a
            href="/admin/bags"
            className="block px-4 py-2 text-sm hover:bg-gray-200"
          >
            Bags
          </a>
          <a
            href="/admin/readers/invitees"
            className="block px-4 py-2 text-sm hover:bg-gray-200"
          >
            Volunteers
          </a>
          <a
            href="/admin/bags/judges"
            className="block px-4 py-2 text-sm hover:bg-gray-200"
          >
            Scores
          </a>
          <a
            href="/admin/readers/assignments"
            className="block px-4 py-2 text-sm hover:bg-gray-200"
          >
            Assignments
          </a>
        </div>
      </nav>
    </>
  )
}
