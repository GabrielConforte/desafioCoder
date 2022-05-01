# desafioCoder

### Lista de comandos para el desafio
*Forever*
: el ultimo numero es el puerto y la -w es para dejarlo en modo watch
> forever start index.js 8080 -w
> 
> forever start index.js 8081 -w
> 
> forever start index.js 8082 -w


Listar los puertos
> forever list

Terminar todos los procesos
> forever stopall

*pm2*

modo fork con watch
> pm2 start index.js --watch 

martar proceso fork
> pm2 delete 0

modo cluster con watch
> pm2 start index.js --watch -i 0 --

listar
> pm2 list

matar un proceso cluster
> pm2 delete 7

> pm2 list

borrar todos
> pm2 detele all

*nginx.exe*

desde la carpeta nginx-1.21.6
> ./nginx.exe -s reload
