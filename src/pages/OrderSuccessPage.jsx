import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {format} from "date-fns"

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const { state } = useLocation();
  const { order } = state || {};

  return (
    <Container>
      <SuccessCard>
        <CheckmarkCircle>✓</CheckmarkCircle>
        <Title>Order Placed Successfully!</Title>
        <OrderId>Order ID: {orderId}</OrderId>
        
        <EmailNotice>
          We've sent an order confirmation email to your registered email address.
          <SpamNote>Please check your spam folder if you don't see it in your inbox.</SpamNote>
        </EmailNotice>

        <OrderDetails>
          <SectionTitle>Order Details</SectionTitle>
          <DetailGrid>
            <DetailItem>
              <Label>Order Date:</Label>
              <Value>{format(new Date(order.createdAt), 'PPP')}</Value>
            </DetailItem>
            <DetailItem>
              <Label>Payment Method:</Label>
              <Value>{order.paymentMethod}</Value>
            </DetailItem>
            <DetailItem>
              <Label>Delivery Method:</Label>
              <Value>{order.deliveryMethod}</Value>
            </DetailItem>
            <DetailItem>
              <Label>Shipping Address:</Label>
              <Value>{order.shippingAddress}</Value>
            </DetailItem>
          </DetailGrid>
        </OrderDetails>

        <ProductsSection>
          <SectionTitle>Products Ordered</SectionTitle>
          <ProductList>
            {order.orderItems.map((item, index) => (
                <ProductItem key={index}>
                <ProductName>{item.product.name}</ProductName>
                <ProductDetails>
                    <span>Quantity: {item.qty}</span>
                    <span>Price: ₦{item.price}</span>
                    <span>Total: ₦{item.qty * item.price}</span>
                </ProductDetails>
                </ProductItem>
            ))}
          </ProductList>
        </ProductsSection>

        <TotalSection>
          <TotalAmount>Total Amount: ₦{order.totalPrice}</TotalAmount>
        </TotalSection>

        <ButtonGroup>
          <StyledButton primary onClick={() => window.location.href = '/buyer-store'}>
            Continue Shopping
          </StyledButton>
          <StyledButton onClick={() => window.location.href = '/orders'}>
            View Orders
          </StyledButton>
        </ButtonGroup>
      </SuccessCard>
    </Container>
  );
};

export default OrderSuccessPage

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const SuccessCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  margin-top: 2rem;
`;

const CheckmarkCircle = styled.div`
  width: 60px;
  height: 60px;
  background: #4CAF50;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin: 0 auto 1.5rem;
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const OrderId = styled.p`
  text-align: center;
  color: #7f8c8d;
  margin-bottom: 2rem;
`;

const EmailNotice = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
`;

const SpamNote = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const OrderDetails = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const DetailItem = styled.div`
  padding: 0.5rem;
`;

const Label = styled.span`
  color: #7f8c8d;
  display: block;
  margin-bottom: 0.25rem;
`;

const Value = styled.span`
  color: #2c3e50;
  font-weight: 500;
`;

const ProductsSection = styled.div`
  margin-bottom: 2rem;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProductItem = styled.div`
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 8px;
`;

const ProductName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 0.9rem;
`;

const TotalSection = styled.div`
  border-top: 2px solid #eee;
  padding-top: 1rem;
  margin-bottom: 2rem;
`;

const TotalAmount = styled.h3`
  text-align: right;
  color: #2c3e50;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${props => props.primary ? `
    background-color: #4CAF50;
    color: white;
    &:hover {
      background-color: #45a049;
    }
  ` : `
    background-color: #f8f9fa;
    color: #2c3e50;
    &:hover {
      background-color: #e9ecef;
    }
  `}
`;



