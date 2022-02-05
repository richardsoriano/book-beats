import NavBar from 'features/navbar'
import Footer from 'features/footer'
export default function Layout({ children }) {
  return (
    <div className='container mx-auto'>
      <NavBar />
      {children}

      <Footer />
    </div>
  )
}
