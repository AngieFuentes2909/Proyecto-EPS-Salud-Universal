 // Aquí puedes manejar el mensaje de error si el usuario coloca un número de identificación incorrecto
        document.querySelector('form').addEventListener('submit', function (event) {
            event.preventDefault();

            // Obtener los valores de los campos
            let idType = document.getElementById('identification-type').value;
            let idNumber = document.getElementById('identification-number').value;
            let password = document.getElementById('password').value;

            // Simula la verificación del número de identificación
            const validUsers = [
                { idType: 'cc', idNumber: '12345678', password: '123456' },
                { idType: 'ti', idNumber: '98765432', password: 'abcdef' },
                { idType: 'nit', idNumber: '1234567890', password: 'password' },
                { idType: 'ce', idNumber: '987654321', password: 'qwerty' }
            ];

            // Verificar si el usuario existe en la base de datos
            let userFound = validUsers.find(user => user.idType === idType && user.idNumber === idNumber && user.password === password);

            if (userFound) {
                alert('Inicio de sesión exitoso!');
            } else {
                // Muestra el mensaje de error
                document.querySelector('.error-message').style.display = 'block';
            }
        });