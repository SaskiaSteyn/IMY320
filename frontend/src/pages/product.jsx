import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAllProducts } from '../backend/api.js';
import FooterCard from '../cards/footer.jsx';
import Breadcrumbs from '../components/breadcrumbs.jsx';
import Header from '../components/header.jsx';
import ProductDetails from '../components/product-details.jsx';
import RelevantProducts from '../components/relevant-products.jsx';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await getAllProducts();
                if (response.error) {
                    console.error('Error fetching products:', response.error);
                    setAllProducts([]);
                    setProduct(null);
                } else {
                    setAllProducts(response);
                    const foundProduct = response.find(
                        (item) => String(item.id) === id
                    );
                    setProduct(foundProduct || null);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setAllProducts([]);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [id]);

    if (loading) {
        return (
            <>
                <Header />
                <div className='flex flex-col items-center justify-center min-h-[100vh]'>
                    <div className='max-w-2xl p-8 text-center'>
                        <h2 className='text-2xl font-bold mb-4'>Loading...</h2>
                    </div>
                </div>
            </>
        );
    }

    if (!product) {
        return (
            <>
                <Header />
                <div className='flex flex-col items-center justify-center min-h-[100vh]'>
                    <div className='max-w-2xl p-8 text-center'>
                        <h2 className='text-2xl font-bold mb-4'>
                            Product Not Found
                        </h2>
                        <Link to='/write-in-peace' className='cta-button'>
                            Back to Write In Peace
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className='min-h-screen py-8 px-30 bg-[#19191a] text-white pt-25'>
                <Breadcrumbs product={product} showShop={true} />
                <ProductDetails product={product} />
                <RelevantProducts
                    currentProduct={product}
                    allProducts={allProducts}
                />
            </div>
            <FooterCard />
        </>
    );
};

export default ProductPage;
