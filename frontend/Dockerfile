# Usa l'immagine di base di Node.js 20.12.2
FROM node:lts-alpine AS builder

# Imposta la directory di lavoro nel container
WORKDIR /usr/src/ionic-app

# Copia il package.json e il package-lock.json (se presente)
COPY package*.json ./

# Installa Ionic CLI globalmente
RUN npm i -g @ionic/cli

# Installa le dipendenze del progetto
RUN npm install

# Copia i file del progetto nella directory di lavoro del container
COPY . .

# Copia il package.json e il package-lock.json (se presente)
COPY package*.json ./

# Espone la porta per il server di sviluppo Ionic
EXPOSE 5173

# Comando di avvio del server di sviluppo Ionic
# CMD ["ionic", "serve", "--external", "--poll", "200", "--host=0.0.0.0", "--port=8100"]
CMD ["npm", "run", "devhost", "--", "--host=0.0.0.0"]