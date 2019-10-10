    //入口函数
        $(function(){
            /* 
            1.页面一加载：ajax请求个人信息
             */
            $.ajax({
                url:BigNew.user_info,
                type:'get',
                dataType:'json',
                success: function(backData){
                    console.log(backData);
                     //渲染个人信息数据
                     $('.user_info>span').text('欢迎  ' + backData.data.nickname);
                     $('.user_info>img').attr('src', backData.data.userPic);
                     $('.user_center_link>img').attr('src', backData.data.userPic);
                }
            });

            //退出功能
            $('.logout').click(function(){
                console.log('1111');
                //清除token
                localStorage.removeItem('token');
                //跳转到登录页
                window.location.href='./login.html';
               
            })

            //点击一级菜单实现高亮
            $('.level01').click(function(){
                $(this)
            })


           
        });
    