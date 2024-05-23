import { Request } from "express";

export interface userInterface {
  id: number;
  role_id: number;
  profile_pic: string;
  email: string;
  password: string;
  activate_link: string;
  password_exp: string;
  link_exp: string;
  is_active: boolean;
  bio: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface paginationInterface {
  page?: number;
  limit: number;
  startIndex?: number;
  endIndex?: number;
}

export interface garageInterface {
  id?: number;
  garage_id?: number;
  garage_name?: string;
  contact_number?: string;
  email?: string;
  thumbnail?: string;
  open_time?: string;
  clost_time?: string;
  description?: string;
  status?: number;
  is_deleted?: boolean;
}

export interface loginLogsInterface {
  id: number;
  user_id: number;
  attempt_count: number;
  attempt_sys_ip: string;
}

export interface getAllSlotsInterface {
  id?: number;
  garageName?: string;
  start_time?: string;
  end_time?: string;
  availability_status?: boolean;
  count: number;
}

export interface feedbacksInterface {
  id?: number;
  garage_id?: number;
  customer_id?: number;
  feedback?: string;
  rating?: number;
}

export interface getCustomerAppointmentsInterface {
  garage_name?: string;
  start_time?: string;
  appointment_id?: number;
  payment_status?: number;
  invoice_url?: string;
  status?: number;
  vehicle_status?: number;
  customer_email?: string;
  count: number;
}

export interface getAppointmentsInterface {
  id?: number;
  customerName?: string;
  startTime: string;
  endTime: string;
  date?: string;
  status?: number;
  vehicle_status?: number;
  count: number;
}

export interface getBookedAppointmentsInterface {
  id: number;
  garageName: string;
  customerName: string;
  startTime: string;
  endTime: string;
}

export interface slotMasterInterface {
  id: number;
  garage_id: number;
  start_time: string;
  end_time: string;
  availability_status: number;
}

export interface garageServicesInterface {
  id: number;
  garage_id: number;
  service_id: number;
  price: number;
}

export interface garageDurationInterface {
  open_time?: string;
  close_time?: string;
}

export interface garageSlotListingInterface {
  startTime: string;
  endTime: string;
}

export interface getGarageAppointmentsInterface {
  customer_name: string;
  customer_email: string;
  start_time: string;
  appointment_id: number;
  payment_status: number;
  invoice_url: number;
  appointment_status: number;
  count: number;
}

export interface getInvoiceDetailsInterface {
  garage_name: string;
  start_time: string;
  appointment_id: number;
  customer_name: string;
  area: string;
  pincode: number;
  city_name: string;
  service_description: string;
  payment_status: number;
  price: number;
}

export interface appointmentPaymentsInterface {
  id: number;
  appointment_id: number;
  sub_total: string;
  gst_amount: string;
  status: number;
  discount: string;
}

export interface findVehicleStatusInterface {
  id: number;
  vehicle_status: number;
  register_plate_number: string;
  customer_name: string;
  brand: string;
  model: string;
  year: number;
  count: number;
}

export interface appointmentsInterface {
  id: number;
  slot_id: number;
  customer_id: number;
  status: number;
  invoice_url: string;
  comment: string;
  vehicle_status: number;
  vehicle_id: number;
}

export interface userVehiclesInterface {
  id: number;
  owner_id: number;
  vehicle_id: number;
  register_plate_number: string;
}

export interface vehicleInterface {
  id: number;
  type_id: number;
  brand: string;
  model: string;
  year: number;
}

export interface getUserAddressInterface {
  area?: string;
  pincode?: number;
  cityId?: number;
  cityName?: number;
  stateId?: number;
  stateName?: string;
  address_id?: number;
}

export interface RequestWithPagination extends Request {
  pagination?: paginationInterface;
}

export interface errorInterface {
  message: string;
}

export interface fileInterface {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
