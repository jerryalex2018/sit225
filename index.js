

let secs = document.querySelector(".seconds");
let mins = document.querySelector(".minutes");
let hours = document.querySelector(".hours");
let amPm = document.querySelector(".ampm")

const navSection = document.getElementById("nav-sec")
const navToggleBtn = document.getElementById("togglebtn")
if(navSection && navToggleBtn){
    navToggleBtn.addEventListener("click",function(){
    navSection.classList.toggle("close")
    navToggleBtn.classList.toggle("rotate")
})

}

// console.log(navToggleBtn)


if(amPm){
    function all(){
    let time = new Date()
let hr= time.getHours()
let min = time.getMinutes()
let sec = time.getSeconds()
console.log(time)

if(hr>=12){
    amPm.textContent = "PM"
}
else{
    amPm.textContent = "Am"
}

 const formathour = String(hr).padStart(2,"0")
 const formatminute = String(min).padStart(2,"0")
 const formatsecond = String(sec).padStart(2,"0")

hours.innerHTML = formathour + ":"
mins.innerHTML = formatminute + ":"
secs.innerHTML = formatsecond


}

all()
setInterval(all,1000)
}

// handling form submission logic

// get the form by it id
let formEl = document.getElementById("formm");

let studentDetailsEl =  document.querySelector(".student-details");

let studentData = JSON.parse(localStorage.getItem("students")) || [];

if(formEl){
    formEl.addEventListener("submit",function(e){
        e.preventDefault();


        // in the block of code below , an object is created from the form data submited
        
          const cut = parseFloat(document.getElementById("numi").value) ;
        const exum = parseFloat(document.getElementById("nimi").value) ;
        let total = cut + exum
        function calculateGrade(totol){
            if(totol>= 70 && totol <=100){
                return "A"
            }else if(totol>=60 && totol< 70){
                return "B"
            }else if(totol>=50 && totol<60){
                return "c"
            }else if(totol>=40 && totol<50){
                return "D"
            }else{
                return "Fail"
            }
            
        }
    

        const stude = {
            rank: studentData.length + 1,
            name: document.getElementById("nemi").value,
            registrationNumber: document.getElementById("nami").value,
            cat: cut,
            exam: exum,
            Total: total,
            Grade: calculateGrade(total)


        }
        console.log(stude)
        if(stude.cat <0 || stude.cat >30){
            alert("invalid, try a valid range")
            return
        }else if(stude.exam <0 || stude.exam>70){
            alert("invalid, try a valid range")
return
        }

        //the object is now pushed to the array studentData
        studentData.push(stude);
        
// storing data to local storage
localStorage.setItem(("students"),JSON.stringify(studentData))

//clear form

        formEl.reset()

        //calling the function that creates a table of the student data

        studentdisplay()
        updateStudentStats();
    })
}

//the actuall function

function studentdisplay(){
    const studtable = document.getElementById("nostud")
  if(studtable){
      if(studentData.length === 0){
        studtable.innerHTML = `<div class="nodata-found">
         No registered student yet
        </div>`
        return;
    }
  }

//using the map function to generate table content
if(studentDetailsEl){
    studentDetailsEl.innerHTML = `
<h3>Student List</h3>



<table>
<thead>
<tr>
<th>Order</th>
<th>FullName</th>
<th>Registration N.o</th>
<th>Cat</th>
<th>Exam</th>
<th>Total</th>
<th>Grade</th>
<th>Clear</th>
</tr>
</thead>

<tbody>
${studentData.map((studi,index) => `
   
<tr>
<td> ${index+1}</td>
<td> ${studi.name}</td>
<td> ${studi.registrationNumber}</td>
<td> ${studi.cat}</td>
<td> ${studi.exam}</td>
<td> ${studi.Total}</td>
<td> ${studi.Grade}</td>
<td>
<button class = "delete-btn" data-index = "${index}">
Delete
</button>
</td>
</tr>

    `).join("")}

</tbody>

</table>

`

}

}
studentdisplay()
updateStudentStats();


document.addEventListener("click",function(e){

    if(e.target.classList.contains("delete-btn")){
        const index = e.target.dataset.index;

                studentData.splice(index, 1);

                        localStorage.setItem("students", JSON.stringify(studentData));

studentdisplay()
updateStudentStats();


    }

})


function updateStudentStats() {
    const avgEl = document.getElementById("averageValue");
    const topNameEl = document.getElementById("topName");
    const topRegEl = document.getElementById("topReg");

    if (!avgEl || !topNameEl || !topRegEl) return;

    if (studentData.length === 0) {
        avgEl.textContent = "0";
        topNameEl.textContent = "name";
        topRegEl.textContent = "registration number";
        return;
    }

    //  Calculate average
    const totalMarks = studentData.reduce((sum, stud) => sum + stud.Total, 0);
    const average = (totalMarks / studentData.length).toFixed(1);
    avgEl.textContent = average;

    //  Find best performing student
    let topStudent = studentData[0];

    studentData.forEach(stud => {
        if (stud.Total > topStudent.Total) {
            topStudent = stud;
        }
    });

    topNameEl.textContent = topStudent.name;
    topRegEl.textContent = topStudent.registrationNumber;
}