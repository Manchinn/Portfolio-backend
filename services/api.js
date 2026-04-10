// API endpoints for portfolio data (Multi-language Support)

import express from 'express';
import portfolioData, { getData } from '../data/portfolioData.js';
import { generateContent } from './claude.js';
import { postToFacebook } from './facebook.js';
import { postToThreads } from './threads.js';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

const router = express.Router();

const CONTENT_DIR = join(process.cwd(), 'data', 'content');
if (!existsSync(CONTENT_DIR)) mkdirSync(CONTENT_DIR, { recursive: true });

// In-memory store for notification read state (Object.create(null) to prevent prototype pollution)
const notificationReadState = Object.create(null);

// In-memory store for todos
const todos = [];
let todoIdCounter = 1;

// Helper to get language from query params or default to 'en'
const getLanguage = (req) => {
    const lang = req.query.lang || req.headers['accept-language'] || 'en';
    return ['en', 'th', 'zh'].includes(lang) ? lang : 'en';
};

// Endpoint to get profile
router.get('/profile', (req, res) => {
    const lang = getLanguage(req);
    const origin = `${req.protocol}://${req.get('host')}`;
    const image = portfolioData.profileCommon.image;
    const resolvedImage = (image && image.startsWith('http'))
        ? image
        : image
            ? `${origin}${image.startsWith('/') ? '' : '/'}${image}`
            : '';

    const profile = getData(lang).profile;

    res.json({
        success: true,
        data: {
            ...profile,
            image: resolvedImage
        }
    });
});

// Endpoint to get skills
router.get('/skills', (req, res) => {
    const lang = getLanguage(req);
    res.json({ success: true, data: getData(lang).skills });
});

// Endpoint to get experience
router.get('/experiences', (req, res) => {
    const lang = getLanguage(req);
    res.json({ success: true, data: getData(lang).experiences });
});

// Endpoint to get projects
router.get('/projects', (req, res) => {
    const lang = getLanguage(req);
    res.json({ success: true, data: getData(lang).projects });
});

// Endpoint to get single project
router.get('/projects/:id', (req, res) => {
    const lang = getLanguage(req);
    const projects = getData(lang).projects;
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' });
    }
    const project = projects.find(p => p.id === id);
    if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
});

// Endpoint to get socials
router.get('/socials', (req, res) => {
    res.json({ success: true, data: portfolioData.socials });
});

// Endpoint to get articles
router.get('/articles', (req, res) => {
    const lang = getLanguage(req);
    const articles = getData(lang).articles;
    // Return featured articles first
    const sorted = [...articles].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.date) - new Date(a.date);
    });
    res.json({ success: true, data: sorted });
});

// Endpoint to get featured articles (must be above /:slug to avoid param capture)
router.get('/articles/featured', (req, res) => {
    const lang = getLanguage(req);
    const articles = getData(lang).articles;
    const featured = articles.filter(a => a.featured);
    res.json({ success: true, data: featured });
});

// Endpoint to get single article
router.get('/articles/:slug', (req, res) => {
    const lang = getLanguage(req);
    const articles = getData(lang).articles;
    const article = articles.find(a => a.slug === req.params.slug);
    if (!article) {
        return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, data: article });
});

// Endpoint to get all data
router.get('/all', (req, res) => {
    const lang = getLanguage(req);
    const data = getData(lang);
    res.json({ success: true, data });
});

// Endpoint to get notifications
router.get('/notifications', (req, res) => {
    try {
        const lang = getLanguage(req);
        const notifications = getData(lang).notifications.map(n => ({
            ...n,
            read: notificationReadState[n.id] !== undefined ? notificationReadState[n.id] : n.read
        }));
        res.json({ success: true, data: notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Endpoint to mark notifications as read
router.post('/notifications/read', (req, res) => {
    try {
        const { ids } = req.body;
        if (!Array.isArray(ids)) {
            return res.status(400).json({ success: false, message: 'Request body must include an ids array' });
        }

        // Validate each id to prevent prototype pollution
        const forbiddenKeys = ['__proto__', 'constructor', 'prototype'];
        const validIds = [];
        for (const id of ids) {
            const idStr = String(id);
            if (forbiddenKeys.includes(idStr)) {
                return res.status(400).json({ success: false, message: `Invalid id value: ${idStr}` });
            }
            if (typeof id === 'number' && (id <= 0 || !Number.isInteger(id))) {
                return res.status(400).json({ success: false, message: 'ids must be positive integers or valid string identifiers' });
            }
            if (typeof id !== 'number' && typeof id !== 'string') {
                return res.status(400).json({ success: false, message: 'Each id must be a number or string' });
            }
            validIds.push(id);
        }

        validIds.forEach(id => { notificationReadState[id] = true; });
        res.json({ success: true, data: { readCount: validIds.length } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Endpoint to get all todos
router.get('/todos', (req, res) => {
    try {
        res.json({ success: true, data: todos });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Endpoint to create a todo
router.post('/todos', (req, res) => {
    try {
        const { title, completed } = req.body;
        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ success: false, message: 'title is required and must be a non-empty string' });
        }
        const todo = {
            id: todoIdCounter++,
            title: title.trim(),
            completed: completed === true ? true : false,
            createdAt: new Date().toISOString()
        };
        todos.push(todo);
        res.json({ success: true, data: todo });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Endpoint to update a todo
router.put('/todos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID' });
        }
        const todo = todos.find(t => t.id === id);
        if (!todo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        const { title, completed } = req.body;
        if (title === undefined && completed === undefined) {
            return res.status(400).json({ success: false, message: 'At least one of title or completed must be provided' });
        }
        if (title !== undefined) {
            if (typeof title !== 'string' || title.trim() === '') {
                return res.status(400).json({ success: false, message: 'title must be a non-empty string' });
            }
            todo.title = title.trim();
        }
        if (completed !== undefined) {
            todo.completed = Boolean(completed);
        }
        res.json({ success: true, data: todo });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Endpoint to delete a todo
router.delete('/todos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID' });
        }
        const index = todos.findIndex(t => t.id === id);
        if (index === -1) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        todos.splice(index, 1);
        res.json({ success: true, data: { deleted: true } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// ============ Content Pipeline Routes ============

// Generate content from article text
router.post('/content/generate', async (req, res) => {
  try {
    const { article, styleGuide } = req.body;
    if (!article) return res.status(400).json({ error: 'article is required' });

    const content = await generateContent(article, styleGuide || '');

    const id = `content-${Date.now()}`;
    const filePath = join(CONTENT_DIR, `${id}.json`);
    const record = { id, created: new Date().toISOString(), status: 'draft', ...content };
    writeFileSync(filePath, JSON.stringify(record, null, 2));

    res.json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List generated content
router.get('/content', (req, res) => {
  if (!existsSync(CONTENT_DIR)) return res.json({ success: true, data: [] });
  const files = readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'));
  const items = files.map(f => JSON.parse(readFileSync(join(CONTENT_DIR, f), 'utf-8')));
  items.sort((a, b) => new Date(b.created) - new Date(a.created));
  res.json({ success: true, data: items });
});

// Get single content
router.get('/content/:id', (req, res) => {
  const filePath = join(CONTENT_DIR, `${req.params.id}.json`);
  if (!existsSync(filePath)) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true, data: JSON.parse(readFileSync(filePath, 'utf-8')) });
});

// Publish to Facebook
router.post('/content/:id/publish/facebook', async (req, res) => {
  try {
    const filePath = join(CONTENT_DIR, `${req.params.id}.json`);
    if (!existsSync(filePath)) return res.status(404).json({ error: 'Not found' });

    const record = JSON.parse(readFileSync(filePath, 'utf-8'));
    const result = await postToFacebook(record.facebook.text, record.facebook.hashtags);

    record.facebook.published = true;
    record.facebook.post_id = result.id;
    record.facebook.post_url = result.url;
    writeFileSync(filePath, JSON.stringify(record, null, 2));

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Publish to Threads
router.post('/content/:id/publish/threads', async (req, res) => {
  try {
    const filePath = join(CONTENT_DIR, `${req.params.id}.json`);
    if (!existsSync(filePath)) return res.status(404).json({ error: 'Not found' });

    const record = JSON.parse(readFileSync(filePath, 'utf-8'));
    const result = await postToThreads(record.threads.text, record.threads.hashtags);

    record.threads.published = true;
    record.threads.post_id = result.id;
    record.threads.post_url = result.url;
    writeFileSync(filePath, JSON.stringify(record, null, 2));

    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Publish to Blog (generate Article object)
router.post('/content/:id/publish/blog', async (req, res) => {
  try {
    const filePath = join(CONTENT_DIR, `${req.params.id}.json`);
    if (!existsSync(filePath)) return res.status(404).json({ error: 'Not found' });

    const record = JSON.parse(readFileSync(filePath, 'utf-8'));
    const blog = record.blog;

    const article = {
      id: Date.now(),
      slug: blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''),
      title: blog.title,
      excerpt: blog.meta_description,
      content: blog.content,
      coverImage: `https://placehold.co/800x400/3b82f6/ffffff?text=${encodeURIComponent(blog.title.slice(0, 20))}`,
      tags: blog.tags,
      category: 'AI & Technology',
      readTime: `${Math.ceil(blog.content.split(/\s+/).length / 200)} min read`,
      date: new Date().toISOString().split('T')[0],
      featured: false,
    };

    record.blog.published = true;
    record.blog.slug = article.slug;
    writeFileSync(filePath, JSON.stringify(record, null, 2));

    res.json({ success: true, data: article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
