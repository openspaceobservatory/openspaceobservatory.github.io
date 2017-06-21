var router = new (Backbone.Router.extend())

var Profile = Backbone.Model.extend();

var ProfileList = Backbone.Collection.extend({
    model: Profile,
    url: '/data/satellites.geojson',
    parse: function (response) {
      return response.features;
    }
});

var satelliteDesc = {};

var ModalView = Backbone.View.extend({
    el: "#modals",
    template: _.template($('#participantModalTpl').html()),
    initialize: function(){
        this.listenTo(this.collection,"add", this.renderItem);          
    },
    render: function () {
        this.collection.each(function(model){
             var profileTemplate = this.template(model.toJSON());
             this.$el.append(profileTemplate);
        }, this);        
        return this;
    },
    renderItem: function(profile) {
         var profileTemplate = this.template(profile.toJSON());
         this.$el.append(profileTemplate);        
    }
});

var modalList = new ProfileList(); //startData);

modalList.fetch({
  success: function(){
    var profilesView = new ModalView({ collection: modalList });
    profilesView.render();
    //renderCollection(); // some callback to do stuff with the collection you made
  },
  error: function(){
  }
});




Trello.get("boards/5584244c0f4867e5cb41ee84/lists?cards=open", function(lists) {
  $.each(lists, function(ix, list) {
    $.each(list.cards, function(ix, card) {
      var $cardName = card.name;
      var $cardRegex = $cardName.replace(/\s+/g, "-").replace(/[^A-Za-z0-9]/g, '');
      $cardRegex = '#' + $cardRegex;
      var $modalContent = $($cardRegex);
      if(card.desc == "") {
        $modalContent.empty();
        var $emptyDescription = "This satellite's biography needs more information. Please add content in the comments section <a href='"+ card.url +"' target='_blank'>here</a>.";
        $modalContent.append($emptyDescription);
      }
      else {
        $modalContent.empty();
        $modalContent.append(markdown.toHTML(card.desc) + "<p style='font-size: 12px;'><em>Suggest additional content in the comments section <a href='"+ card.url +"' target='_blank'>here</a>.</em></p>");
      }
    })
  })
});