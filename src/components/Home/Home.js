import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Products from "../Products/Products";
import styles from "../Products/Products.module.css"

const Home = () => {
    return (
    <div>
        <Navbar />
        <Banner /> 
        <div className={styles.productCardContainer}>
         <Products />
        </div>
        
    </div>
    );
};

export default Home