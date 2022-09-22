yarn build
Write-Output 'Uploading files to hostgator'
scp -r -P 22022 build/* root@agenciazop.com.br:/home/sbop/sistema/
ssh hostgator "chown -R sbop:sbop /home/sbop/sistema/*"
# ssh hostgator "screen -XS sbop-api quit && cd /home/sbop/sistema/sbop-api/ && git pull && sh /scripts/fernando/sbop-api.sh"