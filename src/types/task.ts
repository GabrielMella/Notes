import { schemmaRegisterTask } from "src/schemmas/Task";
import { z } from "zod";

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
    id: string;
    title: string;
    description: string;
    status: boolean
}

export interface OldTask {
    id: string;
    title: string;
    description: string;
    status: boolean
}

export interface TaskApiResponse {
    currentPage: number;
    data: FetchTaskResponse[];
    firstPageUrl: string;
    from: number;
    lastPage: number;
    lastPageUrl: string;
    links: any[];
    nextPageUrl: string | null;
    path: string;
    perPage: number;
    prevPageUrl: string | null;
    to: number;
    total: number;
}

export type FormRegister = z.infer<typeof schemmaRegisterTask>;

