import {PurchaseOrder} from './_models/purchase-order';

export const PURCHASEORDERS: PurchaseOrder[] = [
    {
        id: 106,
        userId: 1,
        date: new Date(2020, 4, 14, 15, 10),
        status: 0,
        description: '900 green baseball caps',
        asiNumber: '111',
        comments: '',
        client: {
            id: 1,
            name: 'PATIO Restaurant',
            notes: '',
            shipNotes: '',
            shipDate: new Date(2020, 4, 14),
            shipVia: '',
            customShippingAddress: {
                attn: 'Ronald McDonald',
                companyName: 'Meet Burger',
                address1: '123 Bun St',
                address2: '',
                address3: '',
                city: 'Cow Palace',
                state: 'IL',
                zipCode: '60447',
            }
        },
        supplier: {
            id: 1,
            notes: '',
            shipNotes: '',
            shipDate: new Date(2020, 4, 14),
            shipVia: '',
            shipAccountNumber: '551-1010'
        },
        merchandise: [{
            quantity: 0,
            styleNumber: '',
            description: '',
            cost: 0,
            netCost: 0
        }]
    },
    {
        id: 105,
        userId: 2,
        date: new Date(2020, 4, 13, 8, 30),
        status: 1,
        description: '1000 pens',
        comments: '',
        asiNumber: '222',
        client: {
            id: 2,
            name: 'World Elite Concierge',
            notes: '',
            shipNotes: '',
            shipDate: new Date(2020, 4, 14),
            shipVia: '',
            customShippingAddress: {
                attn: '',
                companyName: '',
                address1: '',
                address2: '',
                address3: '',
                city: '',
                state: '',
                zipCode: '',
            }
        },
        supplier: {
            id: 1,
            notes: '',
            shipNotes: '',
            shipDate: new Date(2020, 4, 14),
            shipVia: '',
            shipAccountNumber: '551-1010'
        },
        merchandise: [{
            quantity: 0,
            styleNumber: '',
            description: '',
            cost: 0,
            netCost: 0
        }]
    },
    {
        id: 104,
        userId: 1,
        date: new Date(2020, 4, 10, 15, 23),
        status: 0,
        description: 'many many pink t-shirts',
        comments: '',
        asiNumber: '333',
        client: {
            id: 3,
            name: 'SONY Music Entertainment',
            notes: '',
            shipNotes: '',
            shipDate: new Date(2020, 4, 14),
            shipVia: '',
            customShippingAddress: {
                attn: '',
                companyName: '',
                address1: '',
                address2: '',
                address3: '',
                city: '',
                state: '',
                zipCode: '',
            }
        },
        supplier: {
            id: 1,
            notes: '',
            shipNotes: '',
            shipDate: new Date(2020, 4, 14),
            shipVia: '',
            shipAccountNumber: '551-1010'
        },
        merchandise: [{
            quantity: 0,
            styleNumber: '',
            description: '',
            cost: 0,
            netCost: 0
        }]
    },
    {
        id: 103,
        userId: 3,
        date: new Date(2020, 4, 4, 17, 30),
        status: 2,
        description: '2000 mouse pads',
        comments: '',
        asiNumber: '444',
        client: {
            id: 4,
            name: 'We Are Alexander',
            notes: '',
            shipNotes: '',
            shipDate: new Date(2020, 4, 14),
            shipVia: '',
            customShippingAddress: {
                attn: '',
                companyName: '',
                address1: '',
                address2: '',
                address3: '',
                city: '',
                state: '',
                zipCode: '',
            }
        },
        supplier: {
            id: 1,
            notes: '',
            shipNotes: '',
            shipDate: new Date(2020, 4, 14),
            shipVia: '',
            shipAccountNumber: '551-1010'
        },
        merchandise: [{
            quantity: 0,
            styleNumber: '',
            description: '',
            cost: 0,
            netCost: 0
        }]
    },
    {
        id: 102,
        userId: 1,
        date: new Date(2020, 4, 4, 20, 20),
        status: 0,
        description: '10,000 logo pens',
        comments: '',
        asiNumber: '555',
        client: {
            id: 6,
            name: 'Wieden & Kennedy',
            notes: '',
            shipNotes: '',
            shipDate: new Date(2020, 4, 14),
            shipVia: '',
            customShippingAddress: {
                attn: '',
                companyName: '',
                address1: '',
                address2: '',
                address3: '',
                city: '',
                state: '',
                zipCode: '',
            }
        },
        supplier: {
            id: 1,
            notes: '',
            shipNotes: '',
            shipDate: new Date(2020, 4, 14),
            shipVia: '',
            shipAccountNumber: '551-1010'
        },
        merchandise: [{
            quantity: 0,
            styleNumber: '',
            description: '',
            cost: 0,
            netCost: 0
        }]
    }
]
