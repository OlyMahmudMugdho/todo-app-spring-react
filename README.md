**CI/CD Pipeline using Jenkins to Deploy a 3-Tier Application on Kubernetes and AWS EC2!**

- **Back-End:** Spring Boot  
- **Database:** PostgreSQL  
- **Front-End:** React.js  

Project highlights:
- Set up the Jenkins master node on an AWS EC2 instance.
- When code is pushed to the main branch of the Git repository, a webhook triggers the Jenkins master node. 
- Jenkins then builds the JAR file, dockerizes it, and pushes it to the Docker Hub registry on the agent node. 
- Finally, the application is deployed to the Kubernetes cluster on the AWS EC2 instance.
