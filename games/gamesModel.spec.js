
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

  describe('The getAll function', () => {

    it('should retrieve all games from the database', async () => {
      db('games').insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });

      const allGames = await games.getAll();

      expect(allGames.length).toBe(1);
    });

    it('should retrieve all required feilds from each game in the database', async () => {
      db('games').insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });

      const allGames = await games.getAll();

      expect(allGames[0].title).toBe('Pacman');
      expect(allGames[0].genre).toBe('Arcade');
      expect(allGames[0].releaseYear).toBe(1980);
    });
  })


})
