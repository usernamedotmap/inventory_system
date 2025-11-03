export type APIErrorTypes = {
    message: string;
    response: string;
    data: {
        error?: Record<string, string>
    }
}

export type productTypes = {
    id: string;
    name: string;
    unit: string;
    price: string;
    available: boolean;
    supplierName: string;
}

