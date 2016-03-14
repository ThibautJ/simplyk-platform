$(function() {
	var orgcit=1;//1 si citoyen est activé, 0 sinon
	var citoyenButton = document.getElementById('citoyen-button');
	var orgButton = document.getElementById('organisme-button');


	//Appui sur le bouton de description organisme
	$('#organisme-button-description').click(function(){
		console.log("pathname = " + window.location.pathname);
		var enbool = false;
		if ((window.location.pathname=="/C:/wamp/www/tests/index_en.php") || (window.location.pathname=="/simplyk.org/index_en.php") || (window.location.pathname=="/index_en.php")) {
			enbool = true;
		} else{
			enbool = false;
		};
		if (enbool) {
			$('#description-list').html('<div class="col-sm-4 text-sk block-text"><i class="icon icon-sk icon-bullhorn"></i><b>Launch your call to action</b> Share your missions within a few clicks in a highly connected network.</div><div class="row"><div class="col-sm-4 text-sk block-text"><i class="icon icon-sk icon-check"></i><b>With a customized research system</b> Specify the number of volunteers you need, as well as the skills you are looking for.</div><div class="col-sm-4 text-sk block-text"><i class="icon icon-sk icon-comments"></i><b> Allowing more communication </b> Get easily in touch with  volunteers and do a follow-up with them.</div></div>');
			orgcit = 0;
		} else{
			$('#description-list').html('<div class="col-sm-4 text-sk block-text"><i class="icon icon-sk icon-bullhorn"></i><b>Lancez votre appel à l’action</b> Partagez vos missions en quelques clics sur un réseau ultra-connecté.</div><div class="row"><div class="col-sm-4 text-sk block-text"><i class="icon icon-sk icon-check"></i><b>Avec un système de recherche personnalisé</b> Indiquez le nombre de bénévoles dont vous avez besoin, ainsi que les compétences que vous recherchez.</div><div class="col-sm-4 text-sk block-text"><i class="icon icon-sk icon-comments"></i><b> Laissant place à plus de communication </b> Engagez facilement le contact avec vos bénévoles et faites le suivi avec eux. </div></div>');
			orgcit = 0;
		};	
	});

	//Appui sur le bouton de description citoyen
	$('#citoyen-button-description').click(function(){
		console.log("pathname = " + window.location.pathname);
		var enbool = false;
		if ((window.location.pathname=="/C:/wamp/www/tests/index_en.php") || (window.location.pathname=="/simplyk.org/index_en.php") || (window.location.pathname=="/index_en.php")) {
			enbool = true;
		} else{
			enbool = false;
		};
		if (enbool) {
			$('#description-list').html('<div class="col-sm-4 text-sk block-text"><i class="icon icon-sk icon-hand-o-up"></i><b>Find your mission</b> Filters to ease your mission research, according to your availabilities and interests (close to you).</div><div class="col-sm-4 text-sk block-text"><i class="icon icon-sk icon-calendar-check-o"></i><b>Even if you have only a few hours</b> No more reason to miss an occasion to get involved, whether it is on a punctual or a regular basis.</div><div class="col-sm-4 text-sk block-text"><i class="icon icon-sk icon-users"></i><b>Being in good company</b> Invite your friends to take part to your missions. Because the more, the merrier and the bigger the impact. </div>');
			orgcit = 1;
		} else{
			$('#description-list').html('<div class="col-sm-4 text-sk block-text"><i class="icon icon-sk icon-hand-o-up"></i><b>Trouve ta mission</b> Des filtres pour faciliter ta recherche de mission à proximité, selon tes disponibilités, tes centres d’intérêt et ta géolocalisation.</div><div class="col-sm-4 text-sk block-text"><i class="icon icon-sk icon-calendar-check-o"></i><b>Même si tu n’as que quelques heures</b> Plus question de manquer une occasion de s’impliquer, que ce soit ponctuellement ou régulièrement.</div><div class="col-sm-4 text-sk block-text"><i class="icon icon-sk icon-users"></i><b>En étant bien entouré</b> Invite tes amis à participer à tes missions. Parce que plus on est de fous, plus on a de fun et d’impact. </div>');
			orgcit = 1;
		};
		
	});

	//Appui sur le bouton du formulaire organisme
	$('#organisme-button').click(function(){
		$('#php-form').html('<div id="mc_embed_signup"><form action="https://simplyk.us12.list-manage.com/subscribe/post?u=25d3c944f0b1b09c66068b2b8&amp;id=2e82928753" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate form-correction" target="_blank" novalidate><div id="mc_embed_signup_scroll"><div class="indicates-required"><span class="asterisk">*</span> indicates required</div><div class="mc-field-group"><label for="mce-EMAIL" class="txt">Email Address  <span class="asterisk">*</span></label><input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL"></div><div class="mc-field-group"><label for="mce-FNAME" class="txt">First Name </label><input type="text" value="" name="FNAME" class="" id="mce-FNAME"></div><div class="mc-field-group"><label for="mce-LNAME" class="txt">Last Name </label><input type="text" value="" name="LNAME" class="" id="mce-LNAME"></div><div class="mc-field-group"><label for="mce-MMERGE3" class="txt">Organism </label><input type="text" value="" name="MMERGE3" class="" id="mce-MMERGE3"></div><div id="mce-responses" class="clear"><div class="response" id="mce-error-response" style="display:none"></div><div class="response" id="mce-success-response" style="display:none"></div></div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--><div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_25d3c944f0b1b09c66068b2b8_63eac1bc9a" tabindex="-1" value=""></div><div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button btn btn-warning"></div></div></form></div><script type="text/javascript" src="https://s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script><script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]="EMAIL";ftypes[0]="email";fnames[1]="FNAME";ftypes[1]="text";fnames[2]="LNAME";ftypes[2]="text";fnames[3]="MMERGE3";ftypes[3]="text";}(jQuery));var $mcj = jQuery.noConflict(true);</script><!--End mc_embed_signup-->');
	});

	//Appui sur le bouton du formulaire citoyen
	$('#citoyen-button').click(function(){
		$('#php-form').html('<!-- Begin MailChimp Signup Form --><div id="mc_embed_signup"><form action="https://simplyk.us12.list-manage.com/subscribe/post?u=25d3c944f0b1b09c66068b2b8&amp;id=2e82928753" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate form-correction" target="_blank" novalidate><div id="mc_embed_signup_scroll"><div class="indicates-required"><span class="asterisk">*</span> indicates required</div><div class="mc-field-group mct-field-group"><label for="mce-EMAIL" class="txt">Email Address  <span class="asterisk">*<br></span></label><input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL"></div><div class="mc-field-group mct-field-group"><label for="mce-FNAME" class="txt">First Name </label><input type="text" value="" name="FNAME" class="" id="mce-FNAME"></div><div class="mc-field-group mct-field-group"><label for="mce-LNAME" class="txt">Last Name </label><input type="text" value="" name="LNAME" class="" id="mce-LNAME"></div><div class="mc-field-group mct-field-group"><label for="mce-MMERGE3" class="txt">Ideas </label><input type="text" value="" name="MMERGE3" class="" id="mce-MMERGE3"></div><div id="mce-responses" class="clear"><div class="response" id="mce-error-response" style="display:none"></div><div class="response" id="mce-success-response" style="display:none"></div></div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--><div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_25d3c944f0b1b09c66068b2b8_2e82928753" tabindex="-1" value=""></div><div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button btn btn-warning"></div></div></form></div>');
	});

	//Appui sur le bouton inscris-toi
	$("#citoyen-register").click(function() {
		if(orgcit==1){
			citoyenButton.classList.add("active");
			orgButton.classList.remove("active");
			$('html, body').animate({
				scrollTop: $("#register-section").offset().top
			}, 1000);
			$('#php-form').html('<!-- Begin MailChimp Signup Form --><div id="mc_embed_signup"><form action="https://simplyk.us12.list-manage.com/subscribe/post?u=25d3c944f0b1b09c66068b2b8&amp;id=2e82928753" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate form-correction" target="_blank" novalidate><div id="mc_embed_signup_scroll"><div class="indicates-required"><span class="asterisk">*</span> indicates required</div><div class="mc-field-group mct-field-group"><label for="mce-EMAIL" class="txt">Email Address  <span class="asterisk">*<br></span></label><input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL"></div><div class="mc-field-group mct-field-group"><label for="mce-FNAME" class="txt">First Name </label><input type="text" value="" name="FNAME" class="" id="mce-FNAME"></div><div class="mc-field-group mct-field-group"><label for="mce-LNAME" class="txt">Last Name </label><input type="text" value="" name="LNAME" class="" id="mce-LNAME"></div><div class="mc-field-group mct-field-group"><label for="mce-MMERGE3" class="txt">Ideas </label><input type="text" value="" name="MMERGE3" class="" id="mce-MMERGE3"></div><div id="mce-responses" class="clear"><div class="response" id="mce-error-response" style="display:none"></div><div class="response" id="mce-success-response" style="display:none"></div></div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--><div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_25d3c944f0b1b09c66068b2b8_2e82928753" tabindex="-1" value=""></div><div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button btn btn-warning"></div></div></form></div>');
		}
		else if(orgcit==0){
			citoyenButton.classList.remove("active");
			orgButton.classList.add("active");
			$('html, body').animate({
				scrollTop: $("#register-section").offset().top
			}, 1000);
			$('#php-form').html('<div id="mc_embed_signup"><form action="https://simplyk.us12.list-manage.com/subscribe/post?u=25d3c944f0b1b09c66068b2b8&amp;id=2e82928753" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate form-correction" target="_blank" novalidate><div id="mc_embed_signup_scroll"><div class="indicates-required"><span class="asterisk">*</span> indicates required</div><div class="mc-field-group"><label for="mce-EMAIL" class="txt">Email Address  <span class="asterisk">*</span></label><input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL"></div><div class="mc-field-group"><label for="mce-FNAME" class="txt">First Name </label><input type="text" value="" name="FNAME" class="" id="mce-FNAME"></div><div class="mc-field-group"><label for="mce-LNAME" class="txt">Last Name </label><input type="text" value="" name="LNAME" class="" id="mce-LNAME"></div><div class="mc-field-group"><label for="mce-MMERGE3" class="txt">Organism </label><input type="text" value="" name="MMERGE3" class="" id="mce-MMERGE3"></div><div id="mce-responses" class="clear"><div class="response" id="mce-error-response" style="display:none"></div><div class="response" id="mce-success-response" style="display:none"></div></div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--><div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_25d3c944f0b1b09c66068b2b8_63eac1bc9a" tabindex="-1" value=""></div><div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button btn btn-warning"></div></div></form></div><script type="text/javascript" src="https://s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script><script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]="EMAIL";ftypes[0]="email";fnames[1]="FNAME";ftypes[1]="text";fnames[2]="LNAME";ftypes[2]="text";fnames[3]="MMERGE3";ftypes[3]="text";}(jQuery));var $mcj = jQuery.noConflict(true);</script><!--End mc_embed_signup-->');
		}
		else{
			alert("Tu as le formulaire ci-dessous");
		}
	});

	//New tab for external links
	$('a').attr('target', function() {
		if(this.host == location.host) return '_self'
			else return '_blank'
		});
});
