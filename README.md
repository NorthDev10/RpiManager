# RpiManager
Кнопка выключения и умное управление активным охлаждением для Raspberry Pi 3

<p>Ниже представлена наглядная схема подключения вентилятора и кнопки выключения системы</p>
<p><img width="450px" src="https://github.com/NorthDev10/RpiManager/blob/master/photo/Untitled%20Sketch_bb.png" alt="Наглядная схема подключения вентилятора и кнопки выключения системы"></p> 
<p>Внешний вид модифицированного корпуса для Raspberry Pi 3 Model B+</p>
<p><img width="450px" src="https://github.com/NorthDev10/RpiManager/blob/master/photo/IMG_20181027_234759.jpg" alt="Внешний вид модифицированного корпуса для Raspberry Pi 3 Model B+"></p>
<p><img width="450px" src="https://github.com/NorthDev10/RpiManager/blob/master/photo/IMG_20181027_234916.jpg" alt="Внешний вид модифицированного корпуса для Raspberry Pi 3 Model B+"></p>

<h2>Установка</h2>

<p>Клонируем репозиторий RpiManager</p>
<code>git clone https://github.com/NorthDev10/RpiManager.git</code>

<p>Перемещаем каталог RpiManager в /bin/</p>
<code>sudo mv ./RpiManager /bin/</code>

<p>Для работы скрипта необходимо установить Node.js</p>
<p>Скачиваем Node.js</p>
<code>curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -</code>
<p>Устанавливаем Node.js</p>
<code>sudo apt-get install -y nodejs</code>
<p>Проверяем версию установленной Node.js</p>
<code>node -v</code>
<p>v10.14.2</p>

<p>Для установки Node.js пакетов, будем использовать yarn</p>
<p>Установка yarn</p>
<p><code>curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -</code></p>
<p><code>echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list</code></p>
<p><code>sudo apt-get update && sudo apt-get install yarn</code></p>

<p>Проверяем версию установленного yarn</p>
<code>yarn -v</code>
<p>1.12.3</p>

<p>Переходи к каталогу с проектом</p>
<code>cd /bin/RpiManager/</code>
<p>Устанавливаем необходимые пакеты</p>
<code>yarn</code>
<p>Собираем приложение</p>
<code>yarn build</code>
<p>Добавляем скрипт в автозапуск системы</p>
<code>sudo nano /etc/rc.local</code>
<p>перед exit 0 добавляем следующую строку</p>
<code>sudo node /bin/RpiManager/dist/app.js &</code>
<p>где & - запуск скрипта в фоновом режиме</p>
<p>Содержание rc.local должно быть следующим:</p>
<p><img style="max-width:100%" src="https://github.com/NorthDev10/RpiManager/blob/master/photo/rc.local.png" alt="Содержание rc.local"></p> 
<p>Для того чтобы кнопка выключения заработала, необходимо в 12 порте подключить подтягивающий резистор к питанию.</p>
<p>Открываем конфигурационный файл</p>
<code>sudo nano /boot/config.txt</code>
<p>и вконец добавляем</p>
<code>gpio=12=pu</code>
<p>перезагружаем систему</p>
<code>sudo reboot</code>
<p>После перезагрузки системы проверяем, запущен ли наш скрипт app.js</p>
<code>htop</code>
<p><img style="max-width:100%" src="https://github.com/NorthDev10/RpiManager/blob/master/photo/htop.png" alt="проверяем, запущен ли наш скрипт app.js"></p> 
