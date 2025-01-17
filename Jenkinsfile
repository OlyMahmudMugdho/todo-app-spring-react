pipeline {
    agent {
        label 'kubernetes-server' // Use the agent named 'kubernetes-server'
    }

    environment {
        DOCKER_IMAGE_NAME = "olymahmudmugdho/todo-app-spring-react"
        KUBERNETES_MANIFESTS_DIR = "k8s"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/OlyMahmudMugdho/todo-app-spring-react.git'
            }
        }

        stage('Start the postgres docker image') {
            steps {
                sh '''
                docker-compose up -d
                '''
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', 
                                                usernameVariable: 'DOCKER_USERNAME', 
                                                passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    '''
                }
            }
        }


        stage('Make the jar file') {
            steps { 
                dir('todo-app-backend') {
                    sh '''
                    export DATABASE_URL="jdbc:postgresql://localhost:5432/postgres" && export DATABASE_USERNAME=postgres && export DATABASE_PASSWORD=mysecretpassword && ./mvnw clean install
                    '''
                }
            }
        }


        stage('Build Backend Docker Image') {
            steps {
                dir('todo-app-backend') {
                    sh '''
                    docker build -t ${DOCKER_IMAGE_NAME} .
                    '''
                }
            }
        }


        stage('Push Docker Image') {
            steps {
                sh '''
                docker push ${DOCKER_IMAGE_NAME}
                '''
            }
        }


        stage('Apply Kubernetes Manifests') {
            steps {
                dir(KUBERNETES_MANIFESTS_DIR) {
                    sh '''
                    sudo kubectl apply -f namespace.yaml
                    sudo kubectl apply -f config-map.yaml
                    sudo kubectl apply -f secret.yaml
                    sudo kubectl apply -f postgres-statefulset.yaml
                    sudo kubectl apply -f postgres-service.yaml
                    sudo kubectl apply -f app-deployment.yaml
                    sudo kubectl apply -f app-service.yaml
                    sudo kubctl port-forward service/app-service 80:80 -n todo-app
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully! Application is deployed."
        }
        failure {
            echo "Pipeline failed. Check logs for details."
        }
    }
}
