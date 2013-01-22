module('Options', {
    setup: function(){},
    teardown: function(){
        return
        $('#qunit-fixture *').each(function(){
            var t = $(this);
            if ('datepicker' in t.data())
                t.data('datepicker').picker.remove();
        });
    }
});

test('Autoclose', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    autoclose: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;


    input.focus();
    ok(picker.is(':visible'), 'Picker is visible');
    target = picker.find('.datepicker-days tbody td:nth(7)');
    equal(target.text(), '4'); // Mar 4

    target.click();
    ok(picker.is(':not(:visible)'), 'Picker is hidden');
    datesEqual(dp.date, UTCDate(2012, 2, 4));
    datesEqual(dp.viewDate, UTCDate(2012, 2, 4));
});

test('Startview: year view (integer)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    startView: 1
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

        input.focus();
        ok(picker.find('.datepicker-days').is(':not(:visible)'), 'Days view hidden');
        ok(picker.find('.datepicker-months').is(':visible'), 'Months view visible');
        ok(picker.find('.datepicker-years').is(':not(:visible)'), 'Years view hidden');
});

test('Startview: year view (string)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    startView: 'year'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

        input.focus();
        ok(picker.find('.datepicker-days').is(':not(:visible)'), 'Days view hidden');
        ok(picker.find('.datepicker-months').is(':visible'), 'Months view visible');
        ok(picker.find('.datepicker-years').is(':not(:visible)'), 'Years view hidden');
});

test('Startview: decade view (integer)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    startView: 2
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

        input.focus();
        ok(picker.find('.datepicker-days').is(':not(:visible)'), 'Days view hidden');
        ok(picker.find('.datepicker-months').is(':not(:visible)'), 'Months view hidden');
        ok(picker.find('.datepicker-years').is(':visible'), 'Years view visible');
});

test('Startview: decade view (string)', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    startView: 'decade'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

        input.focus();
        ok(picker.find('.datepicker-days').is(':not(:visible)'), 'Days view hidden');
        ok(picker.find('.datepicker-months').is(':not(:visible)'), 'Months view hidden');
        ok(picker.find('.datepicker-years').is(':visible'), 'Years view visible');
});

test('Today Button: today button not default', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

        input.focus();
        ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
        ok(picker.find('.datepicker-days tfoot .today').is(':not(:visible)'), 'Today button not visible');
});

test('Today Button: today visibility when enabled', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    todayBtn: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

        input.focus();
        ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
        ok(picker.find('.datepicker-days tfoot .today').is(':visible'), 'Today button visible');

        picker.find('.datepicker-days thead th.switch').click();
        ok(picker.find('.datepicker-months').is(':visible'), 'Months view visible');
        ok(picker.find('.datepicker-months tfoot .today').is(':visible'), 'Today button visible');

        picker.find('.datepicker-months thead th.switch').click();
        ok(picker.find('.datepicker-years').is(':visible'), 'Years view visible');
        ok(picker.find('.datepicker-years tfoot .today').is(':visible'), 'Today button visible');
});

test('Today Button: data-api', function(){
    var input = $('<input data-date-today-btn="true" />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

        input.focus();
        ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
        ok(picker.find('.datepicker-days tfoot .today').is(':visible'), 'Today button visible');
});

test('Today Button: moves to today\'s date', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    todayBtn: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

        input.focus();
        ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
        ok(picker.find('.datepicker-days tfoot .today').is(':visible'), 'Today button visible');

        target = picker.find('.datepicker-days tfoot .today');
        target.click();

        var d = new Date(),
            today = UTCDate(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        datesEqual(dp.viewDate, today);
        datesEqual(dp.date, UTCDate(2012, 2, 5));
});

test('Today Button: "linked" selects today\'s date', function(){
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    todayBtn: "linked"
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

        input.focus();
        ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
        ok(picker.find('.datepicker-days tfoot .today').is(':visible'), 'Today button visible');

        target = picker.find('.datepicker-days tfoot .today');
        target.click();

        var d = new Date(),
            today = UTCDate(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
        datesEqual(dp.viewDate, today);
        datesEqual(dp.date, today);
});

test('Today Highlight: today\'s date is not highlighted by default', patch_date(function(Date){
    Date.now = UTCDate(2012, 2, 15);
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

        input.focus();
        ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
        equal(picker.find('.datepicker-days thead .switch').text(), 'March 2012', 'Title is "March 2012"');

        target = picker.find('.datepicker-days tbody td:contains(15)');
        ok(!target.hasClass('today'), 'Today is not marked with "today" class');
        target = picker.find('.datepicker-days tbody td:contains(14)');
        ok(!target.hasClass('today'), 'Yesterday is not marked with "today" class');
        target = picker.find('.datepicker-days tbody td:contains(16)');
        ok(!target.hasClass('today'), 'Tomorrow is not marked with "today" class');
}));

test('Today Highlight: today\'s date is highlighted when not active', patch_date(function(Date){
    Date.now = new Date(2012, 2, 15);
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    todayHighlight: true
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

        input.focus();
        ok(picker.find('.datepicker-days').is(':visible'), 'Days view visible');
        equal(picker.find('.datepicker-days thead .switch').text(), 'March 2012', 'Title is "March 2012"');

        target = picker.find('.datepicker-days tbody td:contains(15)');
        ok(target.hasClass('today'), 'Today is marked with "today" class');
        target = picker.find('.datepicker-days tbody td:contains(14)');
        ok(!target.hasClass('today'), 'Yesterday is not marked with "today" class');
        target = picker.find('.datepicker-days tbody td:contains(16)');
        ok(!target.hasClass('today'), 'Tomorrow is not marked with "today" class');
}));

test('Today Highlight: today\'s date is highlighted when not active in month view when minViewMode', patch_date(function(Date){
    Date.now = new Date(2012, 2, 15);
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-03-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    todayHighlight: true,
                    minViewMode: 'months',
                    startView: 'year'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

        input.focus();
        ok(picker.find('.datepicker-months').is(':visible'), 'Months view visible');
        equal(picker.find('.datepicker-months thead .switch').text(), '2012', 'Title is "2012"');

        target = picker.find('.datepicker-months tbody span:contains("Mar")');
        ok(target.hasClass('today'), 'Today is marked with "today" class');
        target = picker.find('.datepicker-months tbody span:contains("Feb")');
        ok(!target.hasClass('today'), 'Prev month is not marked with "today" class');
        target = picker.find('.datepicker-months tbody span:contains("Apr")');
        ok(!target.hasClass('today'), 'Next month is not marked with "today" class');
}));

test('Today Highlight: today\'s date is highlighted when not active in quarterly view too when minViewMode', patch_date(function(Date){
    Date.now = new Date(2012, 4, 15);
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2012-04-05')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    todayHighlight: true,
                    quarterlyView: true,
                    startView: 'year'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

        input.focus();
        ok(picker.find('.datepicker-quarters').is(':visible'), 'Quarters view visible');
        equal(picker.find('.datepicker-quarters thead .switch').text(), '2012', 'Title is "2012"');

        target = picker.find('.datepicker-quarters tbody span:contains("Ap")');
        ok(target.hasClass('today'), 'Today is marked with "today" class');
        target = picker.find('.datepicker-quarters tbody span:contains("Jan")');
        ok(!target.hasClass('today'), 'Prev quarter is not marked with "today" class');
        target = picker.find('.datepicker-quarters tbody span:contains("Sep")');
        ok(!target.hasClass('today'), 'Next quarter is not marked with "today" class');
}));

test('Today Highlight: today\'s date is highlighted in weekly view too when minViewMode', patch_date(function(Date){
    Date.now = new Date(2013, 2, 14);
    var input = $('<input />')
                .appendTo('#qunit-fixture')
                .val('2013-03-01')
                .datepicker({
                    format: 'yyyy-mm-dd',
                    todayHighlight: true,
                    weeklyView: true,
                    startView: 'month'
                }),
        dp = input.data('datepicker'),
        picker = dp.picker,
        target;

        input.focus();
        ok(picker.find('.datepicker-weeks').is(':visible'), 'Weeks view visible');
        equal(picker.find('.datepicker-weeks thead .switch').text(), 'March 2013', 'Title is "March 2013"');

        target = picker.find('.datepicker-weeks tbody span:contains("Semaine 11")');
        ok(target.hasClass('today'), 'Today is marked with "today" class');
        target = picker.find('.datepicker-weeks tbody span:contains("Semaine 10")');
        ok(!target.hasClass('today'), 'Previous week is not marked with "today" class');
}));



