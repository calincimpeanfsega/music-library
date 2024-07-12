// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Modal from 'react-modal';

// const AlbumPage = () => {
//     const [albums, setAlbums] = useState([]);
//     const [selectedAlbum, setSelectedAlbum] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [newAlbum, setNewAlbum] = useState({ title: '', artist: '', description: '', songs: [] });
//     const [isEditMode, setIsEditMode] = useState(false);

//     useEffect(() => {
//         fetchAlbums();
//     }, []);

//     const fetchAlbums = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/albums');
//             setAlbums(response.data);
//         } catch (err) {
//             setError(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const openModal = (album) => {
//         setSelectedAlbum(album);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setSelectedAlbum(null);
//         setIsModalOpen(false);
//         setIsEditMode(false);
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewAlbum({ ...newAlbum, [name]: value });
//     };

//     const handleAddAlbum = async () => {
//         try {
//             await axios.post('http://localhost:5000/api/albums', newAlbum);
//             fetchAlbums();
//             setNewAlbum({ title: '', artist: '', description: '', songs: [] });
//         } catch (err) {
//             setError(err);
//         }
//     };

//     const handleUpdateAlbum = async () => {
//         try {
//             await axios.put(`http://localhost:5000/api/albums/${selectedAlbum._id}`, selectedAlbum);
//             fetchAlbums();
//             closeModal();
//         } catch (err) {
//             setError(err);
//         }
//     };

//     const handleDeleteAlbum = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/albums/${id}`);
//             fetchAlbums();
//         } catch (err) {
//             setError(err);
//         }
//     };

//     const handleEditAlbum = (album) => {
//         setIsEditMode(true);
//         openModal(album);
//     };

//     if (loading) {
//         return <p>Loading albums...</p>;
//     }

//     if (error) {
//         return <p>Error fetching albums: {error.message}</p>;
//     }

//     return (
//         <div style={styles.container}>
//             <h1 style={styles.heading}>All Albums</h1>
//             <div style={styles.newAlbumForm}>
//                 <h2>Add New Album</h2>
//                 <input
//                     type="text"
//                     name="title"
//                     placeholder="Title"
//                     value={newAlbum.title}
//                     onChange={handleInputChange}
//                     style={styles.input}
//                 />
//                 <input
//                     type="text"
//                     name="artist"
//                     placeholder="Artist"
//                     value={newAlbum.artist}
//                     onChange={handleInputChange}
//                     style={styles.input}
//                 />
//                 <textarea
//                     name="description"
//                     placeholder="Description"
//                     value={newAlbum.description}
//                     onChange={handleInputChange}
//                     style={styles.textarea}
//                 ></textarea>
//                 <button onClick={handleAddAlbum} style={styles.button}>Add Album</button>
//             </div>
//             <div style={styles.albumList}>
//                 {albums.map(album => (
//                     <div key={album._id} style={styles.albumBox}>
//                         <h2 style={styles.albumTitle} onClick={() => openModal(album)}>{album.title}</h2>
//                         <p style={styles.albumInfo}>Artist: {album.artist}</p>
//                         <button onClick={() => handleEditAlbum(album)} style={styles.editButton}>Edit</button>
//                         <button onClick={() => handleDeleteAlbum(album._id)} style={styles.deleteButton}>Delete</button>
//                     </div>
//                 ))}
//             </div>
//             {selectedAlbum && (
//                 <Modal
//                     isOpen={isModalOpen}
//                     onRequestClose={closeModal}
//                     contentLabel="Album Details"
//                     style={modalStyles}
//                 >
//                     <h2>{selectedAlbum.title}</h2>
//                     <p>Artist: {selectedAlbum.artist}</p>
//                     <p>{selectedAlbum.description}</p>
//                     <h3>Songs</h3>
//                     <ul style={styles.songList}>
//                         {selectedAlbum.songs.map((song, index) => (
//                             <li key={index}>
//                                 <p><strong>{song.title}</strong> - {song.length}</p>
//                                 <p>{song.description}</p>
//                             </li>
//                         ))}
//                     </ul>
//                     {isEditMode && (
//                         <>
//                             <input
//                                 type="text"
//                                 name="title"
//                                 placeholder="Title"
//                                 value={selectedAlbum.title}
//                                 onChange={e => setSelectedAlbum({ ...selectedAlbum, title: e.target.value })}
//                                 style={styles.input}
//                             />
//                             <textarea
//                                 name="description"
//                                 placeholder="Description"
//                                 value={selectedAlbum.description}
//                                 onChange={e => setSelectedAlbum({ ...selectedAlbum, description: e.target.value })}
//                                 style={styles.textarea}
//                             ></textarea>
//                             <button onClick={handleUpdateAlbum} style={styles.button}>Update Album</button>
//                         </>
//                     )}
//                     <button onClick={closeModal} style={styles.closeButton}>Close</button>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// // Inline styles
// const styles = {
//     container: {
//         maxWidth: '800px',
//         margin: 'auto',
//         padding: '20px',
//         textAlign: 'center',
//     },
//     heading: {
//         fontSize: '2rem',
//         marginBottom: '20px',
//         color: '#333',
//     },
//     albumList: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//         gap: '20px',
//     },
//     albumBox: {
//         padding: '15px',
//         border: '1px solid #ccc',
//         borderRadius: '5px',
//         backgroundColor: '#f9f9f9',
//         cursor: 'pointer',
//     },
//     albumTitle: {
//         fontSize: '1.5rem',
//         marginBottom: '10px',
//         color: '#333',
//     },
//     albumInfo: {
//         fontSize: '1rem',
//         color: '#666',
//         marginBottom: '5px',
//     },
//     newAlbumForm: {
//         marginTop: '20px',
//         padding: '20px',
//         border: '1px solid #ccc',
//         borderRadius: '5px',
//         backgroundColor: '#f9f9f9',
//         textAlign: 'left',
//     },
//     input: {
//         display: 'block',
//         width: '100%',
//         marginBottom: '10px',
//         padding: '8px',
//         fontSize: '1rem',
//         borderRadius: '5px',
//         border: '1px solid #ccc',
//     },
//     textarea: {
//         display: 'block',
//         width: '100%',
//         height: '100px',
//         marginBottom: '10px',
//         padding: '8px',
//         fontSize: '1rem',
//         borderRadius: '5px',
//         border: '1px solid #ccc',
//     },
//     button: {
//         padding: '10px 20px',
//         fontSize: '1rem',
//         backgroundColor: '#333',
//         color: '#fff',
//         border: 'none',
//         cursor: 'pointer',
//     },
//     editButton: {
//         marginRight: '10px',
//         padding: '5px 10px',
//         fontSize: '0.9rem',
//         backgroundColor: '#007bff',
//         color: '#fff',
//         border: 'none',
//         cursor: 'pointer',
//     },
//     deleteButton: {
//         padding: '5px 10px',
//         fontSize: '0.9rem',
//         backgroundColor: '#dc3545',
//         color: '#fff',
//         border: 'none',
//         cursor: 'pointer',
//     },
//     closeButton: {
//         marginTop: '20px',
//         padding: '10px 20px',
//         fontSize: '1rem',
//         backgroundColor: '#333',
//         color: '#fff',
//         border: 'none',
//         cursor: 'pointer',
//     },
//     songList: {
//         maxHeight: '200px',
//         overflowY: 'auto',
//         textAlign: 'left',
//         padding: '0',
//         listStyle: 'none',
//     },
// };

// const modalStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         transform: 'translate(-50%, -50%)',
//         width: '75%',
//         maxWidth: '800px',
//         maxHeight: '80vh',
//         overflowY: 'auto',
//         padding: '20px',
//         borderRadius: '10px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     }
// };

// export default AlbumPage
