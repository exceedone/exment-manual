# Thêm lựa chọn riêng vào thiết lập "Ký tự được phép" của loại cột tùy chỉnh "Văn bản một dòng"
Với loại cột tùy chỉnh "Văn bản một dòng", thiết lập "Ký tự được phép" hiển thị các mục như sau.

![Ký tự được phép](../img/quickstart/available_characters1.png)

Trang này giải thích các bước để thêm mục riêng (ví dụ: "ひらがな" (Hiragana), "カタカナ" (Katakana)) vào đây.

### Các bước thiết lập 

**(1)** Mở thư mục "app/Exment" trong thư mục gốc của dự án, rồi mở tệp "bootstrap.php" trong đó.

> Nếu tệp "app/Exment/bootstrap.php" không tồn tại, hãy tự tạo thư mục và tệp php.

**(2)** Thêm nội dung như sau rồi lưu.

``` php
\Exceedone\Exment\Model\CustomColumn::customAvailableCharacters([
    [
        'key' => 'hiragana', // Khóa. Chữ và số
        'label' => 'ひらがな', // Chuỗi hiển thị trên màn hình
        'regex' => 'ぁ-ん', // Ghi chuỗi ký tự được phép bằng biểu thức chính quy
    ],
    [
        'key' => 'katakana',
        'label' => 'カタカナ',
        'regex' => 'ァ-ン',
    ],
]);
```

**(3)** Lựa chọn đã thêm sẽ được hiển thị ở "Ký tự được phép".

![Ký tự được phép](../img/quickstart/available_characters2.png)


Như vậy là đã thiết lập xong.


[←Quay lại danh sách thiết lập bổ sung](/vi/quickstart_more)
