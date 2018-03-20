
$(document).ready(function(){
    $('.modal').modal();
    $('select').material_select();
});



Vue.component('assignments', {
  props: ['entry', 'id', 'isrequired', 'submitted'],
  template:"#assignment-template",
  methods: {
    openAssign() {
        console.log("pressed open assignment button on id=%i!", this.id);
        this.$emit('update-curr-open-assignment-id', this.id);
    }
  }
})

Vue.component('create-assignment', {
  data() {
    return {

        title: '',
        desc: '',
        points: '',
        required: ''

    }
  },
  template:"#create-assignment-template",
  methods: {
    createAssign() {
        console.log("pressed create assignment button with title=%s!", this.title);
        this.$emit('create-assignment', this.title, this.desc, parseInt(this.points), this.required);
    }
  }
})


var app = new Vue({
  el: '#app',
  data: {
    locked: true,
    credit: true,
    points: 0,
    keys: 0,
    pointsToUnlock: 120,
    expBarPercent: "0%",
    keysToUnlock: 2,
    assignmentList: [
      {id:0, title:"Main Quest 1", description:"Write an ancient essay!", required:true, points:50, submitted:false, earnedPoints:0},
	  {id:1, title:"Main Quest 2", description:"Write another ancient essay!", required:true, points:50, submitted:false, earnedPoints:0},
	  {id:2, title:"SideQuest 1 - Quiz", description:"Slay a quiz dragon!", required:false, points:20, submitted:false, earnedPoints:0},
	  {id:3, title:"SideQuest 2 - Quiz", description:"Slay another quiz dragon!", required:false, points:20, submitted:false, earnedPoints:0}
    ],
    newestAssignId: 4,
    currOpenAssignmentId: -1
  },
  methods: {
    submitAssign() {
        console.log("submit clicked!!");

        var currAssign = this.assignmentList[this.currOpenAssignmentId];
        var remPoints = this.assignmentList[this.currOpenAssignmentId];
        if(currAssign.submitted === true) {
            if(this.credit === true) {
                this.points += currAssign.points - currAssign.earnedPoints;
                currAssign.earnedPoints = currAssign.points;
            }
            else {
                // this.points = this.points  + (currAssign.points / 4);
                // currAssign.earnedPoints = currAssign.points/4;
            }
        }
        if(!currAssign.submitted){
            if(this.credit === true) {
                this.points += currAssign.points;
                currAssign.earnedPoints = currAssign.points;
            }
            else {
                this.points = this.points + (currAssign.points / 2);
                currAssign.earnedPoints = currAssign.points / 2;
            }
            if(currAssign.required){
                this.keys += 1;
            }
            
        }

        currAssign.submitted = true;
        if (this.points >= this.pointsToUnlock && this.keys >= this.keysToUnlock) {
            this.locked = false;
        }
        this.calculateNewExpBarPercentage();
    },
    addNewAssign(newTitle, newdesc, newpoints, newrequired) {
        this.assignmentList.push({id:this.newestAssignId++, title:newTitle, description:newdesc, required:newrequired, points:newpoints, submitted:false, earnedPoints:0});
        if(newrequired){
            this.keysToUnlock++;
            this.pointsToUnlock += newpoints;
        }
        console.log("pressed create button!");
        this.calculateNewExpBarPercentage();
    },
    updateCurrOpenAssignmentId(arg) {
        console.log("caught event!");
        this.currOpenAssignmentId = arg;
    },
    calculateNewExpBarPercentage() {
        this.expBarPercent = Math.floor((this.points/this.pointsToUnlock)*100).toString() + "%";
    },
    halfCredit() {
        this.credit = false;
        console.log("halfCredit was chosen!");
    },
    fullCredit() {
        this.credit = true;
        console.log("fullCredit was chosen!");
    }
  }

})




