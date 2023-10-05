export interface ItemData {
  booking_start: string;
  booking_end: string;
  expireAt: string;
  bucket: number;
  email: string
  [key: string]: string | number;
}
