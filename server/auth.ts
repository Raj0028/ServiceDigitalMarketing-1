import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const ADMIN_EMAIL = "yashsaxena.personal@gmail.com";
const ADMIN_PASSWORD = "Miet2015@19";
const ADMIN_ID = "admin-1";

interface AdminUser {
  id: string;
  email: string;
}

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
          return done(null, false, { message: "Incorrect email or password" });
        }

        const adminUser: AdminUser = {
          id: ADMIN_ID,
          email: ADMIN_EMAIL,
        };

        return done(null, adminUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user: Express.User, done) => {
  done(null, (user as AdminUser).id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    if (id === ADMIN_ID) {
      const adminUser: AdminUser = {
        id: ADMIN_ID,
        email: ADMIN_EMAIL,
      };
      done(null, adminUser);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err);
  }
});

export { passport };

export function requireAuth(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ success: false, message: "Unauthorized" });
}
