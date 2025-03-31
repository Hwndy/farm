 import React from "react";
import { useLocation } from "react-router-dom";
import { useCart } from '../context/CartContext';
import styled from "styled-components";

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  const { addToCart } = useCart();
  
  const handleAddToCart = async (productId) => {
    const success = await addToCart(productId);
    if (success) {
      alert('Product added to cart successfully!');
    }
  };

  return (
    <SearchResultsWrapper>
      <h1>Search Results</h1>
      {results.length > 0 ? (
        <ProductGrid>
          {results.map((product) => (
            <ProductCard key={product._id}>
              <img src={product.images[0]} alt={product.imageIds[0]} />
              <div>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p id="location">By {product.store} @ {product.location}</p>
                <h3>₦ {product.price}</h3>
                <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
              </div>
            </ProductCard>           
          ))}
        </ProductGrid>
      ) : (
        <p id="noProducts">No products found.</p>
      )}
    </SearchResultsWrapper>
  );
};

export default SearchResults;

const SearchResultsWrapper = styled.div`
  padding: 2rem 1rem;
  margin: 0 auto;
  max-width: 1200px;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #15803d;

    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }

  #noProducts {
    text-align: center;
    margin-top: 2rem;
    font-size: 1.25rem;
    font-weight: 500;
    color: #4b5563;

    @media (max-width: 768px) {
      font-size: 1rem;
      margin-top: 1.5rem;
    }
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: ${props => 
      props.children?.length === 1 ? '1fr' : 'repeat(2, 1fr)'};
  }
`;
const ProductCard = styled.div`
  width: 100%;
  max-width: 250px;
  background-color: white;
  padding: 0.75rem;
  border-radius: 0.375rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 200px;
    border-radius: 0.375rem;
    object-fit: cover;

    @media (max-width: 768px) {
      height: 150px;
    }
  }

  div {
    padding: 0.75rem;

    h2 {
      font-size: 1rem;
      margin-bottom: 0.5rem;
      color: #1f2937;

      @media (max-width: 768px) {
        font-size: 0.875rem;
      }
    }

    p {
      color: #4b5563;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;

      @media (max-width: 768px) {
        font-size: 0.75rem;
      }
    }

    #location {
      color: #6b7280;
      font-size: 0.75rem;
      margin-bottom: 0.75rem;
    }

    h3 {
      color: #16a34a;
      font-size: 1.125rem;
      margin-bottom: 0.75rem;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }

    button {
      width: 100%;
      background-color: #16a34a;
      color: white;
      padding: 0.625rem;
      border-radius: 0.375rem;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;
      font-size: 0.875rem;

      &:hover {
        background-color: #15803d;
      }

      @media (max-width: 768px) {
        padding: 0.5rem;
        font-size: 0.75rem;
      }
    }
  }
`;
