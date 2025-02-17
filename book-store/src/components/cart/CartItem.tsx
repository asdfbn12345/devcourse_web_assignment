import Button from "components/common/Button";
import Title from "components/common/Title";
import { Cart } from "models/cart.model";
import { useMemo } from "react";
import styled from "styled-components";
import { formatNumber } from "utils/format";
import CheckIconButton from "./CheckIconButton";
import { useAlert } from "hooks/useAlert";

interface CartItemProps {
  cart: Cart;
  checkedItems: number[];
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
}

function CartItem({ cart, checkedItems, onCheck, onDelete }: CartItemProps) {
  const { showConfirm } = useAlert();
  const isChecked = useMemo(() => {
    return checkedItems.includes(cart.id);
  }, [checkedItems, cart.id]);

  const handleCheck = () => {
    onCheck(cart.id);
  };

  const handleDelete = () => {
    showConfirm("Are you sure you want to delete this item?", () => {
      onDelete(cart.id);
    });
  };

  return (
    <CartItemStyle>
      <div className="info">
        <div className="check">
          <CheckIconButton isChecked={isChecked} onCheck={handleCheck} />
        </div>
        <div>
          <Title size="medium" color="text">
            {cart.title}
          </Title>
          <p className="summary">{cart.summary}</p>
          <p className="price">{formatNumber(cart.price)} won</p>
          <p className="quantity">{cart.quantity} books</p>
        </div>
      </div>
      <Button size="medium" scheme="normal" onClick={handleDelete}>
        Delete item
      </Button>
    </CartItemStyle>
  );
}

const CartItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border: 1px solid ${({ theme }) => theme.color.border}
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding 12px;

  .check {
  width: 24px;
  flex-shrink: 0;
  }

  .info {
    display: flex;
    align-items: start;
    flex: 1;

    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }
`;

export default CartItem;
