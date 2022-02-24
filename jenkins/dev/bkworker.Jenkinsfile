#!groovy

pipeline {
  agent {
    label ('bnb-onBuild')
  }
  options { timestamps () }
  stages {
    stage('Clone') {
      steps {
        checkout scm
      }
    }

    stage('Init') {
      steps {
        script {
          sh '''
          echo GIT_BRANCH: ${GIT_BRANCH} >> build_info.md
          echo GIT_COMMIT: ${GIT_COMMIT} >> build_info.md
          echo GIT_AUTHOR_NAME: ${GIT_AUTHOR_NAME} >> build_info.md
          echo BUILD_URL: ${BUILD_URL} >> build_info.md
          echo NODE_NAME: ${NODE_NAME} >> build_info.md
          echo BUILD_TIME: ${IMAGE_BUILD_TIMESTAMP} >> build_info.md
          echo IMAGE_TAG: ${IMAGE_TAG} >> build_info.md
          echo BKW_URL: ${notification}:${IMAGE_TAG}  >> build_info.md
          cat build_info.md > aspnet-core/build_info.md
'''
        }
      }
    }

    stage('Init AWS') {
      steps {
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding',
                accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                credentialsId: 'bnb_developer_aws',
                secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
            sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ECR_REPO}"
                }
      }
    }

    stage('Phase-1') {
      parallel {
          stage('Background Worker') {
            stages {
              stage('Build') {
                steps {
                  script {
                    sh "docker build -t ${BKW_IMAGE_NAME}:${IMAGE_TAG} \
                      -f aspnet-core/BKW.Dockerfile ./aspnet-core "
                  }
                }
              }

              stage('Publish') {
                steps {
                  script{
                    sh "docker tag ${BKW_IMAGE_NAME}:${IMAGE_TAG} ${BKW_URL}:${IMAGE_TAG}"
                    sh "docker push ${BKW_URL}:${IMAGE_TAG}"
                  }
                }
              }
            }
          }
      }

    }

     stage('Cleanup') {
      steps {
        sh "docker rmi ${BKW_URL}:${IMAGE_TAG}"
      }
    }
  }

  environment {
    AWS_ACCOUNT_ID = '989660349111'
    AWS_DEFAULT_REGION = 'us-east-1'
    IMAGE_TAG = "dev"
    AWS_ECR_REPO = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
    IMAGE_BUILD_TIMESTAMP = (new Date()).format('EEE, MMMM dd,yy hh:mm:ss a')
    BKW_IMAGE_NAME = 'bnb-bkworker'
    BKW_URL = "${AWS_ECR_REPO}/${BKW_IMAGE_NAME}"
  }
}
