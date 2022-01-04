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

echo IDV_URL: ${IDV_URL}:${IMAGE_TAG}  >> build_info.md

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


      stage('Client-Portal') {
            stages {
              stage('Build') {
                steps {
                  script {
                    sh "docker build -t ${CLIENT_PORTAL_IMAGE_NAME}:${IMAGE_TAG} \
                      -f angular/Angular.Dockerfile ./angular "
                  }
                }
              }

              stage('Publish') {
                steps {
                  script{
                    sh "docker tag ${CLIENT_PORTAL_IMAGE_NAME}:${IMAGE_TAG} ${CLIENT_PORTAL_URL}:${IMAGE_TAG}"
                    sh "docker push ${CLIENT_PORTAL_URL}:${IMAGE_TAG}"
                  }
                }
              }
            }
          }


          stage('Core-API') {
            stages {
              stage('Build') {
                steps {
                  script {
                    sh "docker build -t ${CORE_IMAGE_NAME}:${IMAGE_TAG} \
                      -f aspnet-core/Core.Dockerfile ./aspnet-core "
                  }
                }
              }

              stage('Publish') {
                steps {
                  script{
                    sh "docker tag ${CORE_IMAGE_NAME}:${IMAGE_TAG} ${CORE_URL}:${IMAGE_TAG}"
                    sh "docker push ${CORE_URL}:${IMAGE_TAG}"
                  }
                }
              }
            }
          }

          stage('Boat-API') {
            stages {
              stage('Build') {
                steps {
                  script {
                    sh "docker build -t ${BOAT_IMAGE_NAME}:${IMAGE_TAG} \
                      -f aspnet-core/Boat.Dockerfile ./aspnet-core "
                  }
                }
              }

              stage('Publish') {
                steps {
                  script{
                    sh "docker tag ${BOAT_IMAGE_NAME}:${IMAGE_TAG} ${BOAT_URL}:${IMAGE_TAG}"
                    sh "docker push ${BOAT_URL}:${IMAGE_TAG}"
                  }
                }
              }
            }
          }


        stage('Booking-API') {
            stages {
              stage('Build') {
                steps {
                  script {
                    sh "docker build -t ${BOOKING_IMAGE_NAME}:${IMAGE_TAG} \
                      -f aspnet-core/Booking.Dockerfile ./aspnet-core "
                  }
                }
              }

              stage('Publish') {
                steps {
                  script{
                    sh "docker tag ${BOOKING_IMAGE_NAME}:${IMAGE_TAG} ${BOOKING_URL}:${IMAGE_TAG}"
                    sh "docker push ${BOOKING_URL}:${IMAGE_TAG}"
                  }
                }
              }
            }
          }

          stage('Chat-API') {
            stages {
              stage('Build') {
                steps {
                  script {
                    sh "docker build -t ${CHAT_IMAGE_NAME}:${IMAGE_TAG} \
                      -f aspnet-core/Chat.Dockerfile ./aspnet-core "
                  }
                }
              }

              stage('Publish') {
                steps {
                  script{
                    sh "docker tag ${CHAT_IMAGE_NAME}:${IMAGE_TAG} ${CHAT_URL}:${IMAGE_TAG}"
                    sh "docker push ${CHAT_URL}:${IMAGE_TAG}"
                  }
                }
              }
            }
          }


          stage('Notification-API') {
            stages {
              stage('Build') {
                steps {
                  script {
                    sh "docker build -t ${NOTIFICATION_IMAGE_NAME}:${IMAGE_TAG} \
                      -f aspnet-core/Notification.Dockerfile ./aspnet-core "
                  }
                }
              }

              stage('Publish') {
                steps {
                  script{
                    sh "docker tag ${NOTIFICATION_IMAGE_NAME}:${IMAGE_TAG} ${NOTIFICATION_URL}:${IMAGE_TAG}"
                    sh "docker push ${NOTIFICATION_URL}:${IMAGE_TAG}"
                  }
                }
              }
            }
          }

          stage('Payment-API') {
            stages {
              stage('Build') {
                steps {
                  script {
                    sh "docker build -t ${PAYMENT_IMAGE_NAME}:${IMAGE_TAG} \
                      -f aspnet-core/Payment.Dockerfile ./aspnet-core "
                  }
                }
              }

              stage('Publish') {
                steps {
                  script{
                    sh "docker tag ${PAYMENT_IMAGE_NAME}:${IMAGE_TAG} ${PAYMENT_URL}:${IMAGE_TAG}"
                    sh "docker push ${PAYMENT_URL}:${IMAGE_TAG}"
                  }
                }
              }
            }
          }

          stage('IDV-API') {
            stages {
              stage('Build') {
                steps {
                  script {
                    sh "docker build -t ${IDV_IMAGE_NAME}:${IMAGE_TAG} \
                      -f aspnet-core/IDV.Dockerfile ./aspnet-core "
                  }
                }
              }

              stage('Publish') {
                steps {
                  script{
                    sh "docker tag ${IDV_IMAGE_NAME}:${IMAGE_TAG} ${IDV_URL}:${IMAGE_TAG}"
                    sh "docker push ${IDV_URL}:${IMAGE_TAG}"
                  }
                }
              }
            }
          }
      }

    }
  }

  environment {
    AWS_ACCOUNT_ID = '989660349111'
    AWS_DEFAULT_REGION = 'us-east-1'
    IMAGE_TAG = "dev"
    AWS_ECR_REPO = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
    IMAGE_BUILD_TIMESTAMP = (new Date()).format('EEE, MMMM dd,yy hh:mm:ss a')
    BOAT_IMAGE_NAME = 'bnb-boat'
    BOAT_URL = "${AWS_ECR_REPO}/${BOAT_IMAGE_NAME}"
    BOOKING_IMAGE_NAME = 'bnb-booking'
    BOOKING_URL = "${AWS_ECR_REPO}/${BOOKING_IMAGE_NAME}"
    CHAT_IMAGE_NAME = 'bnb-chat'
    CHAT_URL = "${AWS_ECR_REPO}/${CHAT_IMAGE_NAME}"
    CORE_IMAGE_NAME = 'bnb-core'
    CORE_URL = "${AWS_ECR_REPO}/${CORE_IMAGE_NAME}"
    IDV_IMAGE_NAME = 'idv-server'
    IDV_URL = "${AWS_ECR_REPO}/${IDV_IMAGE_NAME}"
    NOTIFICATION_IMAGE_NAME = 'bnb-notification'
    NOTIFICATION_URL = "${AWS_ECR_REPO}/${NOTIFICATION_IMAGE_NAME}"
    PAYMENT_IMAGE_NAME = 'bnb-payment'
    PAYMENT_URL = "${AWS_ECR_REPO}/${PAYMENT_IMAGE_NAME}"
    CLIENT_PORTAL_IMAGE_NAME = 'bnb_client_portal'
    CLIENT_PORTAL_URL = "${AWS_ECR_REPO}/${CLIENT_PORTAL_IMAGE_NAME}"
  }
}
