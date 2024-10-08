import React, { useEffect, useState, memo } from 'react';
import { fetchTransactionData } from '../services/api';
import CustomerMonthlyPoints from './CustomerMonthlyPoints';
import LoadingSpinner from './LoadingSpinner';
import '../styles/CustomerPoints.css';

/**
 * Displays reward point for each customer
 */

const CustomerPoints = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Fetch transaction data and set customers state
    useEffect(() => {
        const getTransactionData = async () => {
            try {
                const data = await fetchTransactionData();
                setCustomers(data);
            } catch (error) {
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        getTransactionData();
    }, []);

    // Display loading spinner while data is being fetched
    if (loading) {
        return <LoadingSpinner />;
    }

    // Display error message if data fetching fails
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='customers-container'>
            {customers.map((customer) => (
                <CustomerMonthlyPoints key={customer.customerId} customer={customer} />
            ))}
        </div>
    )
};

export default memo(CustomerPoints);