import PropTypes from 'prop-types';

const ProductCard = ({ product, setSelectedProducts }) => {
    const handleAddToCart = () => {
        setSelectedProducts(prev => [...prev, product]);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h4 className="text-xl font-semibold text-gray-800">{product.title}</h4>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-bold text-gray-900">{product.price} USD</p>
            <button
                onClick={handleAddToCart}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 transition duration-300"
            >
                Add to Cart
            </button>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    setSelectedProducts: PropTypes.func.isRequired,
};

export default ProductCard;
