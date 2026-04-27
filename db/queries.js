// db/queries.js
const { ObjectId } = require('mongodb');

async function signupUser(db, userData) {
  const result = await db.collection('users').insertOne({
    email: userData.email,
    passwordHash: userData.passwordHash,
    name: userData.name,
    createdAt: new Date()
  });
  return { insertedId: result.insertedId };
}

async function loginFindUser(db, email) {
  return await db.collection('users').findOne({ email });
}

async function listUserProjects(db, ownerId) {
  return await db.collection('projects').find({ ownerId, archived: false }).sort({ createdAt: -1 }).toArray();
}

async function createProject(db, projectData) {
  const result = await db.collection('projects').insertOne({
    ownerId: projectData.ownerId,
    name: projectData.name,
    description: projectData.description || '',
    archived: false,
    createdAt: new Date()
  });
  return { insertedId: result.insertedId };
}

async function archiveProject(db, projectId) {
  // TODO: implement
  throw new Error('archiveProject not implemented');
}

async function listProjectTasks(db, projectId, status) {
  // TODO: implement
  throw new Error('listProjectTasks not implemented');
}

async function createTask(db, taskData) {
  // TODO: implement
  throw new Error('createTask not implemented');
}

async function updateTaskStatus(db, taskId, newStatus) {
  // TODO: implement
  throw new Error('updateTaskStatus not implemented');
}

async function addTaskTag(db, taskId, tag) {
  // TODO: implement
  throw new Error('addTaskTag not implemented');
}

async function removeTaskTag(db, taskId, tag) {
  // TODO: implement
  throw new Error('removeTaskTag not implemented');
}

async function toggleSubtask(db, taskId, subtaskTitle, newDone) {
  // TODO: implement
  throw new Error('toggleSubtask not implemented');
}

async function deleteTask(db, taskId) {
  // TODO: implement
  throw new Error('deleteTask not implemented');
}

async function searchNotes(db, ownerId, tags, projectId) {
  // TODO: implement
  throw new Error('searchNotes not implemented');
}

async function projectTaskSummary(db, ownerId) {
  return await db.collection('tasks').aggregate([
    { $match: { ownerId } },
    { $group: {
      _id: '$projectId',
      todo:       { $sum: { $cond: [{ $eq: ['$status', 'todo'] }, 1, 0] } },
      inProgress: { $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] } },
      done:       { $sum: { $cond: [{ $eq: ['$status', 'done'] }, 1, 0] } },
      total:      { $sum: 1 }
    }},
    { $lookup: { from: 'projects', localField: '_id', foreignField: '_id', as: 'project' }},
    { $unwind: '$project' },
    { $project: { _id: 1, projectName: '$project.name', todo: 1, inProgress: 1, done: 1, total: 1 }}
  ]).toArray();
}

async function recentActivityFeed(db, ownerId) {
  return await db.collection('tasks').aggregate([
    { $match: { ownerId } },
    { $sort: { createdAt: -1 } },
    { $limit: 10 },
    { $lookup: { from: 'projects', localField: 'projectId', foreignField: '_id', as: 'project' }},
    { $unwind: '$project' },
    { $project: { _id: 1, title: 1, status: 1, priority: 1, createdAt: 1, projectId: 1, projectName: '$project.name' }}
  ]).toArray();
}

module.exports = {
  signupUser,
  loginFindUser,
  listUserProjects,
  createProject,
  archiveProject,
  listProjectTasks,
  createTask,
  updateTaskStatus,
  addTaskTag,
  removeTaskTag,
  toggleSubtask,
  deleteTask,
  searchNotes,
  projectTaskSummary,
  recentActivityFeed
};
