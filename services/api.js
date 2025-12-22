// API endpoints for portfolio data

import express from 'express';
import portfolioData from '../data/portfolioData.js';

const router = express.Router();

// Endpoint to get profile
router.get('/profile', (req, res) => {
    res.json({ success: true, data: portfolioData.profile });
});

// Endpoint to get skills
router.get('/skills', (req, res) => {
    res.json({ success: true, data: portfolioData.skills });
});

// Endpoint to get experience
router.get('/experiences', (req, res) => {
    res.json({ success: true, data: portfolioData.experiences });
});

// Endpoint to get projects
router.get('/projects', (req, res) => {
    res.json({ success: true, data: portfolioData.projects });
});

// Endpoint to get single project
router.get('/projects/:id', (req, res) => {
    const project = portfolioData.projects.find(p => p.id === parseInt(req.params.id));
    if (!project) {
        return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: project });
});

// Endpoint to get socials
router.get('/socials', (req, res) => {
    res.json({ success: true, data: portfolioData.socials });
});

export default router;
