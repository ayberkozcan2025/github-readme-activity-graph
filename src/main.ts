import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Handlers } from './handlers';

const app: Application = express();
const port = process.env.PORT || 5100;

app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Yalnızca senin kullanıcı adına izin veren güvenlik kontrolü
app.use((req: Request, res: Response, next: NextFunction) => {
  const username = (req.query.username as string || '').toLowerCase();
  
  // İstek /graph veya /data uç noktalarına yapılıyorsa ve kullanıcı adı senin değilse engelle
  if ((req.path === '/graph' || req.path === '/data') && username !== 'ayberkozcan2025') {
    return res.status(403).send('Forbidden: Bu servis yalnizca ayberkozcan2025 kullanicisi icin yetkilendirilmistir.');
  }
  
  next();
});

const handlers = new Handlers();

app.get('/', handlers.getRoot);
//Get Graph
app.get('/graph', handlers.getGraph);

app.get('/data', handlers.getData);

app.listen(port, (): void => {
    console.log(`Server is Running on Port ${port}`);
});
