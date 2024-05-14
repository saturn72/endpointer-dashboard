export type ValidationResult = {
  success: boolean;
  status: number;
  statusText?: string | { key: string; message: string } | undefined;
};

export function success(status?: number): ValidationResult {
  return {
    success: true,
    status: status || 200,
  };
}
export function failure(
  status: number,
  statusText: string | { key: string; message: string } | undefined
): ValidationResult {
  return {
    success: false,
    status,
    statusText,
  };
}
