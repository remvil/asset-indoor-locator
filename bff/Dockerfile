# Usa l'immagine di base di Node.js 20.12.2
FROM node:lts-alpine AS builder

# Imposta la directory di lavoro nel container
WORKDIR /usr/bff-app

# Copia il package.json e il package-lock.json (se presente)
COPY package.json ./

# Installa nodemon globalmente
# RUN npm install -g typescript ts-node nodemon

# Installa le dipendenze del progetto
RUN npm install


# Copia i file del progetto nella directory di lavoro del container
COPY . .

# Comando di avvio del backend con nodemon
CMD ["npm", "run", "dev"]