//collect all links in the sidebar
const dropdownMenus = document.querySelectorAll('.link');

//loop through each link to the dropdown menu
dropdownMenus.forEach(menu => {
    
    //add click eventListener to open the dropdown.
    menu.addEventListener("click", (e)=>{
       const dropdown = e.currentTarget.querySelector(".dropdown");
        //add active class to the clicked dropdown menu
       dropdown.classList.toggle("active");


       //check all the other dropdown menus to close if the current is open
       dropdownMenus.forEach(otherMenu => {
        const otherDrop = otherMenu.querySelector(".dropdown");
        if(otherMenu !== menu){
            if(otherDrop.classList.contains("active")){
                otherDrop.classList.remove("active");
            }
        }
        
    })
    })

    
});


//Update Form Method
const form = document.getElementById("updateForm");

// form.addEventListener('submit', (e)=>{
//     e.preventDefault()

//     const formData = new FormData(e.currentTarget)
//     formData.append('_id', '<%= student._id %>')

//     const options = {
//         method: 'PUT', //request method
//         body: JSON.stringify(formData), //payload
//         header: {
//             'Content-type': 'multipart/form-data' //content type
//         }
//     }

//     //get the data and send it to the destnation 
//     fetch(e.currentTarget.action, options)
//     .then(response =>{
//         //check the fetch is okk
//         if(!response.ok){
//             throw new Error('Something went wrong 😒')
//         }

//         return response.json() // parse data as json data
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch((error)=>{
//         alert(error.message)
//     })
// })


