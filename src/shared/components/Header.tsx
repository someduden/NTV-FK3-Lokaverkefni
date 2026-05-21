import { signOut } from '@/features/auth/api/authApi';
import { AuthModal } from '@/features/auth/components/AuthModal';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useCart } from '@/features/cart/hooks/useCart';
import { NavBar } from '@/features/navigation/components/NavBar';
import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';

export function Header() {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const { items, removeFromCart, clearCart } = useCart();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items
    .reduce((acc, item) => acc + item.product.price_cents * item.quantity, 0)
    .toLocaleString();

  return (
    <div className="w-full">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold text-orange-400">Readioactive</h1>
        </Link>

        <div className="flex gap-3">
          {user ? (
            <button
              className="cursor-pointer text-gray-500 hover:text-gray-900"
              onClick={signOut}
            >
              Logout
            </button>
          ) : (
            <button
              className="cursor-pointer text-gray-500 hover:text-gray-900"
              onClick={() => setShowAuthModal(true)}
            >
              Sign up / Log in
            </button>
          )}

          <button
            className="cursor-pointer text-gray-500 hover:text-gray-900"
            onClick={() => navigate('/orders')}
          >
            Orders
          </button>

          <div className="relative">
            <button
              className="cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaShoppingCart className="text-2xl text-gray-700" />

              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full px-2">
                  {itemCount}
                </span>
              )}
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border rounded shadow-lg z-50">
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-2">Cart Items</h2>
                  {items.length === 0 ? (
                    <p className="text gray-500 text-sm">Your cart is empty</p>
                  ) : (
                    <>
                      <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200">
                        {items.map((item) => (
                          <li
                            key={item.product.id}
                            className="flex justify-between items-center py-2"
                          >
                            <div>
                              <p className="font-semibold">
                                {item.product.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.quantity} x{' '}
                                {item.product.price_cents.toLocaleString()} kr.
                              </p>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-sm text-red-500 hover:underline"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>{total} kr.</span>
                      </div>

                      {/* ! MAKE THESE BUTTONS GO TO THEIR RESPECTIVE PLACES ! */}
                      <div className="mt-2 flex flex-col gap-1.5">
                        <button
                          className="w-full bg-amber-500 text-white py-1 rounded transition hover:bg-amber-600"
                          onClick={() => navigate('/cart')}
                        >
                          View cart
                        </button>

                        <button
                          className="w-full bg-amber-500 text-white py-1 rounded transition hover:bg-amber-600"
                          onClick={() => navigate('/checkout')}
                        >
                          Checkout
                        </button>
                      </div>

                      <button
                        onClick={clearCart}
                        className="mt-2 w-full bg-red-500 text-white py-1 rounded transition hover:bg-red-600"
                      >
                        Clear Cart
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="p-4 bg-gray-100">
        <NavBar />
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}
