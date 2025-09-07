import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import FooterCard from '../cards/footer.jsx';
import Breadcrumbs from '../components/breadcrumbs.jsx';
import Header from '../components/header.jsx';
import {Button} from '../components/ui/button.jsx';
import {addProduct, uploadImage} from '../backend/api.js';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);
    const [message, setMessage] = useState({type: '', text: ''});
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        descriptor: '',
        image: '',
        price: '',
        brand: 'Cove',
        tags: [],
        stock: 50,
        sizes: ['One size'],
        availability: 'In Stock',
        availabilityDate: ''
    });

    const categories = [
        {key: 'mugs', label: 'Mugs', leadTime: 14},
        {key: 'hoodies', label: 'Hoodies', leadTime: 21},
        {key: 'totes', label: 'Tote Bags', leadTime: 7},
        {key: 'stickers', label: 'Stickers', leadTime: 3},
    ];

    const sizeOptions = {
        mugs: ['One size'],
        hoodies: ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
        totes: ['One size'],
        stickers: ['One size']
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        const categoryData = categories.find(cat => cat.key === category);

        // Calculate availability date based on lead time
        const availabilityDate = new Date();
        availabilityDate.setDate(availabilityDate.getDate() + (categoryData?.leadTime || 7));
        const formattedDate = availabilityDate.toISOString().split('T')[0];

        // Generate ID based on category
        const categoryCode = category.charAt(0).toUpperCase();
        const randomNum = Math.floor(Math.random() * 900) + 100; // 3-digit number
        const generatedId = `${categoryCode}${randomNum}`;

        setFormData(prev => ({
            ...prev,
            tags: [category],
            availabilityDate: formattedDate,
            id: generatedId,
            sizes: sizeOptions[category] || ['One size']
        }));
    };

    const handleSizeChange = (size) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = async () => {
        if (!imageFile) {
            setMessage({type: 'error', text: 'Please select an image first'});
            return;
        }

        setUploadingImage(true);
        setMessage({type: '', text: ''}); // Clear previous messages

        try {
            const result = await uploadImage(imageFile);

            if (result.error) {
                setMessage({type: 'error', text: `Error uploading image: ${result.error}`});
            } else {
                // Update form data with the uploaded image URL
                setFormData(prev => ({
                    ...prev,
                    image: result.imageUrl
                }));
                setMessage({type: 'success', text: 'Image uploaded successfully!'});
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setMessage({type: 'error', text: 'An error occurred while uploading the image'});
        } finally {
            setUploadingImage(false);
        }
    }; const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({type: '', text: ''}); // Clear previous messages

        try {
            // Validate required fields
            if (!formData.id || !formData.name || !formData.descriptor || !formData.image || !formData.price || !formData.tags.length || !formData.stock || !formData.availabilityDate || !formData.brand || !formData.availability) {
                setMessage({type: 'error', text: 'Please fill in all required fields'});
                setLoading(false);
                return;
            }

            // Additional validation
            if (parseFloat(formData.price) <= 0) {
                setMessage({type: 'error', text: 'Price must be greater than 0'});
                setLoading(false);
                return;
            }

            if (parseInt(formData.stock) < 0) {
                setMessage({type: 'error', text: 'Stock cannot be negative'});
                setLoading(false);
                return;
            }

            // Prepare data for API
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                image: `images/merch/${formData.id}`
            };

            const result = await addProduct(productData);

            if (result.error) {
                setMessage({type: 'error', text: `Error creating product: ${result.error}`});
            } else {
                setMessage({type: 'success', text: 'Product created successfully!'});
                // Redirect after a short delay to show the success message
                setTimeout(() => {
                    navigate('/add-product');
                }, 1500);
            }
        } catch (error) {
            console.error('Error creating product:', error);
            setMessage({type: 'error', text: 'An error occurred while creating the product'});
        } finally {
            setLoading(false);
        }
    };

    const selectedCategory = formData.tags[0];
    const availableSizes = sizeOptions[selectedCategory] || ['One size'];

    return (
        <div className='min-h-screen bg-[#19191a]'>
            <Header />

            {/* Hero Section */}
            <div className='pt-24 pb-16 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-4xl mx-auto'>
                    <Breadcrumbs />
                    <div className='text-center'>
                        <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
                            Create New Product
                        </h1>
                        <p className='text-xl text-gray-300 mb-8'>
                            Add a new product to the Cove merchandise collection.
                        </p>
                        <div className='w-24 h-1 bg-yellow-500 mx-auto'></div>
                    </div>
                </div>
            </div>

            {/* Product Form */}
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
                <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow-lg p-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                        {/* Category Selection - affects ID and availability date */}
                        <div className='md:col-span-2'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Product Category *
                            </label>
                            <select
                                name='category'
                                value={selectedCategory || ''}
                                onChange={handleCategoryChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
                                required
                            >
                                <option value=''>Select a category...</option>
                                {categories.map(category => (
                                    <option key={category.key} value={category.key}>
                                        {category.label} ({category.leadTime} days lead time)
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Product ID - auto-generated based on category */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Product ID *
                            </label>
                            <input
                                type='text'
                                name='id'
                                value={formData.id}
                                onChange={handleInputChange}
                                placeholder='Auto-generated (e.g., M001)'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
                                required
                            />
                        </div>

                        {/* Product Name */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Product Name *
                            </label>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder='e.g., Classic White Mug'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className='md:col-span-2'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Product Description *
                            </label>
                            <textarea
                                name='descriptor'
                                value={formData.descriptor}
                                onChange={handleInputChange}
                                placeholder='Detailed description of the product...'
                                rows={4}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
                                required
                            />
                        </div>

                        {/* Image Upload */}
                        <div className='md:col-span-2'>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Product Image *
                            </label>

                            {/* File Upload Input */}
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center gap-4'>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={handleImageChange}
                                        className='flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
                                    />
                                    <Button
                                        type='button'
                                        onClick={handleImageUpload}
                                        disabled={!imageFile || uploadingImage}
                                        className={`px-4 py-2 ${uploadingImage || !imageFile
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-500 hover:bg-blue-600'
                                            } text-white rounded-md`}
                                    >
                                        {uploadingImage ? 'Uploading...' : 'Upload'}
                                    </Button>
                                </div>

                                {/* Image Upload Message */}
                                {message.text && (message.text.includes('image') || message.text.includes('Image')) && (
                                    <div className={`px-3 py-2 rounded-md text-sm ${message.type === 'success'
                                        ? 'bg-green-100 text-green-800 border border-green-200'
                                        : 'bg-red-100 text-red-800 border border-red-200'
                                        }`}>
                                        {message.text}
                                    </div>
                                )}

                                {/* Image Preview */}
                                {imagePreview && (
                                    <div className='flex items-center gap-4'>
                                        <img
                                            src={imagePreview}
                                            alt='Preview'
                                            className='w-20 h-20 object-cover rounded-md border'
                                        />
                                        <p className='text-sm text-gray-600'>Preview of selected image</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Price (R) *
                            </label>
                            <input
                                type='number'
                                step='0.01'
                                name='price'
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder='299.99'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
                                required
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Initial Stock *
                            </label>
                            <input
                                type='number'
                                name='stock'
                                value={formData.stock}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
                                required
                                min='0'
                            />
                        </div>

                        {/* Availability Date - auto-calculated */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Availability Date *
                            </label>
                            <input
                                type='date'
                                name='availabilityDate'
                                value={formData.availabilityDate}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
                                required
                            />
                            {selectedCategory && (
                                <p className='text-sm text-gray-500 mt-1'>
                                    Auto-calculated based on {categories.find(cat => cat.key === selectedCategory)?.leadTime || 7} day lead time
                                </p>
                            )}
                        </div>

                        {/* Sizes - dynamic based on category */}
                        {selectedCategory && availableSizes.length > 1 && (
                            <div className='md:col-span-2'>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Available Sizes
                                </label>
                                <div className='flex flex-wrap gap-2'>
                                    {availableSizes.map(size => (
                                        <button
                                            key={size}
                                            type='button'
                                            onClick={() => handleSizeChange(size)}
                                            className={`px-3 py-1 text-sm rounded-full border transition-colors duration-200 ${formData.sizes.includes(size)
                                                ? 'bg-yellow-500 text-black border-yellow-500'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                <p className='text-sm text-gray-500 mt-2'>
                                    Selected sizes: {formData.sizes.join(', ')}
                                </p>
                            </div>
                        )}

                        {/* Brand */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Brand *
                            </label>
                            <input
                                type='text'
                                name='brand'
                                value={formData.brand}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-gray-50'
                                required
                                readOnly
                            />
                        </div>

                        {/* Availability Status */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>
                                Availability Status *
                            </label>
                            <select
                                name='availability'
                                value={formData.availability}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500'
                                required
                            >
                                <option value='In Stock'>In Stock</option>
                                <option value='Pre-order'>Pre-order</option>
                                <option value='Out of Stock'>Out of Stock</option>
                            </select>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-8'>
                        <Link to='/add-product'>
                            <Button
                                type='button'
                                variant='outline'
                                className='w-full sm:w-auto'
                            >
                                Cancel
                            </Button>
                        </Link>

                        <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
                            {/* Message Display */}
                            {message.text && (
                                <div className={`px-4 py-2 rounded-md text-sm font-medium ${message.type === 'success'
                                    ? 'bg-green-100 text-green-800 border border-green-200'
                                    : 'bg-red-100 text-red-800 border border-red-200'
                                    }`}>
                                    {message.text}
                                </div>
                            )}

                            <Button
                                type='submit'
                                disabled={loading}
                                className={`w-full sm:w-auto ${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-yellow-500 hover:bg-yellow-600'
                                    } text-black font-semibold`}
                            >
                                {loading ? 'Creating Product...' : 'Create Product'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            <FooterCard />
        </div>
    );
};

export default CreateProduct;
