import { KeyedMutator } from "swr";

export interface CreateTaskRequest {
    title: string,
    description: string
}

export interface CreateTaskResponse {
    data: {
        success: boolean,
        message: string
    }
}

export interface FetchTaskResponse {
    title: string;
    description: string;
}

export interface useTaskResponse {
    data: FetchTaskResponse | [];
    error: any;
    mutate: KeyedMutator<FetchTaskResponse>;
}
