import toolController from '../app/controllers/tool.controller.js';
import db from '../app/models/index.datamapper.js';
import {jest} from '@jest/globals';




describe('toolController', () => {
  describe('getAll', () => {
    it('should return all users', async () => {
      // Create some mock users
      const mockTools = [
        { id: 1, name: 'Github' },
        { id: 2, name: 'Stackoverflow' },
      ];
      // Replace the getAll function with a mock implementation
      db.tool.getAll = jest.fn().mockResolvedValue(mockTools);

      // Create mock request and response objects
      const request = {};
      const response = { json: jest.fn() };
      const next = jest.fn();

      // Call the getAll function
      await toolController.getAll(request, response, next);

      // Verify that the getAll function was called
      expect(db.tool.getAll).toHaveBeenCalled();

      // Verify that the response was correct
      expect(response.json).toHaveBeenCalledWith(mockTools);

      // Verify that the next function was not called
      expect(next).not.toHaveBeenCalled();
    });

    it('should call the next function with an error if getAll fails', async () => {
      // Replace the getAll function with a failing mock implementation
      db.tool.getAll = jest.fn().mockRejectedValue(new Error('Database error'));

      // Create mock request and response objects
      const request = {};
      const response = { json: jest.fn() };
      const next = jest.fn();

      // Call the getAll function
      await toolController.getAll(request, response, next);

      // Verify that the getAll function was called
      expect(db.tool.getAll).toHaveBeenCalled();

      // Verify that the next function was called with an error
      expect(next).toHaveBeenCalledWith(new Error('Database error'));

      // Verify that the responseponse was not called
      expect(response.json).not.toHaveBeenCalled();
    });
  });
  
});
