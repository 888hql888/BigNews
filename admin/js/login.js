
    //入口函数
    $(function () {
      /* 1.登录按钮点击事件
      *** 注意点： 表单按钮需要阻止默认跳转行为 ***
      1.1 非空判断
      1.2 获取用户名和密码
      1.3 ajax发送请求
      1.4 响应数据之后 跳转 首页
       */
      $('.input_sub').click(function (e) {
        e.preventDefault();
        //1.1 非空判断
        if ($('.input_txt').val().trim().length == 0 || $('.input_pass').val().trim().length == 0) {
          //alert('请输入用户名和密码');
          //使用bootstrap的模态框
          //(1)修改模态框提示信息
          $('.modal-body>p').text('请输入用户名和密码');
          //(2)弹出模态框
          $('#myModal').modal();
          return;
        };
        //1.2 获取用户名和密码
        //1.3 ajax发送请求
        $.ajax({
          url: BigNew.user_login,
          type: 'post',
          dataType: 'json',
          data: {
            username: $('.input_txt').val(),
            password: $('.input_pass').val()
          },
          success: function (backData) {
            console.log(backData);
            //1.4 响应数据之后 跳转 首页
            if (backData.code == 200) {
              // alert('登录成功');
              //(1)修改模态框提示信息
              $('.modal-body>p').text('登录成功');
              //(2)弹出模态框
              $('#myModal').modal();


              //(3)用户点击确认之后跳转首页 (用户点击确认，模态框消失之后触发)
              $('#myModal').on('hidden.bs.modal', function (e) {
                // do something...

                //将服务器返回的token存入localstorage
                localStorage.setItem('token',backData.token);
                //跳转首页

                window.location.href = './index.html';
              });
            }
            
            else {
              //alert(backData.msg);
              //(1)修改模态框提示信息
              $('.modal-body>p').text(backData.msg);
              //(2)弹出模态框
              $('#myModal').modal();
            }
          }
        });

      });
    });
