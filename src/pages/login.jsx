import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

// Components
import Footer from '../components/common/Footer'
import LoginForm from '../components/login/LoginForm'
import MobileSlideShow from '../components/login/MobileSlideShow'

const Login = () => {
  const user = useSelector((state) => state.user.currentUser)
  const router = useRouter()

  // // If User already logged in, push to main index
  // user && router.push('/')

  return (
    <section className="flex h-screen min-h-screen w-screen flex-col justify-between">
      <main className="h-full">
        <article className="mx-auto flex h-screen w-full max-w-7xl">
          <div className="flex h-full w-full justify-center xs:items-center">
            <MobileSlideShow />
            <LoginForm />
          </div>
        </article>
      </main>

      <Footer />
    </section>
  )
}

export default Login
