import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSearchResult } from '../api';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';

function SearchProduct() {
    const { string } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                if (string) {
                    const response = await getSearchResult(string);
                    if (response.success) {
                        const productList = response.data.products;
                        setProducts(productList);
                    } else {
                        toast.error(response.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [string]);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="relative min-h-screen bg-white backdrop-blur bg-texture bg-cover px-10">
            <h1 className="text-3xl text-gray-800">Search result</h1>
            <div className="py-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default SearchProduct;