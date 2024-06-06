const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createSlug = require('../utils/getSlug.js');

const index = async (req, res) => {

}

const show = (req, res) => {

}
const create = async (req, res) => {
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
    
    try {
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