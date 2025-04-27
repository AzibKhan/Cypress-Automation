pipeline {
    agent any

    tools {nodejs "node"}

    environment {
        // Define environment variables
        CYPRESS_BASE_URL = 'https://app.pipedrive.com'
        // You can add more environment variables as needed
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from your repository
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Install Node.js dependencies
                sh 'npm ci'
            }
        }
        
        stage('Run Cypress Tests') {
            steps {
                // Run Cypress tests
                sh 'npx cypress run --headless'
            }
        }
        
        stage('Generate Reports') {
            steps {
                // Generate test reports if needed
                // This is optional and depends on your reporting needs
            }
        }
    }
    
    post {
        always {
            // Archive test results and reports
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4,cypress/screenshots/**/*.png', allowEmptyArchive: true
            
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