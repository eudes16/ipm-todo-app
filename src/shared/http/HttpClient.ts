import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import { DataRequestInterface, DataResponseInterface, HttpClientInterface } from "./domain/types"

export class HttpClient implements HttpClientInterface {

    private httpClient: AxiosInstance

    constructor(baseUrl: string) {
        this.httpClient = axios.create({
            baseURL: baseUrl
        })

        this.httpClient.interceptors.request.use(
            (config) => {
                config.headers['Accept'] = 'application/json'
                return config
            }, 
            (error) => {
                return Promise.reject(error)
            }
        )

        this.httpClient.interceptors.response.use(
            (response) => {
                return response
            }, 
            (error) => {
                return Promise.reject(error)
            }
        )

    }

    async get<T = any, R = any>(request: DataRequestInterface<T>): Promise<DataResponseInterface<R>> {
        try {

            const options: AxiosRequestConfig = {}

            if (request?.headers) {
                options.headers = request.headers
            }

            options.withCredentials = true

            const response = await this.httpClient.get<R>(request.url, options)
            
            return {
                data: response.data,
                status: response.status
            } as DataResponseInterface<R>

        } catch (error: any) {
            return {
                data: error.response.data,
                status: error.response.status,
                message: error.message
            }
        }
    }

    async post<T = any, R = any>(request: DataRequestInterface<T>): Promise<DataResponseInterface<R>> {
        try {

            const options: AxiosRequestConfig = {}

            if (request?.headers) {
                options.headers = request.headers
            }

            const response = await this.httpClient.post<R>(request.url, request.data, options)
            
            return {
                data: response.data,
                status: response.status
            } as DataResponseInterface<R>

        } catch (error: any) {
            return {
                data: error.response.data,
                status: error.response.status,
                message: error.message
            }
        }
    }

    async put<T = any, R = any>(request: DataRequestInterface<T>): Promise<DataResponseInterface<R>> {
        try {

            const options: AxiosRequestConfig = {}

            if (request?.headers) {
                options.headers = request.headers
            }

            const response = await this.httpClient.put<R>(request.url, request.data, options)
            
            return {
                data: response.data,
                status: response.status
            } as DataResponseInterface<R>

        } catch (error: any) {
            return {
                data: error.response.data,
                status: error.response.status,
                message: error.message
            }
        }
    }

    async delete<T = any, R = any>(request: DataRequestInterface<T>): Promise<DataResponseInterface<R>> {
        try {

            const options: AxiosRequestConfig = {}

            if (request?.headers) {
                options.headers = request.headers
            }

            const response = await this.httpClient.delete<R>(request.url, options)
            
            return {
                data: response.data,
                status: response.status
            } as DataResponseInterface<R>

        } catch (error: any) {
            return {
                data: error.response.data,
                status: error.response.status,
                message: error.message
            }
        }
    }
}

export const httpClient = new HttpClient(process.env.NEXT_PUBLIC_API_URL!)