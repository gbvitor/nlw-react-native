import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import AsyncStorage, {
    useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

import * as cartInMemory from "@/stores/helpers/cart-in-memory";
export type ProductCartProps = ProductProps & {
    quantity: number;
};
type StateProps = {
    products: ProductCartProps[];
    add: (Product: ProductProps) => void;
    remove: (ProductID: string) => void;
    clear: () => void;
};

export const useCartStore = create(
    persist<StateProps>(
        (set) => ({
            products: [],
            add: (product: ProductProps) =>
                set((state) => ({
                    products: cartInMemory.add(state.products, product),
                })),
            remove: (productID: string) =>
                set((state) => ({
                    products: cartInMemory.remove(state.products, productID),
                })),
            clear: () => set(() => ({ products: [] })),
        }),
        {
            name: "nlw-expert:cart",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
