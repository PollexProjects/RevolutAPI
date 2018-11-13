pipeline {
  agent any
  stages {
    stage('Update npm') {
      steps {
        nodejs('nodejs_latest') {
          sh 'npm install'
        }

      }
    }
    stage('Run Mocha tests') {
      steps {
        nodejs('nodejs_latest') {
          sh 'npm run test'
        }

      }
    }
  }
}