class AppError extends Error {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly code: string;

  public readonly name: string;

  constructor(
    message: string,
    statusCode = 400,
    code = '001',
    name = 'INTERNAL_SERVER_ERROR',
  ) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
    this.name = name;
  }
}

export default AppError;
