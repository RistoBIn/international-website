import styled from 'styled-components';

export const ButtonFlex = styled.div`
  padding-top: 30px;
  .button {
    margin: 1rem 1rem 1rem 0 !important;
  }
  @media only screen and (min-width: 768px) {
    display: inline-flex;
  }
`;

export const ButtonFlexCentered = styled(ButtonFlex)`
  align-items: center;
`;
