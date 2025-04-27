export interface Root {
    user: User
    lastMessage: LastMessage
    unreadCount: number
  }
  
  export interface User {
    _id: string
    name: string
    email: string
  }
  
  export interface LastMessage {
    _id: string
    sender: Sender
    receiver: Receiver
    content: string
    isSeen: boolean
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface Sender {
    _id: string
    name: string
    email: string
  }
  
  export interface Receiver {
    _id: string
    name: string
    email: string
  }
  