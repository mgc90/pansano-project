import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Galery from "../Galery/Galery";
import Products from "../Products/Products";
import styles from "../Products/Products.module.css"



const Home = () => {
    return (
    <div>
        <Navbar />
        <Banner /> 
        <div className={styles.productCardContainer}>
         <h1>Nuestros Productos</h1>
        
         <Products />
        </div>
        <div className="galeryContainer">
            <Galery />
        </div>
    </div>
    );
};

export default Home