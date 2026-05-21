import { Button } from '@/shared/components/ui/button';
import { useCart } from '../hooks/useCart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { FaRegTimesCircle } from 'react-icons/fa';

export function CartPage() {
  const { items, addToCart, removeFromCart, updateQuantity, clearCart } =
    useCart();

  const total = items
    .reduce((acc, item) => acc + item.product.price_cents * item.quantity, 0)
    .toLocaleString();

  return (
    <div className="p-2 flex flex-col gap-4">
      <h2>Cart Items</h2>
      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">Your cart is empty</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead></TableHead>
              <TableHead className="text-left">Item</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.product.id}>
                <TableCell>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <FaRegTimesCircle />
                  </Button>
                </TableCell>
                <TableCell>
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-25"
                  />
                </TableCell>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>
                  {item.product.price_cents.toLocaleString()} kr.
                </TableCell>
                <TableCell>
                  <Button size="sm" onClick={() => addToCart(item.product)}>
                    +
                  </Button>
                  <span className="p-1.5">{item.quantity}</span>
                  <Button
                    size="sm"
                    onClick={() => updateQuantity(item.product.id, -1)}
                  >
                    -
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Table>
        <TableHeader>
          <TableHead className="text-right">Total:</TableHead>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-right">{total} kr.</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
