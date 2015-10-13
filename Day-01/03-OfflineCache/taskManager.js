
    (function(){
        var taskStorage = getTaskStorage();
        window.addEventListener("DOMContentLoaded", init);
        function init(){
            var btnAdd = document.getElementById("btnAdd");
            btnAdd.addEventListener("click", onBtnAddClick);

            var btnRemoveCompleted = document.getElementById("btnRemoveCompleted");
            btnRemoveCompleted.addEventListener("click", onBtnRemoveCompletedClick);
            window.addEventListener("storage", loadTasks);
            loadTasks();
        }
        function loadTasks(){
            document.getElementById("olTaskList").innerHTML = '';
            taskStorage.getAll().forEach(addToList);
        }
        function onBtnAddClick(){
            var taskName = document.getElementById("txtTask").value;
            //save in storage
            var taskId = Date.now().toString();
            var task = {
                id : taskId,
                name : taskName,
                isCompleted : false
            };
            taskStorage.save(task);
            addToList(task);
        }
        function addToList(task){
            var newTask = document.createElement("li");
            newTask.innerHTML = task.name;
            newTask.addEventListener("click", onTaskItemClick);
            newTask.setAttribute("data-task-id", task.id);
            if (task.isCompleted){
                newTask.classList.add("completed");
            }
            document.getElementById("olTaskList").appendChild(newTask);
        }

        function onBtnRemoveCompletedClick(){
            var taskItems = document.getElementById("olTaskList").children;
            for(var i=taskItems.length-1; i>=0; i--){
                var taskItem = taskItems[i];
                if (taskItem.classList.contains("completed")){
                    var taskId = taskItem.getAttribute("data-task-id");
                    taskStorage.remove(taskId);
                    taskItem.remove();
                }
            }
        }
        function onTaskItemClick(){
            this.classList.toggle("completed");
            var taskId = this.getAttribute("data-task-id");
            taskStorage.toggle(taskId);
        }
    })();
