const addTodoButtonOnClick = () => {
    generateTodoObj();
}

const addTodoOnKeyUpHandle = (event) => {
    if (event.keyCode === 13) {
        generateTodoObj();
    }    
}

const checkedOnChangeHandle = (target) => {
    ToDoListService.getInstance().setCompleStatus(target.value, target.checked);
}

const modifyTodoOnClickHandle = (target) => {
    openModal();
    modifyModal(ToDoListService.getInstance().getTodoById(target.value));
    
}




const deleteTodoOnClickHandle = (target) => {
    ToDoListService.getInstance().removeTodo(target.value);
}

const generateTodoObj = () => {
    const todoContent = document.querySelector(".todolist-header-items .text-input").value;
    const todoObj = {
        id: 0,
        todoContent: todoContent,
        createDate: DateUtils.toStringByFormatting(new Date()),
        completStatus: false
    };

    ToDoListService.getInstance().addTodo(todoObj);
    document.querySelector(".todolist-header-items .text-input").value = "";
}


class ToDoListService {
    static #instance = null;

    static getInstance() {
        if (this.#instance === null) {
            this.#instance = new ToDoListService();
        }
        return this.#instance;
    }

    todoList = new Array();
    todoIndex = 1;

    constructor() {
        this.loadTodoList();
    }


    //JSON.parse(제이슨문자열) : 제이슨 문자열을 객체로 변환시킴
    //JSON.stringify(객체) : 객체를 제이슨 문자열로 변환시킴


    loadTodoList() {
        //true 면 그대로 쓰고 false면 비워둔곳을 빈배열로 채운다..????
        this.todoList = !!localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : new Array();
        
        //js 문법 
        //id 값이 있으면 true 그대로 사용 id 값이 없으면 참조 안하고 1넣기 
        this.todoIndex = !!this.todoList[this.todoList.length - 1]?.id ? this.todoList[this.todoList.length - 1].id +1 : 1;

    }

    saveLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }

    getTodoById(id) {
        console.log(this.todoList);
        console.log(this.todoList.filter(todo => todo.id === parseInt(id)));
        console.log(this.todoList.filter(todo => todo.id === parseInt(id))[0]);
    

        return this.todoList.filter(todo => todo.id === parseInt(id))[0];
    }


    addTodo(todoObj) {
        
        const todo = {
            ...todoObj, // ... 의미
            id: this.todoIndex
        }
        
        
        
        this.todoList.push(todo);

        this.saveLocalStorage();

//      ToDoListService.getInstance().updateTodoList();
        this.updateTodoList();
        
        this.todoIndex++;

    }

    setCompleStatus(id, status) {
        this.todoList.forEach((todo, index) => {
          if (todo.id === parseInt(id)) {
              this.todoList[index].completStatus = status;
          }  
        });

        this.saveLocalStorage();
    }

    setTodo(todoObj) {
        for (let i = 0; i < this.todoList.length; i++) {
            if (this.todoList[i].id === todoObj.id) {
                this.todoList[i] = todoObj;
                break;
            }
        }

        this.saveLocalStorage();
        this.updateTodoList();
    }



    removeTodo(id) {
        // filter: 걸러내는역할 , true 인 애들로만 새로운 배열에 만들기 ?
        this.todoList = this.todoList.filter((todo) => {
            return todo.id !== parseInt(id);
        });

        this.saveLocalStorage();
        this.updateTodoList();
    }


    updateTodoList() {
        const todoListMainContainer = document.querySelector(".todolist-main-container");


        todoListMainContainer.innerHTML = this.todoList.map(todo => {
            return `
                <li class="todolist-items">
                    <div class="item-left">
                        <input type="checkbox" id="complet-chkbox${todo.id}" class="complet-chkboxs" ${todo.completStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
                        <label for="complet-chkbox${todo.id}"></label>
                    </div>
                    <div class="item-center">
                        <pre class="todolist-content">${todo.todoContent}</pre>
                    </div>
                    <div class="item-right">
                        <p class="todolist-date">${todo.createDate}</p>
                        <div class="todolist-item-buttons">
                            <button class="btn btn-edit" value = "${todo.id}" onclick ="modifyTodoOnClickHandle(this);">수정</button>
                            <button class="btn btn-remove" value ="${todo.id}" onclick ="deleteTodoOnClickHandle(this);">삭제</button>
                        </div>
                    </div>                                
                </li>
            `;
        }).join("");
    }
}
