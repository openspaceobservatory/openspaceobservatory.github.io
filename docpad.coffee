# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON
docpadConfig = {

	# =================================
	# Template Data
	# These are variables that will be accessible via our templates
	# To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ

	templateData:

		# Specify some site properties
		site:
			# The production url of our website
			url: "http://openspaceobservatory.org"

			# Here are some old site urls that you would like to redirect from
			oldUrls: [
				'www.opensourceobservatory.org',
			]

			# The default title of our website
			title: "Open Space Observatory"

			# The website description (for SEO)
			description: """
				Gatherings and infrastructure for the observation of satellites, spacecraft and space junk.
				"""

			# The website keywords (for SEO) separated by commas
			keywords: """
				open source, astronomy, satellites, observatory, meetup, space technology, space exploration
				"""

			# The website author's name
			author: "OSO"

			# The website author's email
			email: "contact@openspaceobservatory.org"

			# Styles
			styles: [
				"https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
				"https://api.tiles.mapbox.com/mapbox.js/v2.1.9/mapbox.css"
				"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
				"https://fonts.googleapis.com/css?family=Rakkas|Lato"
				"/styles/style.css"
				"/styles/custom.css"
			]


			# Scripts
			scripts: [
				"https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js"
				"https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.6.2/modernizr.min.js"
				"https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"
				"/scripts/bootstrap-custom.js"
				"/scripts/modal.js"
				"/scripts/markdown.js"
				"https://api.tiles.mapbox.com/mapbox.js/v2.1.9/mapbox.js"
				"/scripts/leaflet-label.js"
				"https://api.trello.com/1/client.js?key=31eb16d37ff9dea5bf8ec1b33e438a55"
				"https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js"
				"https:/cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.0/backbone-min.js"
				"/scripts/satellites-app.js"
				"/scripts/satellites-map.js"
				"/scripts/astrologies-app.js"
				"/scripts/astrologies-map.js"
			]

		# -----------------------------
		# Helper Functions

		# Get the prepared site/document title
		# Often we would like to specify particular formatting to our page's title
		# we can apply that formatting here
		getPreparedTitle: ->
			# if we have a document title, then we should use that and suffix the site's title onto it
			if @document.title
				"#{@document.title} | #{@site.title}"
			# if our document does not have it's own title, then we should just use the site's title
			else
				@site.title

		# Get the prepared site/document description
		getPreparedDescription: ->
			# if we have a document description, then we should use that, otherwise use the site's description
			@document.description or @site.description

		# Get the prepared site/document keywords
		getPreparedKeywords: ->
			# Merge the document keywords with the site keywords
			@site.keywords.concat(@document.keywords or []).join(', ')


	# =================================
	# Collections
	# These are special collections that our website makes available to us

	collections:
		pages: (database) ->
			database.findAllLive({pageOrder: $exists: true}, [pageOrder:1,title:1])

		posts: (database) ->
			database.findAllLive({tags:$has:'post'}, [date:-1])


	# =================================
	# Plugins

	plugins:
	    ghpages:
	        deployRemote: 'origin'
        	deployBranch: 'master'

	# =================================
	# DocPad Events

	# Here we can define handlers for events that DocPad fires
	# You can find a full listing of events on the DocPad Wiki
	events:

		# Server Extend
		# Used to add our own custom routes to the server before the docpad routes are added
		serverExtend: (opts) ->
			# Extract the server from the options
			{server} = opts
			docpad = @docpad

			# As we are now running in an event,
			# ensure we are using the latest copy of the docpad configuraiton
			# and fetch our urls from it
			latestConfig = docpad.getConfig()
			oldUrls = latestConfig.templateData.site.oldUrls or []
			newUrl = latestConfig.templateData.site.url

			# Redirect any requests accessing one of our sites oldUrls to the new site url
			server.use (req,res,next) ->
				if req.headers.host in oldUrls
					res.redirect(newUrl+req.url, 301)
				else
					next()
}


# Export our DocPad Configuration
module.exports = docpadConfig
