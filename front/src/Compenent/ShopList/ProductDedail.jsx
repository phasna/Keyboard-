import { useParams, useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getProductDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getProductDetail();
    }, [productId]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="px-10 py-10 bg-black container mx-auto">
            <h1 className="text-5xl font-bold text-center text-gray-200 mb-12">{product.title}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <img src={product.image} alt={product.title} className="w-full h-80 object-cover" />
                <div className="text-white">
                    <p className="text-lg font-medium text-gray-300 mb-2">${product.price}</p>
                    <div className="flex items-center mb-2">
                        {Array.from({ length: 5 }, (_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                fill={i < product.rating ? 'yellow' : 'gray'}
                                viewBox="0 0 24 24"
                                width="20"
                                height="20"
                                className="mr-1"
                            >
                                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-6.91-.59L12 2 8.91 8.65 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                        ))}
                    </div>
                    <p className="mb-4">{product.description}</p>
                    <button className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
