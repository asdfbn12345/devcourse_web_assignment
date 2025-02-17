import styled from "styled-components";
import { formatNumber } from "utils/format";

interface CartSummaryProps {
  totalQuantity: number;
  totalPrice: number;
}

function CartSummary({ totalQuantity, totalPrice }: CartSummaryProps) {
  return (
    <CartSummaryStyle>
      <h1>Order summary</h1>
      <dl>
        <dt>Total quantity</dt>
        <dd>{totalQuantity}</dd>
      </dl>
      <dl>
        <dt>Total price</dt>
        <dd>{formatNumber(totalPrice)} won</dd>
      </dl>
    </CartSummaryStyle>
  );
}

const CartSummaryStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 12px;
  width: 240px;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }
  dl {
    display: flex;
    justify-content: space;
    margin-bottom: 12px;
  }
  dd {
    font-weight: 700;
  }
`;

export default CartSummary;
