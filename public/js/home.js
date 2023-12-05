async function sendEmail() {
    const email = document.getElementById('subemail').value;

    try {
        const response = await axios.post('/send-email', { subemail: email });
        console.log(response.data);
    } catch (error) {
        console.error('Error subscribing:', error);
    }
}