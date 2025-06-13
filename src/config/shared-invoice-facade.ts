import InvoiceRepositoryMemory from '../infra/db/invoice-repository.memory';
import { GenerateInvoiceUseCase } from '../usecase/generate-invoice/generate-invoice.usecase';
import { FindInvoiceUseCase } from '../usecase/find-invoice/find-invoice.usecase';
import { InvoiceFacade } from '../facade/invoice.facade';

const sharedRepo = new InvoiceRepositoryMemory();

const facade = new InvoiceFacade(
  new GenerateInvoiceUseCase(sharedRepo),
  new FindInvoiceUseCase(sharedRepo)
);

export default facade;
