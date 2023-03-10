yarn build
Write-Output 'Uploading build to server'
scp -r -P 22022 build/* root@agenciaboz.com.br:/home/sbop/sistema/
ssh -p 22022 root@agenciaboz.com.br "chown -R sbop:sbop /home/sbop/sistema/*"