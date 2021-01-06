# NodeJS Dynamic DNS for OVH

NDDFO est juste un script écrit en NodeJS permettant d’actualiser une zone DNS chez ovh en fonction de votre adresse ip.
J’ai écrit ce script pour résoudre l’impossibilité d’ajouter un wildcard à un DynHost chez OVH.


## Le Projet

Le projet utilise l'API de OVH et fonctionne en NodeJS avec npm pour les dépendances.


## Déploiement
### Obtenir un token chez OVH
- Remplissez ce formulaire https://eu.api.ovh.com/createToken/
	- Dans script name et Script description mettre ``NDDFO``
	- Dans validity sélectionnez ``Unlimited``
	- Il faut deux Droits 'Rights' 
		- GET ``/domain/*``
		- PUT ``/domain/*``
	- Il ne reste plus qu'a cliquer sur Create keys et garder cette page de coté.

### Installer le script sur votre serveur
- Cloner le repo git sur votre serveur.
``git clone https://git.mygoz.com/gjudic/myDNS.git``

- Installer les dépendances avec npm
``npm install``
> **Note:** npm et NodeJs doivent-êtres installés

- Créer un fichier **.env** à la racine du dossier.

		APP_KEY=XXXXXXXXXXXX
		APP_SECRET=XXXXXXXXXX
		CONSUMER_KEY=XXXXXXXX
		DOMAINS=[{"domain": "domain.tld", "id": "REMPLACEMOI"}, {"domain": "domain.tld", "id": "REMPLACEMOI"}]
> **Note:** Cet exemple fonctionne avec deux noms de domaines à gèrer, modifiez le tableau dans DOMAINS à votre guise.
 - Remplissez le **.env** avec les informations récupérées plus haut et avec vos domaines.
 - Sur le manager OVH créez une zone dns de type A pour votre nom de domaine qui pointe vers 0.0.0.0, et récupérez via les outils de développement de votre navigateur l'id de la zone.
 >Pour cela, une fois votre créée, lancez l'onglet network de vos outils de développement et clichez sur refresh dans le manager. Cliquez ensuite dans votre panneau network sur la requête correspondante elle commence par ``records?records``, puis faites un CTFL+F de 0.0.0.0 dans l'onglet Response pour trouver l'ID correspondant, il s'agit du plus proche à droite de 0.0.0.0.

- Normalement tout est bon, vous pouvez tester votre script avec ``node myDNS.js``
- Il ne restera plus qu'a automatiser le changement de DNS je vous conseil d'utiliser CRON
``crontab -e``
et ajoutez en fin de fichier
``*/15 * * * * cd /root/myDNS/ && /bin/node myDNS.js``
>En remplaçant /root/myDNS par votre dossier racine
- Sans oublier ``systemctl restart cron`` pour actualiser la crontab.