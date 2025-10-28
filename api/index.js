import express from 'express';
import session from 'express-session';
import { registerRoutes } from '../server/routes.js';
import { passport } from '../server/auth.js';

const app = express();

console.log('[API] Express serverless function initializing...');

app.set('trust proxy', 1);

app.use((req, res, next) => {
  console.log(`[API] Incoming request: ${req.method} ${req.url}`);
  next();
});

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
console.log('[API] registerRoutes called.');

app.use((err, req, res, next) => {
  console.error('[API] Error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

export default app;
