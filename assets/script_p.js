function checkConnection(postData) {

    if(window.psCheckStatus) {
        return;
    }

    if(localStorage && localStorage.getItem('psCheckStatus')) {
        if(new Date().getTime() < (localStorage.getItem('psCheckStatus') - 0 + 300000)) {
            return;
        }
    }

    if(typeof jQuery === "undefined") {
        if(typeof $ !== "undefined") {
            jQuery = $;
        } else {
            setTimeout(function() {
                checkConnection(postData);
            }, 1000);

            return;
        }
    }

    if (localStorage) {
        localStorage.setItem('psCheckStatus', new Date().getTime());
    }

    window.psCheckStatus = true;

    jQuery.ajax({
        type: 'POST',
        url: 'https://www.sellerpanda.com/store_swatches/',
        data: postData,
        success: function (response) {

            try {
                response = JSON.parse(response);
            } catch (e) {

                return;
            }

            if (response.result == '1') {

                if(response.message == 'cancel' && (jQuery('.swatch-panda-cont').length || jQuery('.panda-swatches-coll-cont').length)) {
                    jQuery('.panda-swatches-cont').css('display','none');
                    jQuery('.panda-swatches-coll-cont').css('display','none');
                    jQuery(window).load(function() { jQuery('.selector-wrapper').show(); jQuery('.radio-wrapper').show(); });
                }

            }

        }
    });

    return false;
}

var postData = {
    "controller":   "sellers",
    "action": 	    "checkStatus",
    "seller_id":    Shopify.shop,
    "v":            1
};

checkConnection(postData);