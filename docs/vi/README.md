# Tài liệu hướng dẫn Exment
<p align="center">
<img src="https://exment.net/docs/img/common/exment_logo_side.png" alt="Exment" style="border:none;">
</p>

> **Lưu ý:** Bản tiếng Việt của tài liệu này đang được dịch từng bước. Các trang có ghi chú "(English)" trên thanh menu bên trái hiện vẫn là bản tiếng Anh.

## Exment là gì
Exment là **cơ sở dữ liệu Web mã nguồn mở, miễn phí, giúp xây dựng hệ thống nghiệp vụ mà không cần lập trình**. Thông tin khách hàng, thương vụ, đơn yêu cầu… đang nằm rải rác trong Excel hay nhiều tệp khác nhau được gom về một nơi, chỉ bằng cách thiết lập trên màn hình.

- **Tạo ngay trên màn hình**: bảng, biểu mẫu và view (danh sách, kanban, biểu đồ Gantt, tổng hợp), không cần lập trình.
- **Vận hành cùng cả nhóm**: workflow (đề xuất, phê duyệt), thông báo, biểu mẫu công khai và API.
- **Tự giữ dữ liệu, không tính phí theo người dùng**: chạy trên máy chủ của công ty, máy chủ thuê hoặc đám mây (AWS, Azure…). Chi phí không tăng theo số người dùng.

<a href="https://exment.net/vi/" target="_blank">Trang chính thức của Exment</a>

## Dùng thử trước
- **Demo**: đăng nhập và dùng thử quản lý dự án, thương vụ, workflow, biểu mẫu công khai… Thông tin đăng nhập có ở <a href="https://exment.net/vi/demo-env/" target="_blank">trang demo</a>.
- **Cài đặt**: khi thiết lập máy chủ và cài đặt Exment, trước tiên vui lòng xem [Quy trình cài đặt](/vi/quickstart).
- **Chức năng và ảnh chụp màn hình**: vui lòng xem <a href="https://exment.net/vi/functions/" target="_blank">trang giới thiệu chức năng</a>.
- **Tính năng mới**: vui lòng xem <a href="https://exment.net/vi/whats-new/" target="_blank">What's new</a> (tính năng mới của từng phiên bản) và [Release notes (tiếng Anh)](/release_note).

## Về tài liệu này
Tài liệu này luôn được biên soạn theo phiên bản mới nhất của Exment.
Một số chức năng hoặc câu lệnh được bổ sung trong các lần nâng cấp phiên bản có thể không ghi rõ phiên bản bắt đầu hỗ trợ. Mong quý vị thông cảm.

## Mục lục tài liệu
Các mục được đánh dấu "<span style="color:red;">*</span>" là những nội dung đặc biệt quan trọng.
Dưới đây là các trang đã có bản tiếng Việt. Các trang khác (bản tiếng Anh) có thể mở từ thanh menu bên trái.

<div class="container-fluid" style="margin-bottom:2em;">
    <div>
        <h4>1. Giới thiệu</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/vi/concept">
                    <div class="tile-inner">
                        <h5>Khái niệm của Exment</h5>
                        <p>Tóm tắt triết lý và khái niệm cơ bản của Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/start_flow">
                    <div class="tile-inner">
                        <h5>Quy trình cho đến khi bắt đầu sử dụng</h5>
                        <p>Các bước tiêu chuẩn từ lúc cài đặt cho đến khi bắt đầu vận hành nghiệp vụ bằng Exment.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>2. Cài đặt và thiết lập ban đầu</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/vi/server">
                    <div class="tile-inner important-topic">
                        <h5>Thiết lập máy chủ</h5>
                        <p>Thiết lập máy chủ Web và cơ sở dữ liệu để cài đặt Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/quickstart">
                    <div class="tile-inner important-topic">
                        <h5>Quy trình cài đặt</h5>
                        <p>Tổng quan các bước cần xác nhận trước tiên để bắt đầu sử dụng Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/first_setting">
                    <div class="tile-inner important-topic">
                        <h5>Thiết lập ban đầu</h5>
                        <p>Các bước thiết lập ban đầu sau khi cài đặt, chẳng hạn như tạo tài khoản quản trị viên đầu tiên.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/system_setting">
                    <div class="tile-inner">
                        <h5>Thiết lập hệ thống</h5>
                        <p>Các thiết lập chung cho toàn bộ hệ thống Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/update">
                    <div class="tile-inner important-topic">
                        <h5>Cập nhật phiên bản</h5>
                        <p>Quy trình cập nhật Exment lên phiên bản mới.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/quickstart_more">
                    <div class="tile-inner">
                        <h5>Thiết lập bổ sung</h5>
                        <p>Các thiết lập bổ sung của Exment như đổi đường dẫn "/admin", thiết lập task schedule, v.v.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/mailsend_setting">
                    <div class="tile-inner">
                        <h5>Thiết lập gửi email</h5>
                        <p>Các bước thiết lập để gửi email cho người dùng, bao gồm cả cách gửi email thử nghiệm.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>3. Thiết lập đăng nhập</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/vi/login_setting">
                    <div class="tile-inner">
                        <h5>Thiết lập đăng nhập</h5>
                        <p>Các thiết lập liên quan đến việc đăng nhập vào Exment.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/login_2factor_setting">
                    <div class="tile-inner">
                        <h5>Thiết lập xác thực hai yếu tố</h5>
                        <p>Cách thiết lập xác thực hai yếu tố dành cho quản trị viên.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/login_sso">
                    <div class="tile-inner">
                        <h5>Đăng nhập một lần (SSO)</h5>
                        <p>Cách thiết lập xác thực SSO dành cho quản trị viên.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/login_2factor">
                    <div class="tile-inner">
                        <h5>Xác thực hai yếu tố</h5>
                        <p>Các bước đăng nhập bằng xác thực hai yếu tố dành cho người dùng.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>4. Thiết lập bảng</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/vi/table">
                    <div class="tile-inner important-topic">
                        <h5>Bảng tùy chỉnh</h5>
                        <p>Thiết lập cơ bản nhất của Exment: cách tạo bảng tùy chỉnh để lưu trữ dữ liệu.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/column">
                    <div class="tile-inner important-topic">
                        <h5>Cột tùy chỉnh</h5>
                        <p>Thiết lập các cột tùy chỉnh thuộc bảng tùy chỉnh.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/relation">
                    <div class="tile-inner">
                        <h5>Thiết lập quan hệ (relation)</h5>
                        <p>Thiết lập quan hệ để liên kết bảng với bảng.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/form">
                    <div class="tile-inner">
                        <h5>Form tùy chỉnh</h5>
                        <p>Quản lý các mục của form dùng trên màn hình đăng ký dữ liệu.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/view">
                    <div class="tile-inner important-topic">
                        <h5>View tùy chỉnh</h5>
                        <p>Quản lý các mục của view dùng trên màn hình danh sách dữ liệu.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>5. Quản lý dữ liệu</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/vi/data">
                    <div class="tile-inner important-topic">
                        <h5>Dữ liệu</h5>
                        <p>Cách xem danh sách, thêm mới, chỉnh sửa, hiển thị và xóa dữ liệu trong các bảng đã tạo.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/data_grid">
                    <div class="tile-inner important-topic">
                        <h5>Danh sách dữ liệu</h5>
                        <p>Hiển thị danh sách các dữ liệu đã đăng ký.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/data_details">
                    <div class="tile-inner">
                        <h5>Chi tiết dữ liệu</h5>
                        <p>Xem chi tiết một dữ liệu, cùng với tệp đính kèm và bình luận.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/data_form">
                    <div class="tile-inner important-topic">
                        <h5>Đăng ký dữ liệu</h5>
                        <p>Đăng ký và chỉnh sửa dữ liệu của bảng.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>6. Người dùng / Tổ chức / Nhóm vai trò</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/vi/user">
                    <div class="tile-inner important-topic">
                        <h5>Người dùng / Người dùng đăng nhập</h5>
                        <p>Quản lý thông tin người dùng và thiết lập để người dùng có thể đăng nhập vào hệ thống.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/organization">
                    <div class="tile-inner important-topic">
                        <h5>Tổ chức</h5>
                        <p>Thiết lập các tổ chức mà người dùng trực thuộc.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/role_group">
                    <div class="tile-inner">
                        <h5>Nhóm vai trò / Thiết lập quyền</h5>
                        <p>Thiết lập để chỉ những người dùng nhất định mới có thể quản lý những dữ liệu hoặc trang nhất định.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>7. Workflow</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/vi/workflow_setting">
                    <div class="tile-inner important-topic">
                        <h5>Thiết lập workflow</h5>
                        <p>Cách thiết lập workflow dành cho quản trị viên.</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/vi/workflow_execution">
                    <div class="tile-inner">
                        <h5>Thực hiện workflow</h5>
                        <p>Các bước để từng người dùng thực hiện workflow.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>9. Các chức năng tiêu chuẩn khác</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/vi/dashboard">
                    <div class="tile-inner">
                        <h5>Dashboard</h5>
                        <p>Quản lý nội dung trang TOP, trang được hiển thị đầu tiên sau khi đăng nhập.</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
