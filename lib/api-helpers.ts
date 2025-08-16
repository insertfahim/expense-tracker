import { NextRequest } from 'next/server';

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

export function createApiResponse<T>(
  data?: T,
  message?: string,
  status: number = 200
): ApiResponse<T> {
  return {
    data,
    message,
    status
  };
}

export function createErrorResponse(
  error: string,
  status: number = 500
): ApiResponse {
  return {
    error,
    status
  };
}

export function handleApiError(error: any): ApiResponse {
  if (error instanceof ApiError) {
    return createErrorResponse(error.message, error.status);
  }

  if (error.name === 'ValidationError') {
    return createErrorResponse('Validation failed', 400);
  }

  if (error.code === 11000) {
    return createErrorResponse('Duplicate entry', 409);
  }

  console.error('Unhandled API error:', error);
  return createErrorResponse('Internal server error', 500);
}

export async function parseRequestBody(request: NextRequest) {
  try {
    return await request.json();
  } catch (error) {
    throw new ApiError('Invalid JSON in request body', 400);
  }
}

export function validateRequiredFields<T extends Record<string, any>>(
  data: T,
  requiredFields: (keyof T)[]
): void {
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw new ApiError(
      `Missing required fields: ${missingFields.join(', ')}`,
      400
    );
  }
}
