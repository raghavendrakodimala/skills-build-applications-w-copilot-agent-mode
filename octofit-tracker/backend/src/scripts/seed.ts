import mongoose from 'mongoose';
import { Activity, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([User.deleteMany({}), Activity.deleteMany({}), Team.deleteMany({}), Workout.deleteMany({})]);

    const [maya, jordan, priya] = await User.create([
      { name: 'Maya Chen', email: 'maya@mergington.edu', grade: '10' },
      { name: 'Jordan Smith', email: 'jordan@mergington.edu', grade: '11' },
      { name: 'Priya Patel', email: 'priya@mergington.edu', grade: '10' },
    ]);

    await Team.create([
      { name: 'Trail Blazers', captainId: maya._id, memberIds: [maya._id, priya._id], motto: 'Every step counts' },
      { name: 'Power Pack', captainId: jordan._id, memberIds: [jordan._id], motto: 'Stronger together' },
    ]);

    await Activity.create([
      { userId: maya._id, type: 'running', durationMinutes: 30, distanceMiles: 3.1, points: 60 },
      { userId: jordan._id, type: 'strength', durationMinutes: 25, points: 75 },
      { userId: priya._id, type: 'walking', durationMinutes: 40, distanceMiles: 2, points: 40 },
    ]);

    await Workout.create([
      { title: 'Easy Mileage', description: 'A comfortable run to build endurance.', difficulty: 'beginner', durationMinutes: 25, activityType: 'running' },
      { title: 'Bodyweight Circuit', description: 'Squats, lunges, and planks in three rounds.', difficulty: 'intermediate', durationMinutes: 20, activityType: 'strength' },
      { title: 'Recovery Walk', description: 'A relaxed walk with gentle mobility breaks.', difficulty: 'beginner', durationMinutes: 30, activityType: 'walking' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
