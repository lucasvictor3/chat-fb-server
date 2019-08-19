const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();

const News = require('./models/news');

const port = 8000;

async function getNewsFromDb(escolha ) {
	var news = [];
	await News.find((err, result) => {
		if(err) {
			console.log(err);
			res.send('database error');
			return;
		}
		for (var i in result){
			
			if(result[i].theme === escolha) {
			const item = {
            title: result[i].title,
            image_url:result[i].image_url,
            subtitle:result[i].sub_title,
            default_action: {
              type: "web_url",
              url: result[i].url
            },
            buttons:[
              {
                type:"web_url",
                url:result[i].url,
                title: "Visitar Website"
              }        
            ]      
          }
          news.push(item);
			}
		}
		
	})	
	return news;
}

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());


require('./controller/appController')(app);

app.listen(process.env.PORT || port, () => {
	
	  console.log('We are live on ' + port);
});

app.get("/", (req, res, next) => {
	console.log('teste ok');
	res.sendStatus(200);
})

app.get("/webhook", (req, res, next) => {
if(req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === 'minhasenha123') {
	console.log('validacao ok');
	res.status(200).send(req.query['hub.challange']);
	
} else {
	console.log('validacao falhou');
	res.sendStatus(403);
}

});

app.post("/testando", async (req, res, next) => {
  
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.testando
      ? req.body.queryResult.parameters.testando
      : "Escolha invalida. Por favor, comece novamente.";
  
	var escolha = await getNewsFromDb(speech);
  
    if (escolha.length === 0){
      return res.json({
		fulfillmentText: 'Escolha novamente. Digite "Oi"',
		speech: 'Escolha novamente.',
		displayText: 'Escolha novamente.',
		source: "webhook-echo-sample"
			})
    }  
  

  
    return res.json(
    {
    payload: speechResponse,
    fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
    })
    
});
