import userController from '../app/controllers/user.controller.js';
import db from '../app/models/index.datamapper.js';
import {jest} from '@jest/globals';




describe('userController', () => {
  describe('getAll', () => {
    it('should return all users', async () => {
      // Create some mock users
      const mockUsers = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];
      // Replace the getAll function with a mock implementation
      db.user.getAll = jest.fn().mockResolvedValue(mockUsers);

      // Create mock request and response objects
      const request = {};
      const response = { json: jest.fn() };
      const next = jest.fn();

      // Call the getAll function
      await userController.getAll(request, response, next);

      // Verify that the getAll function was called
      expect(db.user.getAll).toHaveBeenCalled();

      // Verify that the response was correct
      expect(response.json).toHaveBeenCalledWith(mockUsers);

      // Verify that the next function was not called
      expect(next).not.toHaveBeenCalled();
    });

    it('should call the next function with an error if getAll fails', async () => {
      // Replace the getAll function with a failing mock implementation
      db.user.getAll = jest.fn().mockRejectedValue(new Error('Database error'));

      // Create mock requestuest and response objects
      const request = {};
      const response = { json: jest.fn() };
      const next = jest.fn();

      // Call the getAll function
      await userController.getAll(request, response, next);

      // Verify that the getAll function was called
      expect(db.user.getAll).toHaveBeenCalled();

      // Verify that the next function was called with an error
      expect(next).toHaveBeenCalledWith(new Error('Database error'));

      // Verify that the response was not called
      expect(response.json).not.toHaveBeenCalled();
    });
  });
  
});
