import Button from "components/common/Button";
import InputText from "components/common/InputText";
import { useBook } from "hooks/useBook";
import { BookDetail } from "models/book.model";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface AddToCartProps {
  book: BookDetail;
}

function AddToCart({ book }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartAdded } = useBook(book.id.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  return (
    <AddToCartStyle $added={cartAdded}>
      <InputText inputType="number" value={quantity} onChange={handleChange} />
      <div>
        <Button size="medium" scheme="normal" onClick={handleIncrease}>
          +
        </Button>
        <Button size="medium" scheme="normal" onClick={handleDecrease}>
          -
        </Button>
      </div>
      <Button size="medium" scheme="normal" onClick={() => addToCart(quantity)}>
        Add to cart
      </Button>
      {cartAdded && (
        <div className="added">
          <p>Item added to your cart.</p>
          <Link to="/cart">Move to cart</Link>
        </div>
      )}
    </AddToCartStyle>
  );
}

interface AddToCartStyleProps {
  $added: boolean;
}

const AddToCartStyle = styled.div<AddToCartStyleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  .added {
    position: absolute;
    right: 0;
    bottom: -90px;
    background: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 8px 12px;
    opacity: ${({ $added }) => ($added ? "1" : "0")};
    transition: all 0.5s ease;
  }

  p {
    padding: 0 0 8px 0;
    margin: 0;
  }
`;

export default AddToCart;
