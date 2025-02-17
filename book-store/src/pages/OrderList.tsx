import Button from "components/common/Button";
import Title from "components/common/Title";
import { useOrders } from "hooks/useOrders";
import React from "react";
import styled from "styled-components";
import { formatDate, formatNumber } from "utils/format";

function OrderList() {
  const { orders, selectedItemId, selectOrderItem } = useOrders();

  return (
    <>
      <Title size="large">Order list</Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Order date</th>
              <th>Address</th>
              <th>Receiver</th>
              <th>Contact</th>
              <th>Primary item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td>{order.id}</td>
                  <td>{formatDate(order.createdAt, "YYYY.MM.DD")}</td>
                  <td>{order.address}</td>
                  <td>{order.receiver}</td>
                  <td>{order.contact}</td>
                  <td>{order.bookTitle}</td>
                  <td>{order.totalQuantity} books</td>
                  <td>{formatNumber(order.totalPrice)} won</td>
                  <td>
                    <Button
                      size="small"
                      scheme="normal"
                      onClick={() => selectOrderItem(order.id)}
                    >
                      Detail
                    </Button>
                  </td>
                </tr>
                {selectedItemId === order.id && (
                  <tr>
                    <td></td>
                    <td colSpan={8}>
                      {order.detail?.map((item) => (
                        <li key={item.bookId}>
                          <div>
                            <span>{item.bookId}</span>
                            <span>{item.author}</span>
                            <span>{formatNumber(item.price)} won</span>
                          </div>
                        </li>
                      ))}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </OrderListStyle>
    </>
  );
}

const OrderListStyle = styled.div`
  padding: 24px 0 0 0;

  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }

  th,
  td {
    padding: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
    text-align: center;
  }

  .detail {
    margin: 0;
    li {
      list-style: square;
      text-align: left;
      div {
        display: flex;
        padding: 8px 12px;
        gap: 8px;
      }
    }
  }
`;

export default OrderList;
