This is an assignment for Aeon Bank - Senior Frontend Engineer role

1. Challenge 1: Landing page with navbar
2. Challenge 2: Login flow
3. Challenge 3: Display transaction data in a table

## Getting started with development

First, install project dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for production

### Build locally

First, run the build

```bash
npm run build
# or
yarn build
# or
pnpm run build
```

Then, run the project

```bash
pnpm start
```

### Build with docker

First, build the docker image

```bash
docker build -t aeon-bank-app .
```

Then, run the docker image

```bash
docker run -p 3000:3000 aeon-bank-app
```
