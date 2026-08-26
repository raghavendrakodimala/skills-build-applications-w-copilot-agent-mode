import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    grade: { type: String, trim: true },
    avatar: { type: String, trim: true },
  },
  { timestamps: true },
);

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'walking', 'strength'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceMiles: { type: Number, min: 0 },
    notes: { type: String, trim: true },
    points: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    captainId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    motto: { type: String, trim: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    activityType: { type: String, enum: ['running', 'walking', 'strength'], required: true },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

export async function getLeaderboard() {
  return Activity.aggregate([
    { $group: { _id: '$userId', points: { $sum: '$points' }, activities: { $sum: 1 } } },
    { $sort: { points: -1 } },
    { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
    { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 0,
        userId: '$_id',
        name: { $ifNull: ['$user.name', 'Unknown athlete'] },
        points: 1,
        activities: 1,
      },
    },
  ]);
}