module('MinViewModeIsMonth', {
    setup: function(){
        this.input = $('<input type="text" value="31-03-2011">')
                        .appendTo('#qunit-fixture')
                        .datepicker({format: "dd-mm-yyyy",
                                     minViewMode: 'months',
                                     startView: 'decade'
                                   })
                        .focus(); // Activate for visibility checks
        this.dp = this.input.data('datepicker')
        this.picker = this.dp.picker;
    },
    teardown: function(){
        this.picker.remove();
    }
});

test('Selecting a month from month view triggers changeDate', function(){
    var target,
        triggered = 0;

    this.input.on('changeDate', function(){
        triggered++;
    });

    equal(this.dp.viewMode, 2);

    target = this.picker.find('.datepicker-years tbody span:contains(2011)');
    target.click();

    equal(triggered, 0);
    equal(this.dp.viewMode, 1);
    equal(this.dp.minViewMode, 1);

    ok(this.picker.find('.datepicker-months').is(':visible'), 'Month picker is visible');

    target = this.picker.find('.datepicker-months tbody span:contains(Apr)');
    target.click();
    equal(this.dp.viewMode, 1);

    datesEqual(this.dp.viewDate, UTCDate(2011, 3, 1));
    datesEqual(this.dp.date, UTCDate(2011, 3, 1));
    equal(triggered, 1);

});


module('MinViewModeIsYear', {
    setup: function(){
        this.input = $('<input type="text" value="31-03-2011">')
                        .appendTo('#qunit-fixture')
                        .datepicker({format: "dd-mm-yyyy",
                                     minViewMode: 'years',
                                     startView: 'decade'
                                   })
                        .focus(); // Activate for visibility checks
        this.dp = this.input.data('datepicker')
        this.picker = this.dp.picker;
    },
    teardown: function(){
        this.picker.remove();
    }
});

test('Selecting a year from decade view triggers changeDate', function(){
    var target,
        triggered = 0;

    this.input.on('changeDate', function(){
        triggered++;
    });

    equal(this.dp.viewMode, 2);

    target = this.picker.find('.datepicker-years tbody span:contains(2011)');
    target.click();

    equal(triggered, 1);
    equal(this.dp.viewMode, 2);
    equal(this.dp.minViewMode, 2);

});