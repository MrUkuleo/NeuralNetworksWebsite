$(document).ready(function (){
    const linksHeader = $('#links > li > p');

    function isValidEmail(email) { // проверяем корректность введённой пользователем почты с помощью регулярного выражения
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email); // возвращаем true если введённый текст соответствует паттерну, и false если не соответствует.
    }

    linksHeader.parent().find('li').hide(); // скрываем содержимое списков
    $('#continue').parent().find('li').hide(); // скрываем содержимое списков

    linksHeader.mouseenter(function() { // при клике на параграф список раскрывается
        $(this).parent().find('li').slideToggle(200);
    });  
    
    $('#continue').click(function() { 
        if($('#email').val().trim() !== '' && isValidEmail($('#email').val().trim())) // проверка корректности почты. Если заполнено корректно - раскрываем список.
        {
            $(this).parent().find('li').show(200); // раскрытие списка
            $(this).hide(); // скрываем кнопку
            $('.showSendStatus').html('');
            $('#email').css('margin-left', '40px'); // выравниваем input по центру
            $('#email').css('border-color', 'black');
        }
        else 
        {
            $('#email').css('border-color', 'red');
            $('.showSendStatus').css('color', 'red');
            $('.showSendStatus').html('Введите корректный e-mail!');
        }
    });   

    $('#send').click(function() { // верификация и отправка данных
        var inputs = ['surname', 'name', 'text'];
        var email = $('#email').val().trim();

        let isAllFilled = true;
                
        // Проверка email
        if (email === '' || !isValidEmail(email)) {
            $('#email').css('border-color', 'red');
            isAllFilled = false;
        } else {
            $('#email').css('border-color', 'black');
        }
    
        // Проверка остальных полей
        inputs.forEach(input => {
            if($(`#${input}`).val() === '') {
                $(`#${input}`).css('border-color', 'red');
                isAllFilled = false;
            }
            else {
                $(`#${input}`).css('border-color', 'black');
            }
        });

        if(isAllFilled) {
            $('.showSendStatus').css('color', 'green');
            $('.showSendStatus').html(`Спасибо за обращение, ${$('#name').val()} ${$('#surname').val()}!`);

            inputs.forEach(input => { // очистка имени, фамилии и сообщения
                $(`#${input}`).val('');
            });

            // очистка остальных полей
            $('#email').val(''); 
            $('#otchestvo').val('');

            // скрытие списка
            $('#continue').parent().find('li').hide(200);
            $('#continue').show(); 
            $('#continue').html('Оставить'); 
        }
    });

    $('.card').hover(
        function() { // при наведении на карточку новости цвет текста меняем на синий и приподнимаем его наверх
            $(this).find('p').css('color', 'blue');
            $(this).find('p').animate({ marginTop: "-5px" }, 200);
        },

        function() { // когда курсор не касается карточки - возвращаем всё как было
            $(this).find('p').css('color', 'black');
            $(this).find('p').animate({ marginTop: "0" }, 200);
        }
    );
});