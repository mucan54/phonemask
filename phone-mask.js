require([
    'jquery'
], function ($) {

    $(document).ready(function () {

        function automask(val) {
            if (val)
                return '0(' + val.slice(0, 3) + ') ' + val.slice(3, 6) + '-' + val.slice(6, 10);
            else
                return ""
        }

            $("input[name*='phone']").each(function () {

                if ($('#'+$(this).attr('id') + '-myphone').length) {
                    return;
                }

                number = automask($(this).val());
                $(this).hide().after('<input id="' + $(this).attr('id') + '-myphone" class="input-text required-entry my-phone-number" aria-required="true" type="text" maxlength="15" value="' + number + '" placeholder="0(XXX) XXX-XXXX" />');

                $('#' + $(this).attr('id') + '-myphone')

                    .on('input', function(){
                        //$('#' + $(this).attr('id').replace("-myphone", "")).val($(this).val().replace("0(", "").replace(")", "").replace(" ", "").replace("-", ""));
                        // Knockout binding .change()
                        $('#' + $(this).attr('id').replace("-myphone", "")).val($(this).val().replace("0(", "").replace(")", "").replace(" ", "").replace("-", "")).change();
                    })

                    .keydown(function (e) {
                        var key = e.which || e.charCode || e.keyCode || 0;
                        $phone = $(this);

                        // Don't let them remove the starting '('
                        if ($phone.val().length === 2 && (key === 8 || key === 46)) {
                            $phone.val('0(');
                            return false;
                        }
                        // Reset if they highlight and type over first char.
                        else if ($phone.val().charAt(0) !== '0') {
                            $phone.val('0(' + String.fromCharCode(e.keyCode) + '');
                        }

                        // Auto-format- do not expose the mask as the user begins to type
                        if (key !== 8 && key !== 9) {
                            if ($phone.val().length === 5) {
                                $phone.val($phone.val() + ')');
                            }
                            if ($phone.val().length === 6) {
                                $phone.val($phone.val() + ' ');
                            }
                            if ($phone.val().length === 10) {
                                $phone.val($phone.val() + '-');
                            }
                        }


                        // Allow numeric (and tab, backspace, delete) keys only
                        return (key == 8 ||
                            key == 9 ||
                            key == 46 ||
                            (key >= 48 && key <= 57) ||
                            (key >= 96 && key <= 105));

                    })
                    .bind('focus click', function () {

                        $phone = $(this);
                        $phone.css("background-color", "white");
                        if ($phone.val().length === 0) {
                            $phone.val('0(');
                        } else {
                            var val = $phone.val();
                            $phone.val('').val(val); // Ensure cursor remains at the end
                        }

                    })

                    .blur(function () {
                        $('#' + $(this).attr('id').replace("-myphone", "")).val($(this).val().replace("0(", "").replace(")", "").replace(" ", "").replace("-", ""));
                        $phone = $(this);

                        if ($phone.val().length != 15) {
                            $phone.css("background-color", "red");
                        } else {

                            $phone.css("background-color", "white");
                        }

                        if ($phone.val() === '0(') {
                            $phone.val('');
                        }
                    });


            });

    });
});
