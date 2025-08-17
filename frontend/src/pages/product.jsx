import {Link, useParams} from 'react-router-dom';
import Breadcrumbs from '../components/breadcrumbs.jsx';
import Header from '../components/header.jsx';
import ProductDetails from '../components/product-details.jsx';
import RelevantProducts from '../components/relevant-products.jsx';
import catalogueData from '../data/catalogue.json';
import FooterCard from '../cards/footer.jsx';

const ProductPage = () => {
    const {id} = useParams();
    const product = catalogueData.find((item) => String(item.id) === id);

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
            <div className='min-h-screen py-8 px-30 bg-[var(--text)] pt-25'>
                <Breadcrumbs product={product} />
                <ProductDetails product={product} />
                <RelevantProducts
                    currentProduct={product}
                    allProducts={catalogueData}
                />
            </div>
            <FooterCard />
        </>
    );
};

export default ProductPage;
