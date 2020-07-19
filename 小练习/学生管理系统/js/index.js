//获取用户名，退出后跳转到登陆页面
var username = getCookie('username');
if(username){
    var user = document.getElementsByClassName('username')[0];
    user.innerText = username;
}else{
    location.href = './login.html';
}
var tableData = [];
var page = 1;
var allPage = 1;
var size = 10;//每页显示数量
//绑定事件
function bindEvent(){
    var innerMenu = document.getElementsByClassName('innerMenu')[0];
    innerMenu.onclick = function(e){
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if(target.tagName == 'DD'){
            target.classList.add('active');
            var sibling = getSiblings(target);
            for(var i = 0;i < sibling.length;i++){
                sibling[i].classList.remove('active');
            }
            var id = target.getAttribute('data-id');
            var showContent = document.getElementById(id);
            // console.log(showContent);
            showContent.style.display = 'block';
            var contentSibling = getSiblings(showContent);
            for(var i = 0;i < contentSibling.length;i++){
                contentSibling[i].style.display = 'none';
            }
        }
    }
    var studentAddBtn = document.getElementById('add-submit');
    studentAddBtn.onclick = function(e){
        var event = e || window.event;
        var target = event.target || event.srcElement;
        event.stopPropagation();
        var studentAddForm = document.getElementsByClassName('student-add-form')[0];
        var studentAddData = getFormData(studentAddForm);
        if(studentAddData){
            var dataStr = 'appkey=ddmh123_1590643639612'
            for(var prop in studentAddData){
                dataStr += '&' + prop + '=' + studentAddData[prop];
            }
        }
        myAjax('GET','http://open.duyiedu.com/api/student/addStudent',dataStr,function(data){
            if(data.status == 'success'){
                console.log(data)
                alert('新增成功')
            }
        },true)
    }
    //编辑按钮事件
    var tbody = document.getElementsByTagName('tbody')[0];
    var wrapper = document.getElementsByClassName('wrapper')[0];
    tbody.onclick=function(e){
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if(target.classList.contains('edit')){
            wrapper.style.display = 'block';
            var index = target.dataset.index;
            renderEditForm(tableData[index])
        }else if(target.classList.contains('delete')){
            var index = target.dataset.index;
            var isDel = confirm('是否删除学号为：' + tableData[index].sNo + '的学生信息吗？')
            if(isDel){
                var str = 'appkey=ddmh123_1590643639612';
                str += '&sNo=' + tableData[index].sNo;
                myAjax('GET','http://open.duyiedu.com/api/student/delBySno',str,function(data){
                    if(data.status == 'success'){
                        alert('删除成功');
                        getTableData();
                    }
                },true)
            }
        }
    }
    var editSubmit = document.getElementById('edit-submit');
    editSubmit.onclick = function(e){
        var event = e || window.event;
        event.stopPropagation();
        var formContent = document.getElementsByClassName('form-content')[0];
        var formData = getFormData(formContent);
        if(formData){
            myAjax('GET','http://open.duyiedu.com/api/student/updateStudent',function(data){
                if(data.status == 'success'){
                    alert('修改成功')
                    wrapper.style.display = 'none';
                    getTableData();
                }
            },true)
        }
    }

//获取弹窗内容元素
    var editForm = document.getElementsByClassName('edit-form')[0];
    var prevPage = document.getElementsByClassName('prev-page')[0];
    var nextPage = document.getElementsByClassName('next-page')[0];
    wrapper.onclick = function(){
        this.style.display = 'none';
    }
    editForm.onclick = function(e){
        var event = e || window.event;
        event.stopPropagation();
    }
    prevPage.onclick = function(){
        page--;
        getTableData();
    }
    nextPage.onclick = function(){
        page++;
        getTableData();
    }
}
bindEvent();

//获取兄弟节点
function getSiblings(node){
    var parentNode = node.parentNode;
    var children = parentNode.children;
    var result = [];
    for(var i = 0;i < children.length;i++){
        if(children[i] != node){
            result.push(children[i]);
        }
    }    
    return result;
}

//获取表单数据
function getFormData(form){
    var name = form.name.value;
    var sex = form.sex.value;
    var email = form.email.value;
    var sNo = form.sNo.value;
    var birth = form.birth.value;
    var phone = form.phone.value;
    var address = form.address.value;
    if(!name || sex || email || sNo || birth || phone || address){
        alert('信息填写不完全，请校验之后提交');
        return false;
    }
    if(!(/^\d{4,16}$/.text(sNo))){
        alert('学号格式为4到16位的数字');
        return false;
    }
    if(!(birth > 1920 && birth <= 2020)){
        alert('出生年份格式不正确或年龄过大不接受该学员');
        return false;
    }
    if (!(/^1\d{10}$/.test(phone))) {
        alert('手机号不正确');
        return false;
    }
    return {
        name: name,
        sex: sex,
        email: email,
        sNo: sNo,
        birth: birth,
        phone: phone,
        address: address,
    }
}

//渲染表单数据
function renderData(data){
    var str = '';
    for(var i = 0;i < data.length;i++){
        str += `<tr>
            <td>${data[i].sNo}</td>
            <td>${data[i].name}</td>
            <td>${data[i].sex == 0 ? '男' : '女'}</td>
            <td>${data[i].email}</td>
            <td>${new Date().getFullYear() - data[i].birth}</td>
            <td>${data[i].phone}</td>
            <td>${data[i].address}</td>
            <td>
                <button class="edit" data-index="${i}">编辑</button>
                <button class="delete" data-index="${i}">删除</button>
            </td>
        </tr>`
    }
    var tbody = document.getElementById('tbody');
    tbody.innerHTML = str;
    var prevPage = document.getElementsByClassName('prev-page')[0];
    var nextPage = document.getElementsByClassName('next-page')[0];
    if(page > 1 ){
        prevPage.style.display = 'inline-block';
    }else{
        prevPage.style.display = 'none';
    }
    if (page < allPage) {
        nextPage.style.display = 'inline-block';
    } else {
        nextPage.style.display = 'none';
    }
}

//获取学生列表信息
function getTableData(){
    var str = 'appkey=ddmh123_1590643639612';
    str += '&page=' + page + '&size=' + size;
    myAjax('GET','http://open.duyiedu.com/api/student/findByPage',str,function(res){
            //allPage = 27/20 = 1.7   ->  2
            allPage = Math.ceil(res.data.cont / size);
            tableData = res.data.findByPage;
            console.log(res.data);
            renderData(tableData);
        },true)
}
getTableData()

//编辑表单的数据回填(便于修改)
function renderEditForm(data){
    var editForm = document.getElementsByClassName('form-content')[0];
    for (var prop in data) {
        if (editForm[prop]) {
            editForm[prop].value = data[prop];
        }
    }
}