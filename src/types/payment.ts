export interface TPayment {
    _id: string
    userId: UserId
    orderId: OrderId
    amount: number
    currency: string
    paymentMethod: string
    transactionId: string
    status: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface UserId {
    _id: string
    name: string
    email: string
    image: string
    role: string
    password: string
    phone: string
    address: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface OrderId {
    _id: string
    date: string
    user: string
    car: string
    startTime: string
    endTime: string
    totalCost: number
    createdAt: string
    updatedAt: string
    __v: number
  }
  