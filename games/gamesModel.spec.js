
const games = require('./gamesModel.js');
const db = require('../data/dbConfig.js');
const request = require('supertest');

describe('The games model', () => {

  describe('The insert function', async () => {

    beforeEach(()=> { //clean up function
      return db('games').truncate();
    });

    it('should insert a game into the database', async () => {
      const testInput = {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      }

      const game = await games.insert(testInput);

        expect(game.title).toBe('Pacman');
        expect(game.genre).toBe('Arcade');
        expect(game.releaseYear).toBe(1980);
    })
  })

})
