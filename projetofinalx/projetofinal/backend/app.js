/*import express from 'express';
import cors from 'cors';

function createApp() {
    const app = express();

    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }));
  
    const apiConfig = {
        prefix: '/api'
    };
                 
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });

    return app;
}

export default createApp; */
