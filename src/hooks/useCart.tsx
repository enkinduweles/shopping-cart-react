import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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

  const prevCartRef = useRef<Product[]>();
  console.log(prevCartRef);

  useEffect(() => {
    prevCartRef.current = cart;
    console.log(prevCartRef);
  });

  const cartPreviousValue = prevCartRef.current ?? cart;

  useEffect(() => {
    console.log(cartPreviousValue);
    if (cartPreviousValue !== cart) {
      console.log('entrei');
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart));
    }
  }, [cart, cartPreviousValue]);

  const addProduct = async (productId: number) => {
    try {
      const updatedCart = cart.map((cartItem) => {
        return { ...cartItem };
      });

      const foundProduct = updatedCart.find(
        (product) => product.id === productId
      );

      const { data } = await api.get<Stock>(`stock/${productId}`);

      const productStockAmount = data.amount;
      const amountProduct = foundProduct ? foundProduct.amount : 0;
      const newAmountProduct = amountProduct + 1;

      if (newAmountProduct > productStockAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      if (foundProduct) {
        foundProduct.amount = newAmountProduct;
      } else {
        const { data } = await api.get(`products/${productId}`);
        const newProduct = { ...data, amount: 1 };
        updatedCart.push(newProduct);
      }

      setCart(updatedCart);
    } catch (error: any) {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      let updatedCart = [...cart];

      const foundProductIndex = updatedCart.findIndex(
        (product) => product.id === productId
      );

      if (foundProductIndex !== -1) {
        updatedCart.splice(foundProductIndex, 1);
        setCart(updatedCart);
      } else {
        throw Error();
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
      const productStockAmount = data.amount;

      if (amount > productStockAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      const updatedCart = cart.map((cartItem) => {
        return { ...cartItem };
      });

      const foundProductIndex = updatedCart.findIndex(
        (product) => product.id === productId
      );

      if (foundProductIndex !== -1) {
        updatedCart[foundProductIndex].amount = amount;

        setCart(updatedCart);
      } else {
        throw Error();
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
