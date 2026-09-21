import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { verifyAdminCredentials, generateToken, verifyToken, ADMIN_USERNAME } from './server/auth';
import { getDb, saveDb, logActivity } from './server/db';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser with ample limit for photography uploads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Admin Auth Middleware
  const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }
    const token = authHeader.split(' ')[1];
    if (!verifyToken(token)) {
      return res.status(401).json({ error: 'Unauthorized: Session expired or invalid' });
    }
    next();
  };

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Admin Login
  app.post('/api/admin/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    if (verifyAdminCredentials(username, password)) {
      const token = generateToken(username);
      logActivity(`Admin logged in successfully (${username})`);
      return res.json({
        success: true,
        token,
        username: ADMIN_USERNAME,
        message: 'Welcome back, Hayyan 👋'
      });
    }

    return res.status(401).json({ error: 'Invalid username or password' });
  });

  // Admin Token Verification
  app.get('/api/admin/verify', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ valid: false });
    }
    const token = authHeader.split(' ')[1];
    const valid = verifyToken(token);
    res.json({ valid, username: ADMIN_USERNAME });
  });

  // Admin Overview Stats
  app.get('/api/admin/stats', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    const unreadMessages = db.messages.filter((m: any) => !m.read).length;
    res.json({
      totalProjects: db.projects.length,
      publishedProjects: db.projects.filter((p: any) => p.published).length,
      totalPhotos: db.photography.length,
      totalSkills: db.skills.length,
      totalMessages: db.messages.length,
      unreadMessages,
      activityLog: db.activityLog.slice(0, 10)
    });
  });

  // Profile
  app.get('/api/profile', (req: Request, res: Response) => {
    const db = getDb();
    res.json(db.profile);
  });

  app.put('/api/profile', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    db.profile = { ...db.profile, ...req.body };
    saveDb(db);
    logActivity('Updated profile information');
    res.json(db.profile);
  });

  // Projects
  app.get('/api/projects', (req: Request, res: Response) => {
    const db = getDb();
    // Return all if query param all=true, otherwise only published
    if (req.query.all === 'true') {
      return res.json(db.projects);
    }
    const published = db.projects.filter((p: any) => p.published);
    res.json(published);
  });

  app.post('/api/projects', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    const newProject = {
      id: req.body.id || `proj-${Date.now()}`,
      title: req.body.title || 'Untitled Project',
      description: req.body.description || '',
      image: req.body.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      technologies: Array.isArray(req.body.technologies) ? req.body.technologies : [],
      liveUrl: req.body.liveUrl || '',
      githubUrl: req.body.githubUrl || '',
      featured: Boolean(req.body.featured),
      published: req.body.published !== undefined ? Boolean(req.body.published) : true,
      order: db.projects.length + 1
    };
    db.projects.push(newProject);
    saveDb(db);
    logActivity(`Added project: ${newProject.title}`);
    res.status(201).json(newProject);
  });

  app.put('/api/projects/:id', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    const index = db.projects.findIndex((p: any) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    db.projects[index] = { ...db.projects[index], ...req.body };
    saveDb(db);
    logActivity(`Updated project: ${db.projects[index].title}`);
    res.json(db.projects[index]);
  });

  app.delete('/api/projects/:id', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    const project = db.projects.find((p: any) => p.id === req.params.id);
    db.projects = db.projects.filter((p: any) => p.id !== req.params.id);
    saveDb(db);
    logActivity(`Deleted project: ${project?.title || req.params.id}`);
    res.json({ success: true });
  });

  // Photography
  app.get('/api/photography', (req: Request, res: Response) => {
    const db = getDb();
    if (req.query.all === 'true') {
      return res.json(db.photography);
    }
    const published = db.photography.filter((p: any) => p.published);
    res.json(published);
  });

  app.post('/api/photography', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    const newPhoto = {
      id: req.body.id || `photo-${Date.now()}`,
      title: req.body.title || 'Untitled Photograph',
      category: req.body.category || 'Nature',
      imageUrl: req.body.imageUrl || '',
      description: req.body.description || '',
      location: req.body.location || '',
      cameraInfo: req.body.cameraInfo || '',
      featured: Boolean(req.body.featured),
      published: req.body.published !== undefined ? Boolean(req.body.published) : true,
      order: db.photography.length + 1
    };
    db.photography.unshift(newPhoto);
    saveDb(db);
    logActivity(`Added photograph: ${newPhoto.title}`);
    res.status(201).json(newPhoto);
  });

  app.put('/api/photography/:id', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    const index = db.photography.findIndex((p: any) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    db.photography[index] = { ...db.photography[index], ...req.body };
    saveDb(db);
    logActivity(`Updated photograph: ${db.photography[index].title}`);
    res.json(db.photography[index]);
  });

  app.delete('/api/photography/:id', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    const photo = db.photography.find((p: any) => p.id === req.params.id);
    db.photography = db.photography.filter((p: any) => p.id !== req.params.id);
    saveDb(db);
    logActivity(`Deleted photograph: ${photo?.title || req.params.id}`);
    res.json({ success: true });
  });

  // Blog / Articles
  app.get('/api/blog', (req: Request, res: Response) => {
    const db = getDb();
    const blog = db.blog || [];
    if (req.query.all === 'true') {
      return res.json(blog);
    }
    const published = blog.filter((b: any) => b.published);
    res.json(published);
  });

  app.get('/api/blog/:slugOrId', (req: Request, res: Response) => {
    const db = getDb();
    const blog = db.blog || [];
    const item = blog.find((b: any) => b.slug === req.params.slugOrId || b.id === req.params.slugOrId);
    if (!item) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(item);
  });

  app.post('/api/blog', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    if (!db.blog) db.blog = [];
    const newPost = {
      id: req.body.id || `blog-${Date.now()}`,
      slug: req.body.slug || (req.body.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: req.body.title || 'Untitled Article',
      description: req.body.description || '',
      content: req.body.content || '',
      author: 'Hayyan Mohamed',
      date: req.body.date || new Date().toISOString().split('T')[0],
      tags: Array.isArray(req.body.tags) ? req.body.tags : ['General'],
      coverImage: req.body.coverImage || '',
      published: req.body.published !== undefined ? Boolean(req.body.published) : true,
      readingTime: req.body.readingTime || '3 min read'
    };
    db.blog.unshift(newPost);
    saveDb(db);
    logActivity(`Published new blog article: ${newPost.title}`);
    res.status(201).json(newPost);
  });

  app.put('/api/blog/:id', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    if (!db.blog) db.blog = [];
    const index = db.blog.findIndex((b: any) => b.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Article not found' });
    }
    db.blog[index] = { ...db.blog[index], ...req.body };
    saveDb(db);
    logActivity(`Updated blog article: ${db.blog[index].title}`);
    res.json(db.blog[index]);
  });

  app.delete('/api/blog/:id', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    if (!db.blog) db.blog = [];
    const post = db.blog.find((b: any) => b.id === req.params.id);
    db.blog = db.blog.filter((b: any) => b.id !== req.params.id);
    saveDb(db);
    logActivity(`Deleted blog article: ${post?.title || req.params.id}`);
    res.json({ success: true });
  });

  // Skills
  app.get('/api/skills', (req: Request, res: Response) => {
    const db = getDb();
    res.json(db.skills);
  });

  app.post('/api/skills', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    const newSkill = {
      id: req.body.id || `skill-${Date.now()}`,
      name: req.body.name || 'New Skill',
      group: req.body.group || 'Development',
      iconName: req.body.iconName || 'Code2',
      order: db.skills.length + 1
    };
    db.skills.push(newSkill);
    saveDb(db);
    logActivity(`Added skill: ${newSkill.name}`);
    res.status(201).json(newSkill);
  });

  app.put('/api/skills/:id', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    const index = db.skills.findIndex((s: any) => s.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    db.skills[index] = { ...db.skills[index], ...req.body };
    saveDb(db);
    logActivity(`Updated skill: ${db.skills[index].name}`);
    res.json(db.skills[index]);
  });

  app.delete('/api/skills/:id', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    const skill = db.skills.find((s: any) => s.id === req.params.id);
    db.skills = db.skills.filter((s: any) => s.id !== req.params.id);
    saveDb(db);
    logActivity(`Deleted skill: ${skill?.name || req.params.id}`);
    res.json({ success: true });
  });

  // Journey
  app.get('/api/journey', (req: Request, res: Response) => {
    const db = getDb();
    res.json(db.journey);
  });

  app.post('/api/journey', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    const newJourney = {
      id: req.body.id || `journey-${Date.now()}`,
      year: req.body.year || '2026',
      title: req.body.title || 'Milestone',
      institution: req.body.institution || '',
      description: req.body.description || '',
      order: db.journey.length + 1
    };
    db.journey.push(newJourney);
    saveDb(db);
    logActivity(`Added journey entry: ${newJourney.title}`);
    res.status(201).json(newJourney);
  });

  app.put('/api/journey/:id', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    const index = db.journey.findIndex((j: any) => j.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Journey item not found' });
    }
    db.journey[index] = { ...db.journey[index], ...req.body };
    saveDb(db);
    logActivity(`Updated journey entry: ${db.journey[index].title}`);
    res.json(db.journey[index]);
  });

  app.delete('/api/journey/:id', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    const item = db.journey.find((j: any) => j.id === req.params.id);
    db.journey = db.journey.filter((j: any) => j.id !== req.params.id);
    saveDb(db);
    logActivity(`Deleted journey entry: ${item?.title || req.params.id}`);
    res.json({ success: true });
  });

  // Stats
  app.get('/api/stats', (req: Request, res: Response) => {
    const db = getDb();
    res.json(db.stats);
  });

  app.put('/api/stats', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    if (Array.isArray(req.body)) {
      db.stats = req.body;
      saveDb(db);
      logActivity('Updated site stats');
      return res.json(db.stats);
    }
    res.status(400).json({ error: 'Array of stats expected' });
  });

  // Social Links
  app.get('/api/socials', (req: Request, res: Response) => {
    const db = getDb();
    res.json(db.socials);
  });

  app.put('/api/socials', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    if (Array.isArray(req.body)) {
      db.socials = req.body;
      saveDb(db);
      logActivity('Updated social links');
      return res.json(db.socials);
    }
    res.status(400).json({ error: 'Array of social links expected' });
  });

  // Contact Messages
  app.post('/api/messages', (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    const db = getDb();
    const newMessage = {
      id: `msg-${Date.now()}`,
      name: String(name).slice(0, 100),
      email: String(email).slice(0, 150),
      subject: String(subject || 'Portfolio Inquiry').slice(0, 200),
      message: String(message).slice(0, 2000),
      read: false,
      createdAt: new Date().toISOString()
    };
    db.messages.unshift(newMessage);
    saveDb(db);
    logActivity(`New message received from: ${newMessage.name}`);
    res.status(201).json({ success: true, message: 'Message sent successfully! Thank you.' });
  });

  app.get('/api/messages', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    res.json(db.messages);
  });

  app.put('/api/messages/:id/read', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    const msg = db.messages.find((m: any) => m.id === req.params.id);
    if (!msg) {
      return res.status(404).json({ error: 'Message not found' });
    }
    msg.read = true;
    saveDb(db);
    res.json(msg);
  });

  app.delete('/api/messages/:id', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    db.messages = db.messages.filter((m: any) => m.id !== req.params.id);
    saveDb(db);
    logActivity(`Deleted message: ${req.params.id}`);
    res.json({ success: true });
  });

  // Settings
  app.get('/api/settings', (req: Request, res: Response) => {
    const db = getDb();
    res.json(db.settings);
  });

  app.put('/api/settings', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    const updated = { ...db.settings, ...req.body };
    if (req.body.whatsappNumber !== undefined) {
      updated.whatsappNumber = req.body.whatsappNumber;
      updated.whatsAppNumber = req.body.whatsappNumber;
    } else if (req.body.whatsAppNumber !== undefined) {
      updated.whatsappNumber = req.body.whatsAppNumber;
      updated.whatsAppNumber = req.body.whatsAppNumber;
    }
    db.settings = updated;
    saveDb(db);
    logActivity('Updated site settings');
    res.json(db.settings);
  });

  // About Pillars / Cards
  app.get('/api/about-cards', (req: Request, res: Response) => {
    const db = getDb();
    res.json(db.aboutCards || []);
  });

  app.put('/api/about-cards', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    if (Array.isArray(req.body)) {
      db.aboutCards = req.body;
      saveDb(db);
      logActivity('Updated about pillars & cards');
      return res.json(db.aboutCards);
    }
    res.status(400).json({ error: 'Array of about cards expected' });
  });

  // Full Database Sync (Single Atomic Transaction)
  app.post('/api/admin/sync-all', requireAdmin, (req: Request, res: Response) => {
    try {
      const db = getDb();
      const payload = req.body;
      if (!payload || typeof payload !== 'object') {
        return res.status(400).json({ error: 'Invalid database payload' });
      }

      if (payload.profile) db.profile = { ...db.profile, ...payload.profile };
      if (Array.isArray(payload.aboutCards)) db.aboutCards = payload.aboutCards;
      if (Array.isArray(payload.projects)) db.projects = payload.projects;
      if (Array.isArray(payload.photography)) db.photography = payload.photography;
      if (Array.isArray(payload.blog)) db.blog = payload.blog;
      if (Array.isArray(payload.skills)) db.skills = payload.skills;
      if (Array.isArray(payload.journey)) db.journey = payload.journey;
      if (Array.isArray(payload.stats)) db.stats = payload.stats;
      if (Array.isArray(payload.socials)) db.socials = payload.socials;
      if (payload.settings) {
        const s = { ...db.settings, ...payload.settings };
        if (payload.settings.whatsappNumber !== undefined) {
          s.whatsappNumber = payload.settings.whatsappNumber;
          s.whatsAppNumber = payload.settings.whatsappNumber;
        } else if (payload.settings.whatsAppNumber !== undefined) {
          s.whatsappNumber = payload.settings.whatsAppNumber;
          s.whatsAppNumber = payload.settings.whatsAppNumber;
        }
        db.settings = s;
      }

      saveDb(db);
      logActivity('Full database synchronization performed');
      res.json({ success: true, message: 'All site data synchronized and saved permanently.' });
    } catch (err: any) {
      console.error("Sync error:", err);
      res.status(500).json({ error: 'Failed to synchronize database: ' + (err.message || 'Unknown error') });
    }
  });

  // Admin Export Database JSON
  app.get('/api/admin/export', requireAdmin, (req: Request, res: Response) => {
    const db = getDb();
    res.setHeader('Content-Disposition', `attachment; filename="hayyan-portfolio-backup-${new Date().toISOString().split('T')[0]}.json"`);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(db, null, 2));
  });

  // Admin Import Database JSON
  app.post('/api/admin/import', requireAdmin, (req: Request, res: Response) => {
    try {
      const imported = req.body;
      if (!imported || typeof imported !== 'object' || !imported.profile) {
        return res.status(400).json({ error: 'Invalid backup format: profile data missing' });
      }
      const db = getDb();
      if (imported.profile) db.profile = imported.profile;
      if (Array.isArray(imported.aboutCards)) db.aboutCards = imported.aboutCards;
      if (Array.isArray(imported.projects)) db.projects = imported.projects;
      if (Array.isArray(imported.photography)) db.photography = imported.photography;
      if (Array.isArray(imported.blog)) db.blog = imported.blog;
      if (Array.isArray(imported.skills)) db.skills = imported.skills;
      if (Array.isArray(imported.journey)) db.journey = imported.journey;
      if (Array.isArray(imported.stats)) db.stats = imported.stats;
      if (Array.isArray(imported.socials)) db.socials = imported.socials;
      if (imported.settings) db.settings = imported.settings;

      saveDb(db);
      logActivity('Restored database from JSON backup file');
      res.json({ success: true, message: 'Portfolio successfully restored from backup.' });
    } catch (err: any) {
      console.error("Import error:", err);
      res.status(500).json({ error: 'Failed to import backup: ' + (err.message || 'Invalid format') });
    }
  });

  // Admin Image Upload Endpoint (stores images in /public/uploads/)
  app.post('/api/upload', requireAdmin, (req: Request, res: Response) => {
    try {
      const { image, name } = req.body;
      if (!image || typeof image !== 'string') {
        return res.status(400).json({ error: 'Valid image string is required' });
      }

      let base64Data = image;
      let ext = 'jpg';

      const match = image.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      if (match) {
        ext = match[1].toLowerCase() === 'jpeg' ? 'jpg' : match[1].toLowerCase();
        if (ext.includes('svg')) ext = 'svg';
        else if (ext.includes('png')) ext = 'png';
        else if (ext.includes('webp')) ext = 'webp';
        else ext = 'jpg';
        base64Data = match[2];
      }

      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const cleanName = (name || 'image')
        .replace(/[^a-zA-Z0-9_-]/g, '_')
        .slice(0, 30);
      const filename = `${cleanName}-${Date.now()}.${ext}`;
      const filePath = path.join(uploadsDir, filename);

      fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

      const publicUrl = `/uploads/${filename}`;
      logActivity(`Uploaded image: ${filename}`);
      return res.json({ success: true, url: publicUrl, filename });
    } catch (err: any) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'Failed to save image: ' + (err.message || 'Unknown error') });
    }
  });

  // SEO: Sitemap & Robots endpoints
  app.get('/robots.txt', (req: Request, res: Response) => {
    const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      res.type('text/plain');
      return res.sendFile(robotsPath);
    }
    res.type('text/plain').send("User-agent: *\nAllow: /\n\nSitemap: https://7yyanmo7.ai.studio/sitemap.xml\n");
  });

  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      res.type('application/xml');
      return res.sendFile(sitemapPath);
    }
    res.status(404).send('Sitemap not found');
  });

  // Serve public assets directly
  app.use(express.static(path.join(process.cwd(), 'public')));

  // --- VITE MIDDLEWARE SETUP ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hayyan Mohamed Portfolio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
