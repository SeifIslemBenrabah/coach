import React, { useEffect, useState } from 'react';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api')
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h1>React Frontend</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;
