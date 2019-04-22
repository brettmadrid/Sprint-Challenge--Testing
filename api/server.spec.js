const request = require("supertest");
const server = require("./server.js");
const db = require('../data/dbConfig.js');

describe("The server", () => {
  it("should set the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", () => {
    it("should return 200", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("should return JSON", async () => {
      const res = await request(server).get("/");
      expect(res.type).toBe("application/json");
    });

    it(`should return { message: 'get successful' }`, async () => {
      const res = await request(server).get("/");

      expect(res.body).toEqual({ message: "get successful" });
    });
  });

  describe("/Games testing", () => {

    beforeEach(() => {
      return db('games').truncate();
    });

    it("should respond with an empty array when there are not any games", async () => {
      const res = await request(server).get("/games");

      expect(res.status).toBe(200);
      expect(res.type).toBe("application/json");
      expect(res.body).toEqual([]);
    });

    it('should respond with an array of all the games in the db and a status of 200', async () => {
      await db('games').insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
      await db('games').insert({title: 'Donkey Kong', genre: 'Arcade', releaseYear: 1981})

      const res = await request(server).get('/games');
      const data = res.body

      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(data.length).toEqual(2);
      expect(data[0].id).toBe(1);
      expect(data[0].title).toBe('Pacman');
      expect(data[1].id).toBe(2);
      expect(data[1].title).toBe('Donkey Kong');
    });
  });
});
