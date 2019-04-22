const request = require("supertest");
const server = require("./server.js");

describe('The server', () => {
  it('should set the testing environment', () => {
    expect(process.env.DB_ENV).toBe("testing");
  })

  describe('GET /', () => {
    it("should return 200", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("should return JSON", async () => {
      const res = await request(server).get("/");
      expect(res.type).toBe('application/json');
    });
  });
  
});
