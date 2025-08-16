export const EXPENSE_CATEGORIES = [
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Bills",
    "Healthcare",
    "Others",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const CATEGORY_ICONS: Record<ExpenseCategory, string> = {
    Food: "🍽️",
    Transport: "🚗",
    Shopping: "🛍️",
    Entertainment: "🎬",
    Bills: "📄",
    Healthcare: "🏥",
    Others: "📋",
};

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
    },
    EXPENSES: {
        BASE: "/api/expenses",
        BY_ID: (id: string) => `/api/expenses/${id}`,
    },
} as const;

export const VALIDATION_RULES = {
    TITLE_MIN_LENGTH: 3,
    AMOUNT_MIN_VALUE: 0.01,
    PASSWORD_MIN_LENGTH: 6,
    NAME_MIN_LENGTH: 2,
} as const;

export const DATE_FORMATS = {
    DISPLAY: "MMM dd, yyyy",
    INPUT: "yyyy-MM-dd",
    ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const;
