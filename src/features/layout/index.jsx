import NavBar from 'features/navbar'
import Footer from 'features/footer'
export default function Layout({ children }) {
  return (
    <div className='container mx-auto space-x-6'>
      <NavBar />
      {children}

      <Footer />
    </div>
  )
}
