yarn build
Write-Output 'Uploading build to server'
scp -r -P 22022 build/* root@agenciazop.com.br:/home/sbop/sistema/
ssh -p 22022 root@agenciazop.com.br "chown -R sbop:sbop /home/sbop/sistema/*"