FROM cypress/browsers:node-22.17.1-chrome-138.0.7204.157-1-ff-140.0.4-edge-138.0.3351.83-1

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy Cypress tests and configuration
COPY cypress.config.js ./
COPY cypress.env.json ./
COPY cypress ./cypress
COPY tsconfig.json ./

# Define the command to run tests
ENTRYPOINT ["npm", "run", "cy:run"]