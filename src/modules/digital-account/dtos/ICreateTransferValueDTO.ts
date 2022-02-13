export default interface ICreateTransferValueDTO {
  senderDocument: string;
  receiverDocument: string;
  transferredValue: number;
  availableValue: number;
}
