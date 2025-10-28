import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {addProduct, uploadImage} from '../backend/api.js';
import FooterCard from '../cards/footer.jsx';
import Header from '../components/header.jsx';
import {Button} from '../components/ui/button.jsx';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);
    const [message, setMessage] = useState({type: '', text: ''});
    const [validationErrors, setValidationErrors] = useState({});
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
        availabilityDate: '',
        email: '',
        phone: '',
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
        stickers: ['One size'],
    };

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const formatPhoneNumber = (phone) => {
        // Remove all non-digit characters
        const digitsOnly = phone.replace(/\D/g, '');
        return digitsOnly;
    };

    const validatePhoneNumber = (phone) => {
        const formatted = formatPhoneNumber(phone);
        // Check if it's 10 digits starting with 0
        return /^0\d{9}$/.test(formatted);
    };

    const validateAvailabilityDate = (date) => {
        if (!date) return false;
        const selectedDate = new Date(date);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        return selectedDate >= tomorrow;
    };

    const validateField = (name, value) => {
        let error = '';

        // Check for empty required fields
        const requiredFields = ['id', 'name', 'descriptor', 'price', 'availabilityDate', 'email', 'phone'];
        if (requiredFields.includes(name) && (!value || value.toString().trim() === '')) {
            const fieldLabels = {
                id: 'Product ID',
                name: 'Product Name',
                descriptor: 'Product Description',
                price: 'Price',
                availabilityDate: 'Availability Date',
                email: 'Contact Email',
                phone: 'Contact Phone'
            };
            error = `${fieldLabels[name]} is required`;
        }
        // Check specific field formats only if field is not empty
        else if (value && value.toString().trim() !== '') {
            switch (name) {
                case 'email':
                    if (!validateEmail(value)) {
                        error = 'Please enter a valid email format (e.g., user@example.com)';
                    }
                    break;
                case 'phone':
                    if (!validatePhoneNumber(value)) {
                        error = 'Please enter a valid phone number (e.g., 0826468521)';
                    }
                    break;
                case 'availabilityDate':
                    if (!validateAvailabilityDate(value)) {
                        error = 'Availability date must be at least 1 day from today';
                    }
                    break;
                case 'price':
                    if (parseFloat(value) <= 0) {
                        error = 'Price must be greater than 0';
                    }
                    break;
                default:
                    break;
            }
        }

        setValidationErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const validateAllFields = () => {
        const errors = {};

        // Required fields validation
        if (!formData.id || formData.id.trim() === '') {
            errors.id = 'Product ID is required';
        }
        if (!formData.name || formData.name.trim() === '') {
            errors.name = 'Product Name is required';
        }
        if (!formData.descriptor || formData.descriptor.trim() === '') {
            errors.descriptor = 'Product Description is required';
        }
        if (!formData.image || formData.image.trim() === '') {
            errors.image = 'Product Image is required';
        }
        if (!formData.price || formData.price.toString().trim() === '') {
            errors.price = 'Price is required';
        }
        if (!formData.availabilityDate || formData.availabilityDate.trim() === '') {
            errors.availabilityDate = 'Availability Date is required';
        }
        if (!formData.email || formData.email.trim() === '') {
            errors.email = 'Contact Email is required';
        }
        if (!formData.phone || formData.phone.trim() === '') {
            errors.phone = 'Contact Phone is required';
        }
        if (!formData.tags.length) {
            errors.category = 'Product Category is required';
        }

        // Format validation for non-empty fields
        if (formData.email && formData.email.trim() !== '' && !validateEmail(formData.email)) {
            errors.email = 'Please enter a valid email format (e.g., user@example.com)';
        }
        if (formData.phone && formData.phone.trim() !== '' && !validatePhoneNumber(formData.phone)) {
            errors.phone = 'Please enter a valid phone number (e.g., 0826468521)';
        }
        if (formData.availabilityDate && formData.availabilityDate.trim() !== '' && !validateAvailabilityDate(formData.availabilityDate)) {
            errors.availabilityDate = 'Availability date must be at least 1 day from today';
        }
        if (formData.price && formData.price.toString().trim() !== '' && parseFloat(formData.price) <= 0) {
            errors.price = 'Price must be greater than 0';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        let processedValue = value;

        // Format phone number to store as digits only
        if (name === 'phone') {
            processedValue = formatPhoneNumber(value);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: processedValue,
        }));

        // Validate field on change
        validateField(name, processedValue);
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        const categoryData = categories.find((cat) => cat.key === category);

        // Calculate availability date based on lead time
        const availabilityDate = new Date();
        availabilityDate.setDate(
            availabilityDate.getDate() + (categoryData?.leadTime || 7)
        );
        const formattedDate = availabilityDate.toISOString().split('T')[0];

        // Generate ID based on category
        const categoryCode = category.charAt(0).toUpperCase();
        const randomNum = Math.floor(Math.random() * 900) + 100; // 3-digit number
        const generatedId = `${categoryCode}${randomNum}`;

        setFormData((prev) => ({
            ...prev,
            tags: [category],
            availabilityDate: formattedDate,
            id: generatedId,
            sizes: sizeOptions[category] || ['One size'],
        }));

        // Clear category validation error if category is selected
        if (category) {
            setValidationErrors(prev => ({
                ...prev,
                category: ''
            }));
        }

        // Validate the new availability date
        validateField('availabilityDate', formattedDate);
        // Validate the new ID
        validateField('id', generatedId);
    };

    const handleSizeChange = (size) => {
        setFormData((prev) => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter((s) => s !== size)
                : [...prev.sizes, size],
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
            // If no file selected, trigger file input click
            document.getElementById('image-file-input').click();
            return;
        }

        setUploadingImage(true);
        setMessage({type: '', text: ''}); // Clear previous messages

        try {
            const result = await uploadImage(imageFile);

            if (result.error) {
                setMessage({
                    type: 'error',
                    text: `Error uploading image: ${result.error}`,
                });
            } else {
                // Update form data with the uploaded image filename (including extension)
                setFormData((prev) => ({
                    ...prev,
                    image: result.filename, // Use filename instead of imageUrl to get just the filename with extension
                }));

                // Clear image validation error
                setValidationErrors(prev => ({
                    ...prev,
                    image: ''
                }));

                setMessage({
                    type: 'success',
                    text: 'Image uploaded successfully!',
                });
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setMessage({
                type: 'error',
                text: 'An error occurred while uploading the image',
            });
        } finally {
            setUploadingImage(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({type: '', text: ''}); // Clear previous messages

        try {
            // Validate all fields and show individual error messages
            if (!validateAllFields()) {
                setMessage({
                    type: 'error',
                    text: 'Please fix the errors below and try again',
                });
                setLoading(false);
                return;
            }

            // Prepare data for API
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                image: formData.image.startsWith('/images/merch/')
                    ? formData.image
                    : `/images/merch/${formData.image}`,
            };

            const result = await addProduct(productData);

            if (result.error) {
                setMessage({
                    type: 'error',
                    text: `Error creating product: ${result.error}`,
                });
            } else {
                setMessage({
                    type: 'success',
                    text: 'Product created successfully!',
                });
                // Redirect after a short delay to show the success message
                setTimeout(() => {
                    navigate('/add-product');
                }, 1500);
            }
        } catch (error) {
            console.error('Error creating product:', error);
            setMessage({
                type: 'error',
                text: 'An error occurred while creating the product',
            });
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
                    <div className='text-center'>
                        <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
                            Create New Product
                        </h1>
                        <p className='text-xl text-gray-300 mb-8'>
                            Add a new product to the Cove merchandise
                            collection.
                        </p>
                        <div className='w-24 h-1 bg-[#e79210] mx-auto'></div>
                    </div>
                </div>
            </div>

            {/* Product Form */}
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className='bg-white rounded-lg shadow-lg p-8'
                >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {/* Category Selection - affects ID and availability date */}
                        <div className='md:col-span-2'>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Product Category *
                            </label>
                            <p className='text-xs text-gray-500 mb-2'>
                                Please select a product category to continue
                            </p>
                            {validationErrors.category && (
                                <div className='text-red-600 text-sm mb-2'>
                                    {validationErrors.category}
                                </div>
                            )}
                            <select
                                name='category'
                                value={selectedCategory || ''}
                                onChange={handleCategoryChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e79210] focus:border-[#e79210]'
                            >
                                <option value=''>Select a category...</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.key}
                                        value={category.key}
                                    >
                                        {category.label} ({category.leadTime}{' '}
                                        days lead time)
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Product ID - auto-generated based on category */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Product ID *
                            </label>
                            <p className='text-xs text-gray-500 mb-2'>
                                Unique identifier for the product
                                (auto-generated)
                            </p>
                            {validationErrors.id && (
                                <div className='text-red-600 text-sm mb-2'>
                                    {validationErrors.id}
                                </div>
                            )}
                            <input
                                type='text'
                                name='id'
                                value={formData.id}
                                onChange={handleInputChange}
                                placeholder='Auto-generated (e.g., M001)'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e79210] focus:border-[#e79210]'
                            />
                        </div>

                        {/* Product Name */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Product Name *
                            </label>
                            <p className='text-xs text-gray-500 mb-2'>
                                Enter a descriptive name for your product
                            </p>
                            {validationErrors.name && (
                                <div className='text-red-600 text-sm mb-2'>
                                    {validationErrors.name}
                                </div>
                            )}
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder='e.g., Classic White Mug'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e79210] focus:border-[#e79210]'
                            />
                        </div>

                        {/* Contact Email */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Contact Email *
                            </label>
                            <p className='text-xs text-gray-500 mb-2'>
                                Email address for product inquiries
                            </p>
                            {validationErrors.email && (
                                <div className='text-red-600 text-sm mb-2'>
                                    {validationErrors.email}
                                </div>
                            )}
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder='user@example.com'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e79210] focus:border-[#e79210]'
                            />
                        </div>

                        {/* Contact Phone */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Contact Phone *
                            </label>
                            <p className='text-xs text-gray-500 mb-2'>
                                Phone number for product inquiries
                            </p>
                            {validationErrors.phone && (
                                <div className='text-red-600 text-sm mb-2'>
                                    {validationErrors.phone}
                                </div>
                            )}
                            <input
                                type='tel'
                                name='phone'
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder='0826468521'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e79210] focus:border-[#e79210]'
                            />
                        </div>

                        {/* Description */}
                        <div className='md:col-span-2'>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Product Description *
                            </label>
                            <p className='text-xs text-gray-500 mb-2'>
                                Provide a detailed description of the product
                                features and benefits
                            </p>
                            {validationErrors.descriptor && (
                                <div className='text-red-600 text-sm mb-2'>
                                    {validationErrors.descriptor}
                                </div>
                            )}
                            <textarea
                                name='descriptor'
                                value={formData.descriptor}
                                onChange={handleInputChange}
                                placeholder='Detailed description of the product...'
                                rows={4}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e79210] focus:border-[#e79210]'
                            />
                        </div>

                        {/* Image Upload */}
                        <div className='md:col-span-2'>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Product Image *
                            </label>
                            <p className='text-xs text-gray-500 mb-2'>
                                Upload a high-quality image or provide an image
                                URL
                            </p>
                            {validationErrors.image && (
                                <div className='text-red-600 text-sm mb-2'>
                                    {validationErrors.image}
                                </div>
                            )}

                            {/* File Upload Input */}
                            <div className='flex flex-col gap-4'>
                                <div className='flex items-center gap-4'>
                                    <input
                                        id='image-file-input'
                                        type='file'
                                        accept='image/*'
                                        onChange={handleImageChange}
                                        className='flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e79210] focus:border-[#e79210]'
                                    />
                                    <Button
                                        type='button'
                                        onClick={handleImageUpload}
                                        disabled={uploadingImage}
                                        className='bg-[#e79210] hover:bg-[#d68410] text-black font-medium px-6 py-2'
                                    >
                                        {uploadingImage
                                            ? 'Uploading...'
                                            : 'Upload'}
                                    </Button>
                                </div>

                                {/* Image Upload Message */}
                                {message.text &&
                                    (message.text.includes('image') ||
                                        message.text.includes('Image')) && (
                                        <div
                                            className={`px-3 py-2 rounded-md text-sm ${message.type === 'success'
                                                ? 'bg-green-100 text-green-800 border border-green-200'
                                                : 'bg-red-100 text-red-800 border border-red-200'
                                                }`}
                                        >
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
                                        <p className='text-sm text-gray-600'>
                                            Preview of selected image
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Price (R) *
                            </label>
                            <p className='text-xs text-gray-500 mb-2'>
                                Enter the product price in South African Rand
                            </p>
                            {validationErrors.price && (
                                <div className='text-red-600 text-sm mb-2'>
                                    {validationErrors.price}
                                </div>
                            )}
                            <input
                                type='number'
                                step='0.01'
                                name='price'
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder='299.99'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e79210] focus:border-[#e79210]'
                            />
                        </div>

                        {/* Stock */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Initial Stock *
                            </label>
                            <p className='text-xs text-gray-500 mb-2'>
                                Set the initial inventory quantity for this
                                product
                            </p>
                            <input
                                type='number'
                                name='stock'
                                value={formData.stock}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e79210] focus:border-[#e79210]'
                                min='0'
                            />
                        </div>

                        {/* Availability Date - auto-calculated */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Availability Date *
                            </label>
                            <p className='text-xs text-gray-500 mb-2'>
                                When will this product be available for
                                purchase?
                            </p>
                            {validationErrors.availabilityDate && (
                                <div className='text-red-600 text-sm mb-2'>
                                    {validationErrors.availabilityDate}
                                </div>
                            )}
                            <input
                                type='date'
                                name='availabilityDate'
                                value={formData.availabilityDate}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e79210] focus:border-[#e79210]'
                            />
                            {selectedCategory && (
                                <p className='text-sm text-gray-500 mt-1'>
                                    Auto-calculated based on{' '}
                                    {categories.find(
                                        (cat) => cat.key === selectedCategory
                                    )?.leadTime || 7}{' '}
                                    day lead time
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
                                    {availableSizes.map((size) => (
                                        <button
                                            key={size}
                                            type='button'
                                            onClick={() =>
                                                handleSizeChange(size)
                                            }
                                            className={`px-3 py-1 text-sm rounded-full border transition-colors duration-200 ${formData.sizes.includes(size)
                                                ? 'bg-[#e79210] text-black border-[#e79210]'
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

                        {/* Availability Status */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Availability Status *
                            </label>
                            <p className='text-xs text-gray-500 mb-2'>
                                Current availability status of the product
                            </p>
                            <select
                                name='availability'
                                value={formData.availability}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e79210] focus:border-[#e79210]'
                            >
                                <option value='In Stock'>In Stock</option>
                                <option value='Pre-order'>Pre-order</option>
                                <option value='Out of Stock'>
                                    Out of Stock
                                </option>
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
                                <div
                                    className={`px-4 py-2 rounded-md text-sm font-medium ${message.type === 'success'
                                        ? 'bg-green-100 text-green-800 border border-green-200'
                                        : 'bg-red-100 text-red-800 border border-red-200'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            )}

                            <Button
                                type='submit'
                                disabled={loading}
                                className={`w-full sm:w-auto ${loading
                                    ? 'opacity-50 cursor-not-allowed'
                                    : ''
                                    }`}
                            >
                                {loading
                                    ? 'Creating Product...'
                                    : 'Create Product'}
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
