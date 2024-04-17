export type ValidationResult = {
  success: boolean;
  status?: number | undefined;
  statusText?: string | undefined;
};

export function success(): ValidationResult {
  return {
    success: true,
  };
}
export function failure(status: number, statusText: string | undefined): ValidationResult {
  return {
    success: false,
    status,
    statusText,
  };
}
