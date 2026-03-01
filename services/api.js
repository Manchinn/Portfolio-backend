// API endpoints for portfolio data (Multi-language Support)

import express from 'express';
import portfolioData, { getData } from '../data/portfolioData.js';

const router = express.Router();

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
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if (!project) {
        return res.status(404).json({ success: false, error: 'Project not found' });
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

// Endpoint to get featured articles
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
        return res.status(404).json({ success: false, error: 'Article not found' });
    }
    res.json({ success: true, data: article });
});

// Endpoint to get all data
router.get('/all', (req, res) => {
    const lang = getLanguage(req);
    const data = getData(lang);
    res.json({ success: true, data });
});

export default router;
