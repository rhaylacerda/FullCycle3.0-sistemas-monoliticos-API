import InvoiceRepository from "../../domain/repository/invoice-repository.interface";
import Invoice from "../../domain/entity/invoice";

export default class InvoiceRepositoryMemory implements InvoiceRepository {
  private store: Map<string, Invoice> = new Map();

  async find(id: string): Promise<Invoice> {
    const invoice = this.store.get(id);
    if (!invoice) throw new Error("Invoice not found");
    return invoice;
  }

  async save(invoice: Invoice): Promise<void> {
    this.store.set(invoice.id, invoice);
  }
}
