import React from "react";
import styled from "styled-components";

const ConfirmationMsg = (props) => 
<Wrapper>

  Thanks for ordering, {props.name}!

  <Thanks>Your order of  {props.product} will be sent to your home in {props.province}, Canada. Thank you for participating!</Thanks>
  

</Wrapper>;

const Wrapper = styled.p`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 32px;
  font-weight: 700;
  z-index: 4;
`;

const Thanks = styled.p`
  font-weight: normal;
  font-size: 20px;


`

export default ConfirmationMsg;
