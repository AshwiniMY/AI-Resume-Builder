
import axios from 'axios';

const API_URL = 'http://localhost:1337/api/user-resumes/sxutqpfewho87mbupyetxhz2?populate=*';
const API_KEY = 'YOUR_API_KEY_HERE'; // I don't have it, so I can't run this easily.

async function checkKeys() {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });
        console.log("Keys in response:", Object.keys(response.data.data));
        console.log("Full Data:", JSON.stringify(response.data.data, null, 2));
    } catch (error) {
        console.error("Error fetching:", error.message);
    }
}

// checkKeys();
