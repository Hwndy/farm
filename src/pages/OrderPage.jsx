import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import OrderContext from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await OrderContext.getUserOrders();
      setOrders(response?.orders || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
      if (!err.response || err.response.status !== 200) {
        setError(err.message || err.error || 'Failed to fetch orders');
      } else {
        setOrders([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await OrderContext.cancelOrder(orderId);
      fetchOrders();
    } catch (err) {
      setError(err.error || 'Failed to cancel order');
    }
  };

  const handleReturnProduct = async (orderId, orderItemId) => {
    try {
      await OrderContext.returnProduct(orderId, orderItemId);
      fetchOrders();
    } catch (err) {
      setError(err.error || 'Failed to return product');
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      pending: '#f1c40f',
      sent: '#3498db',
      delivered: '#2ecc71',
      cancelled: '#e74c3c',
      returned: '#95a5a6'
    };
    return statusColors[status] || '#7f8c8d';
  };

  if (loading) {
    return <LoadingContainer>Loading your orders...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <Container>
      <Title>My Orders</Title>
      {orders.length === 0 ? (
        <EmptyState>
          <p>You haven't placed any orders yet.</p>
          <ShopButton onClick={() => navigate('/buyer-store')}>Start Shopping</ShopButton>
        </EmptyState>
      ) : (
        <OrdersList>
          {orders.map((order) => (
            <OrderCard key={order._id}>
              <OrderHeader>
                <OrderInfo>
                  <OrderId>Order #{order._id.slice(-8)}</OrderId>
                  <OrderDate>
                    {format(new Date(order.createdAt), 'PPP')}
                  </OrderDate>
                </OrderInfo>
                <StatusBadge color={getStatusColor(order.status)}>
                  {order.isShipped ? 'sent' : 
                   order.isCancelled ? 'Cancelled' : 
                   order.isReturned ? 'Returned' : 'Pending'}
                </StatusBadge>
              </OrderHeader>

              <ItemsList>
                {order.orderItems.map((item) => (
                  <OrderItem key={item._id}>
                    <ItemInfo>
                      <ItemName>{item.product.name}</ItemName>
                      <ItemDetails>
                        <span>Quantity: {item.qty}</span>
                        <span>Price: ₦{item.price}</span>
                      </ItemDetails>
                    </ItemInfo>
                    {!order.isCancelled && !item.isReturned && (
                      <ReturnButton 
                        onClick={() => handleReturnProduct(order._id, item._id)}
                        disabled={!order.isShipped}
                      >
                        Return Item
                      </ReturnButton>
                    )}
                  </OrderItem>
                ))}
              </ItemsList>

              <OrderFooter>
                <TotalPrice>Total: ₦{order.totalPrice}</TotalPrice>
                {!order.isShipped && !order.isCancelled && (
                  <CancelButton onClick={() => handleCancelOrder(order._id)}>
                    Cancel Order
                  </CancelButton>
                )}
              </OrderFooter>

              <deliveryInfo>
                <strong>delivery Address:</strong> {order.shippingAddress}
              </deliveryInfo>
            </OrderCard>
          ))}
        </OrdersList>
      )}
    </Container>
  );
};

export default OrderPage;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const OrderInfo = styled.div``;

const OrderId = styled.h2`
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 0;
`;

const OrderDate = styled.p`
  color: #7f8c8d;
  margin: 0.25rem 0 0 0;
  font-size: 0.9rem;
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: ${props => props.color};
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

const ItemInfo = styled.div``;

const ItemName = styled.h3`
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
`;

const ItemDetails = styled.div`
  display: flex;
  gap: 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const TotalPrice = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
`;

const deliveryInfo = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ReturnButton = styled(Button)`
  background-color: #f8f9fa;
  color: #2c3e50;
  
  &:hover:not(:disabled) {
    background-color: #e9ecef;
  }
`;

const CancelButton = styled(Button)`
  background-color: #e74c3c;
  color: white;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const ShopButton = styled(Button)`
  background-color: #3498db;
  color: white;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: #e74c3c;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
`;