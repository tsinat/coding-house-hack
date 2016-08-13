
"use strict";

var app = angular.module("nameOfApp", ['ngFileUpload']);

app.controller("mainController", function ($scope, Upload, $http) {
   console.log("Main Controller");

   $scope.submitFile = function () {
       Upload.upload({
           url: "/api/S3/addToBucket",
           data: { newFile: $scope.file }
       })
           .then(function (response) {
               console.log("Response: ", response);
           })
           .catch(function (error) {
               console.log("Error: ", error);
           })
   };

   $scope.submitMultipleFiles = function () {
       console.log("Files: ", $scope.newFiles);
       console.log("Files0: ", $scope.newFiles[0]);
       console.log("Files1: ", $scope.newFiles[1]);
       Upload.upload({
           url: "/api/S3/addMultipleToBucket",
           arrayKey: "",
           data: {
               newFiles: $scope.newFiles
           }
       })
           .then(function (response) {
               console.log("Response: ", response);
            })
           .catch(function (error) {
               console.log("Error: ", error);
           });

   };


   $scope.retrieveFile = function () {

       $http.put("/api/S3/getFromBucket", $scope.fileToRetrieve)
           .then(function (response) {
               console.log("Response: ", response.data);
               $scope.fileReceived = response.data;
           })
           .catch(function (error) {
               console.log("Error: ", error);
           })
   };


});

app.controller('visionCtrl', function($scope, $http){

    $scope.submitVision = () => {
        console.log($scope.imageUrl);
        var obj = {
            url: $scope.imageUrl
        }
        $http.post('/api/computerVisions', obj)
            .then(res => {
                // console.log(res);
                updateData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    function updateData(value){
        console.log(value);
        $scope.myData = value;
    }

});
