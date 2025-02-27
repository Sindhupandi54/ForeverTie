import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LandingNav from '../LandingPage/LandingNav';
import ScaleLoader from "react-spinners/ScaleLoader";
import { AiFillHome, AiOutlineArrowLeft } from "react-icons/ai";

import { useNavigate } from 'react-router-dom';
import { Table } from "flowbite-react";
import "./Cart.css";

export default function PaymentHistory() {
  const navigate = useNavigate('');
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const userId = window.sessionStorage.getItem('UserId');
        const response = await axios.post('http://localhost:8081/paymentHistory', { userId });
        console.log(response.data.paymentHistory);
        setPaymentHistory(response.data.paymentHistory);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    };

    setTimeout(fetchPaymentHistory,2000);
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      <LandingNav userLoggedIn='customer' />
      <div className='payments-outer-container'>
        {loading ? (
          <div className="spinner-overlay">
            <div className="spinner-container">
              <ScaleLoader color="#e72e77" />
            </div>
          </div>
        ) : paymentHistory.length === 0 ? (
          <>
            <p className='Empty-cart-message'>No payments found.</p>
          </>
        ) : (
          <>
          <Table striped border='1px' className='Payments-Table'>
            <Table.Head className="payments-table-header">
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Booked on</Table.HeadCell>
                <Table.HeadCell>Booked For</Table.HeadCell>
                <Table.HeadCell>Payment Mode</Table.HeadCell>
                <Table.HeadCell>Total Payment</Table.HeadCell>
                <Table.HeadCell>Payment Status</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {paymentHistory.map((payment) => (
                <Table.Row key={payment.bookingId} className='table-row'>
                  <Table.Cell>{payment.name}</Table.Cell>
                  <Table.Cell>{payment.category}</Table.Cell>
                  <Table.Cell>{formatDate(payment.bookedDate)}</Table.Cell>
                  <Table.Cell>{formatDate(payment.bookingDate)}</Table.Cell>
                  <Table.Cell>{payment.paymentMode}</Table.Cell>
                  <Table.Cell>{payment.totalPayment}</Table.Cell>
                  <Table.Cell className='Payment-Success'>{payment.paymentStatus}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          </>
        )}
        {loading === false && (


          <div className="cart-buttons-group">

            <div className="reserve-button" onClick={() => { navigate('/cart') }} style={{ margin: '20px auto' }}>
                <AiOutlineArrowLeft fill='white' fontSize='large' className='reserve-button-icon' />
                <button type="button">Back to Cart</button>
            </div>
            <div className="reserve-button" onClick={() => { navigate('/home') }} style={{ margin: '20px auto' }}>
                <AiFillHome fill='white' fontSize='large' className='reserve-button-icon' />
                <button type="button">Back to Home</button>
            </div>
            </div>
        )}
      </div>
    </>
  );
}
