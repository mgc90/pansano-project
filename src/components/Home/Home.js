import Navbar from "../Navbar/Navbar";
/*import Banner from "../Banner/Banner";*/
import Galery from "../Galery/Galery";
import Products from "../Products/Products";
import styles from "../Products/Products.module.css"
import Filters from "../Filters/Filters";
import Footer from "../Footer/Footer";


const Home = () => {
    return (
    <div>
        <Navbar />
        {/*<Banner /> */}
        <div className="galeryContainer">
            <Galery />
        </div>
        <div className={styles.productsTitle}>
        <h1>Nuestros Productos</h1>
        </div>
        <div className={styles.stickear}>
            <Filters />
        </div>
        <div className={styles.productCardContainer}>
            <Products />
        </div>
        
        <Footer />
    </div>
    );
};

export default Home