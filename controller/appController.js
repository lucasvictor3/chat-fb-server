const express = require('express')

const News = require('../models/news');

const router = express.Router();


function checkIfContainsError(err, res) {
	if(err) {
		console.log(err);
		res.send('database error');
		return true
	}
	return false
}

async function getCollectionFromDb(res) {
	const news = []
	await News.find((err, result) => {
		if(checkIfContainsError(err, res)) { 
			return;
		}
		for (var i in result){
			news.push(result[i]);	
		}
		})
		
	return news;
	}
	
async function getElementFromDb(res, id) {
		var element = {};
		
		await News.find((err, result) => {
			
		if(checkIfContainsError(err, res)) { 
			return;
			}
			
		for (var i in result) {
			if(result[i].newsId == id) {
				element = result[i];
				}
			}
		})
		return element;

}
	
router.get('/getID/:id', async (req, res) => {
	try{

		if (req.params.id == undefined || req.params.id < 0) {
				res.status(403).send({error: 'id not defined'})
		}
		
		var element = await getElementFromDb(res, req.params.id);
		
		if(element !== {}) {
		return res.send(element);
			}
	
		return res.status(404).send({error: 'not found on database'})
		
		} catch (err) {
		console.log(err);
		return res.status(400).send({error: 'error on database', message: err})
		
	}
})

router.get('/', async (req, res) => {
	try {
		//News.collection.drop();
		
		const allNews = await getCollectionFromDb(res);
		await console.log(allNews)
		return res.send(allNews);
	} catch( err) {
		
		console.log(err);
		return res.status(400).send({error: 'Get failed', log: err})
		}
	})
		

router.post('/register', async (req, res) => {
	try {
		const news = await News.create(req.body);
		return res.send({ news })
	} catch( err) {
		console.log(err);
		return res.status(400).send({error: 'Registration failed', log: err})
	}
	
})

router.post('/update', async (req, res) => {
	try {
	if (req.body.newsId == undefined || req.body.newsId < 0) {
			res.status(403).send({error: 'id not defined'})
	}
	
	await News.remove({ newsId: req.body.newsId}, (err) => {
		if( err) {
			return res.status(404).send({error: 'not found on database'})
			}
			
		})
	
	const news = await News.create(req.body);
	return res.send({ news })
	
	} catch (err) {
		return res.status(400).send({error: 'error on database', message: err})
	}
	
	})

router.delete('/delete-news/:id', async (req, res) => {
	try{
	if (req.params.id == undefined || req.params.id < 0) {
			res.status(403).send({error: 'id not defined'})
	}
	
	News.remove({ newsId: req.params.id}, (err) => {
		if( err) {
			console.log(err);
			}
			
		})
	res.send(200);
	
	} catch (err) {
			return res.status(400).send({error: 'Registration failed', log: err})
		}
	})



module.exports = app => app.use('/auth', router); 
