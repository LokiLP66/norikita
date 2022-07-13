$('#guilds').change(function (e) {
    var selected = $(e.currentTarget).val();
    $('#chans').hide();
    switch (selected) {
        case "Show 1":
            $('#chans').show();
            break;
        case "Show All":
            $('#chans').show();
            break;
        default:
            break;
    }
})