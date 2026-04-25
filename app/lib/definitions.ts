// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export interface MonthCount {
  month: string;
  count: number;
}

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Member = {
  id: string;
  name: string;
  type: string;
  role: string;
  society: string;
  image_url: string;
  year: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type EventTable = {
  id: string;
  name: string;
  date: string;
  image_url: string;
  mode: string;
  venue: string;
  description: string;
  link: string;
  fee: string;
  status: string;
  time: string;
};

export type UpcomingEvent = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
  date: string;
  mode: string;
  venue: string;
  fee: string;
  description: string;
  link: string;
  time: string;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type EventForm = {
  id: string;
  name: string;
  date: string;
  image_url: string;
  mode: string;
  venue: string;
  description: string;
  link: string;
  fee: string;
  status: string;
  time: string;
};
