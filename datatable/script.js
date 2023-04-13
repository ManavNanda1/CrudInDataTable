let arr=[];
$(document).ready(function () {

    // ---------------- Adding OF Data in Table -------------- //
    $("#Savebtn").on('click' , function () { 
        let id = 1;
        let name = $("#name").val();
        let email = $("#email").val();
        let mark = $("#mark").val(); 
        let buttons = `<button class="btn btn-danger text-center" id="rembtn">Remove</button>
                    <button class="btn btn-warning text-center" data-bs-toggle="modal" data-bs-target="#exampleModal" id="editbtn">Edit</button>`
    
        if(name=='' || email=='' || mark==''){
            alert("Please fill all the fields");
            return;
        }
        else{
            let table = $("#SavedTable").DataTable();
            table.row.add([id,name, email, mark, buttons]).draw(false);
            $("#name").val('');
            $("#email").val('');
            $("#mark").val('');
            changeid("SavedTable");

            arr.push({
                name: name,
                email: email,
                mark: mark  
            })
            console.log(arr);
        }
    })
 

    //---------------------- Removing Of Row From Table ------------- //
    $("#SavedTable").on('click','#rembtn',function(){
        let tr =   $(this).closest('tr')
        let table = $("#SavedTable").DataTable();
        table.rows(tr).remove().draw(false);
        changeid("SavedTable");
    })

    //---------------------- Editing Of Row From Table ------------- //
    $("#SavedTable").on('click','#editbtn',function(){
        try{
            let tr = $(this).closest('tr');
            let Name = tr.find('td:eq(1)').html();
            let Email = tr.find('td:eq(2)').html();
            let Mark = tr.find('td:eq(3)').html();
            
            $("#name").val(Name);
            $("#email").val(Email);
            $("#mark").val(Mark);

            $("#Savebtn").on('click',function(){
             try{ 
                let table = $("#SavedTable").DataTable();
                let tr1 = $(tr);
                let rowdata = table.row(tr1).data();
                rowdata[1] = $("#name").val();
                rowdata[2] = $("#email").val();
                rowdata[3] = $("#mark").val();
                table.row(tr1).data(rowdata).draw(false);
                changeid("SavedTable");
            }catch(e){
                alert("Some Error during updation"+ e)
            }
               
            })
       }
       
       catch(e){
            alert("Error Updating in Code " + e)
        }
         })
// ----------------------- Form Validation -------------------//
    $("#mark").on("keydown",function(event){
        let markValue = $("#mark").val()
        
        if(event.key==="e"){
            event.preventDefault();
        }
        if(markValue <0 || markValue>100){
            alert("Please enter a value between 0 and 100");
            $("#mark").val('')
            return;
        }
    })

});

//-------------------------- Change ID Function -----------------//
function changeid(tableid){
    let tr = document.getElementById(tableid).rows;
    for(let i=1; i<tr.length; i++){
        tr[i].cells[0].innerHTML =i;
    }
}

// ------------ Attach a blur event handler to the input fields -----//
$("#form input").on("blur", function() {
    if ($(this).val() !== "") {
      $(this).addClass("filled-input");
    } else {
      $(this).removeClass("filled-input");
    }
  });
  
