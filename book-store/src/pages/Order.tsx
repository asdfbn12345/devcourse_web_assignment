import { useLocation, useNavigate } from "react-router-dom";
import { CartStyle } from "./Cart";
import Title from "components/common/Title";
import CartSummary from "components/cart/CartSummary";
import Button from "components/common/Button";
import InputText from "components/common/InputText";
import { useForm } from "react-hook-form";
import { Delivery, OrderSheet } from "models/order.model";
import FindAddressButton from "components/order/FindAddressButton";
import { useAlert } from "hooks/useAlert";
import { order } from "api/order.api";

interface DeliveryForm extends Delivery {
  addressDetail: string;
}

function Order() {
  const { showAlert, showConfirm } = useAlert();
  const location = useLocation();
  const navigate = useNavigate();
  const orderDataFromCart = location.state;
  const { totalQuantity, totalPrice, firstBookTitle } = orderDataFromCart;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DeliveryForm>();

  const handlePay = (data: DeliveryForm) => {
    const orderData: OrderSheet = {
      ...orderDataFromCart,
      delivery: {
        ...data,
        address: `${data.address} ${data.addressDetail}`,
      },
    };

    showConfirm("Confirm your order?", () => {
      order(orderData).then(() => {
        showAlert("Your order has been placed.");
        navigate("/orderlist");
      });
    });
  };

  return (
    <>
      <Title size="large">Order form</Title>
      <CartStyle>
        <div className="content">
          <div className="order-info">
            <Title size="medium" color="text">
              Shipping information
            </Title>
            <form className="delivery">
              <fieldset>
                <label>Shipping Address</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("address", { required: true })}
                  />
                </div>
                <FindAddressButton
                  onCompleted={(address) => {
                    setValue("address", address);
                  }}
                />
              </fieldset>
              {errors.address && <p className="error-text">Address needed.</p>}

              <fieldset>
                <label>Detail Address</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("addressDetail", { required: true })}
                  />
                </div>
              </fieldset>
              {errors.addressDetail && (
                <p className="error-text">Detail address needed.</p>
              )}

              <fieldset>
                <label>Receiver</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("receiver", { required: true })}
                  />
                </div>
              </fieldset>
              {errors.receiver && (
                <p className="error-text">Receiver needed.</p>
              )}

              <fieldset>
                <label>Contact</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("contact", { required: true })}
                  />
                </div>
              </fieldset>
              {errors.contact && <p className="error-text">Contact needed.</p>}
            </form>
          </div>
          <div className="order-info">
            <Title size="medium" color="text">
              Items
            </Title>
            <strong>
              {firstBookTitle} {totalQuantity} items
            </strong>
          </div>
        </div>
        <div className="summary">
          <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
          <Button
            size="large"
            scheme="primary"
            onClick={handleSubmit(handlePay)}
          >
            Checkout
          </Button>
        </div>
      </CartStyle>
    </>
  );
}

export default Order;
