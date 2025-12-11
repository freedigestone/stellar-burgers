export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

export type TConstructorIngredient = TIngredient & {
  id: string;
};

export type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TOrdersData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TUser = {
  email: string;
  name: string;
};

export type TTabMode = 'bun' | 'sauce' | 'main';

export type ForgotPasswordUIProps = {
  email: string;
  setEmail: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errorText: string | null;
};

export type ResetPasswordUIProps = {
  password: string;
  setPassword: (val: string) => void;
  code: string;
  setCode: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errorText: string | null;
};
