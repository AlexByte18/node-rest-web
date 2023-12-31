// import fs from 'fs';
// import http from 'http';

import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

// const server = http.createServer((req, res) => {
//     console.log (req.url);

//     if (req.url === '/') {
//         const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end(htmlFile);
//     } else {
//         res.writeHead(404, {'Content-Type': 'text/html'});
//         res.end();
//     }

// });

// server.listen(8080, () => {
//     console.log('Server running on port 8080');
// })

(async () => {
    main();
})();

function main() {
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes
    });

    server.start();
}