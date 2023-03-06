pipeline {
    agent any
    stages {
        stage('SonarQube analysis') {
            steps {
                withSonarQubeEnv('DPSonar') {
                    sh '''
                        /var/jenkins_home/tools/hudson.plugins.sonar.SonarRunnerInstallation/DPSonar/bin/sonar-scanner \
                        -D sonar.projectKey=todo-app-vue \
                        -D sonar.projectName=todo-app-vue \
                        -D sonar.sources=./src \
                    '''
                }
            }
        }
     }
}
