var all_assigns = [];



$(document).ready(function(){ 
	var assign1 = {id:1, title:"Task 1", description:"Write an essay!", required:true, points:50};
	var assign2 = {id:2, title:"Task 2", description:"Write another essay!", required:true, points:50};
	var assign3 = {id:3, title:"Quiz", description:"Take a quiz!", required:false, points:20};
	var assign4 = {id:4, title:"Quiz", description:"Take an alternative quiz!", required:false, points:20};
	var assign5 = {id:5, title:"Quiz5", description:"Take an alternative quiz!", required:false, points:20};
	
	all_assigns.push(assign1);
	all_assigns.push(assign2);
	all_assigns.push(assign3);
	all_assigns.push(assign4);
	//all_assigns.push(assign5);
	
  
  
  $("#assignments-container").html(fn.getHtml());
  
  $("#create-assignment-lvl1").click(function(){
	  all_assigns.push({id:5, title:"Task 5", description:"Just do... something", required:false, points:5});

	  $("#assignments-container").html(fn.getHtml());
	  console.log("pressed button!");
  });
  

	
});

var fn = { getHtml() {
	var assigns_html = ""
	for(j=0; j<Math.floor((all_assigns.length + 3)/4); j++){
	  
        assigns_html += "<div class=\"row\">\n";
        for(i=0; i<4; i++){
            if(i+4*j >= all_assigns.length){
                break;
            }
            var curr_assign = all_assigns[i+4*j];
            assigns_html += `<div class="col s3">
                                      <div class="card grey darken-1">
                                        <div class="card-content white-text">
                                          <span class="card-title">`;
            assigns_html += curr_assign.title;
            assigns_html += "</span>\n";
            assigns_html += "<p>";
            assigns_html += curr_assign.description;
            assigns_html += "</p>";
            assigns_html += `</div>
                                        <div class="card-action">
                                          <a href="assignment.html">Start</a>
                                        </div>
                                      </div>
                                    </div>`;
		   
	  }
  
	  assigns_html += "</div>";
	}
  
	return assigns_html;
	}
}

var app = new Vue({
  el: '#app',
  data: {
    locked: true,
    points: 0,
},
methods: {
    submitAssign: function() {
        this.points = this.points +5;
        if (this.points === 20) {
            this.locked = false;
        }
    }
}

})

$(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});
