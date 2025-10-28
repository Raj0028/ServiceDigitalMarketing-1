import express from 'express';
import session from 'express-session';
import { registerRoutes } from '../server/routes.js';
import { passport } from '../server/auth.js';

const app = express();

app.set('trust proxy', 1);

app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'lax'
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

registerRoutes(app);

export default app;
