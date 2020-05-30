export class PurchaseOrder {
    id: number;
    userId: number;
    date: Date;
    status: PurchaseOrderStatus;
    description: string;
    comments: string;
    asiNumber: string;
    client: {
        id: number;
        name: string; // temporary
        notes: string;
        shipNotes: string;
        shipDate: Date;
        shipVia: string;
        customShippingAddress: {
            attn: string;
            companyName: string;
            address1: string;
            address2: string;
            address3: string;
            city: string;
            state: string;
            zipCode: string
        };
    };
    supplier: {
        id: number;
        notes: string;
        shipNotes: string;
        shipDate: Date;
        shipVia: string;
        shipAccountNumber: string,
    };
    merchandise: [{
        quantity: number;
        styleNumber: string;
        description: string;
        cost: number;
        netCost: number
    }]
}

export enum PurchaseOrderStatus {created, billed, cancelled}
