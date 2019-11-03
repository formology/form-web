import styled from '@emotion/styled';

const Button = styled.button`
  float: right;
  font-size: 1rem;
  border-radius: 5px;
  padding: 0.25rem 1rem;
  margin: 1 1rem;
  background: white;
  border: 2px solid;
  cursor: pointer;
  &:hover {
    transform: translateY(1px);
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  }
`;

export default Button;
