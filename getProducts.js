const getProducts = async () => {
    try {
        const res = await fetch('./products.json');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
};

export default getProducts;
