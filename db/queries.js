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
  // TODO: implement
  throw new Error('listUserProjects not implemented');
}

async function createProject(db, projectData) {
  // TODO: implement
  throw new Error('createProject not implemented');
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
  // TODO: implement
  throw new Error('projectTaskSummary not implemented');
}

async function recentActivityFeed(db, ownerId) {
  // TODO: implement
  throw new Error('recentActivityFeed not implemented');
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
