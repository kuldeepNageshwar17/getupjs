#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("cross-spawn");
const jsonfile = require("jsonfile");

const projectName = process.argv[2];
if (!projectName) {
  console.error("Please provide a project name.");
  process.exit(1);
}

const projectPath = path.resolve(projectName);
const appName = path.basename(projectPath);

const dependencies = ["react", "react-dom"];
const devDependencies = [
  "vite",
  "@vitejs/plugin-react",
  "jest",
  "babel-jest",
  "@babel/preset-env",
  "@babel/preset-react",
  "@testing-library/react",
  "@testing-library/jest-dom",
  "cross-spawn",
  "jsonfile",
];

const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;

const babelConfig = `{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
`;

const jestConfig = `module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};
`;

const setupTests = `import '@testing-library/jest-dom';
`;

const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${appName}</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
`;

const mainJSX = `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
`;

const appJSX = `import React from 'react';

const App = () => {
  return (
    <div>
      <h1>Welcome to ${appName}</h1>
    </div>
  );
};

export default App;
`;

const testJSX = `import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders welcome message', () => {
  render(<App />);
  expect(screen.getByText('Welcome to ${appName}')).toBeInTheDocument();
});
`;

const azurePipelinesYML = `trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: NodeTool@0
  inputs:
    versionSpec: '16.x'
  displayName: 'Install Node.js'

- script: |
    npm install
  displayName: 'Install dependencies'

- script: |
    npm test
  displayName: 'Run tests'

- script: |
    npm run build
  displayName: 'Build project'

- task: CopyFiles@2
  inputs:
    contents: 'dist/**'
    targetFolder: \$(Build.ArtifactStagingDirectory)
  displayName: 'Copy files to artifact staging directory'

- task: PublishBuildArtifacts@1
  inputs:
    pathToPublish: \$(Build.ArtifactStagingDirectory)
    artifactName: 'drop'
  displayName: 'Publish build artifacts'
`;

function runCommand(command, args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", ...options });
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Command failed: ${command} ${args.join(" ")}`));
        return;
      }
      resolve();
    });
  });
}

async function createProject() {
  fs.mkdirSync(projectPath);
  process.chdir(projectPath);

  console.log(`Creating a new React app in ${projectPath}.`);

  await runCommand("npm", ["init", "-y"]);
  await runCommand("npm", ["install", ...dependencies]);
  await runCommand("npm", ["install", "--save-dev", ...devDependencies]);

  fs.writeFileSync(path.join(projectPath, "vite.config.js"), viteConfig);
  fs.writeFileSync(path.join(projectPath, ".babelrc"), babelConfig);
  fs.writeFileSync(path.join(projectPath, "jest.config.js"), jestConfig);
  fs.writeFileSync(path.join(projectPath, "setupTests.js"), setupTests);
  fs.writeFileSync(path.join(projectPath, "index.html"), indexHTML);

  const srcDir = path.join(projectPath, "src");
  fs.mkdirSync(srcDir);

  fs.writeFileSync(path.join(srcDir, "main.jsx"), mainJSX);
  fs.writeFileSync(path.join(srcDir, "App.jsx"), appJSX);

  const testDir = path.join(srcDir, "__tests__");
  fs.mkdirSync(testDir);

  fs.writeFileSync(path.join(testDir, "App.test.jsx"), testJSX);

  const azurePipelinesDir = path.join(projectPath, ".azure-pipelines");
  fs.mkdirSync(azurePipelinesDir);
  fs.writeFileSync(
    path.join(azurePipelinesDir, "azure-pipelines.yml"),
    azurePipelinesYML
  );

  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJson = jsonfile.readFileSync(packageJsonPath);
  packageJson.scripts = {
    start: "vite",
    build: "vite build",
    serve: "vite preview",
    test: "jest",
  };
  jsonfile.writeFileSync(packageJsonPath, packageJson, { spaces: 2 });

  await runCommand("git", ["init"]);
  await runCommand("git", ["add", "."]);
  await runCommand("git", ["commit", "-m", "Initial commit"]);

  console.log("Project setup complete.");
  console.log(
    `Navigate to the ${projectName} directory and run 'npm start' to start the development server.`
  );
  console.log(
    `Push the repository to your remote and set up an Azure DevOps project to use the .azure-pipelines/azure-pipelines.yml for CI/CD.`
  );
}

createProject().catch((error) => {
  console.error(error);
  process.exit(1);
});
