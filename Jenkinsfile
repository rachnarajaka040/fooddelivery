node {
    def appDir = '/var/www/nextjs-app'

    stage('Clean Workspace') {
        deleteDir()
    }

    stage('Clone Repo') {
        git branch: 'main', url: 'https://github.com/rachnarajaka040/fooddelivery.git'
    }


    stage('Deploy') {
        // Yeh line ensure karegi ki Jenkins sahi directory se files uthaye
        dir("${env.WORKSPACE}") {
            sh """
            # Debugging ke liye: dekhne ke liye ki folder me kya files hain
            echo "Current Workspace path: \$(pwd)"
            ls -la

            sudo mkdir -p ${appDir}
            sudo chown -R jenkins:jenkins ${appDir}

            # NOTE: Agar aapka code kisi subfolder me hai, toh niche './' ko './folder-name/' se badle
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
}