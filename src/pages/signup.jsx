import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Footer from '../components/common/Footer'
import SignupForm from '../components/signup/SignupForm'
import MobileSlideShow from '../components/login/MobileSlideShow'

const Signup = () => {
  const router = useRouter()
  const user = useSelector((state) => state.user.currentUser)
  // // If user is already logged in, redirect to main index
  // user && router.push('/')

  return (
    <section className="flex h-screen min-h-screen w-screen flex-col justify-between">
      <main className="h-full">
        <article className="mx-auto flex h-screen w-full max-w-7xl">
          <div className="flex h-full w-full justify-center xs:items-center">
            <MobileSlideShow />
            <SignupForm />
          </div>
        </article>
      </main>

      <Footer />
    </section>
  )
}

export default Signup
