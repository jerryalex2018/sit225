

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

        const stude = {
            rank: studentData.length + 1,
            name: document.getElementById("nemi").value,
            registrationNumber: document.getElementById("nami").value,
            cat: document.getElementById("numi").value,
            exam: document.getElementById("nimi").value


        }

        //the object is now pushed to the array studentData
        studentData.push(stude);
        
// storing data to local storage
localStorage.setItem(("students"),JSON.stringify(studentData))

//clear form

        formEl.reset()

        //calling the function that creates a table of the student data

        // studentdisplay()
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
</tr>
</thead>

<tbody>
${studentData.map(studi => `
   
<tr>
<td> ${studi.rank}</td>
<td> ${studi.name}</td>
<td> ${studi. registrationNumber}</td>
<td> ${studi.cat}</td>
<td> ${studi.exam}</td>
</tr>

    `).join("")}

</tbody>

</table>

`

}

}
studentdisplay()