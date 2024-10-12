import { APIRoutes } from '@shoplist/api';
import { hc, InferResponseType } from 'hono/client';

export const client = hc<APIRoutes>('http://localhost:5050/');
export type CategoriesWithItemsResType = InferResponseType<
  typeof client.api.items.$get
>;

export type Item = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  userId: number;
  note: string | null;
  imageUrl: string | null;
  categoryId: number;
};
