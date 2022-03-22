import Image from 'next/image'
import { useEffect } from 'react'
import iphone from '../../../public/images/login/iphone.png'
import iphone1 from '../../../public/images/login/iphone1.png'
import iphone2 from '../../../public/images/login/iphone2.png'
import iphone3 from '../../../public/images/login/iphone3.png'
import iphone4 from '../../../public/images/login/iphone4.png'

const MobileSlideShow = () => {
  // Logic for slide show
  useEffect(() => {
    let slide = 1

    document.getElementById(`slide${slide}`)?.classList.remove('opacity-0')

    document
      .getElementById(`slide${slide}`)
      ?.classList.add('animate-[fade_10s_ease-in]', 'z-50')

    document.getElementById(`slide${slide + 1}`)?.classList.remove('opacity-0')

    const intervalID = setInterval(() => {
      document.getElementById(`slide${slide}`)?.classList.add('opacity-0')

      document
        .getElementById(`slide${slide}`)
        ?.classList.remove('animate-[fade_10s_ease-in]', 'z-50')

      if (slide === 3) {
        document.getElementById(`slide1`)?.classList.remove('opacity-0')
        document
          .getElementById(`slide4`)
          ?.classList.add('animate-[fade_10s_ease-in]', 'z-50')
      } else if (slide === 5) {
        document.getElementById(`slide2`)?.classList.remove('opacity-0')
        document
          .getElementById(`slide1`)
          ?.classList.add('animate-[fade_10s_ease-in]', 'z-50')
      } else {
        document
          .getElementById(`slide${slide + 2}`)
          ?.classList.remove('opacity-0')
        document
          .getElementById(`slide${slide + 1}`)
          ?.classList.add('animate-[fade_10s_ease-in]', 'z-50')
      }

      slide += 1
      if (slide === 5) slide = 1
    }, 7000)

    return () => {
      clearInterval(intervalID)
    }
  }, [])

  return (
    <div className={`relative hidden w-[440px] lg1:flex`}>
      <div className="relative w-full">
        <Image draggable={false} src={iphone} className="h-auto w-full" />
      </div>

      <div
        id="slide1"
        className="visible absolute left-[149px] top-[27px] z-50 opacity-0"
      >
        <Image
          draggable={false}
          src={iphone1}
          className="h-auto w-[100px]"
          height="510px"
          width="233px"
        />
      </div>

      <div
        id="slide2"
        className=" visible absolute left-[149px] top-[27px] opacity-0"
      >
        <Image
          draggable={false}
          src={iphone2}
          className="h-auto w-[100px]"
          height="510px"
          width="233px"
        />
      </div>

      <div
        id="slide3"
        className="visible absolute left-[149px] top-[27px] opacity-0 duration-[3000ms]"
      >
        <Image
          draggable={false}
          src={iphone3}
          className="h-auto w-[100px]"
          height="510px"
          width="233px"
        />
      </div>

      <div
        id="slide4"
        className="visible absolute left-[149px] top-[27px] opacity-0"
      >
        <Image
          draggable={false}
          src={iphone4}
          className="h-auto w-[100px]"
          height="510px"
          width="233px"
        />
      </div>
    </div>
  )
}

export default MobileSlideShow
