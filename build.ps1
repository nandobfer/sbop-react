yarn build
Write-Output 'Uploading files to hostgator'
scp -r -P 22022 build/* root@agenciazop.com.br:/home/sbop/sistema/
ssh hostgator "chown -R sbop:sbop /home/sbop/sistema/*"
ssh hostgator "screen -XS bapka-api quit && cd /home/sbop/sistema/bapka-api/ && git pull && sh /scripts/fernando/bapka-api.sh"