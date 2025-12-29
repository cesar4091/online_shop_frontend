import NavigationBar from '../layouts/NavigationBar'
import HeroSection from '../layouts/HeroSection'
import Footer from '../layouts/Footer'
import Brands from '../layouts/Brands'
import TireSearch from '../layouts/tireSearch'
import PromotionsCarousel from '../layouts/PromotionsCarousel'


function Home() {

  return (
    <>
      <NavigationBar />
      <TireSearch />
      <PromotionsCarousel />
      <Brands />
      <hr class="border-x-slate-600 w-2/3 mx-auto"></hr>
      <Footer />
    </>
  )
}

export default Home;
