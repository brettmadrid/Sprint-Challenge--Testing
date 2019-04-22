const request = require("supertest");
const server = require("./server.js");

describe('The server', () => {
  it('should set the testing environment', () => {
    expect(process.env.DB_ENV).toBe("testing");
  })
  
})
