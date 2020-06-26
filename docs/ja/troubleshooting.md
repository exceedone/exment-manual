# よくある質問、トラブルシューティング
Exmentのインストールやアップデート、操作に関するよくある質問、トラブルシューティングをまとめております。  
内容は随時更新していきます。  

## インストール・アップデート

### composer requireや、アップデートバッチが途中で終了する
Linuxへのインストール時、composer requireコマンドや、アップデートバッチを実行時に、以下の表示になることがあります。  

```
# パターン1
Killed

# パターン2
mmap() failed: [12] Cannot allocate memory
PHP Fatal error:  Out of memory (allocated XXXXX) (tried to allocate XXXXX bytes) in phar:///usr/local/bin/composer/src/Composer/Console/Application.php on line 82
```

これはメモリ不足によるエラーです。  
その場合、swapを作成することで解決する場合があります。

~~~
sudo dd if=/dev/zero of=/swapfile bs=2M count=2048
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
~~~


### 初回インストール後、管理画面にアクセス時、「SQLSTATE[HY000][202] Permission denied」エラーが発生する
ApacheからMySQLにアクセスを行う場合、SELinuxの設定が必要になる場合があります。  

上記の現象が発生した場合、以下のようにコマンドを実行してください。

~~~
sudo setsebool -P httpd_can_network_connect_db=1
~~~


### レンタルサーバーで、「composer require」などのコマンドを実行時に、「Killed」と表示される
これはメモリに負荷がかかる場合に、時々発生する現象です。  
※常に発生するわけではありません  

上記の現象が発生した場合、以下のようにコマンドを実行してください。

~~~
nice -n 20 composer .....
~~~

コマンドの冒頭に「nice -n 20」と付けて、composerを実行してください。  
これにより、優先度を下げてコマンドを実行します。  
※上記のようにコマンドを実行しても、再度「Killed」が表示される場合があります。ご了承ください。


