import request from 'supertest';
import app from '../../api/server';

describe("Invoice API E2E", () => {
  it("should return 404 for non-existent invoice", async () => {
    const response = await request(app).get('/invoice/nonexistent-id');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Invoice not found");
  });

  it("should create and retrieve an invoice", async () => {
    const input = {
      name: "Cliente Teste",
      document: "99999999999",
      street: "Rua XPTO",
      number: "123",
      complement: "Apto 2",
      city: "SP",
      state: "SP",
      zipCode: "00000-000",
      items: [
        { id: "1", name: "Produto A", price: 100 },
        { id: "2", name: "Produto B", price: 200 }
      ]
    };

    // ✅ Chama a API corretamente via POST
    const createResponse = await request(app).post('/checkout').send(input);
    expect(createResponse.status).toBe(201);

    const invoiceId = createResponse.body.id;

    // ✅ Agora busca a invoice gerada
    const response = await request(app).get(`/invoice/${invoiceId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(invoiceId);
    expect(response.body.total).toBe(300);
    expect(response.body.items).toHaveLength(2);
  });
});
