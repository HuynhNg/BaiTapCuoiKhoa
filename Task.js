var Id;
var dem = 0;
var ListTask= [];
var TodoList = [];
var DoingList = [];
var CompletedList = [];
var BlockedList = [];

// Gọi hàm để tải dữ liệu từ localStorage khi trang HTML được tải
document.addEventListener('DOMContentLoaded', ()=> LoadLocal());
function LoadLocal() {
    if (localStorage.getItem("ListTask")) {
        let data = JSON.parse(localStorage.getItem("ListTask"));
        let Todo = document.getElementById("Todo");
        let Doing = document.getElementById("Doing");
        let Completed = document.getElementById("Completed");
        let Blocked = document.getElementById("Blocked");
        // Clear existing HTML content
        Todo.innerHTML = "";
        Doing.innerHTML = "";
        Completed.innerHTML = "";
        Blocked.innerHTML = "";
        ListTask = [];
        TodoList = [];
        DoingList = [];
        CompletedList = [];
        BlockedList = [];
        for (let i = 0; i < data.length - 1; i++) {
            let temp, temp2 = [];
            if (i == 0) {
                temp = Todo;
                temp2 = TodoList;
            }
            if (i == 1) {
                temp = Doing;
                temp2 = DoingList;
            }
            if (i == 2) {
                temp = Completed;
                temp2 = CompletedList;
            }
            if (i == 3) {
                temp = Blocked;
                temp2 = BlockedList;
            }
            data[i].forEach(Task => {
                let htmlContent = `
                <div class="content_container" id="${Task.ID}">
                    <div class="content_item">
                        <div class="category">${Task.Category}</div>
                        <div class="title">${Task.Title}</div>
                        <div class="title_line"></div>
                        <div class="test">${Task.Content}</div>
                        <div class="test">
                            <div><img src="./clock.svg" alt="" width="16px"></div>
                            <p>${Task.formattedDateTime}</p>
                        </div>
                    </div>
                    <div class="content_button">
                        <button class="button Edit" onclick="Click()">
                            <img src="./edit.svg" alt="">
                        </button class="button"> 
                        <button class="button" onclick="deleteFunction(${Task.ID})" value="${Task.ID}">
                        <img src="./delete.svg" alt="" >
                        </button>
                    </div>
                </div>
            `;
                temp.innerHTML += htmlContent;
                obj = {
                    ID: Task.ID,
                    Category: Task.Category,
                    Title: Task.Title,
                    Content: Task.Content,
                    formattedDateTime: Task.formattedDateTime
                }
                temp2.push(obj);
            })
        }
        dem = data[data.length - 1];
        ListTask = [TodoList, DoingList, CompletedList, BlockedList, dem];
    }
    // console.log("Load");
    // console.log(ListTask);
    TinhSL("Todo");
    TinhSL("Doing");
    TinhSL("Completed");
    TinhSL("Blocked");
}

function TinhSL(id)
{
    let parentDiv = document.getElementById(id);
    let childDivCount = parentDiv.querySelectorAll(".content_container").length;
    let SoLuong= document.getElementById(`SL${id}`);
    SoLuong.innerHTML = childDivCount;
    // console.log(`SL${id}`);
}
function addFunction() {
    document.getElementById("IdForm").style.display = "flex";
}

function closeFunction() {
    document.getElementById("IdForm").style.display = "none";
    document.getElementById("IdForm2").style.display = "none";
}

function SubmitFunction(id,New_obj) {
    let Category = document.getElementById("txtCategory").value;
    let Title = document.getElementById("txtTitle").value;
    let Content = document.getElementById("txtContent").value;
    // console.log("Newobj");
    // console.log(New_obj);
    if(New_obj)
    {
        let AddContainer = document.getElementById(id);
        let htmlContent = `
                <div class="content_container" id="${New_obj.ID}">
                    <div class="content_item">
                        <div class="category">${New_obj.Category}</div>
                        <div class="title">${New_obj.Title}</div>
                        <div class="title_line"></div>
                        <div class="test">${New_obj.Content}</div>
                        <div class="test">
                            <div><img src="./clock.svg" alt="" width="16px"></div>
                            <p>${New_obj.formattedDateTime}</p>
                        </div>
                    </div>
                    <div class="content_button">
                        <button class="button Edit" onclick="Click()">
                            <img src="./edit.svg" alt="">
                        </button class="button"> 
                        <button class="button" onclick="deleteFunction(${New_obj.ID})" value="${New_obj.ID}">
                        <img src="./delete.svg" alt="" >
                        </button>
                    </div>
                </div>
            `;
        AddContainer.innerHTML += htmlContent;
        if(id == 'Todo') TodoList.push(New_obj);
        if(id == 'Doing') DoingList.push(New_obj);
        if(id == 'Completed') CompletedList.push(New_obj);
        if(id == 'Blocked') BlockedList.push(New_obj);
        dem++;
        ListTask = [TodoList, DoingList, CompletedList, BlockedList, dem];
        localStorage.setItem("ListTask", JSON.stringify(ListTask));
        // console.log("Submit");
        // console.log(ListTask);
        LoadLocal();
        TinhSL("Todo");
        TinhSL("Doing");
        TinhSL("Completed");
        TinhSL("Blocked");
        closeFunction();
    }
    else{
        if(!Category) document.getElementById("txtCategory").style.border = "1px solid red";
        else document.getElementById("txtCategory").style.border = "1px solid green";

        if(!Title) document.getElementById("txtTitle").style.border = "1px solid red";
        else document.getElementById("txtTitle").style.border = "1px solid green";

        if(!Content) document.getElementById("txtContent").style.border = "1px solid red";
        else document.getElementById("txtContent").style.border = "1px solid green";

        // console.log(id);
        if(Category && Title && Content){
            // Lấy phần tử DOM dựa trên ID được truyền vào
            let AddContainer = document.getElementById(id);

            let currentDate = new Date();
            let formattedDateTime = currentDate.toLocaleString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh' });

            // Tạo chuỗi HTML để thêm vào phần tử
            htmlContent = `
                <div class="content_container" id="${dem}">
                    <div class="content_item">
                        <div class="category">${Category}</div>
                        <div class="title">${Title}</div>
                        <div class="title_line"></div>
                        <div class="test">${Content}</div>
                        <div class="test">
                            <div><img src="./clock.svg" alt="" width="16px"></div>
                            <p>${formattedDateTime}</p>
                        </div>
                    </div>
                    <div class="content_button">
                        <button class="button Edit" onclick="Click()">
                            <img src="./edit.svg" alt="">
                        </button class="button"> 
                        <button class="button" onclick="deleteFunction(${dem})" value="${dem}">
                        <img src="./delete.svg" alt="" >
                        </button>
                    </div>
                </div>
            `;
            // Thêm nội dung HTML vào phần tử
            AddContainer.innerHTML += htmlContent;
            obj = {
                ID: dem,
                Category: Category,
                Title: Title,
                Content: Content,
                formattedDateTime : formattedDateTime
            }
            if(id == 'Todo') TodoList.push(obj);
            if(id == 'Doing') DoingList.push(obj);
            if(id == 'Completed') CompletedList.push(obj);
            if(id == 'Blocked') BlockedList.push(obj);
            dem++;
            ListTask = [TodoList, DoingList, CompletedList, BlockedList, dem];
            localStorage.setItem("ListTask", JSON.stringify(ListTask));
            // console.log("Submit");
            // console.log(ListTask);
            LoadLocal();
            TinhSL("Todo");
            TinhSL("Doing");
            TinhSL("Completed");
            TinhSL("Blocked");
            closeFunction();
        } 
    }
}

function deleteFunction(childId) {
    // console.log("DELETE");
    TodoList = TodoList.filter(User => User.ID != childId);
    DoingList = DoingList.filter(User => User.ID != childId);
    CompletedList = CompletedList.filter(User => User.ID != childId);
    BlockedList = BlockedList.filter(User => User.ID != childId);
    ListTask = [TodoList, DoingList, CompletedList, BlockedList, dem];
    localStorage.setItem("ListTask", JSON.stringify(ListTask));
    // console.log(ListTask);
    LoadLocal();
}


function Click() {
    let EditButtons = document.querySelectorAll('.button'); // Chọn tất cả các nút Edit

    // Lặp qua từng nút Edit và thêm sự kiện click
    EditButtons.forEach(function(EditButton) {
        EditButton.addEventListener('click', function() {
            // Lấy dữ liệu từ div cha của nút Edit được chọn
            let contentItem = this.closest('.content_container').querySelector('.content_item');
            let category = contentItem.querySelector('.category').innerText;
            let title = contentItem.querySelector('.title').innerText;
            let content = contentItem.querySelector('.test').innerText;
            let id = this.closest('.content_container').id;

            let prID = this.closest('.content').id;
            // Điều chỉnh radiobox tương ứng
            document.querySelectorAll('input[name="Condition"]').forEach(function(radio) {
                if (radio.value === prID) {
                    radio.checked = true;
                }
            });

            // Điền dữ liệu vào các trường của form
            document.getElementById('IdForm2').style.display = 'flex';
            document.getElementById('txtCategory2').value = category;
            document.getElementById('txtTitle2').value = title;
            document.getElementById('txtContent2').value = content;
            Id = id; // Lưu ID của div con
        });
    });
}

function SubmitFunction2() {
    let condition = document.querySelector('input[name="Condition"]:checked').value;
    let category = document.getElementById("txtCategory2").value;
    let title = document.getElementById("txtTitle2").value;
    let content = document.getElementById("txtContent2").value;
    let currentDate = new Date();
    let formattedDateTime = currentDate.toLocaleString('en-GB', { timeZone: 'Asia/Ho_Chi_Minh' });
    let New_obj = {
        ID: dem,
        Category: category,
        Title: title,
        Content: content,
        formattedDateTime: formattedDateTime
    };
    dem++;
    // console.log("Newobj");
    // console.log(New_obj);
    // console.log("Change");
    // console.log(condition);
    // console.log(ListTask);
    deleteFunction(Id);
    SubmitFunction(condition, New_obj); // Use New_obj instead of obj
}

