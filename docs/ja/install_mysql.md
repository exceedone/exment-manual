# MySQLインストール手順
Exmentで、MySQLを使用するための手順です。  
※各種手順は、OSやバージョン、インストール時期などにより、異なる場合があります。  

## MySQL設定

- 以下のサイトにアクセスし、MySQLをダウンロードします。  
[MySQLダウンロード](https://downloads.mysql.com/archives/installer/)  

- Product Versionが「5.7.X」となっている、最新版のものを選択します。  
![MySQLインストール画面](img/xampp/mysql1.png)

- ファイル名に「web」が"入っていない"方の行で、容量が大きい行の「Download」をクリックし、ダウンロードします。  
![MySQLインストール画面](img/xampp/mysql2.png)

- ダウンロードしたファイルを実行し、インストールを進めます。  

- 「Choosing a Setup type」では、「Custom」を選択します。  
![MySQLインストール画面](img/xampp/mysql3.png)  

- 「Select Products and Features」では、「MySQL Servers > MySQL Server > MySQL Server 5.7」をクリックすると、MySQL Server X64とX86が表示されます。  
ご利用のOSのバージョンに合わせ、1行クリックし、真ん中の「→」をクリックしてください。    
![MySQLインストール画面](img/xampp/mysql4.png)  

- (任意)MySQLのワークベンチを導入したい場合、「Apploications > MySQL Workbench > MySQL Workbench 8.0」をクリックすると、「MySQL Workbench」が表示されます。  
この行をクリックし、真ん中の「→」をクリックしてください。    
※MySQL Workbenchは、MySQLのデータをGUIからアクセスしやすくするためのアプリケーションです。  
![MySQLインストール画面](img/xampp/mysql5.png)  

- 「Check Requirements」が表示することがあります。  
そのときには、「Execute」をクリックしたら、コンポーネントなどを関連してインストールします。
![MySQLインストール画面](img/xampp/mysql8.png)  

- 完了するまで「Yes」や「Install」をクリックします。  
![MySQLインストール画面](img/xampp/mysql9.png)  

- 「Installation」ページで、「Execute」をクリックして、インストール完了させます。
![MySQLインストール画面](img/xampp/mysql10.png)  

- 完了したら、「Next」をクリックします。
![MySQLインストール画面](img/xampp/mysql11.png)  

- 「Group Replication」や「Type and Networking」では、既定の設定とします。
![MySQLインストール画面](img/xampp/mysql12.png)  
![MySQLインストール画面](img/xampp/mysql13.png)  

- rootユーザーのパスワードを入力します。  
今後ExmentなどでMySQLを使用する場合に必要ですので、必ず覚えておいてください。  
![MySQLインストール画面](img/xampp/mysql14.png)  

- その後はウィザードに従い、「Next」を何回か押下して、インストールを進めていきます。
![MySQLインストール画面](img/xampp/mysql15.png)  
![MySQLインストール画面](img/xampp/mysql16.png)  

- インストールが完了しました。
![MySQLインストール画面](img/xampp/mysql17.png)  

