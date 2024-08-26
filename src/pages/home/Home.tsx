import Contact from '../../components/homeCom/contact/Contact'
import Navbar from '../../layouts/navbar/Navbar'
import Hero from '../../components/homeCom/hero/Hero'
import PortfolioCom from '../../components/homeCom/portfolio/PortfolioCom'
import CardCom from '../../components/homeCom/card/CardCom'
import Review from '../../components/homeCom/clientsReview/Review'
import Pricing from '../../components/homeCom/pricing/Pricing'
import Footer from '../../layouts/footer/Footer'

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <PortfolioCom />
            <CardCom />
            <Review />
            <Pricing />
            <Contact />
            <Footer />
        </>
    )
}

export default Home
