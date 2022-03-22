import { useRouter } from 'next/router'

// Components
import Footer from '../common/Footer'
import Header from '../common/Header'

const Layout = ({ children }) => {
  const router = useRouter()

  return (
    <main className="relative flex min-h-screen flex-col justify-between">
      <Header currentTab={router.pathname} />
      <section className="h-full w-full">{children}</section>
      <Footer />
    </main>
  )
}

export default Layout
