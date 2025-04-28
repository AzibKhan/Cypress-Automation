pipeline {
    agent any

    tools {nodejs "node"}

    environment {
        // Define environment variables
        CYPRESS_BASE_URL = 'https://app.pipedrive.com'
        // You can add more environment variables as needed
        DOCKER_IMAGE = 'cypress-tests'
        DOCKER_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from your repository
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // Build the Docker image
                sh 'docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .'
            }
        }
        
        stage('Create Reports Directory') {
            steps {
                // Create directories for reports
                sh '''
                    mkdir -p cypress/reports/mochawesome
                    mkdir -p cypress/reports/mochawesome/.jsons
                    mkdir -p cypress/screenshots
                    mkdir -p cypress/videos
                    chmod -R 777 cypress
                '''
            }
        }
        
        stage('Run Cypress Tests') {
            steps {
                // Run Cypress tests in Docker
                sh '''
                    docker run --rm \
                        -v ${WORKSPACE}/cypress:/e2e/cypress \
                        -e CYPRESS_EMAIL=${CYPRESS_EMAIL} \
                        -e CYPRESS_PASSWORD=${CYPRESS_PASSWORD} \
                        -e CYPRESS_BASE_URL=${CYPRESS_BASE_URL} \
                        ${DOCKER_IMAGE}:${DOCKER_TAG}
                '''
            }
        }
        
        stage('Generate Reports') {
            steps {
                // Generate Mochawesome reports
                sh '''
                    npm run merge:reports || echo "Failed to merge reports"
                    npm run generate:report || echo "Failed to generate report"
                '''
            }
        }
    }
    
    post {
        always {
            // Archive test results and reports
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4,cypress/screenshots/**/*.png,cypress/reports/mochawesome/**/*', allowEmptyArchive: true
            
            // Publish test results
            junit 'cypress/results/*.xml'
        }
        
        success {
            echo 'All tests passed successfully!'
        }
        
        failure {
            echo 'Tests failed. Check the logs for details.'
        }
    }
}