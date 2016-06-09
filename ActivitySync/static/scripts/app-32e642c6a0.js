!function(){"use strict";angular.module("playNow",["ngAnimate","restangular","ui.router","ngMaterial","toastr","facebook","ngMaterialDatePicker"])}(),function(){"use strict";function t(t,e,n,a,o){t.get("/disciplines/all").then(function(t){e.disciplines=t.data}),t.get("/events/all").then(function(t){e.events=t.data}),e.facebookStatus=a,e.events=[],e.sportEvent={disciplineID:0,players:"",since:o(),to:o().add(1,"days"),address:""},e.getEvents=function(){t.get("/events/find",{params:{disciplineID:e.sportEvent.disciplineID,since:o(e.sportEvent.since),to:o(e.sportEvent.to),address:e.sportEvent.address.toString()||null}}).then(function(t){console.log(t.data),e.events=t.data})},e.openEvent=function(t){n.go("event",{eventID:t})},e.setNow=function(){e.sportEvent.since=o()},e.setDayAgo=function(){e.sportEvent.since=o().subtract(1,"days")},e.setWeekAgo=function(){e.sportEvent.since=o().subtract(1,"weeks")},e.setDay=function(){e.sportEvent.to=o().add(1,"days")},e.setWeek=function(){e.sportEvent.to=o().add(1,"weeks")},e.setMonth=function(){e.sportEvent.to=o().add(1,"months")}}t.$inject=["$http","$scope","$state","facebookStatus","moment"],angular.module("playNow").controller("MainController",t)}(),function(){"use strict";function t(t,e,n,a,o){e.facebookStatus=a;var i=n.eventID;console.log(i),e.facebookStatus=a,e.e={},e.commentContent="",e.teams=[],e.comments=[],t.get("/events/"+i).then(function(t){console.log(t.data),e.e=t.data;var n={lat:50.061671,lng:19.942382},a=50.061671,o=19.942382;null!=e.e.coordinates&&(a=parseFloat(e.e.coordinates.split(",")[0]),o=parseFloat(e.e.coordinates.split(",")[1]));var i=new google.maps.Map(document.getElementById("google-map"),{zoom:12,center:n});new google.maps.Marker({position:{lat:a,lng:o},map:i});i.panTo({lat:a,lng:o})})}t.$inject=["$http","$scope","$stateParams","facebookStatus","$state"],angular.module("playNow").controller("EventController",t)}(),function(){"use strict";function t(t,e,n,a,o,i){function l(t,e){null!=c&&c.setMap(null),c=new google.maps.Marker({position:t,map:e})}var s=a.eventID;e.disciplines=[],t.get("/disciplines/all").then(function(t){e.disciplines=t.data}),e.sportEvent={};var d={lat:50.061671,lng:19.942382},r=new google.maps.Map(document.getElementById("google-map"),{zoom:12,center:d}),c=null;o.logged&&t.get("/events/find/"+s).then(function(t){console.log(t.data),e.sportEvent=t.data;var n=parseFloat(e.sportEvent.coordinates.split(",")[0]),a=parseFloat(e.sportEvent.coordinates.split(",")[1]);c=new google.maps.Marker({position:{lat:n,lng:a},map:r}),r.panTo({lat:n,lng:a}),r.addListener("click",function(t){l(t.latLng,r)})}),e.save=function(){t.defaults.headers.common.eventID=s,t.post("/events/updateSportsEvent/"+s,{address:e.sportEvent.address.toString()||null,disciplineID:parseInt(e.sportEvent.disciplineID),date:i(e.sportEvent.date),level:e.sportEvent.level,coordinates:c.getPosition().lat()+","+c.getPosition().lng(),numberOfFreePlaces:parseInt(e.sportEvent.numberOfPlayers),eventDescription:e.sportEvent.description.toString()||null,reserveList:e.sportEvent.reserveList}).then(function(t){n.go("event",{eventID:s})})}}t.$inject=["$http","$scope","$state","$stateParams","facebookStatus","moment"],angular.module("playNow").controller("EditEventController",t)}(),function(){"use strict";function t(t,e,n,a,o){function i(t,e){null!=c&&c.setMap(null),c=new google.maps.Marker({position:t,map:e})}if(e.facebookStatus=a,e.disciplines=[],e.sportEvent={disciplineID:"",date:new Date,address:"",lat:"",lng:"",description:"",places:10},e.create=function(){t.post("/events/create",{address:e.sportEvent.address.toString()||null,disciplineID:parseInt(e.sportEvent.disciplineID),date:o(e.sportEvent.date),lat:c.getPosition().lat(),lng:c.getPosition().lng(),places:parseInt(e.sportEvent.places),description:e.sportEvent.description.toString()||null}).then(function(t){n.go("home")})},a.logged){t.get("/disciplines/all").then(function(t){e.disciplines=t.data});var l={lat:50.061671,lng:19.942382},s=50.061671,d=19.942382,r=new google.maps.Map(document.getElementById("google-map"),{zoom:12,center:l}),c=new google.maps.Marker({position:{lat:s,lng:d},map:r});r.panTo({lat:s,lng:d}),r.addListener("click",function(t){i(t.latLng,r)})}}t.$inject=["$http","$scope","$state","facebookStatus","moment"],angular.module("playNow").controller("CreateEventController",t)}(),function(){"use strict";function t(t){return{link:function(t,e,n){e.on("click",function(t){})},controller:["$scope","$http","$state","facebookStatus",function(t,e,n,a){t.go=function(t){n.go(t)}}],template:'<div class="menu" ng-if="facebookStatus.logged"><ul><li ng-click="go(\'home\')">Events</li><li ng-click="go(\'createEvent\')">Create event</li></ul></div>'}}t.$inject=["$window"],angular.module("playNow").directive("menuBar",t)}(),function(){"use strict";function t(){this.logged=!1,this.token=null}angular.module("playNow").service("facebookStatus",t)}(),function(){"use strict";function t(t){return{link:function(t,e,n){e.on("click",function(t){})},controller:["$scope","$http","$state","Facebook","facebookStatus",function(t,e,n,a,o){t.login=function(t,n){e.post("/api-auth-token",{username:t,password:n}).then(function(t){o.token=t.token,o.logged=!0,e.defaults.headers.common.Authorization=o.token,console.log("authorized")})},t.logout=function(){e.post("/logout").then(function(t){o.token=null,o.logged=!1,e.defaults.headers.common.Authorization=null,console.log("authorized")})}}],template:'<div class="fb" ng-if="!facebookStatus.logged"><md-input-container><label>Username</label><input type="text" ng-model="username"></md-input-container><md-input-container><label>Password</label><input type="password" ng-model="password"></md-input-container><md-input-container><md-button class="btn-fb md-raised md-primary" ng-click="login(username,password)" >Login</md-button><md-button class="btn-fb md-raised md-warn" ng-click="logout()" ng-if="facebookStatus.logged">Logout</md-button></md-input-container></div><div class="fb logout" ng-if="facebookStatus.logged"><md-input-container><md-button class="btn-fb md-raised md-warn" ng-click="logout()" ng-if="facebookStatus.logged">Logout</md-button></md-input-container></div>'}}t.$inject=["$window"],angular.module("playNow").directive("facebookBtns",t)}(),function(){"use strict";function t(t){t.debug("runBlock end")}t.$inject=["$log"],angular.module("playNow").run(t)}(),function(){"use strict";function t(t,e){t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).state("createEvent",{url:"/createEvent",templateUrl:"app/createEvent/createEvent.html",controller:"CreateEventController",controllerAs:"createEvent"}).state("editEvent",{url:"/editEvent/:eventID",templateUrl:"app/editEvent/editEvent.html",controller:"EditEventController",controllerAs:"editEvent"}).state("event",{url:"/event/:eventID",templateUrl:"app/event/event.html",controller:"EventController",controllerAs:"event"}).state("teams",{url:"/teams",templateUrl:"app/teams/teams.html",controller:"TeamsController",controllerAs:"teams"}).state("team",{url:"/team/:teamID",templateUrl:"app/team/team.html",controller:"TeamController",controllerAs:"team"}).state("teamsManager",{url:"/teamsManager",templateUrl:"app/teamsManager/teamsManager.html",controller:"TeamsManagerController",controllerAs:"teamsManager"}),e.otherwise("/")}t.$inject=["$stateProvider","$urlRouterProvider"],angular.module("playNow").config(t)}(),function(){"use strict";angular.module("playNow").constant("moment",moment)}(),function(){"use strict";function t(t,e,n){t.debugEnabled(!0),e.init("1107104462666270"),n.formatDate=function(t){return moment(t).format("YYYY-MM-DD")}}t.$inject=["$logProvider","FacebookProvider","$mdDateLocaleProvider"],angular.module("playNow").config(t)}(),angular.module("playNow").run(["$templateCache",function(t){t.put("app/createEvent/createEvent.html",'<div class=content><facebook-btns></facebook-btns><section class=jumbotron><h1>ActivitySync!</h1></section><menu-bar></menu-bar><div class=center ng-show=facebookStatus.logged><div class=event-details><div class="event-content create-event"><h2>Create new event</h2><div class=details><table><tr><td><md-input-container><label>Discipline</label><md-select ng-model=sportEvent.disciplineID aria-label=Select><md-option ng-repeat="d in disciplines" value={{d.id}} selected>{{d.name}}</md-option></md-select></md-input-container></td></tr><tr><td><md-input-container><label>Address</label><input ng-model=sportEvent.address></md-input-container></td></tr><tr><td><md-input-container><label>Places</label><input ng-model=sportEvent.places></md-input-container></td></tr><tr><td><md-input-container><input mdc-datetime-picker="" date=true time=true type=text id=datetime3 class=datetime placeholder=Date min-date=date ng-model=sportEvent.date class=md-input></md-input-container></td></tr><tr><td><md-input-container><label>Description</label><textarea ng-model=sportEvent.description></textarea></md-input-container></td></tr></table></div><md-button class="md-raised md-warn" ng-click=create();>Create</md-button></div><div class=event-map><h2>Map</h2><div id=google-map></div></div></div></div></div>'),t.put("app/editEvent/editEvent.html",'<div class=content><facebook-btns></facebook-btns><section class=jumbotron><h1>PlayNow!</h1></section><menu-bar></menu-bar><div class=center ng-show=facebookStatus.logged><div class=event-details><div class="event-content create-event"><h2>Edit event</h2><div class=details><table><tr><td><md-input-container><label>Discipline</label><md-select ng-model=sportEvent.disciplineID aria-label=Select><md-option ng-repeat="d in disciplines" value={{d.id}} ng-selected="d.id == sportEvent.discipline.id">{{d.name}}</md-option></md-select></md-input-container></td></tr><tr><td><md-input-container><label>Address</label><input ng-model=sportEvent.address></md-input-container></td></tr><tr><td><md-input-container><label>Players</label><input ng-model=sportEvent.numberOfPlayers></md-input-container></td></tr><tr><td><md-input-container class=checkbox><md-checkbox md-no-ink ng-model=sportEvent.reserveList class=md-primary>Reserve list</md-checkbox></md-input-container></td></tr><tr><td><md-input-container><label>Level</label><md-select ng-model=sportEvent.level aria-label=Select><md-option value=easy selected>easy</md-option><md-option value=medium>medium</md-option><md-option value=hard>hard</md-option></md-select></md-input-container></td></tr><tr><td><md-input-container><input mdc-datetime-picker="" date=true time=true type=text id=datetime3 class=datetime placeholder=Date min-date=date ng-model=sportEvent.date class=md-input></md-input-container></td></tr><tr><td><md-input-container><label>Description</label><textarea ng-model=sportEvent.description></textarea></md-input-container></td></tr></table></div><md-button class="md-raised md-warn" ng-click=save()>Save</md-button></div><div class=event-map><h2>Map</h2><div id=google-map></div><!--<img src="assets/map.png" />--></div></div></div></div>'),t.put("app/event/event.html",'<div class=content><facebook-btns></facebook-btns><section class=jumbotron><h1>ActivitySync!</h1></section><menu-bar></menu-bar><!--creator--><!--firstName	"Ksiadz"--><!--lastName	"Robak"--><!--email	"MickiewiczTo@gamil.com"--><!--reliability	0--><!--discipline--><!--name	"FootBall"--><!--uniqueID	"football"--><!--id	2--><!--sportEventID	18--><!--date	1461863241195--><!--address	"tam"--><!--level	"easy"--><!--description--><!--reserveList	true--><!--numberOfPlayers	12--><!--<div class="center" ng-if="facebookStatus.logged">--><div class=center><div class=event-details><div class=event-content><h2>Event</h2><div class=details><table><tr><td><md-icon aria-label=Menu class=material-icons>label_outline</md-icon></td><td>{{ e.discipline.name }}</td></tr><tr><td><md-icon aria-label=Menu class=material-icons>room</md-icon></td><td>{{ e.location.name }}</td></tr><tr><td><md-icon aria-label=Menu class=material-icons>insert_invitation</md-icon></td><td>{{ e.date | date: \'dd-MM-yyyy\' }}</td></tr><tr><td><md-icon aria-label=Menu class=material-icons>schedule</md-icon></td><td>{{ e.date | date: \'HH:mm\' }}</td></tr><tr><td><md-icon aria-label=Menu class=material-icons>group</md-icon></td><td>{{ e.places }}</td></tr></table></div><h2>Organizer</h2><div class=details><table><tr><td><md-icon aria-label=Menu class=material-icons>face</md-icon></td><td>{{ e.organizer.user.first_name }} {{ e.organizer.user.last_name }} ({{ e.organizer.creditability }})</td></tr><tr><td><md-icon aria-label=Menu class=material-icons>local_post_office</md-icon></td><td>{{ e.organizer.user.email }}</td></tr></table></div></div><div class=event-map><h2>Map</h2><div id=google-map></div></div><div class=description><h2>Description</h2><p>{{ e.description }}</p></div><div class=players><h2>Players</h2><table><tr ng-repeat="p in e.players"><td><md-icon aria-label=Menu class=material-icons>perm_identity</md-icon></td><td>{{ p.firstName }} {{ p.lastName }} ({{ p.reliability }})</td></tr></table><md-button ng-if=!e.userParticipant class="btn-join md-raised md-warn" ng-click=addMe()>Join</md-button></div></div></div></div>'),t.put("app/main/main.html",'<div class=content><facebook-btns></facebook-btns><section class=jumbotron><h1>ActivitySync!</h1></section><menu-bar></menu-bar><div class=left ng-if=facebookStatus.logged><!--<div class="left">--><md-input-container><label>Discipline</label><md-select ng-model=sportEvent.disciplineID aria-label=Select><md-option ng-repeat="d in disciplines" value={{d.id}} selected>{{d.name}}</md-option></md-select></md-input-container><md-input-container><input mdc-datetime-picker="" date=true time=true type=text id=datetime1 class=datetime placeholder=Since ng-model=sportEvent.since class=md-input><md-button class="date-select md-raised md-default" ng-click=setNow();>Now</md-button><md-button class="date-select md-raised md-default" ng-click=setDayAgo();>Day ago</md-button><md-button class="date-select md-raised md-default" ng-click=setWeekAgo();>Week ago</md-button></md-input-container><md-input-container><input mdc-datetime-picker="" date=true time=true type=text id=datetime2 class=datetime placeholder=To ng-model=sportEvent.to class=md-input><md-button class="date-select md-raised md-default" ng-click=setDay();>Day</md-button><md-button class="date-select md-raised md-default" ng-click=setWeek();>Week</md-button><md-button class="date-select md-raised md-default" ng-click=setMonth();>Month</md-button></md-input-container><!--<md-datepicker ng-model="sportEvent.since" md-placeholder="Since date"></md-datepicker>--><!--<md-datepicker ng-model="sportEvent.to" md-placeholder="To date"></md-datepicker>--><md-input-container><label>Address</label><input ng-model=sportEvent.address></md-input-container><md-button class="md-raised md-warn" ng-click=getEvents();>Filter</md-button></div><div class=right ng-if=facebookStatus.logged><!--<div class="right">--><div class=event ng-repeat="e in events"><div class="header header-football"><md-button class="md-raised btn-event-details" ng-click=openEvent(e.id)>Details</md-button>{{ e.discipline.name }}</div><div class=event-content><div class=details><table><tr><td><md-icon aria-label=Address class=material-icons>room</md-icon>{{ e.location.name}}</td><td><md-icon aria-label=Date class=material-icons>insert_invitation</md-icon>{{ e.date | date: \'dd-MM-yyyy\' }}</td></tr><tr><td><md-icon aria-label=Places class=material-icons>group</md-icon>{{ e.places }}</td><td><md-icon aria-label=Time class=material-icons>schedule</md-icon>{{ e.date | date: \'HH:mm\' }}</td></tr></table></div></div><div class=footer></div></div></div></div>')}]);
//# sourceMappingURL=../../maps/static/scripts/app-32e642c6a0.js.map
