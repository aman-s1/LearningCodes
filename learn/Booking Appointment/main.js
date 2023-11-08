const form = document.getElementById('myForm');
const submitBtn = document.getElementById('submitBtn');

window.loadData();


submitBtn.addEventListener('click', function(e) {
   
    e.preventDefault();

    const name = form.elements['name'];
    const email = form.elements['email'];
    const phone = form.elements['phone'];

    const user = {
        name : name.value,
        email : email.value,
        phone : phone.value
    };

    // localStorage.setItem(user.email, JSON.stringify(user));
    axios.post("https://crudcrud.com/api/8a631ef165e74f379417fe03129f6172/appointments", user).then((result) => {
        
        toshow(result.data);
    }).catch((err) => {
     console.log(err);   
    });


    name.value = "";
    email.value = '';
   phone.value = '';
    
});


                 // get data form server


function loadData() {
        axios.get("https://crudcrud.com/api/8a631ef165e74f379417fe03129f6172/appointments").then((result) => {
            result.data.forEach(element => {
                toshow(element);        
                console.log(element);
            });
        
       
    }).catch((error) => console.log(error));

}


                                                    
              // show data on DOM
function toshow(obj){
      
    
   const parentElem = document.getElementById('listOfItems');
   const childElem = document.createElement('li');

//    DELETE BUTTON
   var deltebtn = document.createElement('button');
   deltebtn.appendChild(document.createTextNode('Delete'));

   childElem.textContent = obj.name + ' - ' + obj.email + ' - ' + obj.phone;

   childElem.appendChild(deltebtn);

   //EDIT BUTTON
   var editbtn = document.createElement('button');
   editbtn.appendChild(document.createTextNode('edit'));
   childElem.appendChild(editbtn);
    
//    // add both in li
   parentElem.appendChild(childElem);
   

   // delte button function
deltebtn.addEventListener('click', (e)=> {
      e.preventDefault();
  
      //deleting data from row

     axios.delete("https://crudcrud.com/api/8a631ef165e74f379417fe03129f6172/appointments" + obj._id).then((result)=>
     {  
        // console.log(result);
        console.log("data deleted for " + obj.name);
        })
     .catch((error)=>console.log(error));
      var li = e.target.parentElement;
      parentElem.removeChild(li);
  
  });


  editbtn.addEventListener('click', (e)=>{
    e.preventDefault();
    
    // var userData;
    
    axios.get("https://crudcrud.com/api/9b13972b29e84152a7f1e7906984238f/createData/" + obj._id).then((result) => {
                 
            console.log(result);
            dataEdit(result.data)
        }).catch((error) => console.log(error));
  
      
      // data to enter in form
        function dataEdit(userData){

            const submitBtn = document.getElementById('submitBtn');
            submitBtn.style.display = 'none';

            let updatedBtn = document.getElementById('updateBtn');
            updatedBtn.style.display = 'inline';
            
    
    let name = form.elements['name'];
    let email = form.elements['email'];
    let phone = form.elements['phone'];
            
    name.value = userData.name;
    email.value = userData.email;
    phone.value = userData.phone;
        
    
    
    // to update the dataa
    
    updatedBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        const namee = form.elements['name'];
        const emaill = form.elements['email'];
        const phonee = form.elements['phone'];
    
        let updatedUser = {
            name : name.value,
            email : email.value,
            phone : phone.value
        };

        
        axios.put("https://crudcrud.com/api/9b13972b29e84152a7f1e7906984238f/createData/" + obj._id, updatedUser).then((result)=>
        {  console.log(result)
            console.log('data updated surccessfully'+ result);
            console.log(result.config.data);
           
           })
        .catch((error)=>console.log(error));

        updatedBtn.style.display = 'none';
        submitBtn.style.display = 'inline';
        
    })
  
  
}
})
    
}
