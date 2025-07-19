import {OnRampStatus , AuthType} from "@prisma/client"

export interface User {
  id: number;
  email?: string;
  name?: string;
  number: string;
  password: string;
  OnRampTransaction: OnRampTransaction[];
  Balance: Balance[];
  sentTransfers: p2pTransfer[];
  recievedTransfers: p2pTransfer[];
}

export interface Merchant {
  id: number;
  email: string;
  name?: string;
  auth_type: AuthType;
}

export interface p2pTransfer {
  id: number;
  amount: number;
  timestamp: Date;
  fromUserId: number;
  fromUser: User;
  toUserId: number;
  toUser: User;
}

export interface OnRampTransaction {
  id?: number;
  status: OnRampStatus;
  token?: string;
  provider: string;
  amount: number;
  startTime: Date;
  userId?: number;
  user?: User;
}

export interface Balance {
  id: number;
  userId: number;
  amount: number;
  locked: number;
  user: User;
}


