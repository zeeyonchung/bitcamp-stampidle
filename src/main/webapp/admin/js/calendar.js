


$(function()
		{

	if (!window['console'])
	{
		window.console = {};
		window.console.log = function(){};
	}

	/*
		  	define a new language named "custom"
	 */

	$.dateRangePickerLanguages['custom'] = 
	{
			'selected': 'Choosed:',
			'days': 'Days',
			'apply': 'Close',
			'week-1' : 'Mon',
			'week-2' : 'Tue',
			'week-3' : 'Wed',
			'week-4' : 'Thu',
			'week-5' : 'Fri',
			'week-6' : 'Sat',
			'week-7' : 'Sun',
			'month-name': ['January','February','March','April','May','June','July','August','September','October','November','December'],
			'shortcuts' : 'Shortcuts',
			'past': 'Past',
			'7days' : '7days',
			'14days' : '14days',
			'30days' : '30days',
			'previous' : 'Previous',
			'prev-week' : 'Week',
			'prev-month' : 'Month',
			'prev-quarter' : 'Quarter',
			'prev-year' : 'Year',
			'less-than' : 'Date range should longer than %d days',
			'more-than' : 'Date range should less than %d days',
			'default-more' : 'Please select a date range longer than %d days',
			'default-less' : 'Please select a date range less than %d days',
			'default-range' : 'Please select a date range between %d and %d days',
			'default-default': 'This is costom language'
	};







	$('#date-custom').dateRangePicker(
			{
				separator : ' ~ ',
				autoClose: true,
				singleMonth: true

			}).bind('datepicker-first-date-selected', function(event, obj)
					{
				/* This event will be triggered when first date is selected */
				////console.log('first-date-selected',obj);
				// obj will be something like this:
				// {
				//    date1: (Date object of the earlier date)
				// }
					})
					.bind('datepicker-change',function(event,obj)
							{
						/* This event will be triggered when second date is selected */
						////console.log('change',obj);
						// obj will be something like this:
						// {
						// 		date1: (Date object of the earlier date),
						// 		date2: (Date object of the later date),
						//	 	value: "2013-06-05 to 2013-06-07"
						// }
							})
							.bind('datepicker-apply',function(event,obj)
									{
								/* This event will be triggered when user clicks on the apply button */
								////console.log('apply',obj);
									})
									.bind('datepicker-close',function()
											{
										/* This event will be triggered before date range picker close animation */
										////console.log('before close');
											})
											.bind('datepicker-closed',function()
													{
												/* This event will be triggered after date range picker close animation */
												////console.log('after close');
													})
													.bind('datepicker-open',function()
															{
														/* This event will be triggered before date range picker open animation */
														////console.log('before open');
															})
															.bind('datepicker-opened',function()
																	{
																/* This event will be triggered after date range picker open animation */
																////console.log('after open');
																	});




	$('.single-month.date-picker-wrapper').css('width', '215px');



		});