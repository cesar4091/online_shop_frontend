import NavigationBar from '../layouts/NavigationBar'
import HeroSection from '../layouts/HeroSection'
import Footer from '../layouts/Footer'
import Brands from '../layouts/Brands'


function Home() {

  return (
    <>
      <NavigationBar />
      <HeroSection />
      <Brands />
      <hr class="border-x-slate-600 w-2/3 mx-auto"></hr>
      <Footer />
    </>
  )
}

export default Home;
