import axios from 'axios';

const folderUrl = 'http://localhost:5000/folder';
const foldersUrl = 'http://localhost:5000/folders';

export const getFolderById = (id) => axios.get(`${folderUrl}/${id}`);
export const updateFolder = (id, updatedFolder) => axios.patch(`${folderUrl}/${id}`, updatedFolder);
export const deleteFolder = (id) => axios.delete(`${folderUrl}/${id}`);

export const fetchFolders = () => axios.get(foldersUrl);
export const createFolder = (newFolder) => axios.post(foldersUrl, newFolder);
export const fetchFoldersById = (id) => axios.get(`${foldersUrl}/${id}`)