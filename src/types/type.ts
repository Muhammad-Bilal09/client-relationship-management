export type Order = {
  user: any;
  items: any;
  id: string;
  userId: string;
  total: number;
  date: string;
  name: string;
};
export type AuthState = {
  email: string;
  password: string;
  error: string;
  isLoading: boolean;
  isAuthenticated: boolean;
};

export type CountryOrderStatisticProps = {
  width: string;
  height: string;
};

export type ChartData = {
  labels: string[];
  dataValues: number[];
};

export type SalesData = {
  userName: string;
  total: number;
};

export type PageState = {
  orderDetails: Order[];
  chartData: ChartData;
  salesData: SalesData[];
  loading: boolean;
  error: string | null;
};
export type CardProps = {
  iconColor: string;
  backgroundColor: string;
  title: string;
  value: string | number;
  iconbg: string;
  color: string;
  valueColor: string;
};
export type Item = {
  id: number;
  Id: string;
  name: string;
  quantity: number;
  image: string;
  price: number;
  category: string;
  purchasingPrice?: number;
};

export type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  newName: string;
  setNewName: (value: string) => void;
  onSave: () => void;
};

export type SalesCardProps = {
  color: string;
  label: string;
  value: string;
};

export type UserProfileProps = {
  imageSrc: string;
  userName: string;
};

export type StatisticBarProps = {
  title: string;
  percentage: string;
  color: string;
  width: string;
};

export type UserSales = {
  userName: string;
  total: number | undefined | null;
};

export type SalesListProps = {
  salesData: UserSales[];
};

export type ProfileSectionProps = {
  user: Users;
  profileImg: string;
  handleUploadSuccess: (result: any) => Promise<void>;
  handleLogout: () => Promise<void>;
  openProfileModal: () => void;
  openPasswordModal: () => void;
};

export type PasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentPassword: string;
  newPassword: string;
  setCurrentPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
  onSave: () => void;
};
export type MatrixDataPoint = {
  x: string;
  y: string;
  v: number;
};
export type InputFieldProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
};
export type FileInputFieldProps = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};
export type ModalPropes = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};
export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
};
export type CartState = {
  items: CartItem[];
  totalItems: number;
  selectedProduct: any;
};
export type Sale = {
  month: string;
  amount: number;
};
export const initialState: CartState = {
  items: [],
  totalItems: 0,
  selectedProduct: false,
};

export type User = {
  name: string | null | undefined;
  email: string | null | undefined;
  image?: string | null;
  status: string | null;
  Date: number | null;
  id?: string;
};

export type Users = {
  name: string | null | undefined;
  email: string | null | undefined;
  image?: string | null;
  id?: string;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  itemToEdit?: any;
  onSave: () => void;
};

export type CartStates = {
  items: CartItem[];
  // status: "idle" | "loading" | "succeeded" | "failed";
  // error: string | null;
};

export type ChartState = {
  startDate: string;
  endDate: string;
};

export type ItemState = {
  items: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type Document = {
  id: number;
  title: string;
  type: string;
  date: string;
  description: string;
  fileUrl: string;
};

export type DocumentState = {
  documents: Document[];
  loading: boolean;
  error: string | null;
};

export type ForgotPasswordState = {
  email: string;
  message: string;
  error: string;
  isLoading: boolean;
};

export type ItemsState = {
  items: Item[];
  status: "idle" | "loading" | "failed";
};

export type Orders = {
  id: number;
  items: any[];
  name: string;
  email: string;
  address: string;
  phone: string;
  status: string;
  date: string;
  country: string;
};

export type OrderState = {
  userDetails: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  selectedCountry: string;
  orderDetails: Orders[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type ResetPasswordState = {
  password: string;
  confirmPassword: string;
  error: string;
  isLoading: boolean;
  token: string | null;
};

export type SalesState = {
  monthlySales: Sale[];
};

export type SettingsState = {
  newName: string;
  newEmail: string;
  currentPassword: string;
  newPassword: string;
  profileImg: string;
  isProfileModalOpen: boolean;
  isPasswordModalOpen: boolean;
};

export type UserPayload = {
  userId: string;
  newName?: string;
  newEmail?: string;
  currentPassword?: string;
  newPassword?: string;
  image?: string;
};
export type StoreState = {
  items: Item[];
  filteredItems: Item[];
  categories: string[];
  selectedCategory: string | null;
  loading: boolean;
  error: string | null;
};
export type UserState = {
  email: string;
  password: string;
  name: string;
  totalCustomers: number;
  error: string;
  isLoading: boolean;
};
