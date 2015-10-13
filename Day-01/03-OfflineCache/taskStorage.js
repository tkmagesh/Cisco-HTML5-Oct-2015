 function getTaskStorage(){
        var storage = window.localStorage;
        function getAllTasks(){
            var result = [];
            for(var i=0; i<window.localStorage.length; i++){
                var taskId = window.localStorage.key(i);
                var taskObjAsString = window.localStorage.getItem(taskId);
                var task = JSON.parse(taskObjAsString);
                result.push(task);
            }
            return result;
        }
        function saveTask(task){
            storage.setItem(task.id, JSON.stringify(task));
        }
        function removeTask(taskId){
            storage.removeItem(taskId);
        }
        function toggleTask(taskId){
            var task = JSON.parse(storage.getItem(taskId));
            task.isCompleted = !task.isCompleted;
            storage.setItem(taskId, JSON.stringify(task));
        }
        return {
            getAll : getAllTasks,
            save : saveTask,
            remove : removeTask,
            toggle : toggleTask
        }
    }
