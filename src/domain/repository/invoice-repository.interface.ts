import Invoice from "../entity/invoice";

export default interface InvoiceRepository {
  find(id: string): Promise<Invoice>;
  save(invoice: Invoice): Promise<void>;
}
