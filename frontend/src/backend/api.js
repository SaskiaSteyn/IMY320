const API_URL = 'http://localhost:3000'

// Helper function to log and handle API responses
async function handleResponse(response, operation) {
    // console.log(`${operation} response status:`, response.status);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }))
        console.error(`${operation} failed:`, errorData)
        return { error: errorData.error || `${operation} failed` }
    }

    const data = await response.json().catch(() => ({ error: 'Failed to parse response' }))
    // console.log(`${operation} successful:`, data);
    return data
}


//
// PRODUCTS FUNCTIONS
//

export async function getAllProducts() {
    try {
        // console.log('Fetching all products from:', `${API_URL}/products`);
        const response = await fetch(`${API_URL}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return await handleResponse(response, 'Get all products')
    } catch (error) {
        console.error('Get all products network error:', error)
        return { error: 'Network error during fetching all products' }
    }
}

export async function getProductsByTags(tags) {
    try {
        // console.log('Fetching products by tags:', tags);
        const response = await fetch(`${API_URL}/products/tags`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tagsArray: tags }),
        })

        return await handleResponse(response, 'Get products by tags')
    } catch (error) {
        console.error('Get products by tags network error:', error)
        return { error: 'Network error during fetching products by tags' }
    }
}

export async function addProduct(productData) {
    try {
        // console.log('Adding new product with data:', productData);
        const response = await fetch(`${API_URL}/products/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })

        return await handleResponse(response, 'Add product')
    } catch (error) {
        console.error('Add product network error:', error)
        return { error: 'Network error during adding product' }
    }
}

export async function updateProduct(productId, updateData) {
    try {
        // console.log('Updating product with ID:', productId, 'Data:', updateData);
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })

        return await handleResponse(response, 'Update product')
    } catch (error) {
        console.error('Update product network error:', error)
        return { error: 'Network error during updating product' }
    }
}

export async function adjustStock(productId, adjustment) {
    try {
        // console.log('Adjusting stock for product:', productId, 'Adjustment:', adjustment);
        const response = await fetch(`${API_URL}/products/${productId}/adjust-stock`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ adjustment }),
        })

        return await handleResponse(response, 'Adjust stock')
    } catch (error) {
        console.error('Adjust stock network error:', error)
        return { error: 'Network error during stock adjustment' }
    }
}

export async function DeleteProduct(productId) {
    try {
        // console.log('Deleting product with ID:', productId);
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return await handleResponse(response, 'Delete product')
    } catch (error) {
        console.error('Delete product network error:', error)
        return { error: 'Network error during product deletion' }
    }
}

//
// IMAGE UPLOAD FUNCTIONS
//

export async function uploadImage(imageFile) {
    try {
        const formData = new FormData()
        formData.append('image', imageFile)

        // console.log('Uploading image:', imageFile.name);
        const response = await fetch(`${API_URL}/upload-image`, {
            method: 'POST',
            body: formData, // Don't set Content-Type header for FormData
        })

        return await handleResponse(response, 'Upload image')
    } catch (error) {
        console.error('Upload image network error:', error)
        return { error: 'Network error during image upload' }
    }
}

//
// LOGIN FUNCTIONS
//


export async function register(userData) {
    try {
        // console.log('Attempting registration with:', {...userData, password: '[HIDDEN]'});
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        return await handleResponse(response, 'Registration')
    } catch (error) {
        console.error('Registration network error:', error)
        return { error: 'Network error during registration' }
    }
}

export async function login(username, password) {
    try {
        // console.log('Attempting login for username:', username);
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })

        const result = await handleResponse(response, 'Login')

        // If login is successful and we have user data, store it
        if (result && !result.error && result.user) {
            localStorage.setItem('token', result.token)
            localStorage.setItem('userData', JSON.stringify(result.user))
        }

        return result
    } catch (error) {
        console.error('Login network error:', error)
        return { error: 'Network error during login' }
    }
}

export async function logout() {
    try {
        // console.log('Attempting logout');
        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        // Clear token and user data from localStorage
        localStorage.removeItem('token')
        localStorage.removeItem('userData')

        return await handleResponse(response, 'Logout')
    } catch (error) {
        console.error('Logout network error:', error)
        // Still clear token even if network request fails
        localStorage.removeItem('token')
        return { error: 'Network error during logout' }
    }
}

// Helper function to test API connectivity
export async function deleteProduct(productId) {
    try {
        console.log('Attempting to delete product with ID:', productId)
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error('Delete product failed:', {
                status: response.status,
                statusText: response.statusText,
                errorText,
                url: response.url
            })
            return { error: `Failed to delete product (${response.status}: ${response.statusText})` }
        }

        // Try to parse as JSON, fall back to text if it fails
        try {
            const data = await response.json()
            console.log('Delete product response:', data)
            return data
        } catch {
            // If response is not JSON, return success message
            return { message: 'Product deleted successfully' }
        }
    } catch (error) {
        console.error('Delete product network error:', error)
        return { error: 'Network error during product deletion' }
    }
}

export async function testConnection() {
    try {
        // console.log('Testing connection to:', API_URL);
        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        // console.log('Connection test response status:', response.status);
        return { success: true, status: response.status }
    } catch (error) {
        console.error('Connection test failed:', error)
        return { success: false, error: error.message }
    }
}

//
// ORDER FUNCTIONS
//

export async function createOrder(orderData) {
    try {
        const token = localStorage.getItem('token')
        if (!token) {
            return { error: 'Please log in to create an order' }
        }

        // Convert userIDNumber to a number explicitly
        const modifiedOrderData = {
            ...orderData,
            userIDNumber: parseInt(orderData.userIDNumber, 10)
        }

        if (isNaN(modifiedOrderData.userIDNumber)) {
            return { error: 'Invalid user ID' }
        }

        console.log('Creating order with data:', modifiedOrderData)
        const response = await fetch(`${API_URL}/orders/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(modifiedOrderData),
        })

        return await handleResponse(response, 'Create Order')
    } catch (error) {
        console.error('Create Order network error:', error)
        return { error: 'Network error during Create Order' }
    }
}

export async function getAllOrders() {
    try {
        // console.log('Fetching all orders from:', `${API_URL}/orders`);
        const response = await fetch(`${API_URL}/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return await handleResponse(response, 'Get All Orders')
    } catch (error) {
        console.error('Get All Orders network error:', error)
        return { error: 'Network error during Get All Orders' }
    }
}

export async function getUserOrders(userId) {
    try {
        console.log('Fetching orders for user:', userId)
        if (!userId) {
            console.error('No user ID provided')
            return { error: 'No user ID provided' }
        }

        const token = localStorage.getItem('token')
        if (!token) {
            console.error('No authentication token found')
            return { error: 'Please log in to view your orders' }
        }

        const response = await fetch(`${API_URL}/orders/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error('Server error response:', errorText)
            try {
                const errorJson = JSON.parse(errorText)
                return { error: errorJson.error || 'Failed to fetch orders' }
            } catch {
                return { error: 'Failed to fetch orders' }
            }
        }

        const data = await response.json()
        console.log('Orders response:', data)
        return data
    } catch (error) {
        console.error('Get User Orders network error:', error)
        return { error: 'Failed to fetch orders. Please try again.' }
    }
}