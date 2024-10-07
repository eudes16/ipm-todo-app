export interface DataRequestInterface<T = any> {
    url: string
    data?: T
    headers?: Record<string, string>
}

export interface DataResponseInterface<T = any> {
    data: T
    status: number
    message?: string
}

export interface HttpClientInterface {
    get<T = any, R = any>(data: DataRequestInterface<T>): Promise<DataResponseInterface<R>>
    post<T = any, R = any>(data: DataRequestInterface<T>): Promise<DataResponseInterface<R>>
    put<T = any, R = any>(data: DataRequestInterface<T>): Promise<DataResponseInterface<R>>
    delete<T = any, R = any>(data: DataRequestInterface<T>): Promise<DataResponseInterface<R>>
}