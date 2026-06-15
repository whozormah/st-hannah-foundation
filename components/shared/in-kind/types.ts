export interface InKindDonationData {
  fullName: string;
  email: string;
  phone: string;

  category: string;
  description: string;
  quantity: string;
  condition: string;
  image: File | null;

  location: string;
  customLocation: string;

  deliveryMethod: string;

  pickupAddress: string;
  contactMethod: string;
  pickupDate: string;
  pickupTime: string;
  pickupInstructions: string;

  destination: string;

  acknowledgeDonation: string;
}
