const API_URL = 'http://localhost:5000';

export async function register(userData) {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return await response.json();
    } catch (error) {
        return error;
    }
}

export async function login(username, password) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });
        return await response.json();
    } catch {
        return {error: 'Network error'};
    }
}

export async function logout() {
    try {
        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Clear token from localStorage
        localStorage.removeItem('token');

        return await response.json();
    } catch {
        return {error: 'Network error'};
    }
}