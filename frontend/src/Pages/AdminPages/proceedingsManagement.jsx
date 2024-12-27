import SidePanel from '../../Components/Sidepanel';
import './proceedingsManagement.css';
import { useState, useEffect } from 'react';

const ProceedingsUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState('');
    const [sessions, setSessions] = useState([]); // State to hold session titles

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/sessions/sessions');
                if (response.ok) {
                    const data = await response.json();
                    setSessions(data); // Set the sessions data
                } else {
                    setMessage('Failed to fetch sessions.');
                }
            } catch (error) {
                console.error(error);
                setMessage('An error occurred while fetching sessions.');
            }
        };

        fetchSessions();
    }, []); 

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }
        if (!category) {
            setMessage('Please select a category.');
            return;
        }

        const formData = new FormData();
        formData.append('proceedings', file);
        formData.append('category', category); // Append category to form data

        try {
            const response = await fetch('http://localhost:5000/api/sessions/upload-proceedings', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage('Proceedings uploaded successfully!');
                setFile(null);
                setCategory(''); // Reset category after successful upload
            } else {
                setMessage('Failed to upload proceedings. Please try again.');
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
            setMessage('An error occurred while uploading the file.');
        }
    };

    return (
        <>
            <SidePanel />
            <div className="proceedings-upload">
                <h2>Upload Conference Proceedings</h2>
                <input type="file" accept=".pdf" onChange={handleFileChange} />
                <select value={category} onChange={handleCategoryChange}>
                    <option value="">Select a category</option>
                    {sessions.map(session => (
                        <option key={session._id} value={session.title}>
                            {session.title}
                        </option>
                    ))}
                </select>
                <button onClick={handleUpload}>Upload</button>
                {message && <p>{message}</p>}
            </div>
        </>
    );
};

export default ProceedingsUpload;