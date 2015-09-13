var app = angular.module('tasksApp',[]);

app.controller('TasksController',['$scope','$http', function($scope,$http){
    //create tasks object to hold tasks list and add, delete, get, and update functions
    $scope.tasks = {
        //set taskList to be an empty list initially
        taskList: [],
        //get tasks from database
        getTasks: function(){
            $http.get('/api/todos').
                then(function(response){
                    //update tasks list with current tasks in database
                    updateTaskList(response.data);
                });
        },
        //add tasks to database
        addTask: function(){
            //re-initialize the task list
            $scope.tasks.taskList = [];
            //post new task
            $http.post('/api/todos',$scope.newTask).
                then(function(response){
                    //update tasks list with current tasks in database
                    updateTaskList(response.data);
                });
            //set text area to be blank after post
            $scope.newTask = '';
        },
        //delete tasks from database based on id
        deleteTask: function(id){
            //delete task
            $http.delete('/api/todos/'+id).
                then(function(response){
                    //update tasks list with current tasks in database
                    updateTaskList(response.data);
                })
        },
        updateTask: function(id,task,complete){
            var updatedTask = {
                text: task,
                complete: !complete,
                _id: id
            };
            $http.put('/api/todos',updatedTask).
                then(function(response){
                    //update tasks list with current tasks in database
                    updateTaskList(response.data);
                })
        }
    };

    //update task list
    function updateTaskList(data){
        $scope.tasks.taskList = data;
    }
    //update DOM when page loads
    $scope.tasks.getTasks();

}]);
