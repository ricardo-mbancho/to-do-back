import request from 'supertest';
import express from 'express';
import taskRoutes from '../src/routes/taskRoutes';
import Task from '../src/models/Task';

const app = express();
app.use(express.json());
app.use('/tasks', taskRoutes);

jest.mock('../src/models/Task');
const MockedTask = Task as jest.Mocked<typeof Task>;

describe('Tasks API (mocked)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return tasks on GET/tasks', async () => {
    const sortMock = jest.fn().mockResolvedValue([
      { _id: '1', title: 'Mock Task 1', createdAt: new Date() },
      { _id: '2', title: 'Mock Task 2', createdAt: new Date() },
    ]);

    MockedTask.find.mockReturnValue({ sort: sortMock } as any);

    const res = await request(app).get('/tasks');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    expect(res.body[0].title).toBe('Mock Task 1');
  });

  it('should create a new task on POST/tasks', async () => {
    const mockSave = jest.fn().mockResolvedValue({
      _id: '3',
      title: 'New Mock Task',
      createdAt: new Date(),
    });

    (MockedTask.prototype.save as jest.Mock) = mockSave;

    const res = await request(app).post('/tasks').send({ title: 'New Mock Task' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('New Mock Task');
    expect(mockSave).toHaveBeenCalled();
  });

  it('should return 400 on POST/tasks without title', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Title is required');
  });
});