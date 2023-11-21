import { Router } from 'express';
import express from 'express';
import path from 'path';
import { envs } from '../config/envs';
import compression from 'compression';

interface Options {
    port: number,
    public_path: string,
    routes: Router
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const {port, public_path = 'public', routes} = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start() {

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(compression());
        this.app.use( express.static(envs.PUBLIC_PATH));

        this.app.use(this.routes);


        this.app.get('*', (req, res) => {
            console.log(req.url);
            
            const indexPath = path.join(__dirname + '../../../public/index.html');
            res.sendFile(indexPath);
        });

        this.app.listen(envs.PORT, () => {
            console.log('server running on port 3000');
        });
    }

}