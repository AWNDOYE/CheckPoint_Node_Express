const express = require('express');
const app = express();
const path = require('path');
const port = 5000;

//Vérification disponibilté application
const verifierJourHeure = function (req,res,next) {
    const dateDuJour = new Date(); //Récupération de la date du jour
    const myHour = dateDuJour.getHours(); //Récupération de l'heure actuelle via la date du jour
    const myDay = dateDuJour.getDay(); //Récupération du jour via la date du jour
    if (myDay >=  1 && myDay <= 5 && myHour >=9 && myHour <=17) {
      next();
    }else {
      res.send("L'application est indisponible.")
    }
}
app.use(verifierJourHeure)

// Configuration du moteur de template EJS
app.set('view engine','ejs')
app.set('views', path.join(__dirname,'views'))

//Changement du titre de la page
app.use((req, res, next) => {
  res.locals.menu = {
    items: [
      { title: 'Accueil', url: '/' },
      { title: 'Nos Services', url: '/services' },
      { title: 'Nous Contacter', url: '/contact' }
    ]
  };
  next();
});

//Définition des routes
app.get('/', (req, res) => {
  res.render('accueil');
});
app.get('/services', (req, res) => {
  res.render('services');
});
app.get('/contact',(req, res)=>{
  res.render('contact')
})

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
  });