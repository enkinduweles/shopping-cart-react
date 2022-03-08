import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const { data: productStockAmount } = await api.get<Stock>(
        `stock/${productId}`
      );
      const updatedCart = cart.map((cartItem) => {
        return { ...cartItem };
      });

      const foundProductIndex = updatedCart.findIndex(
        (product) => product.id === productId
      );

      if (foundProductIndex !== -1) {
        updatedCart[foundProductIndex].amount += 1;

        if (updatedCart[foundProductIndex].amount > productStockAmount.amount) {
          toast.error('Quantidade solicitada fora de estoque');
          return;
        }
      } else {
        const { data } = await api.get(`products/${productId}`);
        const productFound = { ...data, amount: 1 };
        updatedCart.push(productFound);

        if (productFound.amount > productStockAmount.amount) {
          toast.error('Quantidade solicitada fora de estoque');
          return;
        }
      }
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    } catch (error: any) {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      let updatedCart = cart.map((cartItem) => {
        return { ...cartItem };
      });

      const foundProductIndex = updatedCart.findIndex(
        (product) => product.id === productId
      );

      if (foundProductIndex !== -1) {
        updatedCart = updatedCart.filter((product) => product.id !== productId);
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
      } else {
        toast.error('Erro na remoção do produto');
      }
    } catch (error: any) {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount <= 0) {
        return;
      }

      const { data } = await api.get(`stock/${productId}`);
      const updatedCart = cart.map((cartItem) => {
        return { ...cartItem };
      });

      const foundProductIndex = updatedCart.findIndex(
        (product) => product.id === productId
      );

      if (foundProductIndex !== -1) {
        updatedCart[foundProductIndex].amount = amount;

        if (updatedCart[foundProductIndex].amount > data.amount) {
          toast.error('Quantidade solicitada fora de estoque');
          return;
        }
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
      }
    } catch (error: any) {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
