import { Router } from 'express';
import { InvoiceFacadeInterface } from '../../facade/invoice.facade';

export function invoiceRoutes(facade: InvoiceFacadeInterface) {
  const router = Router();

  router.get('/:id', async (req, res) => {
    try {
      const invoice = await facade.find({ id: req.params.id });
      res.json(invoice);
    } catch (error) {
      res.status(404).json({ error: 'Invoice not found' });
    }
  });

  return router;
}
