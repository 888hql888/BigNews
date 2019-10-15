
        $(function(){
            // 1.页面一加载渲染select栏目选中的类别
            $.ajax({
                url:BigNew.category_list,
                type:'get',
                dataType:'json',
                data:'',
                success: function(backData){
                    console.log(backData);
                    $('select.category').html(template('art_cat',backData));
                }
            });

            var id=window.location.href.split("=")[1];
            console.log(id);
            // 2.获取文章信息
            $.ajax({
                url:BigNew.article_search,
                type:'get',
                dataType:'json',
                data:{
                    id:id
                },
                success: function(backData){
                    console.log(backData);
                    if(backData.code==200){
                       $('input.title').val(backData.data.title); //文章标题
                        $('.article_cover').attr('src', backData.data.cover); //文章封面
                        $('select.category').val(backData.data.categoryId); //文章类别
                        $('#testico').val(backData.data.date); //时间.
                        /*细节：由于tinymce比较复杂，加载需要时间。
                        一旦网速过快，就有可能导致数据已经返回，但是插件还没加载完的情况
                        解决方案：使用定时器延迟加载（可以添加一个loading动画迷惑用户）
                        */
                        setTimeout(function () {
                            tinymce.activeEditor.setContent(backData.data.content)
                        }, 200);
                    }
                }
            });
            
            // 3.图片预览功能
            //1.给file表单元素注册onchange事件
            $('#inputCover').change(function () {
                //1.2 获取用户选择的图片
                var file = this.files[0];
                //1.3 将文件转为src路径
                var url = URL.createObjectURL(file);
                //1.4 将url路径赋值给img标签的src
                $('.article_cover').attr('src', url);
            });




            //4.含有文件的fotm表单提交数据
            /* 发布 */
            $('.btn-edit').click(function (e) {
                //3.1 禁用表单默认提交事件
                e.preventDefault();
                //3.2 ajax发送请求
                editArticlie('已发布');
            });

            /* 存为草稿 */
            $('.btn-draft').click(function (e) {
                //3.1 禁用表单默认提交事件
                e.preventDefault();
                //3.2 ajax发送请求
                editArticlie('草稿');
            });
            
            //封装编辑文章的ajax请求封装
            function editArticlie(state){
                
                    //创建FormData对象：参数是表单dom对象
                    var fd = new FormData($('#form')[0]);
                    //追加编辑页的id
                    fd.append('id',id);
                    //追加富文本内容
                    fd.append('content', tinyMCE.activeEditor.getContent());
                    //追加文章状态
                    fd.append('state',state);
                    $.ajax({
                        url:BigNew.article_edit,
                        type:'post',
                        dataType:'json',
                        data:fd,
                        contentType: false,
                        processData: false,
                        success: function(backData){
                            if (backData.code == 200) {
                            alert('修改成功!');
                            //回退上一页
                            window.history.back();
                        } else {
                            alert(backData.msg);
                        }
                        }
                    });
               
            }
        })
   