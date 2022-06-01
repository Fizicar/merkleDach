$(document).ready(function () {
    getJsonData();
    // Functions
    function getJsonData() {
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/inspiration"
        })
        .done(function (response) {
            importAjaxData(response);
            $('#loaderContainer').hide();
        })
        .fail(function (){
            $('#loaderText').text('Error fetching Data, please try again later');
        })

    }

    function importAjaxData(topicValues){
        let navLabel = topicValues.InspirationSearchProposalLabel;
        let navigation = topicValues.Filters;
        let topics = topicValues.TopicDetails;
        
        /// Navigation Label Content
        $('#navTitle').text(navLabel);

        /// Navigation Links
        $( ".__navLink" ).each(function( index ) {
            $(this).text(navigation[index].fields.DisplayName.value);
            $(this).attr('data-id', navigation[index].id);
        });

        /// Add All Topic Data
        $( ".__topic" ).each(function( index ) {
            /// Search For Titile
            if(topics[index].PageTeaserTitle){
                $(this).find('h2').text(topics[index].PageTeaserTitle)
            }

            /// Search for Category
            if(topics[index].PageTeaserSubtitle){
                $(this).find('.__category').text(topics[index].PageTeaserSubtitle)
            }

            /// Search for Label
            if(topics[index].PageTeaserLabel){
                $(this).find('.__sponsor').text(topics[index].PageTeaserLabel);
            }

            /// Link
            if(topics[index].PageTeaserUrl){
                $(this).find('a').attr("href", topics[index].PageTeaserUrl)
            }

            /// Image
            if(topics[index].PageTeaserImage){
                $(this).find('img').attr({
                    'src' : topics[index].PageTeaserImage.src,
                    'alt' : topics[index].PageTeaserImage.alt,
                });
            }

            /// Link Image caption
            if(topics[index].PageTeaserImageCaption){
                $(this).find('.__imageCaption').text(topics[index].PageTeaserImageCaption);
            }

            /// Link Label
            if(topics[index].PageTeaserLinkLabel){
                $(this).find('.__linkLabel').text(topics[index].PageTeaserLinkLabel);
            }
            
        });
        
    }
    
})