export interface Ticket {
    ticketId: number;
    amount: number;
    description: string;
    status: "Pending" | "Approved" | "Denied";
    submittedAt: string;
    updatedAt?: string;
    user: {
      userId: number;
      username: string;
      email: string;
      role: string;
    };
  }
  