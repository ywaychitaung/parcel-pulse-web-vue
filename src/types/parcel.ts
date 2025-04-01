export interface Parcel {
  id: number
  trackingNumber: string
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED'
  senderName: string
  senderAddress: string
  receiverName: string
  receiverAddress: string
  weight: number
  description?: string
  createdAt: string
  updatedAt: string
}