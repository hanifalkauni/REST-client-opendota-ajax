function tampilanDefault(){
$.ajax({
		url:'https://api.opendota.com/api/heroStats',
		type:'get',
		datatype:'json',
		success: function(result){
			if (result.length>0){
			
			$.each(result,function(i,data){
				$('#list-heroes').append(`
<div class="col-md-4"> 
<div class="card mb-3">
  <img src="https://api.opendota.com`+data.img+`" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">`+data.localized_name+` <img src="https://api.opendota.com`+data.icon+`"></h5>
    <h6 class="card-subtitle mb-2 text-muted">`+data.primary_attr.toUpperCase()+` - `+data.attack_type+`<h6>
    <p class="card-text">
	`+ data.roles.join(' - ')+`  
</p>
    <a href="#" class="btn btn-primary see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.id +`">See Detail</a>
  </div>
</div>
</div>
				`);
			});			

			}else{	
			$('#list-heroes').html('<h1 class="text-center">Error</h1>')
			}
		}
	});

}

function allHeroes(){
let content='';
$.ajax({
		url:'https://api.opendota.com/api/heroStats',
		type:'get',
		datatype:'json',
		success: function(result){
			if (result.length>0){
			
			$.each(result,function(i,data){
				content+=`
<div class="col-md-4"> 
<div class="card mb-3">
  <img src="https://api.opendota.com`+data.img+`" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">`+data.localized_name+` <img src="https://api.opendota.com`+data.icon+`"></h5>
    <h6 class="card-subtitle mb-2 text-muted">`+data.primary_attr.toUpperCase()+` - `+data.attack_type+`<h6>
    <p class="card-text">
	`+ data.roles.join(' - ')+`  
</p>
    <a href="#" class="btn btn-primary see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.id +`">See Detail</a>
  </div>
</div>
</div>
				`;
			});			

			}else{	
			content+='<h1 class="text-center">Error</h1>';
			}
			$('#list-heroes').html(content);
		}
	});

}

function allTeams(){
let content='';
$.ajax({
		url:'https://api.opendota.com/api/teams',
		type:'get',
		datatype:'json',
		success: function(result){
			if (result.length>0){
			
			$.each(result,function(i,data){
				content+=`
<div class="col-md-4"> 
<div class="card mb-3">
  <img src="`+data.logo_url+`" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">`+data.name+` </h5>
    <h6 class="card-subtitle mb-2 text-muted">`+data.tag+`<h6>
    <a href="#" class="btn btn-primary see-detail-team" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.team_id +`">See Detail</a>
  </div>
</div>
</div>
				`;
			});			

			}else{	
			content+='<h1 class="text-center">Error</h1>';
			}

			$('#list-heroes').html(content);
		}
	});

}


function modalHero(id){

	$.ajax({
		url:'https://api.opendota.com/api/heroStats',
		datatype:'json',
		type:'get',
		success:function(hero){
			$.each(hero,function(i,data){
			 if(data.id==id){
			$('.modal-title').html(data.localized_name);
			$('.modal-body').html(`
			<div class="container-fluid">
				<ul class="list-group list-group-flush">
					<li class="list-group-item"><center><img src="https://api.opendota.com`+data.img+`" class="img-fluid"></center></li>
					<li class="list-group-item"><center><b>`+data.localized_name+` </b><img src="https://api.opendota.com`+data.icon+`"></center></li>
					<li class="list-group-item">Primary Attribute: <b>`+data.primary_attr.toUpperCase()+`</b></li>
					<li class="list-group-item">Attack Type: <b>`+data.attack_type+`</b></li>
					<li class="list-group-item">Roles: <b>`+data.roles.join(' - ')+`</b></li>
					<li class="list-group-item">Pro scene Pick: <b>`+data.pro_pick+`</b></li>
					<li class="list-group-item">Pro scene win rate: <b>`+Math.round(data.pro_win/data.pro_pick*100)+`%</b></li>
				</ul>
				</div>	
			</div>
			`);
			}

			

			});
			
			
		}
	});
}

function modalTeam(id){

	$.ajax({
		url:'https://api.opendota.com/api/teams/'+id,
		datatype:'json',
		type:'get',
		success:function(team){
			$('.modal-title').html(team.name);
			$('.modal-body').html(`
			<div class="container-fluid">
				<ul class="list-group list-group-flush">
					<li class="list-group-item"><center><img src="`+team.logo_url+`" class="img-fluid"></center></li>
					<li class="list-group-item"><center><b>`+team.name+` </b></center></li>
					<li class="list-group-item">Rating: <b>`+team.rating+`</b></li>
					<li class="list-group-item">Wins : <b>`+team.wins+`</b></li>
					<li class="list-group-item">Losses: <b>`+team.losses+`</b></li>
					<li class="list-group-item">Win rate: <b>`+Math.round(team.wins/(team.wins+team.losses)*100)+`%</b></li>
				</ul>
				</div>	
			</div>
			`);
		}
	});
}

$(document).ready(function(){
	tampilanDefault();

});

$('#list-heroes').on('click','.see-detail', function(){
	var id=$(this).data('id');
	modalHero(id);
});

$('#list-heroes').on('click','.see-detail-team', function(){
	var id=$(this).data('id');
	modalTeam(id);
});

$('.nav-link').on('click',function(){
	$('.nav-link').removeClass('active');
	$(this).addClass('active');
	
	let teks= $(this).html();
	$('#text-title').html(teks);
	
	$('#list-heroes').html('Loading...');
	
	if(teks=='All Heroes'){
	allHeroes();
	return;
	}
	if(teks=='All Teams'){
	allTeams();
	return;
	}
 
});