module.factory('LocalstorageService', function() {
console.log("in service file of LocalstorageService ");
return {
  storage_service : function(token, method) {
	  console.log("token = ",token);
	  if(method == 'get'){
  		localStorage.getItem('token')
  		}
  	else {
  		localStorage.setItem('token',token)
  	}
  },
};
});
