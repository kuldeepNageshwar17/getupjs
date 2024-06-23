
# getupjs

`getupjs` is a CLI tool that scaffolds a new React project with Vite, Jest, and an Azure DevOps CI/CD pipeline configuration. This tool aims to streamline the setup process for developers, providing a ready-to-use environment for developing, testing, and deploying React applications on azure devops.

## Features

- **React with Vite**: Fast setup with Vite for a modern development experience.
- **Testing**: Jest for unit testing.
- **CI/CD**: Pre-configured Azure DevOps pipeline for continuous integration and deployment.
- **Cross-Platform**: Works on macOS, Windows, and Linux.

## Prerequisites

- Node.js (>= 16.x)
- npm (>= 7.x)
- Git
- Azure DevOps account

## Installation

To install the `getupjs` CLI tool globally, clone this repository and link the package globally:

```bash
git clone https://github.com/your-username/getupjs.git
cd getupjs
npm install
npm link
```

## Usage
To create a new React project, run:
```bash
getupjs my-new-project
```
Replace my-new-project with your desired project name. This will create a new directory with the project setup and ready to use.

## Project Structure
```bash
my-new-project
├── .azure-pipelines
│   └── azure-pipelines.yml
├── node_modules
├── src
│   ├── __tests__
│   │   └── App.test.jsx
│   ├── App.jsx
│   └── main.jsx
├── .babelrc
├── index.html
├── jest.config.js
├── package.json
├── setupTests.js
└── vite.config.js
```

## Available Scripts

In the project directory, you can run:

npm start: Runs the app in development mode using Vite.
npm run build: Builds the app for production.
npm run serve: Serves the built app for preview.
npm test: Runs the test suite with Jest.


## Azure DevOps CI/CD Pipeline

### Setup CI/CD
  Create an Azure DevOps Project:
   - Go to Azure DevOps and create a new project.
   - Push your project repository to Azure DevOps.
    
  Configure Pipeline:
   - Navigate to Pipelines > Create Pipeline.
   - Select your repository and choose "Existing Azure Pipelines YAML file".
   - Set the path to .azure-pipelines/azure-pipelines.yml.
    
  Run the Pipeline:
   - Queue a new run to start the CI/CD process.

## Future Enhancements
 - Deployment: Integrate with Azure Static Web Apps or Azure App Service for automatic deployments.
 - Linting: Add ESLint and Prettier for code quality and formatting.
 - Advanced Testing: Set up integration and end-to-end testing with Cypress.
 - Environment Management: Add support for multiple environments (development, staging, production).

## Hosting
  ### Azure Static Web Apps
  1. Create a Static Web App:
   - Navigate to Azure Portal > Create a resource > Static Web App.
   - Fill in the required details and link your GitHub repository.
  2. Configure Build and Deployment:
   - Update your pipeline configuration to build and deploy the app to Azure Static Web Apps

## Azure App Service
1. Create an App Service:

 - Navigate to Azure Portal > Create a resource > App Service.
 - Choose the appropriate settings for your app.
2. Deploy:
 - Use the App Service extension in Azure DevOps to deploy your application from the build artifacts.

## Contributing
  Contributions are welcome! Please feel free to submit a Pull Request or open an issue to discuss improvements.
  
## License
  This project is licensed under the MIT License.

## Acknowledgments
 - Inspired by create-react-app and Vite's project templates.
 - Thanks to the open-source community for the tools and libraries used in this project.





  
### Explanation

- **Installation**: Instructions for installing the CLI tool globally.
- **Usage**: How to use the tool to create a new project.
- **Project Structure**: Description of the generated project structure.
- **Available Scripts**: Explanation of npm scripts provided in the generated project.
- **Azure DevOps CI/CD Pipeline**: Instructions for setting up the CI/CD pipeline on Azure DevOps.
- **Future Enhancements**: Ideas for future improvements.
- **Hosting**: Basic steps for hosting the application on Azure.
- **Contributing**: Information on how to contribute to the project.
- **License**: License information.
- **Acknowledgments**: Credits and acknowledgments.
- 
