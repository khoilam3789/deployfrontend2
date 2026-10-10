export interface Product {
  id: number;
  slug: string;
  title: string;
  categoryId?: string;
  category: string;
  price: string;
  main_image?: string;
  image?: string;
  gallery?: string[];
  color_swatches?: string[];
  description: string;
  specifications?: {
    xuat_xu?: string;
    ung_dung?: string;
    chat_lieu?: string;
    hotline_tu_van?: string;
    [key: string]: string | undefined;
  };
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

export interface Post {
  id?: number;
  title: string;
  slug: string;
  thumbnail?: string;
  summary: string;
  content_html?: string;
  images?: string[];
  date?: string;
  author?: string;
  category?: string;
}

export interface Banner {
  id: number;
  title: string;
  desc: string;
  image: string;
  btnText: string;
  btnLink: string;
}

export interface Quote {
  id: number;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  note?: string;
  status?: string;
  createdAt?: string;
}

export interface SiteSettings {
  storeName: string;
  tagline: string;
  hotline1: string;
  hotline2: string;
  zalo: string;
  email: string;
  address: string;
  workingHours: string;
  aboutShort: string;
  socialFacebook?: string;
  socialYoutube?: string;
  logo: string;
}
