import React from 'react';
import styled from 'styled-components';
import { ClipLoader } from "react-spinners";

const Spinner = ({ isLoading = true }) => {
  return (
    <SpinnerContainer>
      <ClipLoader
        color="#36d7b7"
        loading={isLoading}
        size={35}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </SpinnerContainer>
  );
};

export default Spinner;

const SpinnerContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;