document.addEventListener('DOMContentLoaded', function() //keeping the script from running until the page fully loads
{
    fetch('http://127.0.0.1:8000/medicines') //retrieving the list of medicines to display it
    .then(response => response.json())
    .then(data => {console.log(data);
        if (data.medicines)
            {
                //looping through the medicines and creating a new div for each
                var medicinesList = document.getElementById('medicine-list');
                medicinesList.innerHTML = '';
                for (var i = 0; i < data.medicines.length; i++)
                {
                    var medicine = data.medicines[i];
                    var medicineDiv = document.createElement('div');
                    medicineDiv.className = 'medicine-items';
        
                    var name;
                    if (medicine.name && medicine.name != ""){
                        name = medicine.name;
                    }
                    else{
                        name = "Name: Unavailable";
                    }
        
                    var price;
                    if(medicine.price !== null && medicine.price != undefined){
                        price = '$' + medicine.price;
                    }
                    else{
                        price = "Unavailable";
                    }
                    medicineDiv.innerHTML = '<h2>' + name + '</h2><p>Price: ' + price + '</p>';
                    medicinesList.appendChild(medicineDiv);
                }
            }
            else
            {
                console.log('No medicines found');
                var medicinesList = document.getElementById ('medicines-list');
                medicinesList.innerHTML = '<p>No medicines available at the moment</p>';
            }
    }
    )
    .catch(error => console.log(error));
  
    fetch('http://127.0.0.1:8000/average-price') //retrieving the average price using the new API endpoint in the backend
    .then(response => response.json())
    .then(data => {console.log(data);
        //creating a new div to show the average price
        var medicinesList = document.getElementById('medicine-list');
        var averagePriceDiv = document.createElement('div');
        averagePriceDiv.id = 'average-price';
        averagePriceDiv.innerHTML = '<h2>Average Medicine Price: $' + data + '</h2>';
        medicinesList.appendChild(averagePriceDiv);
    }
)
    .catch(error => console.log(error));

    
    var form = document.getElementById('medicine-entry-form');
    form.reset();
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var newMedicine = document.getElementById('medicine-name').value;
        var newPrice = parseFloat(document.getElementById('medicine-price').value);

        if (newPrice == 0 || newPrice <= 0) {
            console.log('Invalid price value');
            return;  // Prevent sending the request if price is invalid
        }
        else
        {
            fetch('http://127.0.0.1:8000/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'name': newMedicine, 'price': newPrice
                })
            })
            .then (response => response.json())
            .then(data => {console.log(data);     
                if (data === null) {
                    console.log('Error adding medicine');
                } else {
                    console.log('New medicine added ', data.message);
                    location.reload();
                    form.reset();
                }
            })
            
            .catch(error => console.log(error))
        }
    })

    

})