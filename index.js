import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import nodemailer from 'nodemailer';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');


app.get('/', async(req, res) => {
    res.render('index', { user: req.user });
});

app.post('/signup', async(req, res) => {
    // const { name, email, password } = req.body;
    // users.push({ username, email, password });
    res.redirect('/signin');
});

app.get('/signup', async (req, res) => {
    res.render('signup.ejs');
});

app.get('/signin', async (req, res) => {
    res.render('signin.ejs');
});

app.get('/login', async (req, res) => {
    let user = req.query.username || 'Guest';
    res.render('index.ejs' , { user: user });
});

app.get('/logout', async (req, res) => {
    res.redirect('/');
});

app.post('/subscribe', (req, res) => {
    const email = req.body.subemail;
    // console.log(email);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'yourEmail',
            pass: 'yourPassword',
        }
    });
    const mailOptions = {
        from: 'lightingmc786@gmail.com',
        to: email,
        subject: 'Subscription Confirmation',
        // text: 'Thank you for subscribing!',
        html: `
        <html>
        <head>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    color: #333;
                }

                .container {
                    max-width: 500px;
                    margin: 20px auto;
                    padding: 20px 40px;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    border: 1px solid #63c038;
                    box-shadow: 0px 0px 50px 0px rgba(55, 60, 54, 0.75);
                    border-radius: 10px;
                    background-color: rgb(4, 17, 48);
                }

                h1 {
                    color: greenyellow;
                    font-size: 40px;
                }

                p {
                    margin-bottom: 10px;
                }

                img {
                    max-width: 100%;
                    height: auto;
                    margin-top: 15px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="./public/images/ticksvg.png" alt="Subscription Confirmation" width="200">
                <h1>Subscription Successful!</h1>
                <p>Dear Subscriber,</p>
                <p>Thank you for subscribing to our newsletter! We appreciate your interest.</p>
                <p>Best regards,</p>
                <p>Bio Auth.</p>
            </div>
        </body>
        </html>
    `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            // res.send('Subscription successful! Check your email for confirmation.');
            res.render('confirmation');
        }
    });
});

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});


// to test the design
// app.get('/confirm', async (req, res) => {
//     res.render('confirmation.ejs');
// });
