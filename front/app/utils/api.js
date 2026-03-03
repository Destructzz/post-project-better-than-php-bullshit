export const authFetch = async (url, options = {}) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');

        const headers = new Headers(options.headers || {});
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        // Default to json if not set
        if (!headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/json');
        }

        options.headers = headers;
    }

    const res = await fetch(url, options);

    if (res.status === 401) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
    }

    return res;
};
