export type User = {
  id: number;
  email: string;
  name: string;
  imageUrl: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  name: string;
  checkout?:boolean;
  dialogId:string;
};

export type SignInParams = Omit<SignUpParams, 'name'>;
