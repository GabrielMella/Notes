import axios from 'axios'
import { 
    CreateTaskRequest,
    CreateTaskResponse,
} from '_types/task'


export async function createTaskRequest(data: CreateTaskRequest, token: string) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
 
    const response = await axios.post<CreateTaskResponse, CreateTaskResponse>('http://localhost:8080/task', data, config);
    return response;
}

export async function deleteTaskRequest(id: string, token: string) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
 
    const response = await axios.delete<CreateTaskResponse, CreateTaskResponse>(`http://localhost:8080/task/${id}`,config);
    return response;
}

export async function taskCompletedRequest(id: string, token: string) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
 
    const response = await axios.put(`http://localhost:8080/task/${id}`, null,config);
    return response;
}

