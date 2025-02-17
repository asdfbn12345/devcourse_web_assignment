import { Order, OrderDetailItem, OrderSheet } from "models/order.model";
import { httpClient, requestHandler } from "./http";

export const order = async (orderData: OrderSheet) => {
  return requestHandler("post", "orders", orderData);
};

export const fetchOrders = async () => {
  return requestHandler("get", "/orders");
};

export const fetchOrder = async (orderId: number) => {
  return requestHandler("get", `/orders/${orderId}`);
};
