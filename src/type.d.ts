export interface User {
    refresh: string;
    access: string;
    username?: string;
}

export interface LoginMutation {
    password: string;
    email: string;
}

export interface UserResponse {
    email: string;
    full_name: string;
    group: string[];
    is_active: boolean;
    phone_number: string;
    id: number;
}

export interface FetchUsersParams {
    page: number;
    pageSize: number;
    role?: string;
}

export interface Users {
    count: number;
    next: string | null;
    previous: string | null;
    results: UserResponse[];
}

export interface LoginResponse {
    refresh: string;
    access: string;
    user: {
        _id: number;
        username: string;
        email: string;
    };
}

export interface GlobalError {
    error: string;
    email?: string;
    username?: string;
    detail?: string;
}

export interface ProfileResponse {
    email: string;
    id: number,
    username: string;
    full_name: string;
    is_superuser: boolean;
    group: [string]
    user_id: string;
}

export interface DecodedToken {
    user_id: number;
    role: string;
    exp: number;
    iat: number;
}

export interface CreateUserPayload {
    username: string;
    email: string;
    password: string;
    group: string;
}

export interface DecodedToken {
    is_superuser: boolean;
    user_id: number;
}

export interface TaskData {
    title: string;
    description: string;
    executor: number[];
    deadline: string;
    priority: string;
    complexity: string;
    planned_time: number;
    attachments: string[];
    status?: string;
}

export interface Stage {
    id: number;
    title: string;
    description: string;
    status: string;
    order: number;
    planned_time: number;
    actual_time: number;
    start_date: string;
    end_date: string;
    task: number;
}

export interface Task {
    id: number;
    title: string;
    status: string;
    executor: User[];
    percentage: number;
    complexity: string;
    priority: string;
    order: number;
    description: string;
    creator: User;
    created_at: string;
    deadline: string;
    end_date: string | null;
    planned_time: number;
    actual_time: number | null;
    attachments: any[];
    stages: Stage[];
    completed_stages: number;
    remaining_stages: number;
}

