import { Router } from 'express';
import { Activity, Team, User, Workout, getLeaderboard } from '../models/index.js';

const router = Router();

router.get('/users', async (_request, response) => {
  response.json(await User.find().sort({ name: 1 }));
});

router.post('/users', async (request, response) => {
  const user = await User.create(request.body);
  response.status(201).json(user);
});

router.get('/users/:id', async (request, response) => {
  const user = await User.findById(request.params.id);
  if (!user) {
    response.status(404).json({ error: 'User not found' });
    return;
  }
  response.json(user);
});

router.get('/activities', async (request, response) => {
  const filter = request.query.userId ? { userId: request.query.userId } : {};
  response.json(await Activity.find(filter).populate('userId', 'name email').sort({ createdAt: -1 }));
});

router.post('/activities', async (request, response) => {
  const { type, durationMinutes } = request.body;
  const pointRates: Record<string, number> = { running: 2, walking: 1, strength: 3 };
  const points = Math.round(Number(durationMinutes) * (pointRates[type] || 0));
  const activity = await Activity.create({ ...request.body, points });
  response.status(201).json(activity);
});

router.get('/teams', async (_request, response) => {
  response.json(await Team.find().populate('captainId', 'name').populate('memberIds', 'name').sort({ name: 1 }));
});

router.post('/teams', async (request, response) => {
  const team = await Team.create(request.body);
  response.status(201).json(team);
});

router.get('/leaderboard', async (_request, response) => {
  response.json(await getLeaderboard());
});

router.get('/workouts', async (request, response) => {
  const filter = request.query.difficulty ? { difficulty: request.query.difficulty } : {};
  response.json(await Workout.find(filter).sort({ difficulty: 1, title: 1 }));
});

router.post('/workouts', async (request, response) => {
  const workout = await Workout.create(request.body);
  response.status(201).json(workout);
});

export default router;