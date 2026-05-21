import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getOrderById } from '../api/orderApi';
import { Button } from '@/shared/components/ui/button';

type Order = {
  id: string;
  total_cents: number;
  status: string;
  submitted_at: string;
};

type OrderItem = {
  id: string;
  product_name: string;
  quantity: number;
  unit_price_cents: number;
  line_total_cents: number;
};

export function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    async function fetchOrder() {
      try {
        if (!id) return;
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found</p>;
  if (order.order_items.length === 0) {
    return <p>No items in this order.</p>;
  }

  return (
    <div className="flex flex-col gap-1.5 border-2 border-black p-4">
      <h2>Order Details</h2>

      <p>
        <strong>Order ID:</strong> {order.id}
      </p>

      <p>
        <strong>Date:</strong> {new Date(order.submitted_at).toLocaleString()}
      </p>

      <p>
        <strong>Status:</strong> {order.status}
      </p>

      <h3 className="border-t-2">Items</h3>

      {order.order_items.map((item: OrderItem) => (
        <div key={item.id} className="border-2 p-2.5 mb-2">
          <p>
            <strong>{item.product_name}</strong>
          </p>
          <p>Quantity: {item.quantity}</p>
          <p>Unit price: {item.unit_price_cents.toLocaleString()} kr.</p>
          <p>Total: {item.line_total_cents.toLocaleString()} kr.</p>
        </div>
      ))}
      <div>
        <Button
          className="bg-amber-500 text-black w-3xs"
          onClick={() => navigate('/orders')}
        >
          Back to orders
        </Button>
      </div>
    </div>
  );
}
