import { useAuth } from '@/features/auth/hooks/useAuth';
import { useEffect, useState } from 'react';
import { getOrders } from '../api/orderApi';
import { useNavigate } from 'react-router';

type Order = {
  id: string;
  total_cents: number;
  status: string;
  submitted_at: string;
};

export function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    async function fetchOrders() {
      try {
        const data = await getOrders(user);
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [user]);

  if (!user) return <p>Please log in to see your orders.</p>;
  if (loading) return <p>Loading...</p>;

  if (orders.length === 0) {
    return <p>No orders yet.</p>;
  }

  return (
    <div className="flex flex-col gap-1.5">
      <h2>Order History</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() => navigate(`/orders/${order.id}`)}
          className="w-auto justify- border-2 border-black p-3 mb-2.5 cursor-pointer hover:shadow-lg transition"
        >
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>

          <p>
            <strong>Date:</strong>{' '}
            {new Date(order.submitted_at).toLocaleString()}
          </p>

          <p>
            <strong>Total:</strong> {order.total_cents.toLocaleString()} kr.
          </p>

          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </div>
      ))}
    </div>
  );
}
