# CI/CD Pipeline with Jenkins for Deploying a 3-Tier Application on Kubernetes and AWS EC2  

This project demonstrates how to set up a CI/CD pipeline using Jenkins to deploy a 3-tier application (React.js frontend, Spring Boot backend, and PostgreSQL database) to a Kubernetes cluster hosted on AWS EC2.  

## Tech Stack  
- **Back-End:** Spring Boot  
- **Database:** PostgreSQL  
- **Front-End:** React.js  

## Features  
- Automated CI/CD pipeline using Jenkins.  
- Application containerized using Docker.  
- Deployment to Kubernetes cluster on AWS EC2.  
- Webhook integration for continuous delivery.  

## Prerequisites  
1. **AWS Account** 
2. **Jenkins Setup**
3. **Docker Hub Account**
4. **Kubernetes Cluster (Hosted on an EC2 instance)** 

## How to Set Up and Run the Project  

### Step 1: Fork the Repository  
- Fork this GitHub repository to your account.  

### Step 2: Create the Jenkins Master Node  
1. Launch an **AWS EC2 instance** (e.g., `t2.small`, Ubuntu 24.04, 20 GB storage).  
2. Install Jenkins and configure it as the master node.  

### Step 3: Create a Kubernetes Cluster Node  
1. Launch a second **AWS EC2 instance** (e.g., `t2.medium`, Ubuntu 24.04, 20 GB storage).  
2. Install the following on this instance:  
   - Java (JDK 21)
   - Docker  
   - Kubernetes (kubectl and Kind/Kubeadm/K3s/K3D)  
3. Add this EC2 instance as a Jenkins worker node.  

### Step 4: Integrate GitHub Repository with Jenkins  
1. Create a pipeline job in Jenkins and link it to your GitHub repository.  
2. Add a webhook to your GitHub repository to trigger builds on code pushes.  

### Step 5: Configure Jenkins Pipeline  
1. In the pipeline configuration:  
   - Build the Spring Boot application to generate a JAR file.  
   - Containerize the application using Docker.  
   - Push the Docker image to Docker Hub.  
   - Deploy the application to the Kubernetes cluster.  

### Step 6: Test and Verify  
- Push changes to the `main` branch of the repository.  
- Verify that the pipeline triggers and successfully deploys the application to the Kubernetes cluster.  

## Project Highlights  
- **Jenkins Master Node:** Runs on an AWS EC2 instance to orchestrate the CI/CD process.  
- **Webhook Integration:** Automatically triggers Jenkins builds on GitHub code pushes.  
- **Dockerized Application:** The backend is containerized and stored in Docker Hub.  
- **Kubernetes Deployment:** Application is deployed to a Kubernetes cluster running on AWS EC2.  

## Additional Resources  
- [Jenkins Documentation](https://www.jenkins.io/doc/)  
- [Docker Documentation](https://docs.docker.com/)  
- [Kubernetes Documentation](https://kubernetes.io/docs/)  
