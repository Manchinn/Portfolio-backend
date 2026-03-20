// API endpoints for portfolio data (Multi-language Support)

import express from 'express';
import portfolioData, { getData } from '../data/portfolioData.js';

const router = express.Router();

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

export default router;
