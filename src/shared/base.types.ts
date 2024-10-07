export type DefaultSizes = "xs" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type DefaultColors = "primary" | "secondary" | "success" | "danger" | "warning" | "info";
export type TextFieldTypes = "text" | "password" | "email" | "number" | 'datetime-local';

export type Pagination = {
    page: number
    limit: number
    total: number
    pages: number
    next: number | null
    prev: number| null
}