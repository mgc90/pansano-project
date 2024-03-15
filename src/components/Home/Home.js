import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Products from "../Products/Products";

const Home = () => {
    return (
    <div>
        <Navbar />
        <Banner /> 
        <div className="productCardContainer">
            <Products />
        </div>
        
    </div>
    );
};

export default Home