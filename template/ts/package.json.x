`{
  "name": "${project_name}",
  "version": "1.0.0",
  "description": "description of the project",
  "main": "dist/index.js",
  "types": "src/index.ts",
  "dependencies": {
    "napim": "^2.0.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.4",
    "nodemon": "^2.0.2",
    "typescript": "^3.8.3"
  },
  "scripts": {
    "build": "rm -rf dist && tsc",
    "dev": "tsc -w & nodemon -q -w dist dist/index.js",
    "start": "node dist/index.js"
  },
  "author": "",
  "license": "ISC"
}`
