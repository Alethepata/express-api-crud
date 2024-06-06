const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createSlug = require('../utils/getSlug.js');

const index = async (req, res) => {
    
    try {
        const where = {};
    
        const { published } = req.query;

        if (published) where.published = published === "true";
    
        const posts = await prisma.post.findMany({ where });
        
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json('Errore server')
    }
}

const show = async (req, res) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                slug: req.params.slug
            }
        })
        if (!post) {
            return res.status(404).json('non trovato');
        }
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json('Errore server')
    }

}
const create = async (req, res) => {
    try {
        const { title, image, content, published } = req.body;
    
        const posts = await prisma.post.findMany();
    
        const data = {
            title,
            slug:createSlug(title, posts),
            image,
            content,
            published: Boolean(published)
    
        }
        const post = await prisma.post.create({data});
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json('dati non inseriti correttamente')
    }
}
const update = (req, res) => {

}
const destroy = (req, res) => {

}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}