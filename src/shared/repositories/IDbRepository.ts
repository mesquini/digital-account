export interface IDbRepository {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
