var PrintOneReis = function(reis, even){
			var time;
			if (even === 'dep') time = reis.departure;
				else time = reis.arrival;
			var html_str = '<div class="item">'+
					'<div class="time">'+
							'<time>'+ time +'</time>'+
					'</div>'+
					'<div class="city">'+
							'<span class="flight-row__city-name">'+ reis.thread.title +'</span>'+
					'</div>'+					
					'<div class="number">'+
								'<span>'+reis.thread.number+'</span>'+
					'</div>'+
					'<div class="airline-name">'+
								'<span class="airline">' + reis.thread.carrier.title + '</span><br>'+
								'<span class="name">"' + reis.thread.vehicle + '"</span>'+
					'</div>'+
				'</div>';
				return html_str;
		};
		var PrintReis = function(json, even){
			var str;
			for (var i =0; i < json.schedule.length - 1; i++){
				var html_str = PrintOneReis(json.schedule[i], even);
				str +=html_str;
			}
			return str;
		}
		var departure_json, arrival_json;
		$.ajax({
			url:'/json/departure.json',
			success: function(data) {
				var html_str = PrintReis(data, 'dep');
				$('#result').append(html_str);
				departure_json = data;
			}
		});
		$.ajax({
			url:'/json/arrival.json',
			success: function(data) {
				var html_str = PrintReis(data, 'arr');
				$('#result').append(html_str);
				arrival_json = data;
			}
		});
		
		
		$('#departure').click(function(){
			var url1 = 'https://api.rasp.yandex.net/v3.0/schedule/?apikey=d9f48ede-1554-4293-8cba-392958f24c50&station=s9600213&format=json&date=2018-11-28&transport_types=plane&direction=%D0%BD%D0%B0%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D1%83&event=departure';
			var url = '/json/departure.json';
			$.ajax({
				url:url,
				success: function(data) {
					var html_str = PrintReis(data, 'dep');
					$('#result').html(html_str);
				}
			});
		});
		$('#arrival').click(function(){
			var url1 = 'https://api.rasp.yandex.net/v3.0/schedule/?apikey=d9f48ede-1554-4293-8cba-392958f24c50&station=s9600213&format=json&date=2018-11-28&transport_types=plane&direction=%D0%BD%D0%B0%20%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D1%83&event=arrival';
			var url = '/json/arrival.json';
			$.ajax({
				url:url,
				success: function(data) {
					var html_str = PrintReis(data, 'arr');
					$('#result').html(html_str);
				}
			});
		});
		$('#search').click(function(){
			var num = $('input[name="search"]').val();
			if (num){
				var result = arrival_json.schedule.filter(obj => obj.thread.number == num)[0];
				if (result){
					$('#result').html(PrintOneReis(result, 'arr'));
				}
				else{
					var result = departure_json.schedule.filter(obj => obj.thread.number == num)[0];
					if (result){
						$('#result').html(PrintOneReis(result, 'dep'));
					}
					else
						$('#result').html('<p>Рейса по заданному номеру не найдено</p>');
				}
					
				console.log(result);
			}				
		});