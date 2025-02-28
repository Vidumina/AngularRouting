﻿/// <reference path="angular.min.js" />
/// <reference path="angular-route.min.js" />



var app = angular.module("Demo", ["ngRoute"])
    
    .config(function ($routeProvider,$locationProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "Templates/home.html",
                controller: "homeController",
                controllerAs:"homeCtrl"
            })
            .when("/courses", {
                templateUrl: "Templates/courses.html",
                controller: "coursesController",
                controllerAs: "coursesCtrl"
            })
            .when("/students", {
                templateUrl: "Templates/students.html",
                controller: "studentsController",
                controllerAs: "studentsCtrl"
            })
            .when("/students/:id", {
                templateUrl: "Templates/studentDetails.html",
                controller: "studentDetailsController",
                controllerAs: "studentDetailsCtrl"
            })
            .otherwise({
                redirectTo: "/home"
            });
        $locationProvider.html5Mode(true);


    }).controller("homeController", function () {
        this.message = "Home Page";

    }).controller("coursesController", function () {
        this.courses = ["C#", "VB.NET", "SQL Server", "ASP.NET"];


    }).controller("studentsController", function ($http) {

        var vm = this;
         $http.get("StudentService.asmx/GetAllStudents").then(function (response) {

             vm.students = response.data;

        });

    })
    .controller("studentDetailsController", function ($http, $routeParams) {
        var vm = this;

        $http({
            url: "StudentService.asmx/GetStudent",
            params: { id: $routeParams.id },
            method:"get"
        }).then(function (response) {

            vm.student = response.data;

        });

    });


