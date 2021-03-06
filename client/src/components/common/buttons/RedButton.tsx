import React from 'react';
import styled from 'styled-components';
import { ModalCommonButton } from '../../../types/buttonTypes';
import { MODAL_RED } from '../../../constants/color';

const Wrapper = styled.div`
  background-color: ${MODAL_RED};
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  color: white;
  cursor: pointer;
`;

const RedButton: React.FC<ModalCommonButton> = ({ children, onClick }: ModalCommonButton) => {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
};

export default RedButton;
