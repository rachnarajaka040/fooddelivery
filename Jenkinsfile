node {
    def appDir = '/var/www/nextjs-app'

    stage('Clean Workspace') {
        deleteDir()
    }



    stage('Deploy to EC2') {
        sh """
            sudo mkdir -p ${appDir}
            sudo chown -R jenkins:jenkins ${appDir}

            rsync -av --delete \
              --exclude='.git' \
              --exclude='node_modules' \
              ./ ${appDir}/

            cd ${appDir}

            npm install
            npm run build

            sudo fuser -k 3000/tcp || true

            nohup npm start > app.log 2>&1 &
        """
    }
}