import { TUser } from "../redux/features/auth/authSlice"
import { TCar } from "./car"

export interface TBooking {
  _id: string
  date: string
  user: TUser
  car: TCar
  startTime: string
  endTime: string
  totalCost: number
  createdAt: string
  updatedAt: string
  __v: number
}
  