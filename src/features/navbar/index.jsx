export default function NavBar({}) {
  return (
    <>
      <nav className='bg-blue-100'>
        <div className='max-w-6xl mx-auto px-8'>
          <div className='flex justify-between'>
            <div className='flex space-x-4'>
              {/* <!-- logo --> */}
              <div>
                <a
                  href='/'
                  className='flex items-center py-5 px-2 text-gray-700 hover:text-gray-900'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z' />
                  </svg>
                  <span className='font-bold'>Book Beats</span>
                </a>
              </div>
              {/* primary nav --> */}
              <div className='hidden md:flex items-center space-x-1'>
                <a
                  href='/admin/books/assignments'
                  className='py-5 px-3 text-gray-700 hover:text-gray-900'
                >
                  Books
                </a>
                <a
                  href='/admin/bags'
                  className='py-5 px-3 text-gray-700 hover:text-gray-900'
                >
                  Bags
                </a>
                <a
                  href='/admin/readers/invitees'
                  className='py-5 px-3 text-gray-700 hover:text-gray-900'
                >
                  Volunteers
                </a>
                <a
                  href='/admin/bags/judges'
                  className='py-5 px-3 text-gray-700 hover:text-gray-900'
                >
                  Scores
                </a>
                <a
                  href='/admin/readers/assignments'
                  className='py-5 px-3 text-gray-700 hover:text-gray-900'
                >
                  Assignments
                </a>
              </div>
            </div>
            {/* secondary nav--> */}
            <div className='hidden md:flex items-center space-x-1'>
              <a href='#' className='py-5 px-3'>
                Login
              </a>
              <a
                href='#'
                className='py-3 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300 '
              >
                Sign up
              </a>
            </div>
            {/* mobile button --> */}
            <div className='md:hidden flex items-center'>
              {' '}
              <button className='mobile-menu-button'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <div className='mobile-menu md:hidden'>
          <a href='#' className='block py-2 px-4 text-sm hover:bg-gray-200'>
            Books
          </a>
          <a href='#' className='block py-2 px-4 text-sm hover:bg-gray-200'>
            Bags
          </a>
          <a href='#' className='block py-2 px-4 text-sm hover:bg-gray-200'>
            Volunteers
          </a>
          <a href='#' className='block py-2 px-4 text-sm hover:bg-gray-200'>
            Scores
          </a>
          <a href='#' className='block py-2 px-4 text-sm hover:bg-gray-200'>
            Assignments
          </a>
        </div>
      </nav>
    </>
  )
}
